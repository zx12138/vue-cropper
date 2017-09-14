!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vue-cropper",[],t):"object"==typeof exports?exports["vue-cropper"]=t():e["vue-cropper"]=t()}(this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var i=o[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};return t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,r){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,o){o(7);var r=o(5)(o(1),o(6),"data-v-7f57ac98",null);e.exports=r.exports},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{w:0,h:0,scale:1,x:0,y:0,loading:!0,trueWidth:0,trueHeight:0,move:!0,moveX:0,moveY:0,crop:!1,cropping:!1,cropW:0,cropH:0,cropOldW:0,cropOldH:0,canChangeX:!1,canChangeY:!1,changeCropTypeX:1,changeCropTypeY:1,cropX:0,cropY:0,cropChangeX:0,cropChangeY:0,cropOffsertX:0,cropOffsertY:0,support:"",touches:[],touchNow:!1,rotate:0}},props:{img:{type:String,default:""},outputSize:{type:Number,default:1},outputType:{type:String,default:"jpeg"},info:{type:Boolean,default:!0},canScale:{type:Boolean,default:!0},autoCrop:{type:Boolean,default:!1},autoCropWidth:{type:Number,default:0},autoCropHeight:{type:Number,default:0},fixed:{type:Boolean,default:!1},fixedNumber:{type:Array,default:function(){return[1,1]}},fixedBox:{type:Boolean,default:!1},full:{type:Boolean,default:!1}},computed:{cropInfo:function(){return this.cropOffsertY>20?"-20px":"0px"}},watch:{img:function(){var e=this;this.loading=!0,this.scale=1,this.clearCrop();var t=new Image;t.onload=function(){e.reload()},t.src=this.img},cropW:function(){this.cropW=~~this.cropW,this.showPreview()},cropH:function(){this.cropH=~~this.cropH,this.showPreview()},cropOffsertX:function(){this.showPreview()},cropOffsertY:function(){this.showPreview()},scale:function(){this.showPreview()},x:function(){this.showPreview()},y:function(){this.showPreview()},rotate:function(){this.showPreview()}},methods:{startMove:function(e){e.preventDefault(),this.move&&!this.crop?(this.moveX=(e.clientX?e.clientX:e.touches[0].clientX)-this.x,this.moveY=(e.clientY?e.clientY:e.touches[0].clientY)-this.y,e.touches?(window.addEventListener("touchmove",this.moveImg),window.addEventListener("touchend",this.leaveImg),2==e.touches.length&&(this.touches=e.touches,window.addEventListener("touchmove",this.touchScale),window.addEventListener("touchend",this.cancleTouchScale))):(window.addEventListener("mousemove",this.moveImg),window.addEventListener("mouseup",this.leaveImg))):(this.cropping=!0,window.addEventListener("mousemove",this.createCrop),window.addEventListener("mouseup",this.endCrop),window.addEventListener("touchmove",this.createCrop),window.addEventListener("touchend",this.endCrop),this.cropOffsertX=e.offsetX?e.offsetX:e.touches[0].pageX-this.$refs.cropper.offsetLeft,this.cropOffsertY=e.offsetY?e.offsetY:e.touches[0].pageY-this.$refs.cropper.offsetTop,this.cropX=e.clientX?e.clientX:e.touches[0].clientX,this.cropY=e.clientY?e.clientY:e.touches[0].clientY,this.cropChangeX=this.cropOffsertX,this.cropChangeY=this.cropOffsertY,this.cropW=0,this.cropH=0)},touchScale:function(e){var t=this;e.preventDefault();var o={x:this.touches[0].clientX,y:this.touches[0].clientY},r={x:e.touches[0].clientX,y:e.touches[0].clientY},i={x:this.touches[1].clientX,y:this.touches[1].clientY},c={x:e.touches[1].clientX,y:e.touches[1].clientY},n=Math.sqrt(Math.pow(o.x-i.x,2)+Math.pow(o.y-i.y,2)),a=Math.sqrt(Math.pow(r.x-c.x,2)+Math.pow(r.y-c.y,2)),s=~~(a-n),p=1;p=p/this.trueWidth>p/this.trueHeight?p/this.trueHeight:p/this.trueWidth,p=p>.1?.1:p;var h=p*s;this.touchNow||(this.touchNow=!0,s>0?this.scale+=Math.abs(h):s<0&&(this.scale>Math.abs(h)?this.scale-=Math.abs(h):this.scale),this.touches=e.touches,setTimeout(function(){t.touchNow=!1},8))},cancleTouchScale:function(e){window.removeEventListener("touchmove",this.touchScale)},moveImg:function(e){var t=this;if(e.preventDefault(),e.touches&&2===e.touches.length)return this.touches=e.touches,window.addEventListener("touchmove",this.touchScale),window.addEventListener("touchend",this.cancleTouchScale),window.removeEventListener("touchmove",this.moveImg),!1;var o=e.clientX?e.clientX:e.touches[0].clientX,r=e.clientY?e.clientY:e.touches[0].clientY;this.$nextTick(function(){t.x=~~(o-t.moveX),t.y=~~(r-t.moveY)})},leaveImg:function(e){window.removeEventListener("mousemove",this.moveImg),window.removeEventListener("touchmove",this.moveImg),window.removeEventListener("mouseup",this.leaveImg),window.removeEventListener("touchend",this.leaveImg)},scaleImg:function(){this.support="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",this.canScale&&window.addEventListener(this.support,this.changeSize)},cancleScale:function(){this.canScale&&window.removeEventListener(this.support,this.changeSize)},changeSize:function(e){var t=e.deltaY||e.wheelDelta,o=.2;o=o/this.trueWidth>o/this.trueHeight?o/this.trueHeight:o/this.trueWidth;var r=o*t;r<0?this.scale+=Math.abs(r):this.scale>Math.abs(r)?this.scale-=Math.abs(r):this.scale,e.preventDefault()},createCrop:function(e){var t=this;e.preventDefault();var o=e.clientX?e.clientX:e.touches?e.touches[0].clientX:0,r=e.clientY?e.clientY:e.touches?e.touches[0].clientY:0;this.$nextTick(function(){var e=~~(o-t.cropX),i=~~(r-t.cropY);if(e>0?(t.cropW=e+t.cropChangeX>t.w?t.w-t.cropChangeX:e,t.cropOffsertX=t.cropChangeX):(t.cropW=t.w-t.cropChangeX+Math.abs(e)>t.w?t.cropChangeX:Math.abs(e),t.cropOffsertX=t.cropChangeX+e>0?t.cropChangeX+e:0),t.fixed){var c=~~(t.cropW/t.fixedNumber[0]*t.fixedNumber[1]);c+t.cropOffsertY>t.h?(t.cropH=t.h-t.cropOffsertY,t.cropW=~~(t.cropH/t.fixedNumber[1]*t.fixedNumber[0]),t.cropOffsertX=e>0?t.cropChangeX:t.cropChangeX-t.cropW):t.cropH=c,t.cropOffsertY=t.cropOffsertY}else i>0?(t.cropH=i+t.cropChangeY>t.h?t.h-t.cropChangeY:i,t.cropOffsertY=t.cropChangeY):(t.cropH=t.h-t.cropChangeY+Math.abs(i)>t.h?t.cropChangeY:Math.abs(i),t.cropOffsertY=t.cropChangeY+i>0?t.cropChangeY+i:0)})},changeCropSize:function(e,t,o,r,i){e.preventDefault(),window.addEventListener("mousemove",this.changeCropNow),window.addEventListener("mouseup",this.changeCropEnd),window.addEventListener("touchmove",this.changeCropNow),window.addEventListener("touchend",this.changeCropEnd),this.canChangeX=t,this.canChangeY=o,this.changeCropTypeX=r,this.changeCropTypeY=i,this.cropX=e.clientX?e.clientX:e.touches[0].clientX,this.cropY=e.clientY?e.clientY:e.touches[0].clientY,this.cropOldW=this.cropW,this.cropOldH=this.cropH,this.cropChangeX=this.cropOffsertX,this.cropChangeY=this.cropOffsertY,this.fixed&&this.canChangeX&&this.canChangeY&&(this.canChangeY=0)},changeCropNow:function(e){var t=this;e.preventDefault();var o=e.clientX?e.clientX:e.touches?e.touches[0].clientX:0,r=e.clientY?e.clientY:e.touches?e.touches[0].clientY:0;this.$nextTick(function(){var e=~~(o-t.cropX),i=~~(r-t.cropY);if(t.canChangeX&&(1===t.changeCropTypeX?t.cropOldW-e>0?(t.cropW=t.w-t.cropChangeX-e<=t.w?t.cropOldW-e:t.cropOldW+t.cropChangeX,t.cropOffsertX=t.w-t.cropChangeX-e<=t.w?t.cropChangeX+e:0):(t.cropW=Math.abs(e)+t.cropChangeX<=t.w?Math.abs(e)-t.cropOldW:t.w-t.cropOldW-t.cropChangeX,t.cropOffsertX=t.cropChangeX+t.cropOldW):2===t.changeCropTypeX&&(t.cropOldW+e>0?(t.cropW=t.cropOldW+e+t.cropOffsertX<=t.w?t.cropOldW+e:t.w-t.cropOffsertX,t.cropOffsertX=t.cropChangeX):(t.cropW=t.w-t.cropChangeX+Math.abs(e+t.cropOldW)<=t.w?Math.abs(e+t.cropOldW):t.cropChangeX,t.cropOffsertX=t.w-t.cropChangeX+Math.abs(e+t.cropOldW)<=t.w?t.cropChangeX-Math.abs(e+t.cropOldW):0))),t.canChangeY&&(1===t.changeCropTypeY?t.cropOldH-i>0?(t.cropH=t.h-t.cropChangeY-i<=t.h?t.cropOldH-i:t.cropOldH+t.cropChangeY,t.cropOffsertY=t.h-t.cropChangeY-i<=t.h?t.cropChangeY+i:0):(t.cropH=Math.abs(i)+t.cropChangeY<=t.h?Math.abs(i)-t.cropOldH:t.h-t.cropOldH-t.cropChangeY,t.cropOffsertY=t.cropChangeY+t.cropOldH):2===t.changeCropTypeY&&(t.cropOldH+i>0?(t.cropH=t.cropOldH+i+t.cropOffsertY<=t.h?t.cropOldH+i:t.h-t.cropOffsertY,t.cropOffsertY=t.cropChangeY):(t.cropH=t.h-t.cropChangeY+Math.abs(i+t.cropOldH)<=t.h?Math.abs(i+t.cropOldH):t.cropChangeY,t.cropOffsertY=t.h-t.cropChangeY+Math.abs(i+t.cropOldH)<=t.h?t.cropChangeY-Math.abs(i+t.cropOldH):0))),t.canChangeX&&t.fixed){var c=~~(t.cropW/t.fixedNumber[0]*t.fixedNumber[1]);c+t.cropOffsertY>t.h?(t.cropH=t.h-t.cropOffsertY,t.cropW=~~(t.cropH/t.fixedNumber[1]*t.fixedNumber[0])):t.cropH=c}if(t.canChangeY&&t.fixed){var n=~~(t.cropH/t.fixedNumber[1]*t.fixedNumber[0]);n+t.cropOffsertX>t.w?(t.cropW=t.w-t.cropOffsertX,t.cropH=~~(t.cropW/t.fixedNumber[0]*t.fixedNumber[1])):t.cropW=n}})},changeCropEnd:function(e){window.removeEventListener("mousemove",this.changeCropNow),window.removeEventListener("mouseup",this.changeCropEnd),window.removeEventListener("touchmove",this.changeCropNow),window.removeEventListener("touchend",this.changeCropEnd)},endCrop:function(){0===this.cropW&&0===this.cropH&&(this.cropping=!1),window.removeEventListener("mousemove",this.createCrop),window.removeEventListener("mouseup",this.endCrop),window.removeEventListener("touchmove",this.createCrop),window.removeEventListener("touchend",this.endCrop)},startCrop:function(){this.crop=!0},stopCrop:function(){this.crop=!1},clearCrop:function(){this.cropping=!1,this.cropW=0,this.cropH=0},cropMove:function(e){e.preventDefault(),window.addEventListener("mousemove",this.moveCrop),window.addEventListener("mouseup",this.leaveCrop),window.addEventListener("touchmove",this.moveCrop),window.addEventListener("touchend",this.leaveCrop),this.cropX=(e.clientX?e.clientX:e.touches[0].clientX)-this.cropOffsertX,this.cropY=(e.clientY?e.clientY:e.touches[0].clientY)-this.cropOffsertY},moveCrop:function(e){var t=this;e.preventDefault();var o=e.clientX?e.clientX:e.touches[0].clientX,r=e.clientY?e.clientY:e.touches[0].clientY;this.$nextTick(function(){var e=~~(o-t.cropX),i=~~(r-t.cropY);e<=1?t.cropOffsertX=1:~~(e+t.cropW)>t.w?t.cropOffsertX=t.w-t.cropW-1:t.cropOffsertX=e,i<=1?t.cropOffsertY=1:~~(i+t.cropH)>t.h?t.cropOffsertY=t.h-t.cropH-1:t.cropOffsertY=i})},leaveCrop:function(e){window.removeEventListener("mousemove",this.moveCrop),window.removeEventListener("mouseup",this.leaveCrop),window.removeEventListener("touchmove",this.moveCrop),window.removeEventListener("touchend",this.leaveCrop)},getCropData:function(e){var t=this,o=document.createElement("canvas"),r=new Image;r.onload=function(){if(0!=~~t.cropW){var i=o.getContext("2d"),c=t.cropW,n=t.cropH,a=t.trueWidth*t.scale,s=t.trueHeight*t.scale,p=t.x-t.cropOffsertX+t.trueWidth*(1-t.scale)/2,h=t.y-t.cropOffsertY+t.trueHeight*(1-t.scale)/2;switch(o.width=c,o.height=n,i.save(),t.rotate){case 0:t.full?(o.width=c/t.scale,o.height=n/t.scale,i.drawImage(r,p/t.scale,h/t.scale,a/t.scale,s/t.scale)):i.drawImage(r,p,h,a,s);break;case 1:case-3:t.full?(o.width=c/t.scale,o.height=n/t.scale,p=p/t.scale+(a/t.scale-s/t.scale)/2,h=h/t.scale+(s/t.scale-a/t.scale)/2,i.rotate(90*t.rotate*Math.PI/180),i.drawImage(r,h,-p-s/t.scale,a/t.scale,s/t.scale)):(p+=(a-s)/2,h+=(s-a)/2,i.rotate(90*t.rotate*Math.PI/180),i.drawImage(r,h,-p-s,a,s));break;case 2:case-2:t.full?(o.width=c/t.scale,o.height=n/t.scale,i.rotate(90*t.rotate*Math.PI/180),p/=t.scale,h/=t.scale,i.drawImage(r,-p-a/t.scale,-h-s/t.scale,a/t.scale,s/t.scale)):(i.rotate(90*t.rotate*Math.PI/180),i.drawImage(r,-p-a,-h-s,a,s));break;case 3:case-1:t.full?(o.width=c/t.scale,o.height=n/t.scale,p=p/t.scale+(a/t.scale-s/t.scale)/2,h=h/t.scale+(s/t.scale-a/t.scale)/2,i.rotate(90*t.rotate*Math.PI/180),i.drawImage(r,-h-a/t.scale,p,a/t.scale,s/t.scale)):(p+=(a-s)/2,h+=(s-a)/2,i.rotate(90*t.rotate*Math.PI/180),i.drawImage(r,-h-a,p,a,s));break;default:t.full?(o.width=c/t.scale,o.height=n/t.scale,i.drawImage(r,p/t.scale,h/t.scale,a/t.scale,s/t.scale)):i.drawImage(r,p,h,a,s)}i.restore()}else{var u=t.trueWidth*t.scale,l=t.trueHeight*t.scale,f=o.getContext("2d");switch(f.save(),t.rotate){case 0:o.width=u,o.height=l,f.drawImage(r,0,0,u,l);break;case 1:case-3:o.width=l,o.height=u,f.rotate(90*t.rotate*Math.PI/180),f.drawImage(r,0,-l,u,l);break;case 2:case-2:o.width=u,o.height=l,f.rotate(90*t.rotate*Math.PI/180),f.drawImage(r,-u,-l,u,l);break;case 3:case-1:o.width=l,o.height=u,f.rotate(90*t.rotate*Math.PI/180),f.drawImage(r,-u,0,u,l);break;default:o.width=u,o.height=l,f.drawImage(r,0,0,u,l)}f.restore()}var d=o.toDataURL("image/"+t.outputType,t.outputSize);e(d)},"data"!==this.img.substr(0,4)&&(r.crossOrigin="anonymous"),r.src=this.img},getCropBlob:function(e){this.getCropData(function(t){for(var o=t.split(","),r=o[0].match(/:(.*?);/)[1],i=atob(o[1]),c=i.length,n=new Uint8Array(c);c--;)n[c]=i.charCodeAt(c);e(new Blob([n],{type:r}))})},showPreview:function(){var e={};e.div={width:this.cropW+"px",height:this.cropH+"px"},e.img={width:this.trueWidth+"px",height:this.trueHeight+"px",transform:"scale("+this.scale+","+this.scale+") translate3d("+(this.x-this.cropOffsertX)/this.scale+"px,"+(this.y-this.cropOffsertY)/this.scale+"px,0)rotateZ("+90*this.rotate+"deg)"},e.w=this.cropW,e.h=this.cropH,this.$emit("realTime",e)},reload:function(){var e=this;this.w=~~window.getComputedStyle(this.$refs.cropper).width.replace("px",""),this.h=~~window.getComputedStyle(this.$refs.cropper).height.replace("px",""),this.trueWidth=this.$refs.cropperImg.width,this.trueHeight=this.$refs.cropperImg.height,this.rotate=0,this.trueWidth>this.w&&(this.scale=this.w/this.trueWidth),this.trueHeight*this.scale>this.h&&(this.scale=this.h/this.trueHeight),this.$nextTick(function(){e.x=-(e.trueWidth-e.trueWidth*e.scale)/2+(e.w-e.trueWidth*e.scale)/2,e.y=-(e.trueHeight-e.trueHeight*e.scale)/2+(e.h-e.trueHeight*e.scale)/2,e.loading=!1,e.autoCrop&&e.goAutoCrop()})},goAutoCrop:function(){this.cropping=!0;var e=this.autoCropWidth,t=this.autoCropHeight;0!==e&&0!==t||(e=.8*this.w,t=.8*this.h),e=e>this.w?this.w:e,t=t>this.h?this.h:t,this.fixed&&(t=e/this.fixedNumber[0]*this.fixedNumber[1]),t>this.h&&(t=this.h,e=t/this.fixedNumber[1]*this.fixedNumber[0]),this.changeCrop(e,t)},changeCrop:function(e,t){this.cropW=e,this.cropH=t,this.cropOffsertX=(this.w-e)/2,this.cropOffsertY=(this.h-t)/2},refresh:function(){},rotateLeft:function(){this.rotate=this.rotate<=-3?0:this.rotate-1},rotateRight:function(){this.rotate=this.rotate>=3?0:this.rotate+1},rotateClear:function(){this.rotate=0}},mounted:function(){var e=this;this.showPreview(),this.$refs.cropperImg.onload=function(){e.reload()}}}},function(e,t,o){"use strict";var r=o(0);e.exports=r},function(e,t,o){t=e.exports=o(4)(),t.push([e.i,'.vue-cropper[data-v-7f57ac98]{position:relative;width:100%;height:100%;box-sizing:border-box;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;direction:ltr;touch-action:none;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC")}.cropper-box-canvas[data-v-7f57ac98],.cropper-box[data-v-7f57ac98],.cropper-crop-box[data-v-7f57ac98],.cropper-drag-box[data-v-7f57ac98],.cropper-face[data-v-7f57ac98]{position:absolute;top:0;right:0;bottom:0;left:0;user-select:none}.cropper-box-canvas img[data-v-7f57ac98]{position:relative;user-select:none;transform:none}.cropper-box[data-v-7f57ac98]{overflow:hidden}.cropper-move[data-v-7f57ac98]{cursor:move}.cropper-crop[data-v-7f57ac98]{cursor:crosshair}.cropper-modal[data-v-7f57ac98]{background:rgba(0,0,0,.5)}.cropper-view-box[data-v-7f57ac98]{display:block;overflow:hidden;width:100%;height:100%;outline:1px solid #39f;outline-color:rgba(51,153,255,.75);user-select:none}.cropper-view-box img[data-v-7f57ac98]{user-select:none}.cropper-face[data-v-7f57ac98]{top:0;left:0;background-color:#fff;opacity:.1}.crop-info[data-v-7f57ac98]{position:absolute;left:0;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:rgba(0,0,0,.8);font-size:12px}.crop-line[data-v-7f57ac98]{position:absolute;display:block;width:100%;height:100%;opacity:.1}.line-w[data-v-7f57ac98]{top:-3px;left:0;height:5px;cursor:n-resize}.line-a[data-v-7f57ac98]{top:0;left:-3px;width:5px;cursor:w-resize}.line-s[data-v-7f57ac98]{bottom:-3px;left:0;height:5px;cursor:s-resize}.line-d[data-v-7f57ac98]{top:0;right:-3px;width:5px;cursor:e-resize}.crop-point[data-v-7f57ac98]{position:absolute;width:8px;height:8px;opacity:.75;background-color:#39f;border-radius:100%}.point1[data-v-7f57ac98]{top:-4px;left:-4px;cursor:nw-resize}.point2[data-v-7f57ac98]{top:-5px;left:50%;margin-left:-3px;cursor:n-resize}.point3[data-v-7f57ac98]{top:-4px;right:-4px;cursor:ne-resize}.point4[data-v-7f57ac98]{top:50%;left:-4px;margin-top:-3px;cursor:w-resize}.point5[data-v-7f57ac98]{top:50%;right:-4px;margin-top:-3px;cursor:w-resize}.point6[data-v-7f57ac98]{bottom:-5px;left:-4px;cursor:sw-resize}.point7[data-v-7f57ac98]{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize}.point8[data-v-7f57ac98]{bottom:-5px;right:-4px;cursor:nw-resize}@media screen and (max-width:500px){.crop-point[data-v-7f57ac98]{position:absolute;width:20px;height:20px;opacity:.45;background-color:#39f;border-radius:100%}.point1[data-v-7f57ac98]{top:-10px;left:-10px}.point2[data-v-7f57ac98],.point4[data-v-7f57ac98],.point5[data-v-7f57ac98],.point7[data-v-7f57ac98]{display:none}.point3[data-v-7f57ac98]{top:-10px;right:-10px}.point4[data-v-7f57ac98]{top:0;left:0}.point6[data-v-7f57ac98]{bottom:-10px;left:-10px}.point8[data-v-7f57ac98]{bottom:-10px;right:-10px}}',""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var c=this[i][0];"number"==typeof c&&(r[c]=!0)}for(i=0;i<t.length;i++){var n=t[i];"number"==typeof n[0]&&r[n[0]]||(o&&!n[2]?n[2]=o:o&&(n[2]="("+n[2]+") and ("+o+")"),e.push(n))}},e}},function(e,t){e.exports=function(e,t,o,r){var i,c=e=e||{},n=typeof e.default;"object"!==n&&"function"!==n||(i=e,c=e.default);var a="function"==typeof c?c.options:c;if(t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns),o&&(a._scopeId=o),r){var s=Object.create(a.computed||null);Object.keys(r).forEach(function(e){var t=r[e];s[e]=function(){return t}}),a.computed=s}return{esModule:i,exports:c,options:a}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"cropper",staticClass:"vue-cropper"},[o("div",{staticClass:"cropper-box"},[o("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],staticClass:"cropper-box-canvas",style:{width:e.trueWidth+"px",height:e.trueHeight+"px",transform:"scale("+e.scale+","+e.scale+") translate3d("+e.x/e.scale+"px,"+e.y/e.scale+"px,0)rotateZ("+90*e.rotate+"deg)"}},[o("img",{ref:"cropperImg",attrs:{src:e.img,alt:"cropper-img"}})])]),e._v(" "),o("div",{staticClass:"cropper-drag-box",class:{"cropper-move":e.move&&!e.crop,"cropper-crop":e.crop,"cropper-modal":e.cropping},on:{mousedown:e.startMove,touchstart:e.startMove,mouseover:e.scaleImg,mouseout:e.cancleScale}}),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.cropping,expression:"cropping"}],staticClass:"cropper-crop-box",style:{width:e.cropW+"px",height:e.cropH+"px",transform:"translate3d("+e.cropOffsertX+"px,"+e.cropOffsertY+"px,0)"}},[o("span",{staticClass:"cropper-view-box"},[o("img",{style:{width:e.trueWidth+"px",height:e.trueHeight+"px",transform:"scale("+e.scale+","+e.scale+") translate3d("+(e.x-e.cropOffsertX)/e.scale+"px,"+(e.y-e.cropOffsertY)/e.scale+"px,0)rotateZ("+90*e.rotate+"deg)"},attrs:{src:e.img,alt:"cropper-img"}})]),e._v(" "),o("span",{staticClass:"cropper-face cropper-move",on:{mousedown:e.cropMove,touchstart:e.cropMove}}),e._v(" "),e.info?o("span",{staticClass:"crop-info",style:{top:e.cropInfo}},[e._v(e._s(this.cropW)+" × "+e._s(this.cropH))]):e._e(),e._v(" "),e.fixedBox?e._e():o("span",[o("span",{staticClass:"crop-line line-w",on:{mousedown:function(t){e.changeCropSize(t,!1,!0,0,1)},touchstart:function(t){e.changeCropSize(t,!1,!0,0,1)}}}),e._v(" "),o("span",{staticClass:"crop-line line-a",on:{mousedown:function(t){e.changeCropSize(t,!0,!1,1,0)},touchstart:function(t){e.changeCropSize(t,!0,!1,1,0)}}}),e._v(" "),o("span",{staticClass:"crop-line line-s",on:{mousedown:function(t){e.changeCropSize(t,!1,!0,0,2)},touchstart:function(t){e.changeCropSize(t,!1,!0,0,2)}}}),e._v(" "),o("span",{staticClass:"crop-line line-d",on:{mousedown:function(t){e.changeCropSize(t,!0,!1,2,0)},touchstart:function(t){e.changeCropSize(t,!0,!1,2,0)}}}),e._v(" "),o("span",{staticClass:"crop-point point1",on:{mousedown:function(t){e.changeCropSize(t,!0,!0,1,1)},touchstart:function(t){e.changeCropSize(t,!0,!0,1,1)}}}),e._v(" "),o("span",{staticClass:"crop-point point2",on:{mousedown:function(t){e.changeCropSize(t,!1,!0,0,1)},touchstart:function(t){e.changeCropSize(t,!1,!0,0,1)}}}),e._v(" "),o("span",{staticClass:"crop-point point3",on:{mousedown:function(t){e.changeCropSize(t,!0,!0,2,1)},touchstart:function(t){e.changeCropSize(t,!0,!0,2,1)}}}),e._v(" "),o("span",{staticClass:"crop-point point4",on:{mousedown:function(t){e.changeCropSize(t,!0,!1,1,0)},touchstart:function(t){e.changeCropSize(t,!0,!1,1,0)}}}),e._v(" "),o("span",{staticClass:"crop-point point5",on:{mousedown:function(t){e.changeCropSize(t,!0,!1,2,0)},touchstart:function(t){e.changeCropSize(t,!0,!1,2,0)}}}),e._v(" "),o("span",{staticClass:"crop-point point6",on:{mousedown:function(t){e.changeCropSize(t,!0,!0,1,2)},touchstart:function(t){e.changeCropSize(t,!0,!0,1,2)}}}),e._v(" "),o("span",{staticClass:"crop-point point7",on:{mousedown:function(t){e.changeCropSize(t,!1,!0,0,2)},touchstart:function(t){e.changeCropSize(t,!1,!0,0,2)}}}),e._v(" "),o("span",{staticClass:"crop-point point8",on:{mousedown:function(t){e.changeCropSize(t,!0,!0,2,2)},touchstart:function(t){e.changeCropSize(t,!0,!0,2,2)}}})])])])},staticRenderFns:[]}},function(e,t,o){var r=o(3);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);o(8)("86f24dac",r,!0)},function(e,t,o){function r(e){for(var t=0;t<e.length;t++){var o=e[t],r=h[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(c(o.parts[i]));r.parts.length>o.parts.length&&(r.parts.length=o.parts.length)}else{for(var n=[],i=0;i<o.parts.length;i++)n.push(c(o.parts[i]));h[o.id]={id:o.id,refs:1,parts:n}}}}function i(){var e=document.createElement("style");return e.type="text/css",u.appendChild(e),e}function c(e){var t,o,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(d)return v;r.parentNode.removeChild(r)}if(g){var c=f++;r=l||(l=i()),t=n.bind(null,r,c,!1),o=n.bind(null,r,c,!0)}else r=i(),t=a.bind(null,r),o=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}function n(e,t,o,r){var i=o?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(t,i);else{var c=document.createTextNode(i),n=e.childNodes;n[t]&&e.removeChild(n[t]),n.length?e.insertBefore(c,n[t]):e.appendChild(c)}}function a(e,t){var o=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(o+="\n/*# sourceURL="+i.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var p=o(9),h={},u=s&&(document.head||document.getElementsByTagName("head")[0]),l=null,f=0,d=!1,v=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,o){d=o;var i=p(e,t);return r(i),function(t){for(var o=[],c=0;c<i.length;c++){var n=i[c],a=h[n.id];a.refs--,o.push(a)}t?(i=p(e,t),r(i)):i=[];for(var c=0;c<o.length;c++){var a=o[c];if(0===a.refs){for(var s=0;s<a.parts.length;s++)a.parts[s]();delete h[a.id]}}}};var m=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var o=[],r={},i=0;i<t.length;i++){var c=t[i],n=c[0],a=c[1],s=c[2],p=c[3],h={id:e+":"+i,css:a,media:s,sourceMap:p};r[n]?r[n].parts.push(h):o.push(r[n]={id:n,parts:[h]})}return o}}])});