var options;
function scrollOCDinit(args) {
	options = args
		defaults = {
	  	'classname': 	'ocd',
	  	'diff': 			200,
	  	'timeout': 		1500,
	  	'minWidth': 	1280,
	  	'resize': 		false
	  }
		for(var i in defaults) {
			if(typeof options[i] === "undefined") {
				options[i] = defaults[i];
			}
		}
		if(String(options.diff).indexOf('%') > -1){
			options.diff = window.innerHeight*parseInt(options.diff)/100;
		}
}
function smoothScroll(elemTop) {
		var start, stop, distance, speed, step, leap, timer
    start = window.pageYOffset;
    stop = elemTop;
    distance = stop > start ? -start + stop : start - stop;
    speed = Math.round(distance / 100);
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
			smoothScroll(elemTop);
		}
	}
}
function scrollOCDexec(options){
	if(!options.minWidth || window.innerWidth >= options.minWidth){
		window.clearTimeout(scrollInt);
		scrollInt = window.setTimeout(function(){
			scrollOCD(options);
		},options.timeout);
	}
}

scrollOCDinit({});
var scrollInt = null;
window.onscroll = function() {
	scrollOCDexec(options);
}
if(options.resize){
	window.onresize = function() {
		scrollOCDexec(options);
	}
}