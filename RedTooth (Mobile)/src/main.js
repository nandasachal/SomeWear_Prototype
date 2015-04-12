//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');

var scrollingExample = require("scrollingexample.js");
var addClothingModal = require("addClothingModal.js");
var navigationBar = require("navigationBar.js");
var clothingScreen = require("clothing.js");

navigationBar.navBar.titleWords.string = "CLOTHING";
application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
		// Call ListBuilder for each element in our array of
		// list items.
		//scrollingExample.menuItems.forEach(scrollingExample.ListBuilder);
		//application.add(scrollingExample.screen);
		clothingScreen.clothingList.forEach(clothingScreen.ListBuilder);
		application.add(clothingScreen.screen);
		application.add(navigationBar.navBar);
	}},
	/*
	onDisplayed: function(application) {
		application.discover("redtooth_device.app");
	},
	onQuit: function(application) {
		application.forget("redtooth_device.app");
	},
	*/
});

/*
var deviceURL = "";

//Device Interaction
Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
		//trace("HELLOOOOOO");
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));
*/

//BUTTONS

