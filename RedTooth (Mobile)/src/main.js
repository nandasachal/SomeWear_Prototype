//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');

var scrollingExample = require("scrollingexample.js");

application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
		// Call ListBuilder for each element in our array of
		// list items.
		scrollingExample.menuItems.forEach(scrollingExample.ListBuilder);
		application.add(scrollingExample.screen);
	}}
});

