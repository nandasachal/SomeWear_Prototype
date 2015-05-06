//@module

// testing scroller

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
//var clothing = require("clothing.js");

/* ASSETS */

//colors
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

var onColor = "#FFD599";
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
//var offColor = "#999999";
var borderWhiteSkin = new Skin({ fill: 'white', borders: {left: 0.5, right: 2, bottom: 2, top: 0.5}, stroke: greyBorderColor});
//var onSkin	= new Skin({ fill: onColor});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var tealSkin = new Skin({ fill: lightestTealColor});

/* STYLES */
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });

/* STATIC */
/* A simple array of objects. Each will be used as a single
 * entry in our scrollable list. */

//skins

var selectedClothing = [];

/* This is a template that will be used to for each entry populating the list. 
 * Note that it is anticipating an object each time in is instanciated */
var ProcessorLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: THEME.lineSkin, 
    behavior: Object.create(Behavior.prototype, {
    	/* Gives the user some visual feedback on which entry they have tapped.
    	 * note that the skin is reverted to white in onTouchEnded() */    	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		//container.skin = yellowSkin;
    	}},
    	/* Traces out the value of the first Label's string. The
    	 * silly string of "first" in the trace can be thought of as
    	 * container.Column.Container.Label.string.  This pattern can
    	 * be seen reading down the contents of this object below */
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
			/*container.skin = whiteSkin;
			trace(container.first.first.first.string+"\n");*/
			if (!$.toggleOn) {
				container.first.skin = onSkin;
				trace("toggled on!\n");
				$.toggleOn = true;
				selectedClothing.push($);
			} else if ($.toggleOn) {
				container.first.skin = new Skin({fill: $.color});
				trace("toggled off!\n");
				$.toggleOn = false;
				selectedClothing.splice(selectedClothing.indexOf($), 1);
			}
		}}
    }),
	contents: [
     	Column($, { left: 0, right: 0, skin: new Skin({fill: $.color}), contents: [
     		Container($, { left: 0, right: 0, height: 100, width: 100, 
     			contents: [
     			           /* This label expects that the object passed to ProcessorLine() 
     			            * includes a value for title.  Note that this Label is not marked
     			            * as active. Touches registered here will bubble back up to the
     			            * nested objects until it hits one which is active. */
     			           new Picture( {left:0, right:0, top:0, width: 100, height: 100, name: 'picture', url: $.photo,}),
     			           Label($, { style: productNameStyle, string: $.name,}), 
 			           ], 
	           }),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});

/* This is template for a container which takes up the
 * whole screen.  It contains only a single object,
 * the SCROLLER.VerticalScroller.  Although we are not
 * referencing any values from an object passed on creation,
 * an object is still required as the SCROLLER uses it internally. */
var ScreenContainer = Container.template(function($) { return {
	left:0, right:0, top:40, bottom:0,
	contents: [
	   		/* Note that the scroller is declared as having only an empty
	   		 * Column and a scrollbar.  All the entries will be added 
	   		 * programmatically. */ 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});

var data = new Object();
var screen = new ScreenContainer(data);

/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ListBuilder(element, index, array) {
	screen.first.menu.add(new ProcessorLine(element));
}



/*application.behavior = Object.create(Object.prototype, {
	onLaunch: { value: function(application) {
		// Call ListBuilder for each element in our array of
		// list items.
		
		application.add(screen);
	}}
});*/


/* GRID VIEW START */
var selectedClothingSkin = new Skin({fill: brightestTealColor});

var clothingGridItemTemplate = Container.template(function($) {
	trace("do we get into clothingGridItemTemplate creation?\n");
	for (var i = 0; i < $.category.clothing.length; i++) {
		if ($.data == $.category.clothing[i]) {
			selectedClothing.push($.category.clothing[i]);
			return {
				width: 150, top: 0, bottom: 0, active: true,
				behavior: Object.create(Behavior.prototype, {
					onTouchBegan: { value : function(container, id, x, y, ticks)  {
					}},
					onTouchEnded: { value: function(container, id, y, x, ticks) {
						if (container.first.first.next.skin == whiteSkin) {
							trace("clothing was toggled on!");
							container.first.first.next.skin = selectedClothingSkin;
							container.first.skin = onSkin;
							selectedClothing.push($.data);
						} else if (container.first.first.next.skin == selectedClothingSkin) {
							trace("clothing was toggled off!");
							container.first.first.next.skin = whiteSkin;
							container.first.skin = borderWhiteSkin;
							selectedClothing.splice(selectedClothing.indexOf($.data), 1);
						}
					}}
				}),
				contents: [
					new Column( { left: 10, right: 10, top: 10, bottom: 10, skin: onSkin, contents: [ 
		     			new Picture( {left:0, right:0, top:5, bottom: 0, width: 100, height: 100, name: 'picture', url: $.data.photo,}),
		     			new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:selectedClothingSkin, contents: [
		     				new Container( { top: 10, bottom: 10, contents: [ Label($, { style: productNameStyle, string: $.data.name,}), ]})
		     			]})
		     			]
		     		})
				],
				/*effects: [
					outer-shadow: 1;
				]*/
			}
		}
	}
	return {
		width: 150, top: 0, bottom: 0, active: true,
		behavior: Object.create(Behavior.prototype, {
			onTouchBegan: { value : function(container, id, x, y, ticks)  {
			}},
			onTouchEnded: { value: function(container, id, y, x, ticks) {
				if (container.first.first.next.skin == whiteSkin) {
					trace("clothing was toggled on!");
					container.first.first.next.skin = selectedClothingSkin;
					container.first.skin = onSkin;
					selectedClothing.push($.data);
				} else if (container.first.first.next.skin == selectedClothingSkin) {
					trace("clothing was toggled off!");
					container.first.first.next.skin = whiteSkin;
					container.first.skin = borderWhiteSkin;
					selectedClothing.splice(selectedClothing.indexOf($.data), 1);
				}
			}}
		}),
		contents: [
			new Column( { left: 10, right: 10, top: 10, bottom: 10, skin: borderWhiteSkin, contents: [ 
     			new Picture( {left:0, right:0, top:5, bottom: 0, width: 100, height: 100, name: 'picture', url: $.data.photo,}),
     			new Container({ left: 2, right: 2, top: 2, bottom: 2, skin:whiteSkin, contents: [
     				new Container( { top: 10, bottom: 10, contents: [ Label($, { style: productNameStyle, string: $.data.name,}), ]})
     			]})
     			]
     		})
		],
		/*effects: [
			outer-shadow: 1;
		]*/
	}
});

var emptyGridItemTemplate = Container.template(function ($) {
	return {
		left: 10, right: 10, top: 10, bottom: 10, width: 130, active: false,
	}
});

var clothingLineInGridTemplate = Line.template(function ($) {
	return {
		left: 0, right: 0, top: 0, bottom: 0,
		contents:[],
	}
});

var clothingScreenContainer = Container.template(function($) { return {
	left:10, right:10, top:40, bottom: 0,
	contents: [
	   		/* Note that the scroller is declared as having only an empty
	   		 * Column and a scrollbar.  All the entries will be added 
	   		 * programmatically. */ 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'clothingColumn', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});
	
var screen = clothingScreenContainer(data);
	
function gridBuilder(inputClothingList, inputCategory) {
	for (var i = 0; i < inputClothingList.length; i+=2) {
		newGridLine = new clothingLineInGridTemplate();
		trace("inputCategory = " + inputCategory);
		newGridLine.add(new clothingGridItemTemplate({ data: inputClothingList[i], category: inputCategory }));
		if (inputClothingList.length%2 == 1 && i == inputClothingList.length - 1){ // if the input clothing list length is odd, only add 1 item
			newGridLine.add(new emptyGridItemTemplate());
			screen.first.clothingColumn.add(newGridLine);
			trace("added 1 item\n");
			return;
		} else {
			newGridLine.add(new clothingGridItemTemplate({ data: inputClothingList[i+1], category: inputCategory }));
			screen.first.clothingColumn.add(newGridLine);
			trace("added 2 item\n");
		}
	}
}

	
function refreshClothingScreen(currentCategory) {
	selectedClothing = [];
	exports.selectedClothing = selectedClothing;
	var data = new Object();
	screen = new clothingScreenContainer(data);
	gridBuilder(clothing.clothingInCloset, currentCategory);

	exports.screen = screen;
	
	return screen;

}

/* GRID VIEW END */


var bg = new Container({ top: 0, right: 0, bottom: 0, left: 0, skin: tealSkin });

function initialize() {
	selectedClothing = [];
	exports.selectedClothing = selectedClothing;
	data = new Object();
	screen = new ScreenContainer(data);
	clothing.clothingInCloset.forEach(ListBuilder);
	exports.screen = screen;
	return screen;
}

exports.ListBuilder = ListBuilder;
//exports.menuItems = menuItems;
//exports.clothing = clothing;
exports.screen = screen;
exports.blankScreen = new Container({active: false});
exports.initialize = initialize;
exports.bg = bg;
exports.selectedClothing = selectedClothing;
exports.refreshClothingScreen = refreshClothingScreen;

