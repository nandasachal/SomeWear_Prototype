//@program

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
var clothing = require('clothing.js');
var category = require('category.js');
var lightManager = require('lightManager.js');

/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var onSkin	= new Skin({ fill: 'yellow'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var lightestTealColor = "#ffDEFCFA";
var tealSkin = new Skin({fill:lightestTealColor});

/* STYLES */
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });
var alertStyle = new Style({font: 'Roboto 10px', color: 'white'});

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
				container.first.first.skin = categorySkin;
		}}
    }),
	contents: [
     	Column($, { left: 0, right: 0, contents: [
     		Container($, { left: 0, right: 0, height: 100, width: 100, skin:categorySkin, name: "clothContainer",
     			contents: [
     			           /* This label expects that the object passed to ProcessorLine() 
     			            * includes a value for title.  Note that this Label is not marked
     			            * as active. Touches registered here will bubble back up to the
     			            * nested objects until it hits one which is active. */
     			           /* This label is expecting a value for button.  Note that this Label
     			            * is marked active.  Touches registered here will be handeled here */
     			           //Label($, { right: 10, style: productDescriptionStyle, skin: blueSkin, active: true, string: $.button,
     			           //    behavior: Object.create(Behavior.prototype, {
     			           		    	/* When this label is touched, simply trace out its string.
     			           		    	 * Note that no chain of "first" is needed here because the
     			           		    	 * touch happened in the object that contains the property
     			           		    	 * we want to trace */
     			           	//	    	onTouchEnded: { value: function(label, id, x,  y, ticks) {	
							//				trace(label.string+"\n");
							//			}}
							//	})
     			           //}),
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
var ScreenContainer = Column.template(function($) { return {
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

var bg = new Container({ top: 0, right: 0, bottom: 0, left: 0, skin: tealSkin });
var categoryChecked;
var categorySkin;

function setCategory(categoryName) {
	trace("category.categories = " + category.categories + "\n");
	categoryChecked = categoryName;
	var categoryColor;
	for (i = 0; i < category.categories.length; i++) {
		if (category.categories[i].name == categoryChecked) {
			categoryColor = category.categories[i].color;
		}
	}
	trace(categoryColor + "\n");
	categorySkin = new Skin({fill:categoryColor});
	//trace(categorySkin.fill + "\n");
	
}

var data = new Object();
var screen = new ScreenContainer(data);

//trace(categoryChecked);
function refresh() {
	application.add(bg);
	screen = new ScreenContainer(data);
	alertLabel = new Label({left:0, right:0, top:0, bottom:0, string: "", style:alertStyle, name:"YOUR CLOTHES ARE NOW LIT!"});
	var clothesLightedUp = [alertLabel];
	for (i = 0; i < clothing.clothingInCloset.length; i++) {
		tempCloth = clothing.clothingInCloset[i];
		tempCategories = tempCloth.categories;
		trace('tempCloth rfid number is ' + tempCloth.id + ' with hangerId ' + tempCloth.hangerId + '\n');
		for (j = 0; j < tempCategories.length; j++) {
			if (tempCategories[j].name == categoryChecked) {
				clothesLightedUp.push(tempCloth);
				//lighting up here
				if (tempCloth.hangerId != null && tempCloth.hangerId != '') {
					lightManager.lightUp(tempCloth.hangerId, tempCategories[j].color);
				}
			}
		}
	}
	trace("clothesLightedUp = " + clothesLightedUp + "\n");
	clothesLightedUp.forEach(ListBuilder);
	
	application.add(screen);
	exports.screen = screen;
}

/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ListBuilder(element, index, array) {
	screen.first.menu.add(new ClothingSubContainer(element));
}

exports.setCategory = setCategory;
exports.refresh = refresh;
exports.screen = screen;
exports.bg = bg;
exports.blankScreen = new Container({});
