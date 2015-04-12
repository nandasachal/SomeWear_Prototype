//@program

//NAVIGATION BAR FOR CLOTHING AND CATEGORIES PAGES

var BUTTONS = require('controls/buttons');

var addClothingModal = require("addClothingModal.js");

var tealVariantSkin = new Skin({fill:'#FF52b0b0'});
var headerStyle = new Style({font: 'bold 24px', color: 'white', align: 'center, middle'});
var buttonStyle = new Style({font: 'bold 50px', color: 'white', align:'center, middle'});
var briefcaseTexture = new Texture('briefcaseWORK.png');
var clothingTexture = new Texture('tShirtMockNEW.png');
var clothingIconSkin = new Skin({ texture: clothingTexture, width: 50, height: 50, aspect: 'fit', });
var briefcaseIconSkin = new Skin({ texture: briefcaseTexture, width: 50, height: 50, aspect: 'fit', });


var buttonTemplate = BUTTONS.Button.template(function($, name){ return{
	top:0, bottom:0, left:0, right:0, height: 50, width: 10,
	contents:[
		new Label({left:0, right:0, top:0, bottom:0, string:$.textForLabel, style:buttonStyle})
	],
	behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
		onTap: { value: function(content) {
			if (content == switchIcon) {
				if (navBar.titleWords.string == "CLOTHING") {
					navBar.titleWords.string = "CATEGORIES";
					//navBar.clothingIcon.skin = clothingIconSkin;
					navBar.first.skin = clothingIconSkin;
				} else {
					navBar.titleWords.string = "CLOTHING";
					navBar.first.skin = briefcaseIconSkin;
				}
				
			}
			if (content == addButton && navBar.titleWords.string.toLowerCase() == 'clothing') {
			  application.add(addClothingModal.modal);
			}
		}}
	}),
	name: name
}});

//UI Elements
 
var addButton = buttonTemplate({textForLabel:'+', name: 'addButton'});

var switchIcon = new buttonTemplate({textForLabel:'', name: 'switchIcon'});
switchIcon.skin = briefcaseIconSkin;

var navBar = new Line({left:0, right:0, top:0, bottom:420, height: 50, skin: tealVariantSkin, name: 'titleBar', contents:[
	switchIcon,
	new Label({left:0, right:0, top:0, bottom:0, height: 30, width: 60, name:"titleWords", string:"", style:headerStyle}),
	addButton, 
	]
});

//External Items

exports.navBar = navBar;
exports.addButton = addButton;
exports.switchIcon = switchIcon;