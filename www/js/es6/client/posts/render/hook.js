"use strict";System.register([],function(_export,_context){return {setters:[],execute:function(){const hooks={};_export("hooks",hooks);function hook(name,func){const hook=hooks[name];if(!hook){hooks[name]=[func];}else {hook.push(func);}}_export("hook",hook);function trigger(name,param){const hook=hooks[name];if(!hook){return;}for(let func of hook){func(param);}}_export("trigger",trigger);}};});
//# sourceMappingURL=../../../maps/client/posts/render/hook.js.map