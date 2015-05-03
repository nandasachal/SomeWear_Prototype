//@module

exports.Screen = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin,
	contents: [
		SCROLLER.VerticalScroller($, { 
   			contents: [
          			Column($, { left: 0, right: 0, top: 0, name: 'menu',
          				contents: [
          					new Label({string: "This where you add a piece of clothing"}),
						   	new Label({string: "ADD A NAME HERE FOR THE PIECE OF CLOTHING"}),
						   	new CUSTOM_BUTTONS.screenChangeButton({ textForLabel: "Add categories/subcategories to the clothing", downSkin: blueSkin, nextScreen: ADD_CATEGORIES_TO_CLOTHING_SCREEN.Screen}),
							new CUSTOM_BUTTONS.screenChangeButton({ textForLabel: "Back Clothing page", downSkin: blueSkin, nextScreen: CLOTHING_SCREEN.Screen}),
							new CUSTOM_BUTTONS.screenChangeButton({ textForLabel: "Categories Page Tab", downSkin: blueSkin, nextScreen: CATEGORIES_SCREEN.Screen})	
          				]
          			}),
          			SCROLLER.VerticalScrollbar($, { })
          	]
	   	}),
	]
}});
