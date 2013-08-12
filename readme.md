#scrollOCD
This is a fork of [windows](http://nick-jonas.github.io/windows/) by Nick Jonas. Unfortunately, it is not available on GitHub anymore.

#Adjustments
**v0.1**: To fit the needs of the OCD scroller, the script's been adjusted to only scroll to the element that is in a 200px range of the current window offset. Additionally, it's been modified in a way that it takes the footer into account as well so that when one's exploring the footer's content (perhaps a `nav`), it doesn't scroll away from it. For mobile devices it wasn't suited in my use case,
therefore it only triggers if the screensize is larger than 1280px.

Currently you have to modify line 129 to fit your needs.

#Notes
Currently requires jQuery. My goal is to make a completely new version that solely relies on pure JavaScript and that all settings are easily customizable.