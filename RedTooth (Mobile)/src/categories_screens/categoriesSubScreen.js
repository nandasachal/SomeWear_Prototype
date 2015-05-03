//@module

var mainColumn = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin, name: 'categoriesSubScreen',
	contents: [
		SCROLLER.VerticalScroller($, { 
   			contents: [
          			Column($, { left: 0, right: 0, top: tabBarHeight + navBarHeight, name: 'menu',
          				contents: [
          				]
          			}),
          			SCROLLER.VerticalScrollbar($, { }),
          	]
	   	}),
	]
}});

exports.createScreen = function(category) {
	var screen = new mainColumn(new Object());
	var categories = OBJECTS.sampleCategories;
	var subCategories = category.subCategories;
	if (subCategories != []) {
		for (i = 0; i < subCategories.length; i++) {
			screen.first.menu.add(new CUSTOM_BUTTONS.subCategoriesButton({object: subCategories[i], downSkin: blueSkin, nextScreen: CATEGORIES_DETAIL_VIEW_SCREEN.createScreen}));
		}
	}
	screen.first.add(new Line({left:0, right:0, top:0, height: navBarHeight, skin: tealVariantSkin, name: 'titleBar',
						contents:[
							new CUSTOM_BUTTONS.backToCategoriesButton({object: new Object(), textForLabel: "Back", downSkin: blueSkin, nextScreen: CATEGORIES_SCREEN.createScreen}),
							new Label({left:0, right:0, height: navBarHeight, name:"titleWords", string:"Somewear", style:headerStyle}),
							new CUSTOM_BUTTONS.addSubCategoryButton({object: category, textForLabel: "Add", downSkin: blueSkin, nextScreen: ADD_SUB_CATEGORIES_SCREEN.createScreen})
						]
					})
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