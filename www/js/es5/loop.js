"use strict";System.register([],function(n){function e(){u.state.page.get("catalog")?!function(){var n="hide"===s.get("thumbs")||u.oneeSama.workMode?"none":"";document.queryAll(".expanded").forEach(function(e){return e.style.display=n})}():c(function(){return t(function(n,e){return n&&e.dispatch("renderImage",n)})})}function t(n){g.each(function(e){return n(e.get("image"),e)})}function r(){c(function(){return t(function(n,e){return n&&n.spoiler&&e.dispatch("renderImage",n)})})}function o(){c(function(){return t(function(n,e){return n&&".gif"===n.ext&&e.dispatch("renderImage",n)})})}function i(n,e){c(function(){var n=e?"anonymise":"renderName";g.each(function(e){var t=e.attributes,r=t.name,o=t.trip;(r||o)&&e.dispatch(n)})})}var u,a,c,s,f,g;return{setters:[],execute:function(){u=require("./main"),a=u.util,c=u.follow,s=u.options,f=u.oneeSama,g=u.state.posts,s.on({"change:thumbs":e,"change:spoilers":r,"change:autogif":o,"change:anonymise":i,workModeTOG:e}),u.reply("loop:anonymise",function(){return s.get("anonymise")&&i(null,!0)})}}});
//# sourceMappingURL=maps/loop.js.map
