//@module

var mainColumn = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin, name: 'categoriesDetailViewScreen',
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

exports.createScreen = function(subCategory) {
	var screen = new mainColumn(new Object());
	//finding the parent for the back button
	trace("This is subCategory parent: " + subCategory.parentCategory.name + "\n");
	var parent = subCategory.parentCategory;
	var subCategories = OBJECTS.sampleSubCategories;
	screen.first.menu.add(new Label({left:0, right:0, string: subCategory.name + " clothing is now lit."}));
	var clothing = subCategory.clothing;
	for (i = 0; i < clothing.length; i++) {
		screen.first.menu.add(new CUSTOM_BUTTONS.clothingButton({object: clothing[i], downSkin: blueSkin, nextScreen: CLOTHING_DETAIL_VIEW_SCREEN.createScreen, source: "categories", subCategory: subCategory}));
	}
	trace("This is parent: " + parent + "\n");
	screen.first.add(new Line({left:0, right:0, top:0, height: navBarHeight, skin: tealVariantSkin, name: 'titleBar',
						contents:[
							new CUSTOM_BUTTONS.backToSubCategoriesButton({object: parent, textForLabel: "Back", downSkin: blueSkin, nextScreen: CATEGORIES_SUB_SCREEN.createScreen}),
							new Label({left:0, right:0, height: navBarHeight, name:"titleWords", string:"Somewear", style:headerStyle}),
							new CUSTOM_BUTTONS.addClothingToSubCategoryButton({object: subCategory, textForLabel: "Add", downSkin: blueSkin, nextScreen: ADD_CLOTHING_TO_CATEGORIES_SCREEN.createScreen})
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
