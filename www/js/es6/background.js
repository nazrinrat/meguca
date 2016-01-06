'use strict';System.register([],function(_export){return {setters:[],execute:function(){const main=require('./main');const Backbone=main.Backbone;const common=main.common;const etc=main.etc;const oneeSama=main.oneeSama;const options=main.options;const stackBlur=main.stackBlur;const state=main.state;const BackgroundView=Backbone.View.extend({tagName:'style',colourMap:{glass:{normal:'rgba(40, 42, 46, 0.5)',editing:'rgba(145, 145, 145, 0.5)'},ocean:{normal:'rgba(28, 29, 34, 0.781)',editing:'rgba(44, 57, 71, 0.88)'}},initialize(){document.head.append(this.el);document.body.append(etc.parseDOM('<div id="user_bg"></div>'));this.render();main.reply('background:store',this.store,this);this.listenTo(options,{'change:userBG':this.render,'change:illyaBGToggle':this.render,'change:illyaMuteToggle':this.render,'change:theme':this.render,'workModeTOG':this.render});},store(target){main.request('loading:show');let reader=new FileReader();reader.readAsDataURL(target.files[0]);reader.onload=event => {let img=new Image();img.onload=() => {let canvas=document.createElement("canvas");canvas.width=img.width;canvas.height=img.height;canvas.getContext('2d').drawImage(img,0,0,img.width,img.height);localStorage.background=canvas.toDataURL('image/jpeg',0.95);stackBlur.canvas(canvas,0,0,img.width,img.height,10);localStorage.blurred=canvas.toDataURL('image/jpeg',0.95);main.request('loading:hide');if(options.get('userBG'))this.render();};img.src=event.target.result;};},render(){const el=this.el;el.innerHTML='';if(options.get('illyaBGToggle')&&state.hotConfig.get('ILLYA_DANCE'))this.renderIllya();else if(options.get('userBG')&&!main.oneeSama.workMode)this.renderBackground();},renderBackground(){const bg=localStorage.background;if(!bg)return;let html=common.parseHTML`#user_bg {
				background: url(${ bg }) no-repeat fixed center;
				background-size: cover;
			}`;const theme=main.oneeSama.workMode?state.hotConfig.get('DEFAULT_CSS'):options.get('theme');if(theme==='glass'||theme==='ocean'){var _localStorage=localStorage;const blurred=_localStorage.blurred;if(blurred)html+=' '+this.renderGlass(theme,blurred);}this.el.innerHTML=html;},renderGlass(theme,blurred){var _colourMap$theme=this.colourMap[theme];const normal=_colourMap$theme.normal;const editing=_colourMap$theme.editing;return common.parseHTML`.glass {
				background:
					linear-gradient(${ normal }, ${ normal }),
					url(${ blurred }) center fixed no-repeat;
				background-size: cover;
			}
			.glass.editing, .editing .background {
				background:
					linear-gradient(${ editing }, ${ editing }),
					url(${ blurred }) center fixed no-repeat;
				background-size: cover;
			}
			.background {
				padding: 10px;
				margin: 2px;
			}`;},renderIllya(){const urlBase=main.config.MEDIA_URL+'illya.';this.el.innerHTML=common.parseHTML`<video autoplay loop ${ options.get('illyaMuteToggle')&&'muted' }>
				<source src="${ urlBase+'webm' }" type="video/webm">
				<source src="${ urlBase+'mp4' }" type="video/mp4">
			</video>`;}});main.defer(() => module.exports=new BackgroundView());}};});
//# sourceMappingURL=maps/background.js.map
