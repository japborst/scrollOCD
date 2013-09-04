var options = (typeof scrollOCDconfig !== "undefined" ) ? scrollOCDconfig : {};
defaults = {
	'classname':  'ocd',
	'diff':       200,
	'speed':      1,
	'timeout':    1500,
	'minWidth':   1280,
	'exclude':    ''
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
	ocd = document.getElementsByClassName(options.classname);
	scrollPos = window.pageYOffset;
	for (var i = ocd.length - 1; i >= 0; i--) {
		elemTop = ocd[i].offsetTop;
		if(Math.abs(scrollPos - elemTop) <= options.diff){
			smoothScroll(elemTop,options.speed);
		}
	}
}
function scrollOCDexclude(elem){
	if(typeof elem[0] === "undefined"){
		return false
		console.log('helo')
	}
	else{
		elem = elem.split(',');
		for(var i in elem){
			if(elem[i].substring(0,1) == '.'){
				exclude = document.getElementsByClassName(elem[i].substring(1))[0];
			}
			else if(elem[i].substring(0,1) == '#'){
				exclude = document.getElementById(elem[i].substring(1));
			}
			else{
				exclude = document.getElementsByTagName(elem[i])[0];
			}
			excludeTop = exclude.offsetTop;
			excludeBottom = excludeTop + exclude.offsetHeight;
			visibleTop = window.pageYOffset;
			visibleBottom = visibleTop + window.innerHeight;
			offsetTop = (excludeTop + exclude.offsetHeight) - visibleTop;
			offsetBottom = visibleBottom - excludeTop;
			magicDiff = options.diff + 101;
			isVisible = (excludeTop >= visibleTop && excludeBottom <= visibleBottom) ? true : false;
			if(!isVisible){
				isVisible = (offsetBottom <= magicDiff && offsetBottom > 0) ? true : false;
			}
			
			if(!isVisible){
				isVisible = (offsetTop <= magicDiff && offsetTop > 0) ? true : false;
			}
			if(isVisible){
				return true
			}
		}
		if(!isVisible){
			return false
		}
	}
}

function scrollOCDexec(options){
	window.clearTimeout(scrollInt);
	scrollInt = window.setTimeout(function(){
		if(!scrollOCDexclude(options.exclude)){
			scrollOCD(options);
		}
	},options.timeout);
}

scrollEvent = 'mousewheel';
isFireFox = (navigator.userAgent.indexOf('Firefox') != -1);
if(isFireFox){
	scrollEvent = 'DOMMouseScroll';
}
if(!!('ontouchstart' in window)){
	scrollEvent = 'touchmove';
}

var scrollInt = null;
if(!options.minWidth || window.innerWidth >= options.minWidth){
	document.addEventListener(scrollEvent,function(){
		scrollOCDexec(options)
	},false);

	document.addEventListener('keydown',function(e){
		if(e.keyCode == 38 || e.keyCode == 40){
			scrollOCDexec(options)
		}
	},false)
}