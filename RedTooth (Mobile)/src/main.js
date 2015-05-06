//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');

//common colors
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

//file dependencies

	var category = require("category.js");
	var clothing = require("clothing.js");
	var clothingScreen = require("clothingScreen.js");

	var editCategory = require("editCategory.js");
	var categoryDetailView = require("categoryDetailView.js");
	var categoryDetailViewNavBar = require("categoryDetailViewNavBar.js");
	var addClothingModal = require("addClothingModal.js");
	var addCategoryToClothing = require("addCategoryToClothing.js");
	var hangerManager = require("hangerManager.js");
	var categoryScreen = require("categoryScreen.js");
	var addCategoryToClothingNavBar = require("addCategoryToClothingNavBar.js");
	var addClothingToCategory = require("addClothingToCategory.js");
	var addClothingToCategoryNavBar = require("addClothingToCategoryNavBar.js");
	var addCategory = require("addCategory.js");
	var navigationBar = require("navigationBar.js");

//skins
var tealSkin = new Skin({ fill: lightestTealColor});


//navigationBar.navBar.titleWords.string = " CLOTHING";
application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
	
		application.add(new Container({ top: 0, right: 0, bottom: 0, left: 0, skin: tealSkin}))
	
		// Call ListBuilder for each element in our array of
		// list items.
		category.categories.forEach(categoryScreen.ListBuilder);
		//application.add(scrollingExample.screen);
		//clothing.clothingInCloset.forEach(clothingScreen.ListBuilder);
		clothingScreen.gridBuilder(clothing.clothingInCloset);
		application.add(clothingScreen.screen);
		application.add(navigationBar.navBar);
		application.add(navigationBar.tabBar);


		trace("nextIdNum = " + clothingScreen.nextIdNum + "\n");

		application.add(hangerManager.syncBar);


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

