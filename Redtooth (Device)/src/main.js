//@program

//Random
hangerClothIDPairs = {"1":null, "2":null, "3":null, "4":null,
			          "5":null, "6":null, "7":null, "8":null}
hangerLightStatus = {"1":false, "2":false, "3":false, "4":false,
			         "5":false, "6":false, "7":false, "8":false}		  

//Skins
var whiteSkin = new Skin( { fill:"white" } );
var redSkin = new Skin({fill:"red"});
var blackSkin = new Skin({fill:"black"});
var blueSkin = new Skin({fill:"blue"});

//Styles
var labelStyle = new Style( { font: "Roboto bold 30px", color:"black" } );

//Pictures
var topLeft = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"topLeft"});
var topMidLeft = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"topMidLeft"});
var topMidRight = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"topMidRight"});
var topRight = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"topRight"});
var bottomLeft = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"bottomLeft"});
var bottomMidLeft = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"bottomMidLeft"});
var bottomMidRight = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"bottomMidRight"});
var bottomRight = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"bottomRight"});

//Handlers
Handler.bind("/syncUpdate", Behavior({
	onInvoke: function(handler, message){
		message.responseText = JSON.stringify( { hangerClothIDPairs: hangerClothIDPairs, hangerLightStatus: hangerLightStatus} );
		message.status = 200;
	}
}));

var mainContainer = new Column({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
    new Line({left:0, right:0, top:0, bottom:0, skin: redSkin,
    	contents: [
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				topLeft,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				topMidLeft,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				topMidRight,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				topRight,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		})
    	]
    }),
    new Line({left:0, right:0, top:0, bottom:0, skin: blueSkin,
    	contents: [
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				bottomLeft,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				bottomMidLeft,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				bottomMidRight,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		}),
    		new Column({left:0, right:0, top:10, bottom:0,
    			contents: [
    				bottomRight,
    				new Label({left:0, right:0, height:40, string: "Hello!", style: labelStyle})
    			]
    		})
    	]
    }),
  ]
});

var ApplicationBehavior = Behavior.template({
	onLaunch: function(application) {
		application.shared = true;
	},
	onQuit: function(application) {
		application.shared = false;
	},
})

application.invoke( new MessageWithObject( "pins:configure", {
    potentiometers: {
        require: "potentiometers",
        pins: {
			xPos: { pin: 64 },
			yPos: { pin: 53 },
        }
    }
}));
application.behavior = new ApplicationBehavior();
application.add( mainContainer );