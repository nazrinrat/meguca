"use strict";System.register([],function(e){function t(e){var n=arguments.length<=1||void 0===arguments[1]?c.get("relativeTime"):arguments[1];m.posts.each(function(e){return e.dispatch("renderTime")}),f&&clearTimeout(f),n&&(f=setTimeout(t,6e4))}function n(e){if(d){e.classList.add("timerTicking");var t=e.getAttribute("start"),n=e.getAttribute("end"),r=s.pad(e.getAttribute("hour")),o=s.pad(e.getAttribute("min")),a=s.pad(e.getAttribute("sec"));!function u(){if(document.body.contains(e)){var c=s.serverTime();if(c>n)return e.textContent=i.lang.finished;if(t>c){var m=Math.round((t-c)/1e3);return 10===m&&i.request("time:syncwatch"),e.textContent="Countdown: "+m,setTimeout(u,1e3)}var d=c-t,f=Math.floor(d/1e3/60/60);d-=1e3*f*60*60;var l=Math.floor(d/1e3/60);d-=1e3*l*60;var v=Math.floor(d/1e3);return e.textContent=s.pad(f)+":"+s.pad(l)+":"+s.pad(v)+" / "+r+":"+o+":"+a,setTimeout(u,1e3)}}()}}function r(){setInterval(function(){for(var e=document.getElementsByTagName("syncwatch"),t=0;t<e.length;t++)e[t].classList.contains("timerTicking")||n(e[t])},1e3)}var i,o,a,s,u,c,m,d,f;return{setters:[],execute:function(){i=require("./main"),o=i.$,a=i.Backbone,s=i.common,u=i.oneeSama,c=i.options,m=i.state,d=0,i.dispatcher[s.GET_TIME]=function(e){e[0]&&(d=e[0]-Date.now())},i.reply("time:offset",function(){return d}),f=void 0,i.reply("time:render",t),c.on("change:relativeTime",t),i.defer(t).defer(r).defer(function(){function e(){n=!0,this.removeAttribute("title"),this.style.cursor="default",this.removeEventListener("click",e),t()}function t(){return d?(r.innerHTML=u.readableUTCTime(new Date(s.serverTime()),n),void setTimeout(t,n?1e3:6e4)):setTimeout(t,1e3)}var n=void 0,r=document.getElementById("UTCClock").firstChild;r.addEventListener("click",e),t()})}}});
//# sourceMappingURL=maps/time.js.map
