//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var clothing = require("clothing.js");

/* ASSETS */
var onColor = "#FFD599";
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var onSkin	= new Skin({ fill: onColor});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});

/* SIZES */
var tabBarSize = 30;
var navBarSize = 40;
var topMargin = tabBarSize + navBarSize;

/* STYLES */
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });

/* STATIC */
/* A simple array of objects. Each will be used as a single
 * entry in our scrollable list. */
/*var menuItems = [
    	{title: 'Pentium', button: 'P5'},
    	{title: 'Pentium MMX', button: 'Tillamook'},
    	{title: 'Pentium Pro', button: 'P6'},
    	{title: 'Pentium II', button: 'Klamath'},
    	{title: 'Pentium III', button: 'Coppermine'},
    	{title: 'Pentium IV', button: 'Prescott'},
    	{title: 'Pentium M', button: 'Dothan'},
    	{title: 'Core Duo', button: 'Yonah'},
    	{title: 'Core 2 Duo', button: 'Penryn'},
    	{title: 'Core i7', button: 'Sandy Bridge'}
    	];*/
    	
var nextIdNum = 8;
    	
    	

/* STATIC */
/* A simple array of objects. Each will be used as a single
 * entry in our scrollable list. */

/*var clothingList = [
    	{name: 'blue shirt', idNum: 1, photo:"../assets/shirt.png", toggleOn: false},
    	{name: 'gray shirt', idNum: 2, photo:"../assets/shirt.png", toggleOn: false},
    	{name: 'black shirt1', idNum: 3, photo: "../assets/shirt.png", toggleOn: false},
    	{name: 'black shirt2', idNum: 4, photo: "../assets/shirt.png", toggleOn: false},
    	{name: 'black shirt3', idNum: 5, photo: "../assets/shirt.png", toggleOn: false},
    	{name: 'black shirt4', idNum: 6, photo: "../assets/shirt.png", toggleOn: false},
    	{name: 'black shirt5', idNum: 7, photo: "../assets/shirt.png", toggleOn: false},
];*/


var clothingList = clothing.clothingInCloset;

var imageDimension = 120;

/* This is a template that will be used to for each entry populating the list. 
 * Note that it is anticipating an object each time in is instanciated */
var ClothingSubContainer = Container.template(function($) { return { left: 0, right: 0, top: 0, active: true, //skin: whiteSkin, //skin: THEME.lineSkin, 
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
			if (!$.toggleOn) {
				container.first.first.skin = onSkin;
				$.toggleOn = true;
				trace(container.first.first.last.string+"\n");
			} else if ($.toggleOn) {
				container.first.first.skin = whiteSkin;
				$.toggleOn = false;
				trace(container.first.first.last.string+"\n");
			}
		}}
    }),
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 0, right: 0, height: 100, width: 100, skin: whiteSkin,
     			contents: [
     			           new Picture( {left:0, right:0, top:0, width: 100, height: 100, name: 'picture', url: $.photo,}),
     			           Label($, { style: productNameStyle, string: $.name,}),
 			           ], 
	           }),
     		Line($, { left: 0, right: 0, top: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});

/* This is template for a container which takes up the
 * whole screen.  It contains only a single object,
 * the SCROLLER.VerticalScroller.  Although we are not
 * referencing any values from an object passed on creation,
 * an object is still required as the SCROLLER uses it internally. */
var ScreenContainer = Container.template(function($) { return {
	left:0, right:0, top:topMargin, bottom:0,
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
	screen.first.menu.add(new ClothingSubContainer(element));
}

/*function addNewClothingItem(element) {
	screen.first.menu.add(new ClothingSubContainer(element));
} */// not using this because it adds to the end of the list, not the beginning

function listRefresh() {
	//application.remove(screen);
	var data = new Object();
	screen = new ScreenContainer(data);
	clothingList.forEach(ListBuilder);

	exports.screen = screen;
	
	return screen;
	
	
	//screen.first.remove(screen.first.menu);
	/*var newScreenContainer = Container.template(function($) { return {
	left:0, right:0, top:40, bottom:0,
	contents: [
	   		/* Note that the scroller is declared as having only an empty
	   		 * Column and a scrollbar.  All the entries will be added 
	   		 * programmatically. 
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});
	screen.first.add(newScreenContainer);*/
	
	
	/* = SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		});*/
}

exports.ListBuilder = ListBuilder;
exports.screen = screen;
exports.nextIdNum = nextIdNum;
//exports.addNewClothingItem = addNewClothingItem;
exports.listRefresh = listRefresh;
exports.blankScreen = new Container({});



