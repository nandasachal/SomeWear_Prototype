//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');

var categoryScreen = require("categoryScreen.js");
var addClothingModal = require("addClothingModal.js");
var navigationBar = require("navigationBar.js");
var clothingScreen = require("clothingScreen.js");
var category = require("category.js");
var hangerManager = require("hangerManager.js");
var clothing = require("clothing.js");

navigationBar.navBar.titleWords.string = " CLOTHING";
application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
		// Call ListBuilder for each element in our array of
		// list items.
		categoryScreen.menuItems.forEach(categoryScreen.ListBuilder);
		//application.add(scrollingExample.screen);
		clothingScreen.clothingList.forEach(clothingScreen.ListBuilder);
		application.add(clothingScreen.screen);
		application.add(navigationBar.navBar);

		sports = category.Category(name="Sports", color="orange", subcategories=["baseball", "soccer"], clothing=["sock", "pants"]);

		trace("nextIdNum = " + clothingScreen.nextIdNum + "\n");

	}},
	onDisplayed: { value: function(application) {
		application.discover("redtooth_device.app");
	}},
	onQuit: { value: function(application) {
		application.forget("redtooth_device.app");
	}},
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

