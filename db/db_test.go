package db

import (
	"reflect"
	"testing"

	"bytes"

	"github.com/bakape/meguca/auth"
	"github.com/bakape/meguca/types"
	r "github.com/dancannon/gorethink"
)

func TestValidateOp(t *testing.T) {
	assertTableClear(t, "threads")
	assertInsert(t, "threads", types.DatabaseThread{
		ID:    1,
		Board: "a",
	})

	samples := [...]struct {
		id      int64
		board   string
		isValid bool
	}{
		{1, "a", true},
		{15, "a", false},
	}

	for i := range samples {
		s := samples[i]
		t.Run("", func(t *testing.T) {
			t.Parallel()
			valid, err := ValidateOP(s.id, s.board)
			if err != nil {
				t.Fatal(err)
			}
			if valid != s.isValid {
				t.Fatal("unexpected result")
			}
		})
	}
}

func TestPostCounter(t *testing.T) {
	assertTableClear(t, "main")
	assertInsert(t, "main", infoDocument{
		Document: Document{"info"},
		PostCtr:  1,
	})

	ctr, err := PostCounter()
	if err != nil {
		t.Fatal(err)
	}
	if ctr != 1 {
		t.Fatalf("expected: 1, got: %d", ctr)
	}
}

func TestThreadCounter(t *testing.T) {
	assertTableClear(t, "threads")
	assertInsert(t, "threads", types.DatabaseThread{
		ID:      1,
		PostCtr: 55,
	})

	ctr, err := ThreadCounter(1)
	if err != nil {
		t.Fatal(err)
	}
	if ctr != 55 {
		logUnexpected(t, 55, ctr)
	}
}

func TestRegisterAccount(t *testing.T) {
	assertTableClear(t, "accounts")

	const id = "123"
	hash := []byte{1, 2, 3}
	user := auth.User{
		ID:       id,
		Password: hash,
		Sessions: []auth.Session{},
	}

	// New user
	if err := RegisterAccount(id, hash); err != nil {
		t.Fatal(err)
	}
	var res auth.User
	if err := One(GetAccount(id), &res); err != nil {
		t.Error(err)
	}
	if !reflect.DeepEqual(res, user) {
		logUnexpected(t, user, res)
	}

	// User name already registered
	if err := RegisterAccount(id, hash); err != ErrUserNameTaken {
		t.Errorf("unexpected error: %s", err)
	}
}

func TestGetLoginHash(t *testing.T) {
	assertTableClear(t, "accounts")

	const id = "123"
	hash := []byte{1, 2, 3}
	assertInsert(t, "accounts", auth.User{
		ID:       id,
		Password: hash,
	})

	samples := [...]struct {
		name, id string
		err      error
	}{
		{"exists", id, nil},
		{"does not exist", "456", r.ErrEmptyResult},
	}

	for i := range samples {
		s := samples[i]
		t.Run(s.name, func(t *testing.T) {
			t.Parallel()
			h, err := GetLoginHash(s.id)
			if err != s.err {
				logUnexpected(t, s.err, err)
			}
			if s.err == nil {
				if !bytes.Equal(h, hash) {
					logUnexpected(t, hash, h)
				}
			}
		})
	}
}

func TestGetBoardConfig(t *testing.T) {
	t.Parallel()
	const std = `r.Table("boards").Get("a").Without("created")`
	if q := GetBoardConfig("a").String(); q != std {
		logUnexpected(t, std, q)
	}
}

func TestReservePostID(t *testing.T) {
	assertTableClear(t, "main")
	assertInsert(t, "main", map[string]interface{}{
		"id":      "info",
		"postCtr": 0,
	})

	for i := int64(1); i <= 2; i++ {
		id, err := ReservePostID()
		if err != nil {
			t.Fatal(err)
		}
		if id != i {
			logUnexpected(t, i, id)
		}
	}
}

func TestIncrementBoardCounter(t *testing.T) {
	assertTableClear(t, "main")
	assertInsert(t, "main", Document{"boardCtrs"})

	// Check both a fresh board counter and incrementing an existing one
	for i := int64(1); i <= 2; i++ {
		if err := IncrementBoardCounter("a"); err != nil {
			t.Fatal(err)
		}

		ctr, err := BoardCounter("a")
		if err != nil {
			t.Fatal(err)
		}
		if ctr != i {
			logUnexpected(t, i, ctr)
		}
	}
}
