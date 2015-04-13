//@program

//Random
hangerClothIDPairs = {"hanger1":0, "hanger2":0, "hanger3":0, "hanger4":0,
			          "hanger5":0, "hanger6":0, "hanger7":0, "hanger8":0}	  

//Skins
var whiteSkin = new Skin( { fill:"white" } );
var redSkin = new Skin({fill:"red"});
var blackSkin = new Skin({fill:"black"});
var blueSkin = new Skin({fill:"blue"});

//Styles
var labelStyle = new Style( { font: "Roboto bold 30px", color:"black" } );

//Pictures

new_eff = new Effect();
new_eff.mask(new Texture("./blackCircle.png"));

var hanger1Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger2Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger3Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger4Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger5Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger6Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger7Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });
var hanger8Con = new Container({ left: 0, right: 0, top: 0, bottom: 0, skin:blackSkin });

var hanger1pic = new Layer({ left:0, right:0, height: 80 });
var hanger2pic = new Layer({ left:0, right:0, height: 80 });
var hanger3pic = new Layer({ left:0, right:0, height: 80 });
var hanger4pic = new Layer({ left:0, right:0, height: 80 });
var hanger5pic = new Layer({ left:0, right:0, height: 80 });
var hanger6pic = new Layer({ left:0, right:0, height: 80 });
var hanger7pic = new Layer({ left:0, right:0, height: 80 });
var hanger8pic = new Layer({ left:0, right:0, height: 80 });

var hangerContainers = [ hanger1Con, hanger2Con, hanger3Con, hanger4Con, hanger5Con, hanger6Con, hanger7Con, hanger8Con ];
var layers = [ hanger1pic, hanger2pic, hanger3pic, hanger4pic, hanger5pic, hanger6pic, hanger7pic, hanger8pic ];

for (var i = 0; i < layers.length; i++) {
    layers[i].add(hangerContainers[i]);
    layers[i].effect = new_eff;
}

//var hanger1pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger1pic"});
//var hanger2pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger2pic"});
//var hanger3pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger3pic"});
//var hanger4pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger4pic"});
//var hanger5pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger5pic"});
//var hanger6pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger6pic"});
//var hanger7pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger7pic"});
//var hanger8pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger8pic"});


Handler.bind("/getCloset", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify({closet:hangerClothIDPairs});
		message.status = 200;
	}
}));

//Handlers
Handler.bind("/potResult", Object.create(Behavior.prototype, {
//@line 27
	onInvoke: { value: function( handler, message ){
			result = message.requestObject;
			var hanger1Val = Math.floor(result.hanger1.toFixed(4)*10000);
			var hanger2Val = Math.floor(result.hanger2.toFixed(4)*10000);
			var hanger3Val = Math.floor(result.hanger3.toFixed(4)*10000);
			var hanger4Val = Math.floor(result.hanger4.toFixed(4)*10000);
			var hanger5Val = Math.floor(result.hanger5.toFixed(4)*10000);
			var hanger6Val = Math.floor(result.hanger6.toFixed(4)*10000);		
			var hanger7Val = Math.floor(result.hanger7.toFixed(4)*10000);
			var hanger8Val = Math.floor(result.hanger8.toFixed(4)*10000);
			hangerClothIDPairs.hanger1 = hanger1Val;
			hangerClothIDPairs.hanger2 = hanger2Val;
			hangerClothIDPairs.hanger3 = hanger3Val;
			hangerClothIDPairs.hanger4 = hanger4Val;
			hangerClothIDPairs.hanger5 = hanger5Val;
			hangerClothIDPairs.hanger6 = hanger6Val;
			hangerClothIDPairs.hanger7 = hanger7Val;
			hangerClothIDPairs.hanger8 = hanger8Val;
			hanger1Label.string = hanger1Val;
			hanger2Label.string = hanger2Val;
			hanger3Label.string = hanger3Val;
			hanger4Label.string = hanger4Val;
			hanger5Label.string = hanger5Val;
			hanger6Label.string = hanger6Val;
			hanger7Label.string = hanger7Val;
			hanger8Label.string = hanger8Val;
		}}
}));

Handler.bind("/lightUp", Behavior({
    onInvoke: function(handler, message) {
        var query = parseQuery(message.query);
        var hangerString = query['hanger'];
        var color = query['color'];
        var index = parseInt(hangerString.replace('hanger', ''));
        var container = hangerContainers[index - 1];
        container.skin = new Skin({ fill: color });
    }
}));

Handler.bind("/dim", Behavior({
    onInvoke: function(handler, message) {
        var query = parseQuery(message.query);
        var hangerString = query['hanger'];

        var index = parseInt(hangerString.replace('hanger', ''));
        var container = hangerContainers[index - 1];
        container.skin = blackSkin;
    }
}));

Handler.bind("/dimAll", Behavior({
    onInvoke: function(handler, message) {
        Object.keys(hangerClothIDPairs).forEach(function (hanger) {
            application.invoke(new Message("dim?" + serializeQuery({
		        hanger: hanger,
		    })), Message.JSON);
        });
    }
}));

hanger1Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger2Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger3Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger4Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger5Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger6Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger7Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});
hanger8Label = new Label({left:0, right:0, height:40, string: "0", style: labelStyle});

var mainContainer = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
    new Line({left:0, right:0, top:0, bottom:0, skin: redSkin,
    	contents: [
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger1pic,
    				hanger1Label
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger2pic,
    				hanger2Label
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger3pic,
    				hanger3Label
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger4pic,
    				hanger4Label
    			]
    		})
    	]
    }),
    new Line({left:0, right:0, top:0, bottom:0, skin: blueSkin,
    	contents: [
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger5pic,
    				hanger5Label
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger6pic,
    				hanger6Label
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger7pic,
    				hanger7Label
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				hanger8pic,
    				hanger8Label
    			]
    		})
    	]
    }),
  ]
});

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
		application.invoke( new MessageWithObject( "pins:/potentiometers/read?repeat=on&callback=/potResult&interval=500" ) );
		
	},
	onQuit: function(application) {
		application.shared = false;
	},
})

application.invoke( new MessageWithObject( "pins:configure", {
    potentiometers: {
        require: "potentiometers",
        pins: {
			hanger1: { pin: 52 },
			hanger2: { pin: 53 },
			hanger3: { pin: 54 },
			hanger4: { pin: 55 },
			hanger5: { pin: 56 },
			hanger6: { pin: 57 },
			hanger7: { pin: 58 },
			hanger8: { pin: 59 },
        }
    }
}));
application.behavior = new ApplicationBehavior();
application.add( mainContainer );