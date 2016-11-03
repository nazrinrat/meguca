package server

import (
	"net/http"
	"strconv"

	"github.com/bakape/meguca/auth"
	"github.com/bakape/meguca/db"
	"github.com/bakape/meguca/templates"
	"github.com/mssola/user_agent"
)

// Serves the standard HTML for desktop or mobile pages
func serveIndexTemplate(w http.ResponseWriter, r *http.Request) {
	isMobile := user_agent.New(r.UserAgent()).Mobile()
	var template templates.Store
	if isMobile {
		template = templates.Get("mobile")
	} else {
		template = templates.Get("index")
	}
	etag := template.Hash
	if isMobile {
		etag += "-mobile"
	}

	// If etags match, no need to rerender
	if checkClientEtag(w, r, etag) {
		return
	}

	serveHTML(w, r, template.HTML, etag)
}

// Apply headers and write HTML to client
func serveHTML(
	w http.ResponseWriter,
	r *http.Request,
	data []byte,
	etag string,
) {
	head := w.Header()
	for key, val := range vanillaHeaders {
		head.Set(key, val)
	}
	head.Set("ETag", etag)
	head.Set("Content-Type", "text/html")

	writeData(w, r, data)
}

// Serves board HTML to regular or noscript clients
func boardHTML(w http.ResponseWriter, r *http.Request, p map[string]string) {
	b := p["board"]
	if !auth.IsBoard(b) {
		text404(w)
		return
	}
	if r.URL.Query().Get("noscript") != "true" {
		serveIndexTemplate(w, r)
		return
	}
	board, etag, ok := boardData(w, r, b)
	if !ok {
		return
	}
	data, err := templates.Board(b, board)
	if err != nil {
		text500(w, r, err)
		return
	}
	serveHTML(w, r, data, etag)
}

// Asserts a thread exists on the specific board and renders the index template
func threadHTML(
	res http.ResponseWriter,
	req *http.Request,
	params map[string]string,
) {
	board := params["board"]
	id, err := strconv.ParseInt(params["thread"], 10, 64)
	if err != nil {
		text404(res)
		return
	}

	valid, err := db.ValidateOP(id, board)
	if err != nil {
		text500(res, req, err)
		return
	}
	if !valid {
		text404(res)
		return
	}

	serveIndexTemplate(res, req)
}
