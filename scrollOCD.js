function scrollOCD (settings) {
		"use strict";
		settings = (typeof settings !== "undefined" ) ? settings : {};
		var defaults = {
			'classname':  'ocd',
			'diff':       200,
			'speed':      1,
			'timeout':    1500,
			'minWidth':   1280,
			'exclude':    ''
		};
		for(var i in defaults) {
			if(typeof settings[i] === "undefined") {
				settings[i] = defaults[i];
			}
		}
		if(String(settings.diff).indexOf('%') > -1){
			settings.diff = window.innerHeight*parseInt(settings.diff,10)/100;
		}

		function smoothScroll(elemTop,speedInt) {
			clearInterval(smoothInt);
			var start = window.pageYOffset,
					stop = elemTop,
					distance = stop - start,
					step = Math.round(distance / 20 * speedInt);
			smoothInt = setInterval(function(){
				scrollWindow(step,stop);
			},10);
		}

		function scrollWindow(incr,dest) {
			var yPos = window.pageYOffset;
			window.scrollTo(0,yPos + incr);
			if((incr > 0 && yPos + incr >= dest) || (incr < 0 && yPos + incr <= dest)){
				window.scrollTo(0,dest);
				clearInterval(smoothInt);
			}
		}

		function excludeElem(elem){
			if(typeof elem[0] === "undefined"){
				return false;
			}
			else{
				elem = elem.split(',');
				var exclude = null,
						isVisible = false;
				for (var i = elem.length - 1; i >= 0; i -= 1) {
					if(elem[i].substring(0,1) === '.'){
						exclude = document.getElementsByClassName(elem[i].substring(1))[0];
					}
					else if(elem[i].substring(0,1) === '#'){
						exclude = document.getElementById(elem[i].substring(1));
					}
					else{
						exclude = document.getElementsByTagName(elem[i])[0];
					}
					var excludeTop = exclude.offsetTop,
							excludeBottom = excludeTop + exclude.offsetHeight,
							visibleTop = window.pageYOffset,
							visibleBottom = visibleTop + window.innerHeight,
							offsetTop = (excludeTop + exclude.offsetHeight) - visibleTop,
							offsetBottom = visibleBottom - excludeTop,
							magicDiff = settings.diff + 101;
					isVisible = (excludeTop >= visibleTop && excludeBottom <= visibleBottom) ? true : false;
					if(!isVisible){
						isVisible = (offsetBottom <= magicDiff && offsetBottom > 0) ? true : false;
					}
					
					if(!isVisible){
						isVisible = (offsetTop <= magicDiff && offsetTop > 0) ? true : false;
					}
					if(isVisible){
						return true;
					}
				}
				if(!isVisible){
					return false;
				}
			}
		}

		function execute(settings){
			window.clearTimeout(scrollInt);
			scrollInt = window.setTimeout(function(){
				if(!excludeElem(settings.exclude)){
					var ocd = document.getElementsByClassName(settings.classname),
							scrollPos = window.pageYOffset;
					for (var i = ocd.length - 1; i >= 0; i -= 1) {
						var elemTop = ocd[i].offsetTop;
						if(Math.abs(scrollPos - elemTop) <= settings.diff){
							smoothScroll(elemTop,settings.speed);
						}
					}
				}
			},settings.timeout);
		}

		var scrollEvent = 'mousewheel',
				isFireFox = (navigator.userAgent.indexOf('Firefox') !== -1);
		if(isFireFox){
			scrollEvent = 'DOMMouseScroll';
		}
		if(!!('ontouchstart' in window)){
			scrollEvent = 'touchmove';
		}

		var scrollInt = null,
				smoothInt = null;
		if(!settings.minWidth || window.innerWidth >= settings.minWidth){
			document.addEventListener(scrollEvent,function(){
				execute(settings);
			},false);

			document.addEventListener('keydown',function(e){
				if(e.keyCode === 38 || e.keyCode === 40){
					execute(settings);
				}
			},false);
		}
}