#scrollOCD
Pure JavaScript-based (no jQuery or whatsoever) that causes an automatic scroll to the designed position. To see it in action, see the [demo](http://japborst.github.io/scrollOCD).

##In the wild
[Pluskids](http://pluskids.nl)

#Changelog
**v1.2**: Performance and JS improvements
**v1.1**: Includes support for excluded elements, percentage-based difference and performance improvements.
**v1.0**: First final version.

#Usage
Include the script just before the closing `</body>` tag and initialise it. The function accepts one argument, being the settings. Set only the ones you need; below are the defaults:

	<script src="scrollOCD.min.js"></script>
	<script>
		var scrollOCDinstance = new scrollOCD({
			'classname':  'ocd',
			'diff':       200,
			'speed':      1,
			'timeout':    1500,
			'minWidth':   1280,
			'exclude':    ''
		});
	</script>

`classname` is the class that is applied on the element that the script needs to scroll to, in this case `.ocd`

`diff`: `px` or `%`, is the maximum difference between the current scroll position and the closest element that has the class of `classname`. In this case: `200px`. Values in percentages are a fraction of the window height and written as `'diff': '10%'`. Note: It is meant only for small adjustments, therefore large values are not recommended.

`speed`: alter the scroll speed.

`timeout`: the amount of `ms` it will wait after the user stops scrolling to trigger the scroll. Here: `1500ms`.

`minWidth`: a value, in this case `1280px`, or `false` to disable its functionality. Basically, this is the minimum `viewport-width` of the browser for the script to be triggered as in many cases you'll only want this on larger screens.

`exclude` is a comma-seperated list of elements (classes, id's and tags) that needs to be excluded i.e. when visible it won't snap to an element. Example: `'.excludeMe,#meToo,footer'`.

#Compatibility
Works in all modern browsers. IE<9 will not work, unfortunately.