//@program

//NAVIGATION BAR FOR CLOTHING AND CATEGORIES PAGES

var BUTTONS = require('controls/buttons');

/*var categoryDetailView = require('categoryDetailView.js');
var hangerManager = require('hangerManager.js');*/

var tealVariantSkin = new Skin({fill:'#FF52b0b0'});
var headerStyle = new Style({font: 'Roboto bold 50px', color: 'white', align: "center,right"});
var buttonStyle = new Style({font: 'Roboto bold 50px', color: 'white', align:'middle'});
var briefcaseTexture = new Texture('../assets/switchToCategoriesGraphic.png');
//var clothingTexture = new Texture('../assets/tShirtMockNEW.png');
var clothingTexture = new Texture('../assets/switchToClothingGraphic.png');
var addTexture = new Texture('../assets/okayButtonGraphic.png');
var deleteTexture = new Texture('../assets/deleteButton.png');
var clothingIconSkin = new Skin({ texture: clothingTexture, height: 55, width:70, aspect: 'fit', });
var briefcaseIconSkin = new Skin({ texture: briefcaseTexture, height: 55, width: 70, aspect: 'fit', });
var addButtonSkin = new Skin({ texture: addTexture, top: 10, height:55, width: 70, aspect: 'fit', });
var deleteButtonSkin = new Skin({ texture: deleteTexture, top: 10, height:55, width: 100, aspect: 'fit', });


var currentCategorySelected;

var storeToggledOnCategoryObject = function($) {
	currentCategorySelected = $;
}

var buttonTemplate = BUTTONS.Button.template(function($, name){ return{
	top:0, bottom:0, left:0, right:0, height: 50, width: 10,
	contents:[
		new Label({left:0, right:0, top:0, bottom:0, string:$.textForLabel, style:buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if (content == backButton) {
				/*if (navBar.titleWords.string.trim() == "CLOTHING") {
					application.add(addClothingModal.modal);
					addClothingModal.clear();
					application.remove(clothingScreen.screen);
				} else {
					application.add(addCategory.modal);
					application.remove(categoriesScreen.screen);
				}*/
				application.remove(navBar);
				application.remove(categoryDetailView.screen);
				application.remove(categoryDetailView.bg);
				hangerManager.dimAll();
			}
			
			if (content == deleteButton) {
				var index = category.categories.indexOf(currentCategorySelected);
				category.categories.splice(index,1);
	            application.replace(categoryScreen.screen, categoryScreen.listRefresh());
				application.remove(navBar);
				application.remove(categoryDetailView.screen);
				application.remove(categoryDetailView.bg);
				hangerManager.dimAll();
				
			}
			
			if (content == switchIcon) {
				/*if (navBar.titleWords.string.trim() == "CLOTHING") {

			 	    application.add(categoriesScreen.screen);
			  		application.remove(clothingScreen.screen);
					navBar.titleWords.string = "CATEGORIES";
					navBar.first.skin = clothingIconSkin;
				} else {

					application.add(clothingScreen.screen);
			  		application.remove(categoriesScreen.screen);
					navBar.titleWords.string = " CLOTHING";
					navBar.first.skin = briefcaseIconSkin;
				}*/
			}
			

		}}
	}),
	name: name
}});

//UI Elements
 
var backButton = new buttonTemplate({top: 5, textForLabel:'', name: 'backButton'});
backButton.skin = addButtonSkin;

var switchIcon = new buttonTemplate({top: 5, textForLabel:'', name: 'switchIcon'});
switchIcon.skin = briefcaseIconSkin;

var deleteButton = new buttonTemplate({top: 5, textForLabel:'', name: 'backButton'});
deleteButton.skin = deleteButtonSkin;


var navBar = new Line({left:0, right:0, top:0, bottom:420, height: 50, skin: tealVariantSkin, name: 'titleBar', contents:[
	//switchIcon,
	//new Label({left:30, right:0, top:0, bottom:0, height: 30, width: 40, name:"titleWords", string:"", style:headerStyle}),
	backButton,
	deleteButton, 
	]
});


//External Items
exports.storeToggledOnCategoryObject = storeToggledOnCategoryObject;
exports.navBar = navBar;
exports.backButton = backButton;
exports.switchIcon = switchIcon;