//@module

var mainColumn = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin,
	contents: [
		SCROLLER.VerticalScroller($, { 
   			contents: [
          			Column($, { left: 0, right: 0, top: navBarHeight + tabBarHeight, name: 'menu',
          				contents: [
          				]
          			}),
          			SCROLLER.VerticalScrollbar($, { }),
          	]
	   	}),
	]
}});

exports.createScreen = function(categoryType) {
	var screen = new mainColumn(new Object());
	var clothing = OBJECTS.sampleClothes;
	for (i = 0; i < clothing.length; i++) {
		screen.first.menu.add(new CUSTOM_BUTTONS.clothingToggleButton({object: clothing[i], toggleOn: false}));
	}
	
	if (OBJECTS.sampleCategories.indexOf(categoryType) > -1) {
		//this is a parent category
		trace("Hello1");
		var newButton = new CUSTOM_BUTTONS.addClothingToNewCategoryOkayButton({object: categoryType, textForLabel: "Done", downSkin: blueSkin, nextScreen: ADD_SUB_CATEGORIES_SCREEN.createScreen});
		var backButton = new CUSTOM_BUTTONS.backFromAddClothingToCategoriesButton({object: categoryType, textForLabel: "Back", downSkin: blueSkin, nextScreen: ADD_SUB_CATEGORIES_SCREEN.createScreen});
	} else {
		trace("Hello2");
		var newButton = new CUSTOM_BUTTONS.addClothingToCategoryOkayButton({object: categoryType, textForLabel: "Done", downSkin: blueSkin, nextScreen: CATEGORIES_DETAIL_VIEW_SCREEN.createScreen});
		var backButton = new CUSTOM_BUTTONS.backFromAddClothingToCategoriesButton({object: categoryType, textForLabel: "Back", downSkin: blueSkin, nextScreen: CATEGORIES_DETAIL_VIEW_SCREEN.createScreen});
	}
	
	screen.first.add(new Line({left:0, right:0, top:0, height: navBarHeight, skin: tealVariantSkin, name: 'titleBar',
						contents:[
							backButton,
							new Label({left:0, right:0, height: navBarHeight, name:"titleWords", string:"Somewear", style:headerStyle}),
							newButton
						]
					}),
	);
	screen.first.add(new Line({left:0, right:0, top: tabBarHeight, 
						contents: [
							new CUSTOM_BUTTONS.Tab({object: new Object(), textForLabel: "CATEGORIES", downSkin: blueSkin, nextScreen: nullScreen, activity:false}),
							new CUSTOM_BUTTONS.Tab({object: new Object(), textForLabel: "CLOTHING", downSkin: redSkin, nextScreen: CLOTHING_SCREEN.createScreen, activity: true})
						]
					})
	);
	return screen;	
}

