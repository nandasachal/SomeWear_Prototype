//@module

exports.Screen = new Column.template(function($){ return{
	left:0, right:0, top:0, bottom:0,
	skin: whiteSkin,
	contents: [
		SCROLLER.VerticalScroller($, { 
   			contents: [
          			Column($, { left: 0, right: 0, top: 0, name: 'menu',
          				contents: [
          					new Label({string: "This is the Add Categories to Clothing page"}),
						  	new Label({string: "This is a check mark for the Date category"}),
						  	new Label({string: "This is a check mark for the Casual category"}),
							new CUSTOM_BUTTONS.screenChangeButton({ textForLabel: "Back to Add Clothing Screen", downSkin: blueSkin, nextScreen: ADD_CLOTHING_SCREEN.Screen}),
          				]
          			}),
          			SCROLLER.VerticalScrollbar($, { })
          	]
	   	}),
	]
}});