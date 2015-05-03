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
var limeGreenVariantColor = '#FFC4EE6F';
var watermelonVariantColor = '#FFFF7777';
var cremeBruleeVariantColor = '#FFFFD277';
var purpleVariantColor = '#FF7E76B7';
var renaissanceBlueVariantColor = '#FF4A9BCD';
var orangeCreamsicleVariantColor = '#FFF3A05B';
var caterpieGreenVariantColor = '#FFDA78B0';
var pikachuYellowVariantColor = '#FFFEF493';
var darkerTealColorLightOpacity = "#bb144644";
var darkerTealColorHeavy = "#FF347A75";

//skins
var tealSkin = new Skin({ fill: lightestTealColor});
var whiteSkin = new Skin({fill: 'white'});
var blackSkin = new Skin({fill: 'black'});
var redSkin = new Skin({fill: 'red'});
var orangeSkin = new Skin({fill: 'orange'});
var yellowSkin = new Skin({fill: 'yellow'});
var greenSkin = new Skin({fill: 'green'});
var blueSkin = new Skin({fill: 'blue'});
var onSkin	= new Skin({ fill: "#FFD599"});
var separatorSkin = new Skin({ fill: 'silver',});
var tealSkin = new Skin({fill: darkerTealColorLightOpacity});
var syncSkin = new Skin({fill: darkerTealColorHeavy });
var whiteS = new Skin({fill:"white"});
var grayS = new Skin({fill:"gray"});
var blueS = new Skin({fill:"blue"});
var tealVariantSkin = new Skin({fill:tealColor});
var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: lightestTealColor,});
var onSkin = new Skin({fill: "gray"});

//styles
var bigText = new Style({font:"bold 10px", color:"#FFFFFF"});
var largeText = new Style({font:"bold 30px", color:"white"});
var smallText = new Style({font:"20px", color:"white"});
var headerStyle = new Style({font: 'Roboto bold 50px', color: 'white', align: "center,right"});
var buttonStyle = new Style({font: 'Roboto bold 50px', color: 'white', align:'middle'});
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: lighterTealColor, font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var labelStyle = new Style( { font: "Roboto bold 30px", color:"white" } );
var titleStyle = new Style( { font: "bold 30px", color:"white" } );

//size variables stuff
var screens = []; //need to figure out how to use this
var tabBarHeight = 30;
var navBarHeight = 40;
var inputData = "";
var selectedClothing = [];

//file dependencies
var OBJECTS = require('objects');
var CUSTOM_BUTTONS = require('buttons');
var NEW_CLOTHING_MODAL = require('modals/newClothingModal');
var CLOTHING_DETAIL_VIEW_SCREEN = require('clothing_screens/clothingDetailViewScreen');
var CATEGORIES_DETAIL_VIEW_SCREEN = require('categories_screens/categoriesDetailViewScreen');
var ADD_CATEGORIES_TO_CLOTHING_SCREEN = require('add_screens/addCategoriesToClothingScreen');
var ADD_CLOTHING_TO_CATEGORIES_SCREEN = require('add_screens/addClothingToCategoriesScreen');
var ADD_SUB_CATEGORIES_SCREEN = require('add_screens/addSubCategoriesScreen');
var ADD_CATEGORIES_SCREEN = require('add_screens/addCategoriesScreen');
var ADD_CLOTHING_SCREEN = require('add_screens/addClothingScreen');
var CATEGORIES_SUB_SCREEN = require('categories_screens/categoriesSubScreen');
var CATEGORIES_SCREEN = require('categories_screens/categoriesScreen');
var CLOTHING_SCREEN = require('clothing_screens/clothingScreen');

var previousScreen;
var nullScreen = new Container.template(function($){ return{}});
var nullFunc = function() {
	return;
};
var currentScreen = new CLOTHING_SCREEN.createScreen();
application.add(currentScreen);
