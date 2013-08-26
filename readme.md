#scrollOCD
Pure JavaScript-based (no jQuery or whatsoever) that causes an automatic scroll to the designed position. To see it in action, see the [demo](http://japborst.github.io/scrollOCD).

#Changelog
**v1.0**: First final version.

#Usage
Include the script just before the `body` tag. 

	<script src="scrollOCD.min.js"></script>

If you'd like to customize it, you may include the following afterwards and use what is needed - hence, only set the parameters you need. These are the default options:

	<script>
		scrollOCDinit({
			'classname': 	'ocd',
			'diff': 		200,
			'timeout': 		1500,
			'minWidth': 	1280,
			'resize': 		true
		});
	</script>

`classname` is the class that is applied on the element that the script needs to scroll to, in this case `.ocd`

`diff` is the maximum difference between the current scroll position and the closest element that has the class of `classname`. In this case: `200px`. Note: It is meant only for small adjustments, therefore large values are not recommended.

`timeout` is the amount of `ms` it will wait after the user stops scrolling to trigger the scroll. Here: `1500ms`.

`minWidth` can be set to a value, in this case `1280px`, or `false` to disable its functionality. Basically, this is the minimum `viewport-width` of the browser for the script to be triggered as in many cases you'll only want this on larger screens.

`resize`: either `true` or `false` whether it should be triggered after a `viewport` resize.