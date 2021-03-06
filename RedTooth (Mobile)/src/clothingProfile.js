// KPR Script file


/* ASSETS */
var onColor = "#FFD599";
var blackSkin = new Skin({ fill: 'black',});
var whiteSkin = new Skin({ fill: 'white',});
var onSkin	= new Skin({ fill: onColor});
var blueSkin = new Skin({fill: 'blue'})
var separatorSkin = new Skin({ fill: 'silver',});

var tabBarSize = 30;
var navBarSize = 40;
var topMargin = tabBarSize + navBarSize;

/* STYLES */
var productNameStyle = new Style({  font: 'Roboto bold 22px', horizontal: 'left', vertical: 'middle', lines: 1, });
var productDescriptionStyle = new Style({  font: 'Roboto 18px', horizontal: 'left', vertical: 'middle', left: 1, color: 'white' });


/*OG Styles*/
var bigText = new Style({font:"bold 30px", color:"black"});
var smallText = new Style({font:"bold 15px", color: "black", horizontal: "center"});
var largeText = new Style({font:"bold 30px", color:"black", horizontal: "center"});
var giantText = new Style({font:"bold 40px", color:"white"});
var whiteS = new Skin({fill:"white"});
var grayS = new Skin({fill:"gray"});
var blueS = new Skin({fill:"blue"});

//common colors
var darkerTealColorLightOpacity = "#bb144644";
var darkerTealColorHeavy = "#FF347A75";
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

var tealSkin = new Skin({fill: lightestTealColor});
var transparentTealSkin = new Skin({fill: darkerTealColorLightOpacity});

var Title = new Text({left:30, right:30, top: 60, height: 90, string: "", style: largeText}),
var Item = new Picture( {left:0, right:0, top:100, width: 120, height: 180, url: ""}),

var holder = 0;
var name = "";
var photo = "";
var categories=[];
var id = 0;

function store(store_name, store_photo, store_categories, store_id){
	name = store_name;
	photo = store_photo;
	categories = store_categories;
	id = store_id;
}



var deleteText = new Text({left:20, right:10, top: 10, height: 40, string: "Permanently delete ", style: giantText}),
var deleteText2 = new Text({left:20, right:10, top: 120, height: 40, string: "", style: giantText}),

var okText = new Text({left:25, right:25, top: 5, height: 40, string: "OK", style: bigText}),
var cancelText = new Text({left:5, right:5, top: 5, height: 40, string: "Cancel", style: bigText}),


var okTexture = new Texture("../assets/new_okButtonGraphic.png");
var okButtonSkin = new Skin({texture: okTexture, width: 78, height: 50,});
var okCon = new Container({ height: 50, left: 15, bottom: 30, width: 78, skin: okButtonSkin, //skin: tealSkin, //contents:[okText],
	 behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, x,  y, ticks) {
    	    //trace("finally store id is "+id);
    		for (var i = 0; i < clothing.clothingInCloset.length; i++) {
    			//trace(clothing.clothingInCloset[i].idNum);
    			if (clothing.clothingInCloset[i].idNum == id){
    				clothing.clothingInCloset.splice(i, 1);
    			}
    		}
    		application.add(clothingScreen.refreshClothingScreen());
    		application.add(hangerManager.syncBar);
    		application.add(navigationBar.navBar);
    		application.add(navigationBar.tabBar);
    		application.remove(clothingProfileNavBar.navBar);
    		holder = 1;
    		newCon.remove(deleteCon);
    		newCon.remove(screen);
    		hangerManager.dimAll();
    		application.remove(newCon);
    	}},
    }),
    active: true,
});

var backTexture = new Texture("../assets/new_backBlueButtonGraphic.png");
var backButtonSkin = new Skin({texture: backTexture, width: 78, height: 50,});

var cancelCon = new Container({ height: 50, right: 15, bottom: 30, width: 78, skin: backButtonSkin, //tealSkin, //contents:[cancelText],
	 behavior: Object.create(Behavior.prototype, {
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    		holder = 1;
    		newCon.remove(deleteCon);
    	}},
    }),
    active: true,
});

var deleteCon = new Container({ top: 90, right: 30, bottom: 90, left: 30, skin: transparentTealSkin, contents:[deleteText, deleteText2, okCon, cancelCon],});

function remover() {
	newCon.add(deleteCon);
	deleteText2.string = name + "?";
}



var toggledOnCategory = null;
var detailViewStatus = false;

var ProcessorLine = Line.template(function($) { return { left: 0, right: 0, active: true, skin: THEME.lineSkin, 
    behavior: Object.create(Behavior.prototype, {   	 
    	onTouchBegan: { value: function(container, id, x,  y, ticks) {
    	}},
    	onTouchEnded: { value: function(container, id, x,  y, ticks) {	
		}}
    }),
	contents: [
     	Column($, { left: 0, right: 0, skin: new Skin({fill: $.color}), contents: [
     		Container($, { left: 4, right: 4, height: 35,
     			contents: [
     			           Label($, { left: 10, style: productNameStyle, string: $.name,}), 
 			           ], 
	           }),
     		Line($, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
     ], 
 }});

var ScreenContainer = Container.template(function($) { return {
	left:0, right:0, top:300, bottom:0,
	contents: [
	   		SCROLLER.VerticalScroller($, { 
	   			contents: [
              			Column($, { left: 0, right: 0, top: 0, name: 'menu', }),
              			SCROLLER.VerticalScrollbar($, { }),
              			]
	   		})
	   		]
	}});

var data = new Object();
var screen = new ScreenContainer(data);

var newCon = new Container({ top: 0, right: 0, bottom: 0, left: 0, skin: tealSkin, 
	contents:[Title, 
		Item
		],
});

function refresh() {
	application.remove(clothingScreen.screen);
    application.remove(hangerManager.syncBar);
    application.remove(navigationBar.navBar);
    application.remove(navigationBar.tabBar);
	application.add(newCon);
	newCon.empty();
	newCon.add(Title);
	newCon.add(Item);
	data = new Object();
	screen = new ScreenContainer(data);
	holder = 0;
	Title.string = name;
	Item.url = photo;
	for (var i = 0; i < categories.length; i++) {
		screen.first.menu.add(new ProcessorLine(categories[i]));
	}

	newCon.add(screen);
	application.add(clothingProfileNavBar.navBar);
}


exports.store=store;
exports.refresh = refresh;
exports.newCon = newCon;
exports.remover = remover;
exports.holder = holder;
exports.screen=screen;