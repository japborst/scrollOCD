#scrollOCD
Pure JavaScript-based (no jQuery or whatsoever) that causes an automatic scroll to the designed position. To see it in action, see the [demo](http://japborst.github.io/scrollOCD).

#Changelog
**v1.0**: First final version.

#Usage
Include the script just before the `body` tag. 

If you'd like to customize it, you may include the following **before** and use what is needed - hence, only set the parameters you need. These are the default options:

	<script>
		var scrollOCDconfig = {
			'classname': 	'ocd',
			'diff': 			200,
			'speed': 			1,
			'timeout': 		1500,
			'minWidth': 	1280
		};
	</script>
	<script src="scrollOCD.min.js"></script>

`classname` is the class that is applied on the element that the script needs to scroll to, in this case `.ocd`

`diff`: `px` or `%`, is the maximum difference between the current scroll position and the closest element that has the class of `classname`. In this case: `200px`. Values in percentages are a fraction of the window height and written as `'diff': '10%'`. Note: It is meant only for small adjustments, therefore large values are not recommended.

`speed`: alter the scroll speed.

`timeout`: the amount of `ms` it will wait after the user stops scrolling to trigger the scroll. Here: `1500ms`.

`minWidth`: a value, in this case `1280px`, or `false` to disable its functionality. Basically, this is the minimum `viewport-width` of the browser for the script to be triggered as in many cases you'll only want this on larger screens.

#Compatibility
Works in all modern browsers. IE<9 will not work, unfortunately.