//@program

//NAVIGATION BAR FOR CLOTHING AND CATEGORIES PAGES

var BUTTONS = require('controls/buttons');

var addClothingModal = require("addClothingModal.js");
var clothingScreen = require("clothingScreen.js");
var categoriesScreen = require("categoryScreen.js");
var addCategory = require("addCategory.js");
var addCategoryToClothing = require('addCategoryToClothing.js');
var categoryDetailView = require("categoryDetailView.js");
var addClothingToCategory = require('addClothingToCategory.js');

var tabBarSize = 30;

var tealVariantSkin = new Skin({fill:'#FF52b0b0'});
var whiteSkin = new Skin({fill:'white'});
var yellowSkin = new Skin({fill:'yellow'});
var greenSkin = new Skin({fill:'green'});
var tabUpSkin = new Skin({fill: "#B7D6D7"});
var tabDownSkin = new Skin({fill :"#F2F4F4"}); 

var logoImage = new Texture("../assets/somewear-logo-small.png");

var logoSkin = new Skin({
	width: 80,
	height: 25,
	texture: logoImage});

var headerStyle = new Style({font: 'Roboto bold 50px', color: 'white', align: "center,right"});
var tabStyle = new Style({font: 'Roboto 10px', color: 'black', align: "center,middle"});
var buttonStyle = new Style({font: 'Roboto bold 50px', color: 'white', align:'middle'});
var briefcaseTexture = new Texture('../assets/switchToCategoriesGraphic.png');
//var clothingTexture = new Texture('../assets/tShirtMockNEW.png');
var clothingTexture = new Texture('../assets/switchToClothingGraphic.png');
var addTexture = new Texture('../assets/addButtonGraphic.png');
var clothingIconSkin = new Skin({ texture: clothingTexture, height: 55, width:70, aspect: 'fit', });
var briefcaseIconSkin = new Skin({ texture: briefcaseTexture, height: 55, width: 70, aspect: 'fit', });
var addButtonSkin = new Skin({ texture: addTexture, top: 10, height:55, width: 70, aspect: 'fit', });


var buttonTemplate = BUTTONS.Button.template(function($, name){ return{
	top:0, bottom:0, left:0, right:0, height: 50, width: 10,
	contents:[
		new Label({left:0, right:0, top:0, bottom:0, string:$.textForLabel, style:buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if (content == addButton) {
				//if (navBar.titleWords.string.trim() == "CLOTHING") {
				if (clothingTab.skin == tabDownSkin) {
					application.invoke(new Message("/getCloset"));
				} else {
					addClothingToCategory.initialize();
					application.add(addCategory.modal);
					application.replace(categoriesScreen.screen, categoriesScreen.blankScreen);
				}

			}
			
			/*if (content == switchIcon) {
				if (navBar.titleWords.string.trim() == "CLOTHING") {
			  		application.replace(clothingScreen.screen, categoriesScreen.screen);
					navBar.titleWords.string = "CATEGORIES";
					navBar.first.skin = clothingIconSkin;
				} else {
			  		application.replace(categoriesScreen.screen, clothingScreen.screen);
					navBar.titleWords.string = " CLOTHING";
					navBar.first.skin = briefcaseIconSkin;
				}
			}*/
			

		}}
	}),
	name: name
}});

//UI Elements
 
var addButton = new buttonTemplate({top: 5, textForLabel:'', name: 'addButton'});
addButton.skin = addButtonSkin;

var switchIcon = new buttonTemplate({top: 5, textForLabel:'', name: 'switchIcon'});
switchIcon.skin = briefcaseIconSkin;

var navBar = new Line({left:0, right:0, top:0, bottom:420, height: 40, skin: tealVariantSkin, name: 'titleBar', contents:[
	//switchIcon,
	//new Label({left:120, right:0, top:0, bottom:0, height: 30, width: 40, name:"titleWords", string:"SomeWear", style:headerStyle}),
	new Container({left: 75, right: 0, top: 0, bottom: 0, height: 25, width: 80, skin: logoSkin, 
		behavior: Object.create(Behavior.prototype, {
			onTouchEnded: function() {
				trace("you touched the logo!\n");
			}
		})
	}),
	addButton, 
	],
	behavior: Object.create(Behavior.prototype, {
		onTouchEnded: function() {
			trace("you touched the navBar!\n");
		}
	})
	
});



var goToCategoriesPage = {
	onTouchEnded: function(){
		trace("trying to go to categories page\n");
		if (categoriesTab.skin == tabDownSkin) {
			return;
		} else {
			trace("hi\n");
			categoriesTab.skin = tabDownSkin;
			clothingTab.skin = tabUpSkin;
			application.replace(clothingScreen.screen, categoriesScreen.screen);
		}
	}
}

var goToClothingPage = {
	onTouchEnded: function(){
		trace("trying to go to clothing page\n");
		if (clothingTab.skin == tabDownSkin) {
			return;
		} else {
			clothingTab.skin = tabDownSkin;
			categoriesTab.skin = tabUpSkin;
			application.replace(categoriesScreen.screen, clothingScreen.screen);
		}
	}
}

var categoriesTab = new Container({left: 0, right: 0, top: 0, bottom: 0, skin: tabUpSkin, name: '', behavior: goToCategoriesPage, active:true,
	contents: [
		new Label({left:30, right:0, top:0, bottom:0, name:"categoriesTab", string:"CATEGORIES", style:tabStyle, behavior: goToCategoriesPage})
	],
});

var clothingTab = new Container({left: 0, right: 0, top: 0, bottom: 0, skin: tabDownSkin, name: '', behavior: goToClothingPage, active: true,
	contents: [
		new Label({left:40, right:0, top:0, bottom:0, name:"clothingTab", string:"CLOTHING", style:tabStyle})
	],
});

var tabBar = new Line({left: 0, right: 0, top: 40, bottom: 390, height: tabBarSize, skin: whiteSkin, name:'tabBar', contents: [
	categoriesTab, clothingTab
	],
	behavior: {
		onTouchEnded: function() {
			trace("you touched me!\n");
		}
	}
});

trace("lalala\n");


//External Items

exports.navBar = navBar;
exports.addButton = addButton;
exports.switchIcon = switchIcon;
exports.tabBar = tabBar;