//@module

var mainColumn = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin,
	contents: [
		SCROLLER.VerticalScroller($, { 
   			contents: [
          			Column($, { left: 0, right: 0, top: navBarHeight + tabBarHeight, name: 'menu',
          				contents: [
          				],
          			}),
          			SCROLLER.VerticalScrollbar($, { }),
          			
          	],
	   	}),
	]
}});

exports.createScreen = function(nullObject) {
	var screen = new mainColumn(new Object());
	screen.first.menu.add(new CUSTOM_BUTTONS.Field({name: "Add stuff here"}));
	screen.first.add(new Line({left:0, right:0, top:0, height: navBarHeight, skin: tealVariantSkin, name: 'titleBar',
						contents:[
							new CUSTOM_BUTTONS.backToCategoriesButton({object: new Object(), textForLabel: "Back", downSkin: blueSkin, nextScreen: CATEGORIES_SCREEN.createScreen}),
							new Label({left:0, right:0, height: navBarHeight, name:"titleWords", string:"Somewear", style:headerStyle}),
							new CUSTOM_BUTTONS.addCategoryOkayButton({object: new Object(), textForLabel: "Add", downSkin: blueSkin, nextScreen: CATEGORIES_SCREEN.createScreen})
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