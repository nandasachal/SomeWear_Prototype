//@module

var THEME = require('themes/sample/theme');
var SCROLLER = require('mobile/scroller');
var SCREEN = require('mobile/screen');
/*var clothing = require('clothing.js');
var category = require('category.js');*/

/* ASSETS */
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var onSkin	= new Skin({ fill: 'yellow'});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});
var lightestTealColor = "#ffDEFCFA";
var tealSkin = new Skin({fill:lightestTealColor});
var borderWhiteSkin = new Skin({ fill: 'white', borders: {left: 0.5, right: 2, bottom: 2, top: 0.5}, stroke: greyBorderColor});

var categoryNameStyle = new Style({font: 'Roboto bold 15px', color: 'black'});

var currentCategory;


/* SIZES */
var topMargin = 40;


/* STYLES */
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });
var alertStyle = new Style({font: 'Roboto 10px', color: 'black'});

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
              			Column($, { left: 10, right: 10, top: 40, name: 'menu', }),
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
			currentCategory = category.categories[i];
		}
	}
	categorySkin = new Skin({fill:categoryColor});
	
	//trace(categorySkin.fill + "\n");
	return currentCategory;
	
}

var data = new Object();
var screen = new ScreenContainer(data);

var alertLabel = new Label();

var alertLine = new Line();

//trace(categoryChecked);
function refresh() {
	screen = new ScreenContainer(data);
	
	for (var i = 0 ; i < category.categories.length; i ++ ) {
		if (categoryChecked == category.categories[i].name) {
			currentCategory = category.categories[i];
			trace("called from categoryDetailView.refresh() \n and the category name is " +  currentCategory.name + "\n");
		}
	}
	
	
	trace("currentCategory = " + currentCategory.name + "\n");
	
	exports.currentCategory = currentCategory;
	
	//var clothesLightedUp = [alertLabel];
	var clothesLightedUp = [];
	for (i = 0; i < clothing.clothingInCloset.length; i++) {
		tempCloth = clothing.clothingInCloset[i];
		tempCategories = tempCloth.categories;
		//trace('tempCloth rfid number is ' + tempCloth.id + ' with hangerId ' + tempCloth.hangerId + '\n');
		for (j = 0; j < tempCategories.length; j++) {
			if (tempCategories[j].name == categoryChecked) {
				clothesLightedUp.push(tempCloth);
				//lighting up here
				if (tempCloth.hangerId != null && tempCloth.hangerId != '') {
					hangerManager.lightUp(tempCloth.hangerId, tempCategories[j].color);
				}
			}
		}
	}
	
	alertLabel = new Label({left:0, right:0, top:0, bottom:0, string: "         Your clothes are now lit!", style:alertStyle, name:"alert"});
	if (clothesLightedUp.length == 0) {
		alertLabel.string = "       No clothes in this category!";
	}
	
	
	
	categoryNameLabel = new Label({string: categoryChecked.toUpperCase(), name: "categoryNameLabel", style:categoryNameStyle});
	
	var nameLine = new Line ({top: 9, contents: [
		categoryNameLabel
	]});
	
	var nameLineContainer = new Column({ left: 0, right: 0, height: 35, top: 1, skin: borderWhiteSkin, contents: [
		nameLine,
	]});
	//nameLine.skin = categorySkin;
	
	var borderCategorySkin = new Skin({ fill: currentCategory.color, borders: {left: 0.5, right: 2, bottom: 2, top: 0.5}, stroke: greyBorderColor});
	
	var alertLine = new Line( {left: 15, right: 15, top: 18, bottom: 10, height: 70, skin: borderCategorySkin, contents: [
		alertLabel
	]} );
	
	/*new Line({left:0, right:0, height: 1, skin: new Skin({fill:"#FF535454"})}),
	new Line({left:0, right:0, height: 1, skin: new Skin({fill:"#997A7A7A"}),}),
	new Line({left:0, right:0, height: 1, skin: new Skin({fill:"#88B5B5B5"}),})
	
	screen.first.add(new Line({left:0, right:0, height: 1, skin: new Skin({fill:"#FF535454"})}),);
	screen.first.add(new Line({left:0, right:0, height: 1, skin: new Skin({fill:"#997A7A7A"}),}));
	screen.first.add(*/
	
	screen.first.add(nameLineContainer);
	screen.first.menu.add(alertLine);
	//clothesLightedUp.forEach(ListBuilder);
	refreshClothingScreen(clothesLightedUp);
	
	//application.add(screen);
	exports.screen = screen;
}

function update(newCategory) {
	screen = new ScreenContainer(data);
	
	currentCategory = newCategory;
	
	exports.currentCategory = currentCategory;
	
	//var clothesLightedUp = [alertLabel];
	var clothesLightedUp = [];
	for (i = 0; i < clothing.clothingInCloset.length; i++) {
		tempCloth = clothing.clothingInCloset[i];
		tempCategories = tempCloth.categories;
		for (j = 0; j < tempCategories.length; j++) {
			if (tempCategories[j].name == currentCategory.name) {
				clothesLightedUp.push(tempCloth);
				//lighting up here
				if (tempCloth.hangerId != null && tempCloth.hangerId != '') {
					hangerManager.lightUp(tempCloth.hangerId, tempCategories[j].color);
				}
			}
		}
	}
	
	alertLabel = new Label({left:0, right:0, top:0, bottom:0, string: "         Your clothes are now lit!", style:alertStyle, name:"alert"});
	if (clothesLightedUp.length == 0) {
		alertLabel.string = "       No clothes in this category!";
	}
	
	
	
	categoryNameLabel = new Label({string: currentCategory.name.toUpperCase(), name: "categoryNameLabel", style:categoryNameStyle});
	
	var nameLine = new Line ({contents: [
		categoryNameLabel
	]});
	
	var nameLineContainer = new Container({ left: 0, right: 0, height: 35, top: 1, skin: borderWhiteSkin, contents: [
		nameLine
	]});
	//nameLine.skin = categorySkin;
	
	var borderCategorySkin = new Skin({ fill: currentCategory.color, borders: {left: 2, right: 2, bottom: 2, top: 2}, stroke: greyBorderColor});
	
	var alertLine = new Line( {left: 15, right: 15, top: 18, bottom: 10, height: 70, skin: borderCategorySkin, contents: [
		alertLabel
	]} );
	
	/*categoryNameLabel = new Label({left: 0, right:0, bottom: 0, top:0, string: currentCategory.name, name: "categoryNameLabel"});
	var nameLine = new Line ({ left: 0, right: 0, top:0, height: 40, contents: [
		categoryNameLabel
	]});
	nameLine.skin = new Skin({ fill: currentCategory.color });
	
	var alertLine = new Line( {left: 15, right: 15, top: 15, bottom: 15, height: 100, skin: whiteSkin, contents: [
		alertLabel
	]} );*/
	
	screen.first.add(nameLineContainer);
	screen.first.menu.add(alertLine);
	//clothesLightedUp.forEach(ListBuilder);
	refreshClothingScreen(clothesLightedUp);
	
	//application.add(screen);
	exports.screen = screen;
	//exports.currentCategory = currentCategory;
}


/* This simple function exists so we can call "forEach" on
 * our array of list entries (menuItems).  It adds a new 
 * ProcessorLine() object to the Column named "menu" in the
 * screen object's SCROLLER */
function ListBuilder(element, index, array) {
	screen.first.menu.add(new ClothingSubContainer(element));
}

/* GRID VIEW COPY PASTED FROM CLOTHING SCREEN */


var clothingGridItemTemplate = Container.template(function($) {
	return {
		left: 0, right: 0, top: 0, bottom: 0, active: true,
		behavior: Object.create(Behavior.prototype, {
			onTouchBegan: { value : function(container, id, x, y, ticks)  {
			}},
			onTouchEnded: { value: function(container, id, y, x, ticks) {
				trace("clothing was toggled on!\n");

			}}
		}),
		contents: [
			new Column( { left: 10, right: 10, top: 10, bottom: 10, skin: borderWhiteSkin, contents: [ 
     			new Picture( {left:0, right:0, top:5, width: 100, height: 100, name: 'picture', url: $.photo,}),
     			new Container( { top: 10, bottom: 10, contents: [ Label($, { style: productNameStyle, string: $.name,}), ]})
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

	
function gridBuilder(inputClothingList) {
	for (var i = 0; i < inputClothingList.length; i+=2) {
		newGridLine = new clothingLineInGridTemplate();
		newGridLine.add(new clothingGridItemTemplate(inputClothingList[i]));
		if (inputClothingList.length%2 == 1 && i == inputClothingList.length - 1){ // if the input clothing list length is odd, only add 1 item
			newGridLine.add(new emptyGridItemTemplate());
			screen.first.menu.add(newGridLine);
			trace("added 1 item\n");
			return;
		} else {
			newGridLine.add(new clothingGridItemTemplate(inputClothingList[i+1]));
			screen.first.menu.add(newGridLine);
			trace("added 2 item\n");
		}
	}
}

	
function refreshClothingScreen(clothingList) {
	gridBuilder(clothingList);

	exports.screen = screen;
	
	return screen;

}

/* END GRID VIEW */


exports.setCategory = setCategory;
exports.refresh = refresh;
exports.screen = screen;
exports.bg = bg;
exports.update = update;
exports.alertLine = alertLine;
exports.blankScreen = new Container({active: false});
