//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var BUTTONS = require('controls/buttons');
var TRANSITIONS = require("transitions");

//common colors
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";
var brightestTealColor = "#FF4CAFB0";
var lightGrey = "#E0F2F4";
var greyBorderColor = "#AAAAAA";

//skins
var bgGreySkin = new Skin({fill: lightGrey});
var tealSkin = new Skin({ fill: lightestTealColor});
var onSkin	= new Skin({ fill: 'white', borders: { left:5, right:5, top:5, bottom:5 }, stroke: brightestTealColor});
var borderSkin = new Skin({fill: '#535454'});

//sizes 
var navBarSize = 42;
var navBarBottom = 412;
var tabBarSize = 35;
var topMargin = navBarSize + tabBarSize;

//file dependencies

	var category = require("category.js");
	var clothing = require("clothing.js");
	var clothingProfile = require("clothingProfile.js");
	var clothingProfileNavBar = require("clothingProfileNavBar.js");
	var clothingScreen = require("clothingScreen.js");
	var editClothingInCategory = require("editClothingInCategory.js")
	var editClothingInCategoryNavBar = require("editClothingInCategoryNavBar.js");
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


//var tabBarBottom = 387;

//navigationBar.navBar.titleWords.string = " CLOTHING";
application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
	
		application.add(new Container({ top: 0, right: 0, bottom: 0, left: 0, skin: bgGreySkin}))
	
	
		/* adding sample clothes to sample categories */
		
		for (var i = 0; i < clothing.sampleClothes.length; i++ ){
			for (var j = 0; j < category.categories.length; j++) {
				for (var k = 0; k < clothing.sampleClothes[i].categories.length; k++) {
					if (clothing.sampleClothes[i].categories[k].name == category.categories[j].name) {
						for (var l = 0 ; l < clothing.clothingInCloset.length; l++ ){
							if (clothing.sampleClothes[i].name == clothing.clothingInCloset[l].name) {
								clothing.clothingInCloset.categories.push(category.categories[k]);
								category.categories.clothing.push(clothing.clothingInCloset[l]);
							}
						}
					}
				}
			}
		
		}
		// Call ListBuilder for each element in our array of
		// list items.
		category.categories.forEach(categoryScreen.ListBuilder);
		//application.add(scrollingExample.screen);
		//clothing.clothingInCloset.forEach(clothingScreen.ListBuilder);
		clothingScreen.gridBuilder(clothing.clothingInCloset);
		application.add(clothingScreen.screen);
		application.add(navigationBar.navBar);
		application.add(navigationBar.tabBar);
		
		//application.add(navigationBar.navigation);


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

