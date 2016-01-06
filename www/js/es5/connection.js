"use strict";System.register([],function(e){function n(e){if("synced"==y.state||"syncing"==y.state){if(v.readyState!=m.OPEN)return void(console&&console.warn("Attempting to send while socket closed"));e=JSON.stringify(e),f.DEBUG&&console.log("<",e),v.send(e)}}function o(e){f.DEBUG&&console.log(">",e.data);var n=JSON.parse(e.data)[0],o=n.shift(),t=n.shift(),c=u.is_pubsub(t);if(!c||"locked"!==y.state){var i=d.dispatcher[t];i&&(c&&o in g.syncs&&g.syncs[o]++,d.follow(function(){return i(n,o)}))}}function t(e){h.textContent=e}function c(){return v&&(v.onclose=null,v.onmessage=null),"file:"==window.location.protocol?void console.log("Page downloaded locally; refusing to sync."):(v=i(),v.onopen=y.feeder("open"),v.onclose=y.feeder("close"),v.onmessage=o,void(f.DEBUG&&(window.socket=v)))}function i(){var e=["xdr-streaming","xhr-streaming","iframe-eventsource","iframe-htmlfile","xdr-polling","xhr-polling","iframe-xhr-polling","jsonp-polling"];return f.USE_WEBSOCKETS&&e.unshift("websocket"),new m(f.SOCKET_URL||f.SOCKET_PATH,null,{transports:e})}function s(){w&&(clearTimeout(w),w=0),E=0}function r(){switch(y.state){case"desynced":return;case"synced":case"syncing":case"conn":var e=v.readyState;if(e!=m.OPEN&&e!=m.CONNECTING)return void y.feed("close");if(navigator.onLine===!1)return void y.feed("close")}y.feed("retry")}var l,d,a,u,f,y,g,m,p,v,E,w,h;return{setters:[],execute:function(){e("dispatcher",l={}),e("dispatcher",l),d=require("./main"),a=d._,u=d.common,f=d.config,y=d.connSM,g=d.state,m=d.SockJS,p=d.lang.sync,v=void 0,E=void 0,w=void 0,d.reply("send",n),h=document.getElementById("sync"),y.act("load + start -> conn",function(){t(p.connecting),E=0,c()}),y.act("conn, reconn + open -> syncing",function(){t(p.syncing);var e=u.randomID(32),o=g.page;o.set("connID",e),n([u.SYNCHRONIZE,e,o.get("board"),g.syncs,o.get("live"),document.cookie])}),y.act("syncing + sync -> synced",function(){t(p.synced),w=setTimeout(function(){w=0,s()},1e4)}),y.act("synced, syncing + lock -> locked"),y.act("locked + unlock -> synced"),d.reply("connection:lock",function(){return n([u.DESYNC])},y.feed("lock")),d.reply("connection:unlock",function(e){return n(e)},y.feed("unlock")),y.act("* + close -> dropped",function(e){v&&(v.onclose=null,v.onmessage=null),f.DEBUG&&console.error("E:",e),w&&(clearTimeout(w),w=0),t(p.dropped);var n=500*Math.pow(1.5,Math.min(Math.floor(++E/2),12));setTimeout(y.feeder("retry"),n)}),y.act("dropped + retry -> reconn",function(){c(),setTimeout(function(){"reconn"==y.state&&t(p.reconnecting)},100)}),y.act("* + invalid, desynced + close -> desynced",function(e){e=e&&e[0]?"Out of sync: "+e[0]:"Out of sync",t(e),w&&(clearTimeout(w),w=0),v.onclose=null,v.onmessage=null,v.close(),v=null,f.DEBUG&&(window.socket=null)}),y.feed("start"),document.addEventListener("visibilitychange",function(e){e.target.hidden||setTimeout(r,20)}),window.addEventListener("online",function(){return s()},y.feed("retry")),window.addEventListener("offline",y.feeder("close"))}}});
//# sourceMappingURL=maps/connection.js.map
