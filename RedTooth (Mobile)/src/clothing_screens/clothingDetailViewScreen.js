//@module

var mainColumn = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin, name: 'clothingDetailViewScreen',
	contents: [
		SCROLLER.VerticalScroller($, { 
	   			contents: [
	          			Column($, { left: 0, right: 0, top: navBarHeight + tabBarHeight, name: 'menu',
	          				contents: [
	          				]
	          			}),
	          			SCROLLER.VerticalScrollbar($, { })
	       		]
		})
	]
}});

exports.createScreen = function(clothingItem, source, subCategory) {
	var screen = new mainColumn(new Object());
	var clothing = OBJECTS.sampleClothes;
	var clothingItemCategories = clothingItem.categories;
	screen.first.menu.add(new Label({left:0, right:0, string: clothingItem.name}));
	screen.first.menu.add(new CUSTOM_BUTTONS.clothingItemPicture(clothingItem));
	screen.first.menu.add(new Line({left:0, right:0,
		contents: [
			new Label({left:0, right:0, string:"Edit Item"}),
			new Label({left:0, right:0, string:"Delete Item"})
		]
	}));
	if (source == "clothing") {
		var backButton = new CUSTOM_BUTTONS.backFromClothingDetailViewButton({object: new Object(), textForLabel: "Back", downSkin: blueSkin, nextScreen: CLOTHING_SCREEN.createScreen})
	} else {
		var backButton = new CUSTOM_BUTTONS.backFromClothingDetailViewButton({object: subCategory, textForLabel: "Back", downSkin: blueSkin, nextScreen: CATEGORIES_DETAIL_VIEW_SCREEN.createScreen})
	}
	screen.first.add(new Line({left:0, right:0, top:0, height: navBarHeight, skin: tealVariantSkin, name: 'titleBar',
							contents:[
								backButton,
								new Label({left:0, right:0, top:0, bottom:0, height: navBarHeight, name:"titleWords", string:"Somewear", style:headerStyle}),
								new CUSTOM_BUTTONS.addClothingButton({textForLabel: "Not Sure what this should be", downSkin: blueSkin, nextScreen: ADD_CLOTHING_SCREEN.Screen})
							]
						})
	);
	screen.first.add(new Line({left:0, right:0, top: tabBarHeight, 
							contents: [
								new CUSTOM_BUTTONS.Tab({object: new Object(), textForLabel: "CATEGORIES", downSkin: blueSkin, nextScreen: CATEGORIES_SCREEN.createScreen, activity: true}),
								new CUSTOM_BUTTONS.Tab({object: new Object(), textForLabel: "CLOTHING", downSkin: redSkin, nextScreen: nullScreen, activity: false})
							]
						})
	);
	return screen;	
}