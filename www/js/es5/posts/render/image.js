"use strict";System.register(["lang","../../state","underscore","../../options","../../util"],function(e,n){function t(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function r(e){return 1024>e?e+" B":1048576>e?Math.round(e/1024)+" KB":(e=Math.round(e/104857.6).toString(),e.slice(0,-1)+"."+e.slice(-1)+" MB")}function i(e){return"hide"!==m.get("thumbs")?"":f(y,l[e?"hide":"show"])}function a(e){var n="";if([".pdf",".mp3"].indexOf(e.ext)>-1)return m.get("google")?S.google(e):"";for(var t in S)n+=S[t](e);return n}function s(e,n){return A[type]+e[n&&e.mid?"mid":"thumb"]}function o(e){var n="",t=r,r=t.imgnm,i=r.match(/^(.*)\.\w{3,4}$/);i&&(n=i[1]);var a=c(r),s=n.length>=38;s&&(r=c(n.slice(0,30))+"(&hellip;)"+c(e.ext));var o={href:g.SECONDARY_MEDIA_URL+"src/"+e.src,rel:"nofollow",download:a};return s&&(o.title=a),f(w,parseAttributes(o),r)}function u(e){var n=e.large,t=e.spoiler,r=A.spoil;return(n||"small"!==m.get("thumbs"))&&(r+="s"),html+=t+".png",{thumb:r,dims:g.images.thumb[n?"midDims":"thumbDims"]}}var l,g,c,m,f,h,p,d,b,y,v,w,x,A,S;return{setters:[function(e){l=e["default"]},function(e){g=e.config},function(e){c=e.escape},function(e){m=e["default"]},function(e){f=e.parseHTML,h=e.commaList}],execute:function(){function n(e,n){var t="hide"!==m.get("thumbs")||n;return f(d,l(e,n),g.images.hat&&t?'<span class="hat"></span>':"",t?c(e):"")}function l(e,n){var t=h([e.audio?"♫":"",e.length,r(e.size),e.dims[0]+"x"+e.dims[1],e.apng?"APNG":""]);return f(b,i(n),a(e),t,o(e))}function c(e,n){var t=A.src+e.src,r=void 0,i=p(e.dims,4),a=(i[0],i[1],i[2]),o=i[3];if(e.spoiler&&m.get("spoilers")){var l=u(e);r=l.thumb,a=l.dims[0],o=l.dims[1]}else r=".gif"===e.ext&&m.get("autogif")?t:s(e,"small"!==m.get("thumbs"));var g={target:"_blank",rel:"nofollow",href:n||t},c={src:r,width:a,height:o};return n&&(g["class"]="history",c["class"]="expanded","hide"==this.thumbStyle&&(c.style="display: none")),f(x,parseAttributes(g),parseAttributes(c))}p=function(){function e(e,n){var t=[],r=!0,i=!1,a=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(t.push(s.value),!n||t.length!==n);r=!0);}catch(u){i=!0,a=u}finally{try{!r&&o["return"]&&o["return"]()}finally{if(i)throw a}}return t}return function(n,t){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return e(n,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),d=t(["<figure>\n			","\n			","\n			","\n		</figure>"],["<figure>\n			","\n			","\n			","\n		</figure>"]),b=t(["<figcaption>\n			","\n			","\n			<span>\n				(",")\n			</span>\n			","\n		</figcaption>"],["<figcaption>\n			","\n			","\n			<span>\n				(",")\n			</span>\n			","\n		</figcaption>"]),y=t(['<a class="imageToggle">\n			[',"]\n		</a>"],['<a class="imageToggle">\n			[',"]\n		</a>"]),v=t(["<a ",">\n					","\n				</a>"],["<a ",">\n					","\n				</a>"]),w=t(["<a ",">\n			","\n		</a>"],["<a ",">\n			","\n		</a>"]),x=t(["<a ",">\n			<img ",">\n		</a>"],["<a ",">\n			<img ",">\n		</a>"]),e("renderImage",n),e("renderFigcaption",l),A={src:"/img/src/",thumb:"/img/thumb/",mid:"/img/mid/",spoil:"/ass/spoil/spoiler"},S=function(){var e=[{engine:"google",url:"https://www.google.com/searchbyimage?image_url=",type:"thumb",symbol:"G"},{engine:"iqdb",url:"http://iqdb.org/?url=",type:"thumb",symbol:"Iq"},{engine:"saucenao",url:"http://saucenao.com/search.php?db=999&url=",type:"thumb",symbol:"Sn"},{engine:"desustorage",type:"MD5",url:"https://desustorage.org/_/search/image/",symbol:"Ds"},{engine:"exhentai",type:"SHA1",url:"http://exhentai.org/?fs_similar=1&fs_exp=1&f_shash=",symbol:"Ex"}],n={},t=!0,r=!1,i=void 0;try{for(var a,o=function(){var e=a.value,t=e.engine,r=e.url,i=e.type,o=e.symbol,u={target:"_blank",rel:"nofollow","class":"imageSearch "+t};n[t]=function(e){return m.get(t)?(u.href=r+("thumb"===i?s(e):e[i]),f(v,parseAttributes(u),o)):""}},u=e[Symbol.iterator]();!(t=(a=u.next()).done);t=!0)o()}catch(l){r=!0,i=l}finally{try{!t&&u["return"]&&u["return"]()}finally{if(r)throw i}}return n}(),e("renderThumbnail",c)}}});
//# sourceMappingURL=../../maps/posts/render/image.js.map
