//@module


//This is the clothing main view page, supposed to be grid design
//You need to export a function that returns a screen, maybe like a createScreen function
var mainContainer = new Container.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin, name: 'clothingScreen',
	contents: [
		SCROLLER.VerticalScroller($, { 
   			contents: [
          			Column($, { left: 0, right: 0, top: navBarHeight + tabBarHeight, name: 'menu', 
	          			contents: [
						]	
					}),
          			SCROLLER.VerticalScrollbar($, { })
          			
          	]
	   	}),
	   	
	]
}});

exports.createScreen = function() {
	var screen = new mainContainer(new Object());
	var clothing = OBJECTS.sampleClothes;
	for (i = 0; i < clothing.length; i++) {
		screen.first.menu.add(new CUSTOM_BUTTONS.clothingButton({object: clothing[i], downSkin: blueSkin, nextScreen: CLOTHING_DETAIL_VIEW_SCREEN.createScreen, source:"clothing", subCategory: new Object()}));
	}
	screen.first.add(new Line({left:0, right:0, top:0, height: navBarHeight, skin: tealVariantSkin, name: 'navBar',
						contents:[
							new CUSTOM_BUTTONS.modalCreationButton({textForLabel: "Settings", downSkin: blueSkin}),
							new Label({left:0, right:0, top:0, bottom:0, height: navBarHeight, name:"titleWords", string:"Somewear", style:headerStyle}),
							new CUSTOM_BUTTONS.addClothingButton({textForLabel: "Add", downSkin: blueSkin, nextScreen: ADD_CLOTHING_SCREEN.Screen})
						]
					}),
	);
	screen.first.add(new Line({left:0, right:0, top: tabBarHeight, name: "tabs",
						contents: [
							new CUSTOM_BUTTONS.Tab({object: new Object(), textForLabel: "CATEGORIES", downSkin: blueSkin, 
													nextScreen: CATEGORIES_SCREEN.createScreen, activity:true, 
							}),
							new CUSTOM_BUTTONS.Tab({object: new Object(), textForLabel: "CLOTHING", downSkin: redSkin, 
													nextScreen: nullScreen, activity: false
							})
						]
					})
	);
	return screen;	
}