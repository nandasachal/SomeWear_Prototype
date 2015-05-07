//@program

//NAVIGATION BAR FOR CLOTHING AND CATEGORIES PAGES

var BUTTONS = require('controls/buttons');



/* ASSETS */
var onColor = "#FFD599";
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var onSkin	= new Skin({ fill: onColor});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});

var tabBarSize = 30;
var navBarSize = 40;
var topMargin = tabBarSize + navBarSize;

/* STYLES */
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });


/*OG Styles*/
var bigText = new Style({font:"bold 30px", color:"black"});
var smallText = new Style({font:"bold 15px", color: "black", horizontal: "center"});
var largeText = new Style({font:"bold 30px", color:"black", horizontal: "center"});
var giantText = new Style({font:"bold 40px", color:"white", horizontal: "center"});
var whiteS = new Skin({fill:"white"});
var grayS = new Skin({fill:"gray"});
var blueS = new Skin({fill:"blue"});

//common colors
var darkerTealColorLightOpacity = "#bb144644";
var darkerTealColorHeavy = "#FF347A75";
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

var tealSkin = new Skin({fill: lightestTealColor});
var transparentTealSkin = new Skin({fill: darkerTealColorLightOpacity});

var okTexture = new Texture("../assets/new_okButtonGraphic.png");
var okButtonSkin = new Skin({texture: okTexture, width: 78, height: 50,});

var backTexture = new Texture("../assets/new_backBlueButtonGraphic.png");
var backButtonSkin = new Skin({texture: backTexture, width: 78, height: 50,});



/*var categoryDetailView = require('categoryDetailView.js');
var hangerManager = require('hangerManager.js');*/

var tealVariantSkin = new Skin({fill:'#FF52b0b0'});
var whiteSkin = new Skin({fill: "white"});
var headerStyle = new Style({font: 'Roboto bold 50px', color: 'white', align: "center,right"});
var buttonStyle = new Style({font: 'Roboto bold 50px', color: 'white', align:'middle'});
var buttonStyle2 = new Style({font: 'Roboto bold 50px', color: 'black', align:'middle'});
var bigText = new Style({font:"bold 30px", color:"black"});
var giantText = new Style({font:"bold 40px", color:"white", horizontal: "center"});

var briefcaseTexture = new Texture('../assets/switchToCategoriesGraphic.png');
//var clothingTexture = new Texture('../assets/tShirtMockNEW.png');
var clothingTexture = new Texture('../assets/switchToClothingGraphic.png');
var addTexture = new Texture('../assets/new_addButtonGraphic.png');
var backTexture = new Texture('../assets/new_backButtonGraphic.png');
var deleteTexture = new Texture('../assets/new_deleteButtonGraphic.png');
var editTexture = new Texture('../assets/new_editButtonGraphic.png');
var clothingIconSkin = new Skin({ texture: clothingTexture, height: 55, width:70, aspect: 'fit', });
var briefcaseIconSkin = new Skin({ texture: briefcaseTexture, height: 55, width: 70, aspect: 'fit', });
var addButtonSkin = new Skin({ texture: addTexture, top: 10, height:55, width: 70, aspect: 'fit', });
var editButtonSkin = new Skin({ texture: editTexture, top: 10, height:55, width: 66, aspect: 'fit', });
var deleteButtonSkin = new Skin({ texture: deleteTexture, top: 10, height:55, width: 66, aspect: 'fit', });
var backButtonSkin = new Skin({ texture: backTexture, top: 10, height:55, width: 66, aspect: 'fit', });


var currentCategorySelected;

var storeToggledOnCategoryObject = function($) {
	currentCategorySelected = $;
}

var deleteText = new Text({left:20, right:10, top: 10, height: 40, string: "Permanently delete ", style: giantText}),
var deleteText2 = new Text({left:20, right:10, top: 95, height: 40, string: "", style: giantText}),
var okText = new Text({left:25, right:25, top: 5, height: 40, string: "OK", style: bigText}),
var cancelText = new Text({left:5, right:5, top: 5, height: 40, string: "Cancel", style: bigText}),

var okCon = new Container({ height: 50, left: 15, bottom: 30, width: 78, skin: okButtonSkin, //skin: tealSkin, //contents:[okText],
	 behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, x,  y, ticks) {
    		for (var i = 0; i < currentCategorySelected.clothing.length; i++ ) {
    			for (var j = 0; j < clothing.clothingInCloset.length; j++ ) {
    				if (currentCategorySelected.clothing[i].name == clothing.clothingInCloset[j].name){
    					for (var k = 0; k < clothing.clothingInCloset[j].categories.length; k++ ){
    						if (clothing.clothingInCloset[j].categories[k].name == currentCategorySelected.name){
    							clothing.clothingInCloset[j].categories.splice(k,1);
    						}
    					}
    				}
    			}
    			
    		}
    		var index = category.categories.indexOf(currentCategorySelected);
			category.categories.splice(index,1);
			application.remove(deleteCon);    
	        application.replace(categoryScreen.screen, categoryScreen.refreshCategoryScreen());
			application.remove(navBar);
			application.remove(categoryDetailView.screen);
			application.remove(categoryDetailView.bg);
			hangerManager.dimAll();
    	}},
    }),
    active: true,
});

var cancelCon = new Container({ height: 50, right: 15, bottom: 30, width: 78, skin: backButtonSkin, //tealSkin, //contents:[cancelText],
	 behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		application.remove(deleteCon);
    	}},
    }),
    active: true,
});

var deleteCon = new Container({ top: 90, right: 30, bottom: 90, left: 30, skin: transparentTealSkin, contents:[deleteText, deleteText2, okCon, cancelCon],});

function remover() {
	//categoryDetailView.bg.remove(categoryDetailView.screen);
	application.add(deleteCon);
	deleteText2.string = categoryDetailView.currentCategory.name + "?";
}


var buttonTemplate = BUTTONS.Button.template(function($, name){ return{
	top:0, bottom:0, left:0, right:0, height: 50, width: 10,
	contents:[
		new Label({left:0, right:0, top:0, bottom:0, string:$.textForLabel, style:buttonStyle2})
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
				application.replace(categoryScreen.screen, categoryScreen.refreshCategoryScreen());
				application.remove(navBar);
				application.remove(categoryDetailView.screen);
				application.remove(categoryDetailView.bg);
				hangerManager.dimAll();
				
			}

			if (content == deleteButton) {
				remover();		
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

			if (content == editButton) {
				trace("edit button was toggled on\n");
				//categoryDetailView.setCategory();
				trace("current category = " + categoryDetailView.currentCategory + "\n");
				editCategory.refresh(categoryDetailView.currentCategory);
				application.replace(categoryDetailView.screen, categoryDetailView.blankScreen);
				application.add(editCategory.modal);
				
				
			}
			

		}}
	}),
	name: name
}});

//UI Elements
 
var backButton = new buttonTemplate({top: 10, textForLabel:'', name: 'backButton'});
backButton.skin = backButtonSkin;

var switchIcon = new buttonTemplate({top: 10, textForLabel:'', name: 'switchIcon'});
switchIcon.skin = briefcaseIconSkin;

var deleteButton = new buttonTemplate({top: 10, textForLabel:'', name: 'backButton'});
deleteButton.skin = deleteButtonSkin;

var editButton = new buttonTemplate({top: 10, textForLabel: '', name: 'editButton'});
editButton.skin = editButtonSkin;

var navBar = new Line({left:0, right:0, top:0, bottom:418, height: 42, skin: tealVariantSkin, name: 'titleBar', contents:[
	//switchIcon,
	//new Label({left:30, right:0, top:0, bottom:0, height: 30, width: 40, name:"titleWords", string:"", style:headerStyle}),
	backButton,
	deleteButton, 
	editButton
	]
});


//External Items
exports.storeToggledOnCategoryObject = storeToggledOnCategoryObject;
exports.navBar = navBar;
exports.backButton = backButton;
exports.switchIcon = switchIcon;