//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');

var scrollingExample = require("scrollingexample.js");
var addClothingModal = require("addCLothingModal.js");

application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
		// Call ListBuilder for each element in our array of
		// list items.
		scrollingExample.menuItems.forEach(scrollingExample.ListBuilder);
		application.add(scrollingExample.screen);
	}}
});

