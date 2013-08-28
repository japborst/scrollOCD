var options = scrollOCDconfig;
defaults = {
	'classname':  'ocd',
	'diff':       200,
	'speed':      1,
	'timeout':    1500,
	'minWidth':   1280
}
for(var i in defaults) {
	if(typeof options[i] === "undefined") {
		options[i] = defaults[i];
	}
}
if(String(options.diff).indexOf('%') > -1){
	options.diff = window.innerHeight*parseInt(options.diff)/100;
}

function smoothScroll(elemTop,speedInt) {
		var start, stop, distance, speed, step, leap, timer
    start = window.pageYOffset;
    stop = elemTop;
    distance = stop > start ? -start + stop : start - stop;
    speed = Math.round(distance / (speedInt*40));
    if (speed >= 20) speed = 20;
    step = Math.round(distance / 50);
    leap = stop > start ? start + step : start - step;
    timer = 0;
    if (stop > start) {
        for ( var i=start; i<stop; i+=step ) {
            setTimeout("window.scrollTo(0, "+leap+")", timer * speed);
            leap += step; if (leap > stop) leap = stop; timer++;
        } return;
    }
    for ( var i=start; i>stop; i-=step ) {
        setTimeout("window.scrollTo(0, "+leap+")", timer * speed);
        leap -= step; if (leap < stop) leap = stop; timer++;
    }
}
function scrollOCD(options) {
	var scrollPos, ocd, elemTop;  
	ocd = document.getElementsByClassName(options.classname);
	scrollPos = window.pageYOffset;
	for (var i = ocd.length - 1; i >= 0; i--) {
		elemTop = ocd[i].offsetTop;
		if(Math.abs(scrollPos - elemTop) <= options.diff){
			smoothScroll(elemTop,options.speed);
		}
	}
}
function scrollOCDexec(options){
	window.clearTimeout(scrollInt);
	scrollInt = window.setTimeout(function(){
		scrollOCD(options);
	},options.timeout);
}

var scrollEvent = 'mousewheel';
function isTouch() {
  return !!('ontouchstart' in window);
}
var isFireFox = (navigator.userAgent.indexOf('Firefox') != -1);
if(isFireFox){
	scrollEvent = 'DOMMouseScroll';
}
if(isTouch()){
	scrollEvent = 'touchmove';
}

var scrollInt = null;
if(!options.minWidth || window.innerWidth >= options.minWidth){
	document.addEventListener(scrollEvent,function(){
		scrollOCDexec(options);
	},false);

	document.addEventListener('keydown',function(e){
		if(e.keyCode == 38 || e.keyCode == 40){
			scrollOCDexec(options);
		}
	},false)
}