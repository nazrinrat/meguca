"use strict";System.register([],function(e){return{setters:[],execute:function(){!function(){function e(){if(r)return void(t.style.opacity=1);t.style.opacity=+t.style.opacity+(n?-.02:.02);var i=+t.style.opacity;(n&&0>=i||!n&&i>=1)&&(n=!n),requestAnimationFrame(e)}if(!localStorage.optionsSeen){var t=document.query("#options");t.style.opacity=1;var n=!0,r=void 0;t.addEventListener("click",function(){r=!0,localStorage.optionsSeen=1}),e()}}(),e("default",ModalView.extend({id:"options-panel",events:{"click .option_tab_sel>li>a":"switchTab",change:"applyChange","click #export":"export","click #import":"import","click #hidden":"clearHidden"},render:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){this.el.innerHTML=render(),this.assignValues(),this.hidden=this.el.query("#hidden"),events.reply("hide:render",this.renderHidden,this)}),assignValues:function(){for(var e in optionModels){var t=optionModels[e],n=this.el.query("#"+e),r=t.type,i=t.get();"checkbox"===r?n.checked=i:"number"===r||r instanceof Array?n.value=i:"shortcut"===r&&(n.value=String.fromCharCode(i).toUpperCase())}},switchTab:function(e){e.preventDefault();var t=e.target;each(this.el.children,function(e){return e.query(".tab_sel").classList.remove("tab_sel")}),t.classList.add("tab_sel"),find(this.el.lastChild.children,function(e){return e.classList.contains(t.getAttribute("data-content"))}).classList.add("tab_sel")},applyChange:function(e){var t=e.target,n=t.getAttribute("id"),r=optionModels[n],i=void 0;switch(r.type){case"checkbox":i=t.checked;break;case"number":i=parseInt(t.value);break;case"image":return events.request("background:store",e.target);case"shortcut":i=t.value.toUpperCase().charCodeAt(0);break;default:i=t.value}r.validate(i)?options.set(n,i):t.value=""},"export":function(){var e=document.getElementById("export");e.setAttribute("href",window.URL.createObjectURL(new Blob([JSON.stringify(localStorage)],{type:"octet/stream"}))),e.setAttribute("download","meguca-config.json")},"import":function(e){e.preventDefault();var t=document.query("#importSettings");t.click(),util.once(t,"change",function(){var e=new FileReader;e.readAsText(input.files[0]),e.onload=function(e){var t=void 0;try{t=JSON.parse(e.target.result)}catch(n){return void alert("Import failed. File corrupt")}localStorage.clear();for(var r in t)localStorage[r]=t[r];alert("Import successfull. The page will now reload."),location.reload()}})},renderHidden:function(e){var t=this.hidden;t.textContent=t.textContent.replace(/\d+$/,e)},clearHidden:function(){main.request("hide:clear"),this.renderHidden(0)}}))}}});
//# sourceMappingURL=../maps/options/view.js.map
