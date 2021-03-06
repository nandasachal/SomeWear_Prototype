//@module
/*var clothing = require("clothing.js");
var addClothingModal = require("addClothingModal.js");
var addCategoryToClothing = require("addCategoryToClothing.js"); */

var bigText = new Style({font:"bold 30px", color:"white"});
var largeText = new Style({font:"bold 30px", color:"white"});
var smallText = new Style({font:"20px", color:"white"});
var whiteS = new Skin({fill:"white"});
var grayS = new Skin({fill:"gray"});
var blueS = new Skin({fill:"blue"});

//common colors
var darkerTealColorLightOpacity = "#DD144644";
var darkerTealColorHeavy = "#DD347A75";
var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";


var tealSkin = new Skin({fill: darkerTealColorLightOpacity});

var syncSkin = new Skin({fill: darkerTealColorHeavy });

var closet = {"hanger1":0, "hanger2":0, "hanger3":0, "hanger4":0,
			          "hanger5":0, "hanger6":0, "hanger7":0, "hanger8":0}	
var clothes=[0];
var count=0;
var hanger_names=[];
var id_nums=[];
var itemsToBeAdded = 0;

var updateButtonHeight = 45;
			          
Handler.bind("/getCloset", {
    onInvoke: function(handler, message){
        if (deviceURL != "") handler.invoke(new Message(deviceURL + "getCloset"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	hanger_names=[];
    	id_nums=[];
    	if (addCon.container!=null){
    		application.remove(addCon);
    	}
    	if (finishCon.container!=null){
    		application.remove(finishCon);
    	}
    	closet.hanger1=json.closet.hanger1;
    	closet.hanger2=json.closet.hanger2;
    	closet.hanger3=json.closet.hanger3;
    	closet.hanger4=json.closet.hanger4;
    	closet.hanger5=json.closet.hanger5;
    	closet.hanger6=json.closet.hanger6;
    	closet.hanger7=json.closet.hanger7;
    	closet.hanger8=json.closet.hanger8;
    	count=0;
    	for (var key in closet){
    		if (clothes.indexOf(closet[key])==-1){
    			hanger_names.push(key);
    			id_nums.push(closet[key]);
    			count=count+1;
    		}
    	}
    	clothing.clothingInCloset.forEach( function(obj) {
    		var exists = false;
			for (var key in closet) {
				if (closet[key] == obj.idNum) {
				    //trace('Found ' + obj.name + '\n');
					obj.hangerId = key;
					exists = true;
				}
			}
			if (!exists) {
				obj.hangerId = '';
			}
		});
    	if (count>0){
    		addText.string= "         " +count+" new";
    		itemsToBeAdded = count;
    		application.add(addCon);
    	}
    	else{
    		application.add(finishCon);
    		var updateClosetButtonTexture = new Texture("../assets/updateCloset_new.png");
			var updateClosetButtonSkin = new Skin({ texture: updateClosetButtonTexture, width: 311, height: updateButtonHeight});
			syncButton2.skin = updateClosetButtonSkin;
   
    	}
    }
});

var touchBehavior = Object.create(Behavior.prototype, {
	onTouchBegan: { value: function(container){
   }},
   	onTouchEnded: { value: function(container){
		container.invoke(new Message("/getCloset"));
   }},
});



var closeBehavior = Object.create(Behavior.prototype, {
	onTouchBegan: { value: function(container){
   }},
   	onTouchEnded: { value: function(container){
		application.remove(finishCon);
   }},
});

Handler.bind("/newClothingDetected", {
    onInvoke: function(handler, message){
    	if (count > 0) {
    	
			addClothingModal.clear();
			addClothingModal.update(hanger_names[count-1],id_nums[count-1]);
			lightUp(hanger_names[count-1],"#FFFF00");
			addCategoryToClothing.initialize();
			addClothingModal.clear();
			application.add(addClothingModal.modal);
			if (navigationBar.currentScreen == 0) {
			    application.replace(categoryScreen.screen, clothingScreen.blankScreen);
			} else if (navigationBar.currentScreen == 1) {
			    application.replace(clothingScreen.screen, clothingScreen.blankScreen);
			}
			count=count-1;
		}
		if (itemsToBeAdded > 0) {
			var path = '../assets/updateCloset_new_Badge_' + itemsToBeAdded + '.png';
		} else {
			//var path = '../assets/updateCloset.png';
			var path = "../assets/updateCloset_new.png";
		}
		var updateClosetButtonTexture = new Texture(path);
		var updateClosetButtonSkin = new Skin({ texture: updateClosetButtonTexture, width: 311, height: updateButtonHeight});
		syncButton2.skin = updateClosetButtonSkin;
    },
});



Handler.bind("/skipClothing", {
    onInvoke: function(handler, message){
    	var query = parseQuery(message.query);
        var hanger = query['hanger'];

    	dim(hanger);
    	application.invoke(new Message("/newClothingDetected"));
    },
});

Handler.bind("/newClothingAdded", {
    onInvoke: function(handler, message){
    	var query = parseQuery(message.query);
        var id = parseInt(query['id']);
        var hanger = query['hanger'];
		itemsToBeAdded = itemsToBeAdded - 1;
    	clothes.push(id);
    	dim(hanger);
    	application.invoke(new Message("/newClothingDetected"));
    },
});


var addBehavior = Object.create(Behavior.prototype, {
	onTouchBegan: { value: function(container){
   }},
   	onTouchEnded: { value: function(container){
   		if (container.name === 'addNow') {
   			trace("adding now!\n");
   			container.invoke(new Message("/newClothingDetected"));
   		} else {
   			//change closet badge value based on number of new items
   			var path = '../assets/updateCloset_new_Badge_' + count + '.png';
   			var updateClosetButtonTexture = new Texture(path);
			var updateClosetButtonSkin = new Skin({ texture: updateClosetButtonTexture, width: 311, height: updateButtonHeight});
			syncButton2.skin = updateClosetButtonSkin;
   			
   		}
   		application.remove(addCon);
   }},
});

var syncCon = new Container({
	left:0, right:0, height:40, bottom:0,
	skin: syncSkin,
	contents:[
		new Text({left:0, right:0, top: 5, height: 40, string: "      UPDATE CLOSET", style: bigText}),
	],
	behavior:touchBehavior,
	active:true
});

var addButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, top: 20,
    name: $.name,
    behavior: addBehavior
}});

var okButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0,
    behavior: closeBehavior
}});

var syncButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0,
    behavior: touchBehavior
}});




var syncTexture = new Texture("../assets/syncButtonGraphic.png");
var syncButtonSkin = new Skin({ texture: syncTexture, width: 311, height: 42});

//var syncTexture2 = new Texture("../assets/updateCloset.png");
var syncTexture2 = new Texture("../assets/updateCloset_new.png");
var syncButtonSkin2 = new Skin({ texture: syncTexture2, width: 311, height: updateButtonHeight});

syncButton2 = new syncButtonTemplate();
syncButton2.skin = syncButtonSkin2;


syncButton = new syncButtonTemplate();
syncButton.skin = syncButtonSkin;

//var addTexture = new Texture('../assets/largeAddButtonGraphic.png');
var addTexture = new Texture('../assets/AddNow_new.png');
var addButtonSkin = new Skin({ texture: addTexture, width: 180, height: 51});

var addButton = new addButtonTemplate({name: "addNow"});
addButton.skin = addButtonSkin;


var addLaterTexture = new Texture('../assets/AddLater_new.png');
var addLaterButtonSkin = new Skin({texture: addLaterTexture, width: 180, height: 51});
var addLaterButton = new addButtonTemplate({name: "addLater"});
addLaterButton.skin = addLaterButtonSkin;
var addLater = addLaterButton;

var okTexture = new Texture('../assets/new_okButtonGraphic.png');
var okButtonSkin = new Skin({ texture: okTexture, width: 90, height: 51 });

var okButton = new okButtonTemplate();
okButton.skin = okButtonSkin;

//var ok = new Label({left:80, right:0, bottom: 20, height: 40, string: "OK", style: largeText}),
var ok = okButton;
//var add = new Label({left:80, right:0, bottom: 20, height: 40, string: "ADD", style: largeText}),
var add = addButton;
var addText = new Label({left:20, right:10, top: 0, height: 40, string: "", style: bigText}),
var addText2 = new Text({left:20, right:10, top: 0, height: 40, string: "  items detected", style: bigText}),

var syncBar = new Line({left:0, right:0, bottom:5, height: updateButtonHeight, skin: tealVariantSkin, name: 'syncBar', contents:[
	//syncCon
	syncButton2
	]
});


var finishCon = new Container({
	left:30, right:30, height:250, bottom:100,
	skin: tealSkin,
	contents:[
		new Text({left:20, right:10, top: 10, height: 40, string: "All items synced!", style: largeText}),
		ok
	],
	//behavior: closeBehavior,
	active: true
});

var addCon = new Container({
	left:30, right:30, height:250, bottom:100,
	skin: tealSkin,
	contents:[
		//addText,
		//addText2,
		new Column({left:0, top:0, bottom:0, right:0,
			contents: [
				addText,
				addText2,
				add,
				addLater,
			]
		})
	],
	//behavior: addBehavior,
	active: true
});

var tealVariantSkin = new Skin({fill:'#FF52b0b0'});

deviceURL = "";

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));

function lightUp(hanger, color) {
    application.invoke(new Message(deviceURL + "lightUp?" + serializeQuery({
	    hanger: hanger,
	    color: color
	})), Message.JSON);
}

function dim(hanger) {
    application.invoke(new Message(deviceURL + "dim?" + serializeQuery({
        hanger: hanger
    })), Message.JSON);
}

function dimAll() {
    application.invoke(new Message(deviceURL + "dimAll"));
    //trace('reached dimAll\n');
}

exports.lightUp = lightUp;
exports.dimAll = dimAll;
exports.dim = dim;
exports.syncBar = syncBar;