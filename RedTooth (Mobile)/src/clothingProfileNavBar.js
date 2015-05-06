// KPR Script file
var BUTTONS = require('controls/buttons');

var bigText = new Style({font:"bold 30px", color:"black"});

var tealVariantSkin = new Skin({fill:'#FF52b0b0'});
var headerStyle = new Style({font: 'Roboto bold 50px', color: 'white', align: "center,right"});
var buttonStyle = new Style({font: 'Roboto bold 50px', color: 'white', align:'middle'});
var deleteTexture = new Texture('../assets/new_deleteButtonGraphic.png');
var editTexture = new Texture('../assets/new_editButtonGraphic.png');
var backTexture = new Texture('../assets/new_backButtonGraphic.png');
var editIconSkin = new Skin({ texture: editTexture, height: 55, width:66, aspect: 'fit', });
var deleteIconSkin = new Skin({ texture: deleteTexture, height: 55, width: 66, aspect: 'fit', });
var backButtonSkin = new Skin({ texture: backTexture, top: 10, height:55, width: 66, aspect: 'fit', });


//common colors
var darkerTealColorLightOpacity = "#bb144644";
var darkerTealColorHeavy = "#FF347A75";
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";


var tealSkin = new Skin({fill: lightestTealColor});
var transparentTealSkin = new Skin({fill: darkerTealColorLightOpacity});

var editText = new Text({left:20, right:10, top: 10, height: 40, string: "This is the edit button. It's still a work in progress", style: bigText}),
var editCon = new Container({ top: 90, right: 30, bottom: 90, left: 30, skin: transparentTealSkin, contents:[editText],});



var buttonTemplate = BUTTONS.Button.template(function($, name){ return{
	top:0, bottom:0, left:0, right:0, height: 50, width: 10,
	contents:[
		new Label({left:0, right:0, top:0, bottom:0, string:$.textForLabel, style:buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if (content == backButton) {
				application.remove(navBar);
				application.remove(clothingProfile.newCon);
				application.add(clothingScreen.refreshClothingScreen());
    			application.add(hangerManager.syncBar);
    			application.add(navigationBar.navBar);
    			application.add(navigationBar.tabBar);
				hangerManager.dimAll();
			}
			
			if (content == deleteIcon) {
				clothingProfile.remover();
			}
			if (content == editIcon) {
				//bring up edit page
				application.add(editCon);
			}
		}}
	}),
	name: name
}});



//UI Elements
 
var backButton = new buttonTemplate({top: 5, textForLabel:'', name: 'backButton'});
backButton.skin = backButtonSkin;

var deleteIcon = new buttonTemplate({top: 5, textForLabel:'', name: 'deleteIcon'});
deleteIcon.skin = deleteIconSkin;

var editIcon = new buttonTemplate({top: 5, textForLabel:'', name: 'editIcon'});
editIcon.skin = editIconSkin;


var navBar = new Line({left:0, right:0, top:0, bottom:418, height: 42, skin: tealVariantSkin, name: 'titleBar', contents:[
	//switchIcon,
	//new Label({left:30, right:0, top:0, bottom:0, height: 30, width: 40, name:"titleWords", string:"", style:headerStyle}),
	backButton,
	deleteIcon,
	editIcon,
	]
});


//External Items

exports.navBar = navBar;