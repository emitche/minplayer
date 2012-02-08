var minplayer=minplayer||{};function checkPlayType(a,b){if("function"===typeof a.canPlayType){var c=a.canPlayType(b);return"no"!==c&&""!==c}return!1}
minplayer.compatibility=function(){var a=null,a=document.createElement("video");this.videoOGG=checkPlayType(a,"video/ogg");this.videoH264=checkPlayType(a,"video/mp4");this.videoWEBM=checkPlayType(a,"video/x-webm");a=document.createElement("audio");this.audioOGG=checkPlayType(a,"audio/ogg");this.audioMP3=checkPlayType(a,"audio/mpeg");this.audioMP4=checkPlayType(a,"audio/mp4")};if(!minplayer.playTypes)minplayer.playTypes=new minplayer.compatibility;minplayer=minplayer||{};
minplayer.async=function(){this.value=null;this.queue=[]};minplayer.async.prototype.get=function(a){null!==this.value?a(this.value):this.queue.push(a)};minplayer.async.prototype.set=function(a){this.value=a;var b=this.queue.length;if(b){for(;b--;)this.queue[b](a);this.queue=[]}};minplayer=minplayer||{};minplayer.flags=function(){this.flag=0;this.ids={};this.numFlags=0};
minplayer.flags.prototype.setFlag=function(a,b){if(!this.ids.hasOwnProperty(a))this.ids[a]=this.numFlags,this.numFlags++;this.flag=b?this.flag|1<<this.ids[a]:this.flag&~(1<<this.ids[a])};minplayer=minplayer||{};minplayer.plugin=function(a){this.player=null;a&&this.construct()};minplayer.plugin.prototype.construct=function(){};minplayer.plugin.prototype.setPlayer=function(a){this.player=a};minplayer=minplayer||{};
minplayer.display=function(a,b){if(a)this.display=jQuery(a),this.options=b,this.options.elements=this.options.elements||{},jQuery.extend(this.options.elements,this.getElements()),this.elements=this.options.elements;minplayer.plugin.call(this,a,b)};minplayer.display.prototype=new minplayer.plugin;minplayer.display.prototype.constructor=minplayer.display;minplayer.display.prototype.trigger=function(a,b){return this.display.trigger(a,b)};
minplayer.display.prototype.bind=function(a,b,c){return this.display.unbind(a,c).bind(a,b,c)};minplayer.display.prototype.getScaledRect=function(a,b){var c={};c.x=b.x?b.x:0;c.y=b.y?b.y:0;c.width=b.width?b.width:0;c.height=b.height?b.height:0;if(a)b.width/b.height>a?(c.height=b.height,c.width=Math.floor(b.height*a)):(c.height=Math.floor(b.width/a),c.width=b.width),c.x=Math.floor((b.width-c.width)/2),c.y=Math.floor((b.height-c.height)/2);return c};minplayer.display.prototype.getElements=function(){return{}};
minplayer.display.prototype.isValid=function(){return 0<this.display.length};minplayer=minplayer||{};minplayer.image=function(a,b){this.loaded=!1;this.loader=null;this.ratio=0;this.image=null;minplayer.display.call(this,a,b)};minplayer.image.prototype=new minplayer.display;minplayer.image.prototype.constructor=minplayer.image;
minplayer.image.prototype.construct=function(){minplayer.display.prototype.construct.call(this);this.display.css("overflow","hidden");var a=this;this.loader=new Image;this.loader.onload=function(){a.loaded=!0;a.ratio=a.loader.width/a.loader.height;a.resize();a.trigger("loaded")}};minplayer.image.prototype.load=function(a){this.clear(function(){this.image=jQuery(document.createElement("img")).attr({src:""}).hide();this.display.append(this.image);this.loader.src=a})};
minplayer.image.prototype.clear=function(a){this.loaded=!1;if(this.image){var b=this;this.image.fadeOut(function(){b.image.attr("src","");b.loader.src="";$(this).remove();a.call(b)})}else a.call(this)};minplayer.image.prototype.resize=function(a,b){a=a||this.display.width();b=b||this.display.height();if(a&&b&&this.loaded){var c=this.getScaledRect(this.ratio,{width:a,height:b});this.image&&this.image.attr("src",this.loader.src).css({marginLeft:c.x,marginTop:c.y,width:c.width,height:c.height});this.image.fadeIn()}};
minplayer=minplayer||{};if(!jQuery.fn.minplayer)jQuery.fn.minplayer=function(a){return jQuery(this).each(function(){minplayer.player[jQuery(this).selector]||new minplayer.player(jQuery(this),a)})};
minplayer.player=function(a,b){b=jQuery.extend({id:"player",controller:"default",template:"default",swfplayer:"",wmode:"transparent",preload:!0,autoplay:!1,loop:!1,width:"100%",height:"350px",debug:!1,volume:80,files:[],file:"",preview:"",attributes:{}},b);minplayer.player[b.id]=this;minplayer.display.call(this,a,b)};minplayer.player.prototype=new minplayer.display;minplayer.player.prototype.constructor=minplayer.player;
minplayer.player.prototype.construct=function(){minplayer.display.prototype.construct.call(this);this.media=null;this.allPlugins={};this.currentPlayer="html5";this.addKeyEvents();this.loadPlugins();this.load(this.getFiles())};minplayer.player.prototype.error=function(a){this.elements.error&&(this.elements.error.text(a),a?this.elements.error.show():this.elements.error.hide(),this.trigger("error",a))};
minplayer.player.prototype.addKeyEvents=function(){jQuery(window).bind("keyup",{obj:this},function(a){a.data.obj.display.hasClass("fullscreen")&&(113===a.keyCode||27===a.keyCode)&&a.data.obj.display.removeClass("fullscreen")})};minplayer.player.prototype.loadPlugins=function(){for(var a=null,b={},a=null,c=minplayer.plugins.length;c--;)b=minplayer.plugins[c],a=b.element?jQuery(b.element,this.display):this.display,a=new b.object(a,this.options),this.addPlugin(b.id,a)};
minplayer.player.prototype.getFiles=function(){var a=[],b=null;if(this.elements.media){if(!this.options.preview)this.options.preview=this.elements.media.attr("poster");(b=this.elements.media.attr("src"))&&a.push({path:b});jQuery("source",this.elements.media).each(function(){a.push({path:jQuery(this).attr("src"),mimetype:jQuery(this).attr("type"),codecs:jQuery(this).attr("codecs")})})}return a};
minplayer.player.prototype.getMediaFile=function(a){if(!a)return null;if("string"===typeof a)return new minplayer.file({path:a});if(a.path)return new minplayer.file(a);for(var b=a.length,c=null,d=null;b--;)d=a[b],d="string"===typeof d?new minplayer.file({path:d}):new minplayer.file(d),0<d.priority&&(c=d);return c};
minplayer.player.prototype.load=function(a){var b="",c="";this.options.files=a||this.options.files;this.options.file=this.getMediaFile(this.options.files);if(this.options.file)if(this.options.file.player)if(this.error(),c=this.options.file.player.toString(),!this.media||c!==this.currentPlayer)if(this.currentPlayer=c,a=this.elements.display){var d=this,c=minplayer.players[this.options.file.player];this.media=new c(a,this.options,function(a){for(b in d.allPlugins)d.allPlugins.hasOwnProperty(b)&&d.allPlugins[b].setPlayer(a);
a.bind("error",function(a,b){d.error(b)});a.load()})}else this.error("No media display found.");else this.media&&this.media.load(this.options.file);else this.error("Cannot play media: "+this.options.file.mimetype);else this.error("No media found.")};minplayer.player.prototype.addPlugin=function(a,b){b.isValid()&&(this.allPlugins[a]=b)};minplayer.player.prototype.getPlugin=function(a){return this.allPlugins[a]};minplayer.player.prototype.play=function(){this.media&&this.media.play()};
minplayer.player.prototype.pause=function(){this.media&&this.media.pause()};minplayer.player.prototype.stop=function(){this.media&&this.media.stop()};minplayer.player.prototype.seek=function(a){this.media&&this.media.seek(a)};minplayer.player.prototype.setVolume=function(a){this.media&&this.media.setVolume(a)};minplayer.player.prototype.getVolume=function(a){return this.media?this.media.getVolume(a):0};
minplayer.player.prototype.getDuration=function(a){return this.media?this.media.getDuration(a):0};minplayer=minplayer||{};
minplayer.file=function(a){this.duration=a.duration||0;this.bytesTotal=a.bytesTotal||0;this.quality=a.quality||0;this.stream=a.stream||"";this.path=a.path||"";this.codecs=a.codecs||"";this.extension=a.extension||this.getFileExtension();this.mimetype=a.mimetype||a.filemime||this.getMimeType();this.type=a.type||this.getType();if(!this.type)this.mimetype=this.getMimeType(),this.type=this.getType();this.player=a.player||this.getBestPlayer();this.priority=a.priority||this.getPriority();this.id=a.id||this.getId()};
minplayer.file.prototype.getBestPlayer=function(){var a=null,b=0,c=this;jQuery.each(minplayer.players,function(d,e){var f=e.getPriority();e.canPlay(c)&&f>b&&(a=d,b=f)});return a};minplayer.file.prototype.getPriority=function(){var a=1;this.player&&(a=minplayer.players[this.player].getPriority());switch(this.mimetype){case "video/x-webm":return 10*a;case "video/mp4":case "audio/mp4":case "audio/mpeg":return 9*a;case "video/ogg":case "audio/ogg":case "video/quicktime":return 8*a;default:return 5*a}};
minplayer.file.prototype.getFileExtension=function(){return this.path.substring(this.path.lastIndexOf(".")+1).toLowerCase()};
minplayer.file.prototype.getMimeType=function(){switch(this.extension){case "mp4":case "m4v":case "flv":case "f4v":return"video/mp4";case "webm":return"video/x-webm";case "ogg":case "ogv":return"video/ogg";case "3g2":return"video/3gpp2";case "3gpp":case "3gp":return"video/3gpp";case "mov":return"video/quicktime";case "swf":return"application/x-shockwave-flash";case "oga":return"audio/ogg";case "mp3":return"audio/mpeg";case "m4a":case "f4a":return"audio/mp4";case "aac":return"audio/aac";case "wav":return"audio/vnd.wave";
case "wma":return"audio/x-ms-wma";default:return"unknown"}};minplayer.file.prototype.getType=function(){switch(this.mimetype){case "video/mp4":case "video/x-webm":case "video/ogg":case "video/3gpp2":case "video/3gpp":case "video/quicktime":return"video";case "audio/mp3":case "audio/mp4":case "audio/ogg":return"audio";default:return""}};minplayer.file.prototype.getId=function(){var a=minplayer.players[this.player];return a&&a.getMediaId?a.getMediaId(this):""};minplayer=minplayer||{};
minplayer.playLoader=minplayer.playLoader||{};minplayer.playLoader.base=function(a,b){this.busy=new minplayer.flags;this.bigPlay=new minplayer.flags;this.preview=null;minplayer.display.call(this,a,b)};minplayer.playLoader.base.prototype=new minplayer.display;minplayer.playLoader.base.prototype.constructor=minplayer.playLoader.base;
minplayer.playLoader.base.prototype.construct=function(){minplayer.display.prototype.construct.call(this);if(this.options.preview&&this.elements.preview)this.elements.preview.addClass("has-preview"),this.preview=new minplayer.image(this.elements.preview,this.options),this.preview.load(this.options.preview)};
minplayer.playLoader.base.prototype.checkVisibility=function(){this.busy.flag?this.elements.busy.show():this.elements.busy.hide();this.bigPlay.flag?this.elements.bigPlay.show():this.elements.bigPlay.hide();(this.bigPlay.flag||this.busy.flag)&&this.display.show();!this.bigPlay.flag&&!this.busy.flag&&this.display.hide()};
minplayer.playLoader.base.prototype.setPlayer=function(a){minplayer.display.prototype.setPlayer.call(this,a);a.hasPlayLoader()?(this.elements.busy&&this.elements.busy.hide(),this.elements.bigPlay&&(this.elements.bigPlay.unbind(),this.elements.bigPlay.hide()),this.display.hide()):(this.elements.bigPlay&&(this.elements.bigPlay.unbind(),this.elements.bigPlay.bind("click",{player:a},function(a){a.preventDefault();jQuery(this).hide();a.data.player.play()})),a.bind("loadstart",{obj:this},function(a){a.data.obj.busy.setFlag("media",
!0);a.data.obj.bigPlay.setFlag("media",!0);a.data.obj.elements.preview.show();a.data.obj.checkVisibility()}),a.bind("waiting",{obj:this},function(a){a.data.obj.busy.setFlag("media",!0);a.data.obj.checkVisibility()}),a.bind("loadeddata",{obj:this},function(a){a.data.obj.busy.setFlag("media",!1);a.data.obj.checkVisibility()}),a.bind("playing",{obj:this},function(a){a.data.obj.busy.setFlag("media",!1);a.data.obj.bigPlay.setFlag("media",!1);a.data.obj.elements.preview.hide();a.data.obj.checkVisibility()}),
a.bind("pause",{obj:this},function(a){a.data.obj.bigPlay.setFlag("media",!0);a.data.obj.checkVisibility()}))};minplayer=minplayer||{};minplayer.players=minplayer.players||{};minplayer.players.base=function(a,b,c){this.readyCallback=c;this.reset();minplayer.display.call(this,a,b)};minplayer.players.base.prototype=new minplayer.display;minplayer.players.base.prototype.constructor=minplayer.players.base;minplayer.players.base.getPriority=function(){return 0};minplayer.players.base.getMediaId=function(){return""};
minplayer.players.base.canPlay=function(){return!1};minplayer.players.base.prototype.construct=function(){minplayer.display.prototype.construct.call(this);this.mediaFile=this.options.file;this.playerFound()||(this.display.unbind(),this.elements.media&&this.elements.media.remove(),this.display.html(this.create()));this.player=this.getPlayer();this.reset()};minplayer.players.base.prototype.clearIntervals=function(){this.playInterval&&clearInterval(this.playInterval);this.progressInterval&&clearInterval(this.progressInterval)};
minplayer.players.base.prototype.reset=function(){this.ready=!1;this.duration=new minplayer.async;this.currentTime=new minplayer.async;this.bytesLoaded=new minplayer.async;this.bytesTotal=new minplayer.async;this.bytesStart=new minplayer.async;this.volume=new minplayer.async;this.clearIntervals();this.progressInterval=this.playInterval=0};
minplayer.players.base.prototype.onReady=function(){var a=this;this.ready=!0;this.setVolume(this.options.volume/100);this.progressInterval=setInterval(function(){a.getBytesLoaded(function(b){a.getBytesTotal(function(c){if(b||c){var d=0;a.getBytesStart(function(a){d=a});a.trigger("progress",{loaded:b,total:c,start:d})}})})},1E3);this.readyCallback&&this.readyCallback(this);this.trigger("loadstart")};
minplayer.players.base.prototype.onPlaying=function(){var a=this;this.trigger("playing");this.playInterval=setInterval(function(){a.getCurrentTime(function(b){a.getDuration(function(c){b=parseFloat(b);c=parseFloat(c);(b||c)&&a.trigger("timeupdate",{currentTime:b,duration:c})})})},1E3)};minplayer.players.base.prototype.onPaused=function(){this.trigger("pause");clearInterval(this.playInterval)};minplayer.players.base.prototype.onComplete=function(){this.clearIntervals();this.trigger("ended")};
minplayer.players.base.prototype.onLoaded=function(){this.trigger("loadeddata")};minplayer.players.base.prototype.onWaiting=function(){this.trigger("waiting")};minplayer.players.base.prototype.isReady=function(){return this.player&&this.ready};minplayer.players.base.prototype.hasPlayLoader=function(){return!1};minplayer.players.base.prototype.playerFound=function(){return!1};minplayer.players.base.prototype.create=function(){this.reset();return null};minplayer.players.base.prototype.getPlayer=function(){return this.player};
minplayer.players.base.prototype.load=function(a){if(a)this.reset(),this.mediaFile=a};minplayer.players.base.prototype.play=function(){};minplayer.players.base.prototype.pause=function(){};minplayer.players.base.prototype.stop=function(){this.clearIntervals()};minplayer.players.base.prototype.seek=function(){};minplayer.players.base.prototype.setVolume=function(a){this.trigger("volumeupdate",a)};minplayer.players.base.prototype.getVolume=function(a){return this.volume.get(a)};
minplayer.players.base.prototype.getCurrentTime=function(a){return this.currentTime.get(a)};minplayer.players.base.prototype.getDuration=function(a){return this.duration.get(a)};minplayer.players.base.prototype.getBytesStart=function(a){return this.bytesStart.get(a)};minplayer.players.base.prototype.getBytesLoaded=function(a){return this.bytesLoaded.get(a)};minplayer.players.base.prototype.getBytesTotal=function(a){return this.bytesTotal.get(a)};minplayer=minplayer||{};
minplayer.players=minplayer.players||{};minplayer.players.html5=function(a,b,c){minplayer.players.base.call(this,a,b,c)};minplayer.players.html5.prototype=new minplayer.players.base;minplayer.players.html5.prototype.constructor=minplayer.players.html5;minplayer.players.html5.getPriority=function(){return 10};
minplayer.players.html5.canPlay=function(a){switch(a.mimetype){case "video/ogg":return minplayer.playTypes.videoOGG;case "video/mp4":return minplayer.playTypes.videoH264;case "video/x-webm":return minplayer.playTypes.videoWEBM;case "audio/ogg":return minplayer.playTypes.audioOGG;case "audio/mpeg":return minplayer.playTypes.audioMP3;case "audio/mp4":return minplayer.playTypes.audioMP4;default:return!1}};
minplayer.players.html5.prototype.construct=function(){minplayer.players.base.prototype.construct.call(this);var a=this;if(this.player)this.player.addEventListener("abort",function(){a.trigger("abort")},!1),this.player.addEventListener("loadstart",function(){a.onReady()},!1),this.player.addEventListener("loadeddata",function(){a.onLoaded()},!1),this.player.addEventListener("loadedmetadata",function(){a.onLoaded()},!1),this.player.addEventListener("canplaythrough",function(){a.onLoaded()},!1),this.player.addEventListener("ended",
function(){a.onComplete()},!1),this.player.addEventListener("pause",function(){a.onPaused()},!1),this.player.addEventListener("play",function(){a.onPlaying()},!1),this.player.addEventListener("playing",function(){a.onPlaying()},!1),this.player.addEventListener("error",function(){var b="";switch(this.error.code){case MEDIA_ERR_NETWORK:b="Network error - please try again later.";break;case MEDIA_ERR_DECODE:b="Video is broken..";break;case MEDIA_ERR_SRC_NOT_SUPPORTED:b="Sorry, your browser can't play this video."}a.trigger("error",
b)},!1),this.player.addEventListener("waiting",function(){a.onWaiting()},!1),this.player.addEventListener("durationchange",function(){a.duration.set(this.duration);a.trigger("durationchange",{duration:this.duration})},!1),this.player.addEventListener("progress",function(b){a.bytesTotal.set(b.total);a.bytesLoaded.set(b.loaded)},!1),this.autoBuffer()?this.player.autobuffer=!0:(this.player.autobuffer=!1,this.player.preload="none")};
minplayer.players.html5.prototype.autoBuffer=function(){var a="none"!==this.player.preload;return"function"===typeof this.player.hasAttribute?this.player.hasAttribute("preload")&&a:!1};minplayer.players.html5.prototype.playerFound=function(){return 0<this.display.find(this.mediaFile.type).length};
minplayer.players.html5.prototype.create=function(){minplayer.players.base.prototype.create.call(this);var a=document.createElement(this.mediaFile.type),b="";for(b in this.options.attributes)this.options.attributes.hasOwnProperty(b)&&a.setAttribute(b,this.options.attributes[b]);return a};minplayer.players.html5.prototype.getPlayer=function(){return this.options.elements.media.eq(0)[0]};
minplayer.players.html5.prototype.load=function(a){if(a&&this.isReady()&&this.options.elements.player.attr("src")!=a.path){var b='<source src="'+a.path+'" ',b=b+('type="'+a.mimetype+'"'),b=b+(a.codecs?' codecs="'+a.path+'">':">");this.options.elements.player.attr("src","").empty().html(b)}minplayer.players.base.prototype.load.call(this,a)};minplayer.players.html5.prototype.play=function(){minplayer.players.base.prototype.play.call(this);this.isReady()&&this.player.play()};
minplayer.players.html5.prototype.pause=function(){minplayer.players.base.prototype.pause.call(this);this.isReady()&&this.player.pause()};minplayer.players.html5.prototype.stop=function(){minplayer.players.base.prototype.stop.call(this);if(this.isReady())this.player.pause(),this.player.src=""};minplayer.players.html5.prototype.seek=function(a){minplayer.players.base.prototype.seek.call(this,a);if(this.isReady())this.player.currentTime=a};
minplayer.players.html5.prototype.setVolume=function(a){minplayer.players.base.prototype.setVolume.call(this,a);if(this.isReady())this.player.volume=a};minplayer.players.html5.prototype.getVolume=function(a){this.isReady()&&a(this.player.volume)};minplayer.players.html5.prototype.getDuration=function(a){this.isReady()&&a(this.player.duration)};minplayer.players.html5.prototype.getCurrentTime=function(a){this.isReady()&&a(this.player.currentTime)};
minplayer.players.html5.prototype.getBytesLoaded=function(a){if(this.isReady()){var b=0;if(this.bytesLoaded.value)b=this.bytesLoaded.value;else if(this.player.buffered&&0<this.player.buffered.length&&this.player.buffered.end&&this.player.duration)b=this.player.buffered.end(0);else if(void 0!=this.player.bytesTotal&&0<this.player.bytesTotal&&void 0!=this.player.bufferedBytes)b=this.player.bufferedBytes;a(b)}};
minplayer.players.html5.prototype.getBytesTotal=function(a){if(this.isReady()){var b=0;if(this.bytesTotal.value)b=this.bytesTotal.value;else if(this.player.buffered&&0<this.player.buffered.length&&this.player.buffered.end&&this.player.duration)b=this.player.duration;else if(void 0!=this.player.bytesTotal&&0<this.player.bytesTotal&&void 0!=this.player.bufferedBytes)b=this.player.bytesTotal;a(b)}};minplayer=minplayer||{};minplayer.players=minplayer.players||{};
minplayer.players.flash=function(a,b,c){minplayer.players.base.call(this,a,b,c)};minplayer.players.flash.prototype=new minplayer.players.base;minplayer.players.flash.prototype.constructor=minplayer.players.flash;minplayer.players.flash.getPriority=function(){return 0};minplayer.players.flash.canPlay=function(){return!1};
minplayer.players.flash.getFlash=function(a){var b=window.location.protocol,c=null,d=null,e="",f={},d=null;":"===b.charAt(b.length-1)&&b.substring(0,b.length-1);c=document.createElement("object");c.setAttribute("width",a.width);c.setAttribute("height",a.height);c.setAttribute("id",a.id);c.setAttribute("name",a.id);c.setAttribute("playerType",a.playerType);f={allowScriptAccess:"always",allowfullscreen:"true",movie:a.swf,wmode:a.wmode,quality:"high",FlashVars:jQuery.param(a.flashvars)};for(e in f)f.hasOwnProperty(e)&&
(d=document.createElement("param"),d.setAttribute("name",e),d.setAttribute("value",f[e]),c.appendChild(d));d=document.createElement("embed");for(e in f)f.hasOwnProperty(e)&&("movie"===e?d.setAttribute("src",f[e]):d.setAttribute(e,f[e]));d.setAttribute("width",a.width);d.setAttribute("height",a.height);d.setAttribute("id",a.id);d.setAttribute("name",a.id);d.setAttribute("swLiveConnect","true");d.setAttribute("type","application/x-shockwave-flash");c.appendChild(d);return c};
minplayer.players.flash.prototype.playerFound=function(){return 0<this.display.find('object[playerType="flash"]').length};minplayer.players.flash.prototype.getPlayer=function(){return jQuery(jQuery.browser.msie?"object":"embed",this.display).eq(0)[0]};minplayer=minplayer||{};minplayer.players=minplayer.players||{};minplayer.players.minplayer=function(a,b,c){minplayer.players.flash.call(this,a,b,c)};minplayer.players.minplayer.prototype=new minplayer.players.flash;
minplayer.players.minplayer.prototype.constructor=minplayer.players.minplayer;window.onFlashPlayerReady=function(a){if(minplayer.player[a])minplayer.player[a].media.onReady()};window.onFlashPlayerUpdate=function(a,b){if(minplayer.player[a])minplayer.player[a].media.onMediaUpdate(b)};var debugConsole=console||{log:function(){}};window.onFlashPlayerDebug=function(a){debugConsole.log(a)};minplayer.players.minplayer.getPriority=function(){return 1};
minplayer.players.minplayer.canPlay=function(a){switch(a.mimetype){case "video/mp4":case "video/x-webm":case "video/quicktime":case "video/3gpp2":case "video/3gpp":case "application/x-shockwave-flash":case "audio/mpeg":case "audio/mp4":case "audio/aac":case "audio/vnd.wave":case "audio/x-ms-wma":return!0;default:return!1}};
minplayer.players.minplayer.prototype.create=function(){minplayer.players.flash.prototype.create.call(this);return minplayer.players.flash.getFlash({swf:this.options.swfplayer,id:this.options.id+"_player",playerType:"flash",width:this.options.width,height:"100%",flashvars:{id:this.options.id,debug:this.options.debug,config:"nocontrols",file:this.mediaFile.path,autostart:this.options.autoplay},wmode:this.options.wmode})};
minplayer.players.minplayer.prototype.onMediaUpdate=function(a){switch(a){case "mediaMeta":this.onLoaded();break;case "mediaPlaying":this.onPlaying();break;case "mediaPaused":this.onPaused();break;case "mediaComplete":this.onComplete()}};minplayer.players.minplayer.prototype.load=function(a){minplayer.players.flash.prototype.load.call(this,a);a&&this.isReady()&&this.player.loadMedia(a.path,a.stream)};
minplayer.players.minplayer.prototype.play=function(){minplayer.players.flash.prototype.play.call(this);this.isReady()&&this.player.playMedia()};minplayer.players.minplayer.prototype.pause=function(){minplayer.players.flash.prototype.pause.call(this);this.isReady()&&this.player.pauseMedia()};minplayer.players.minplayer.prototype.stop=function(){minplayer.players.flash.prototype.stop.call(this);this.isReady()&&this.player.stopMedia()};
minplayer.players.minplayer.prototype.seek=function(a){minplayer.players.flash.prototype.seek.call(this,a);this.isReady()&&this.player.seekMedia(a)};minplayer.players.minplayer.prototype.setVolume=function(a){minplayer.players.flash.prototype.setVolume.call(this,a);this.isReady()&&this.player.setVolume(a)};minplayer.players.minplayer.prototype.getVolume=function(a){this.isReady()&&a(this.player.getVolume())};minplayer.players.minplayer.prototype.getDuration=function(a){this.isReady()&&a(this.player.getDuration())};
minplayer.players.minplayer.prototype.getCurrentTime=function(a){this.isReady()&&a(this.player.getCurrentTime())};minplayer.players.minplayer.prototype.getBytesLoaded=function(a){this.isReady()&&a(this.player.getMediaBytesLoaded())};minplayer.players.minplayer.prototype.getBytesTotal=function(a){this.isReady()&&a(this.player.getMediaBytesTotal())};minplayer=minplayer||{};minplayer.players=minplayer.players||{};
minplayer.players.youtube=function(a,b,c){this.quality="default";minplayer.players.base.call(this,a,b,c)};minplayer.players.youtube.prototype=new minplayer.players.base;minplayer.players.youtube.prototype.constructor=minplayer.players.youtube;minplayer.players.youtube.getPriority=function(){return 10};minplayer.players.youtube.canPlay=function(a){return"video/youtube"===a.mimetype?!0:0===a.path.search(/^http(s)?\:\/\/(www\.)?youtube\.com/i)};
minplayer.players.youtube.getMediaId=function(a){var b=/^http[s]?\:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9]+)/i;return 0===a.path.search(b)?a.path.replace(b,"$2"):a.path};
minplayer.players.youtube.prototype.register=function(){window.onYouTubePlayerAPIReady=function(){for(var a in minplayer.player){var b=minplayer.player[a];if("youtube"==b.currentPlayer)b.media.player=new YT.Player(b.options.id+"-player",{events:{onReady:function(a){b.media.onReady(a)},onStateChange:function(a){b.media.onPlayerStateChange(a)},onPlaybackQualityChange:function(a){b.media.onQualityChange(a)},onError:function(a){b.media.onError(a)}}})}}};
minplayer.players.youtube.prototype.setPlayerState=function(a){switch(a){case YT.PlayerState.BUFFERING:this.onWaiting();break;case YT.PlayerState.PAUSED:this.onPaused();break;case YT.PlayerState.PLAYING:this.onPlaying();break;case YT.PlayerState.ENDED:this.onComplete()}};minplayer.players.youtube.prototype.onReady=function(){minplayer.players.base.prototype.onReady.call(this);this.onLoaded()};
minplayer.players.youtube.prototype.playerFound=function(){return 0<this.display.find("iframe#"+this.options.id+"-player").length};minplayer.players.youtube.prototype.onPlayerStateChange=function(a){this.setPlayerState(a.data)};minplayer.players.youtube.prototype.onQualityChange=function(a){this.quality=a};minplayer.players.youtube.prototype.onError=function(a){this.trigger("error",a)};minplayer.players.youtube.prototype.hasPlayLoader=function(){return!0};
minplayer.players.youtube.prototype.create=function(){minplayer.players.base.prototype.create.call(this);var a=document.createElement("script");a.src="http://www.youtube.com/player_api?enablejsapi=1";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);this.register();a=document.createElement("iframe");a.setAttribute("id",this.options.id+"-player");a.setAttribute("type","text/html");a.setAttribute("width","100%");a.setAttribute("height","100%");a.setAttribute("frameborder",
"0");var b="http://www.youtube.com/embed/"+(this.mediaFile.id+"?"),c=location.protocol,c=c+("//"+location.hostname),c=c+(location.port&&":"+location.port),b=b+jQuery.param({wmode:"opaque",controls:0,enablejsapi:1,origin:c,autoplay:this.options.autoplay,loop:this.options.loop});a.setAttribute("src",b);return a};minplayer.players.youtube.prototype.load=function(a){minplayer.players.base.prototype.load.call(this,a);a&&this.isReady()&&this.player.loadVideoById(a.id,0,this.quality)};
minplayer.players.youtube.prototype.play=function(){minplayer.players.base.prototype.play.call(this);this.isReady()&&this.player.playVideo()};minplayer.players.youtube.prototype.pause=function(){minplayer.players.base.prototype.pause.call(this);this.isReady()&&this.player.pauseVideo()};minplayer.players.youtube.prototype.stop=function(){minplayer.players.base.prototype.stop.call(this);this.isReady()&&this.player.stopVideo()};
minplayer.players.youtube.prototype.seek=function(a){minplayer.players.base.prototype.seek.call(this,a);this.isReady()&&this.player.seekTo(a,!0)};minplayer.players.youtube.prototype.setVolume=function(a){minplayer.players.base.prototype.setVolume.call(this,a);this.isReady()&&this.player.setVolume(100*a)};minplayer.players.youtube.prototype.getVolume=function(a){this.isReady()&&a(this.player.getVolume())};minplayer.players.youtube.prototype.getDuration=function(a){this.isReady()&&a(this.player.getDuration())};
minplayer.players.youtube.prototype.getCurrentTime=function(a){this.isReady()&&a(this.player.getCurrentTime())};minplayer.players.youtube.prototype.getBytesStart=function(a){this.isReady()&&a(this.player.getVideoStartBytes())};minplayer.players.youtube.prototype.getBytesLoaded=function(a){this.isReady()&&a(this.player.getVideoBytesLoaded())};minplayer.players.youtube.prototype.getBytesTotal=function(a){this.isReady()&&a(this.player.getVideoBytesTotal())};minplayer=minplayer||{};
minplayer.players=minplayer.players||{};minplayer.players.vimeo=function(a,b,c){minplayer.players.base.call(this,a,b,c)};minplayer.players.vimeo.prototype=new minplayer.players.base;minplayer.players.vimeo.prototype.constructor=minplayer.players.vimeo;minplayer.players.vimeo.getPriority=function(){return 10};minplayer.players.vimeo.canPlay=function(a){return"video/vimeo"===a.mimetype?!0:0===a.path.search(/^http(s)?\:\/\/(www\.)?vimeo\.com/i)};
minplayer.players.vimeo.getMediaId=function(a){var b=/^http[s]?\:\/\/(www\.)?vimeo\.com\/(\?v\=)?([0-9]+)/i;return 0===a.path.search(b)?a.path.replace(b,"$3"):a.path};minplayer.players.vimeo.prototype.reset=function(){minplayer.players.base.prototype.reset.call(this)};
minplayer.players.vimeo.prototype.create=function(){minplayer.players.base.prototype.create.call(this);var a=document.createElement("script");a.src="http://a.vimeocdn.com/js/froogaloop2.min.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);var c=document.createElement("iframe");c.setAttribute("id",this.options.id+"-player");c.setAttribute("type","text/html");c.setAttribute("width","100%");c.setAttribute("height","100%");c.setAttribute("frameborder","0");a="http://player.vimeo.com/video/"+
(this.mediaFile.id+"?");a+=jQuery.param({wmode:"opaque",api:1,player_id:this.options.id+"-player",title:0,byline:0,portrait:0,autoplay:this.options.autoplay,loop:this.options.loop});c.setAttribute("src",a);var d=this,e=setInterval(function(){if(window.Froogaloop)clearInterval(e),d.player=window.Froogaloop(c),d.player.addEvent("ready",function(){d.onReady()})},200);this.trigger("loadstart");return c};
minplayer.players.vimeo.prototype.onReady=function(){var a=this;this.player.addEvent("loadProgress",function(b){a.duration.set(parseFloat(b.duration));a.bytesLoaded.set(b.bytesLoaded);a.bytesTotal.set(b.bytesTotal)});this.player.addEvent("playProgress",function(b){a.duration.set(parseFloat(b.duration));a.currentTime.set(parseFloat(b.seconds))});this.player.addEvent("play",function(){a.onPlaying()});this.player.addEvent("pause",function(){a.onPaused()});this.player.addEvent("finish",function(){a.onComplete()});
minplayer.players.base.prototype.onReady.call(this);this.onLoaded()};minplayer.players.vimeo.prototype.playerFound=function(){return 0<this.display.find("iframe#"+this.options.id+"-player").length};minplayer.players.vimeo.prototype.play=function(){minplayer.players.base.prototype.play.call(this);this.isReady()&&this.player.api("play")};minplayer.players.vimeo.prototype.pause=function(){minplayer.players.base.prototype.pause.call(this);this.isReady()&&this.player.api("pause")};
minplayer.players.vimeo.prototype.stop=function(){minplayer.players.base.prototype.stop.call(this);this.isReady()&&this.player.api("unload")};minplayer.players.vimeo.prototype.seek=function(a){minplayer.players.base.prototype.seek.call(this,a);this.isReady()&&this.player.api("seekTo",a)};minplayer.players.vimeo.prototype.setVolume=function(a){minplayer.players.base.prototype.setVolume.call(this,a);this.isReady()&&(this.volume.set(a),this.player.api("setVolume",a))};
minplayer.players.vimeo.prototype.getVolume=function(a){this.player.api("getVolume",function(b){a(b)})};minplayer=minplayer||{};minplayer.controllers=minplayer.controllers||{};minplayer.controllers.base=function(a,b){minplayer.display.call(this,a,b)};var controllersBase=minplayer.controllers.base;minplayer.controllers.base.prototype=new minplayer.display;minplayer.controllers.base.prototype.constructor=minplayer.controllers.base;
minplayer.formatTime=function(a){var a=a||0,b=0,c=0,d=0,e="",d=Math.floor(a/3600),a=a-3600*d,c=Math.floor(a/60),b=Math.floor((a-60*c)%60);d&&(e=e+(""+d)+":");return{time:e+(10<=c?""+c:"0"+c)+":"+(10<=b?""+b:"0"+b),units:""}};minplayer.controllers.base.prototype.getElements=function(){var a=minplayer.display.prototype.getElements.call(this);return jQuery.extend(a,{play:null,pause:null,fullscreen:null,seek:null,progress:null,volume:null,timer:null})};
minplayer.controllers.base.prototype.construct=function(){function a(a,b){var c=b?"play":"pause";a.display.trigger(c);a.setPlayPause(b);if(a.player)a.player[c]()}minplayer.display.prototype.construct.call(this);this.elements.play&&this.elements.play.bind("click",{obj:this},function(b){b.preventDefault();a(b.data.obj,!0)});this.elements.pause&&this.elements.pause.bind("click",{obj:this},function(b){b.preventDefault();a(b.data.obj,!1)});var b=this,c={};this.elements.fullscreen&&this.elements.fullscreen.click(function(){b.elements.player.hasClass("fullscreen")?
b.elements.player.removeClass("fullscreen"):b.elements.player.addClass("fullscreen")}).css({pointer:"hand"});this.dragging=!1;if(this.elements.seek)this.seekBar=this.elements.seek.slider({range:"min"});if(this.elements.volume)c={range:"min",orientation:"vertical"},this.volumeBar=this.elements.volume.slider(c)};
minplayer.controllers.base.prototype.setPlayPause=function(a){var b="";this.elements.play&&this.elements.play.css("display",a?"inherit":"none");this.elements.pause&&this.elements.pause.css("display",a?"none":"inherit")};minplayer.controllers.base.prototype.setTimeString=function(a,b){this.elements[a]&&this.elements[a].text(minplayer.formatTime(b).time)};
minplayer.controllers.base.prototype.setPlayer=function(a){minplayer.display.prototype.setPlayer.call(this,a);var b=this;this.elements.pause&&a.bind("pause",{obj:this},function(a){a.data.obj.setPlayPause(!0)});this.elements.play&&a.bind("playing",{obj:this},function(a){a.data.obj.setPlayPause(!1)});this.elements.duration&&(a.bind("durationchange",{obj:this},function(a,b){a.data.obj.setTimeString("duration",b.duration)}),a.getDuration(function(a){b.setTimeString("duration",a)}));this.elements.progress&&
a.bind("progress",{obj:this},function(a,d){b.elements.progress.width((d.total?100*(d.loaded/d.total):0)+"%")});(this.seekBar||this.elements.timer)&&a.bind("timeupdate",{obj:this},function(a,b){if(!a.data.obj.dragging){var e=0;b.duration&&(e=100*(b.currentTime/b.duration));a.data.obj.seekBar&&a.data.obj.seekBar.slider("option","value",e);a.data.obj.setTimeString("timer",b.currentTime)}});this.seekBar&&this.seekBar.slider({start:function(){b.dragging=!0},stop:function(c,d){b.dragging=!1;a.getDuration(function(b){a.seek(d.value/
100*b)})},slide:function(c,d){a.getDuration(function(c){c*=d.value/100;b.dragging||a.seek(c);b.setTimeString("timer",c)})}});this.volumeBar&&(this.volumeBar.slider({slide:function(b,d){a.setVolume(d.value/100)}}),a.getVolume(function(a){b.volumeBar.slider("option","value",100*a)}))};minplayer=minplayer||{};minplayer.templates=minplayer.templates||{};minplayer.templates.base=function(a,b){minplayer.display.call(this,a,b)};var templatesBase=minplayer.templates.base;
minplayer.templates.base.prototype=new minplayer.display;minplayer.templates.base.prototype.getElements=function(){var a=minplayer.display.prototype.getElements.call(this);return jQuery.extend(a,{player:null,display:null,media:null})};minplayer.templates.base.prototype.onFullScreen=function(){};
