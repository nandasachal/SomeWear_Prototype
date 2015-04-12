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

var hanger1Con = new Container({
	left: 0, right: 0, top: 0, bottom: 0,
	skin:blueSkin,
})

var hanger1pic = new Layer({
	left:0, right:0, top:15, bottom:0,
})

hanger1pic.add(hanger1Con);
hanger1pic.effect = new_eff;


//var hanger1pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger1pic"});
var hanger2pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger2pic"});
var hanger3pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger3pic"});
var hanger4pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger4pic"});
var hanger5pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger5pic"});
var hanger6pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger6pic"});
var hanger7pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger7pic"});
var hanger8pic = new Picture({left:0, right:0, top:15, bottom:0, url:"blackCircle.png", name:"hanger8pic"});


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
			var hanger1Val = (result.hanger1.toFixed(4))*10000;
			var hanger2Val = (result.hanger2.toFixed(4))*10000;
			var hanger3Val = (result.hanger3.toFixed(4))*10000;
			var hanger4Val = (result.hanger4.toFixed(4))*10000;
			var hanger5Val = (result.hanger5.toFixed(4))*10000;
			var hanger6Val = (result.hanger6.toFixed(4))*10000;		
			var hanger7Val = (result.hanger7.toFixed(4))*10000;
			var hanger8Val = (result.hanger8.toFixed(4))*10000;
			hanger1Label.string = hanger1Val;
			hanger2Label.string = hanger2Val;
			hanger3Label.string = hanger3Val;
			hanger4Label.string = hanger4Val;
			hanger5Label.string = hanger5Val;
			hanger6Label.string = hanger6Val;
			hanger7Label.string = hanger7Val;
			hanger8Label.string = hanger8Val;
			/*if (hanger1Val != hangerClothIDPairs.hanger1){
				if (hanger1Val != 0 ){
					hanger1pic.url="yellowCircle.png";
				}
				else{
					hanger1pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger1=hanger1Val;
			}*/
			if (hanger2Val != hangerClothIDPairs.hanger2){
				if (hanger2Val != 0 ){
					hanger2pic.url="yellowCircle.png";
				}
				else{
					hanger2pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger2=hanger2Val;
			}
			if (hanger3Val != hangerClothIDPairs.hanger3){
				if (hanger3Val != 0 ){
					hanger3pic.url="yellowCircle.png";
				}
				else{
					hanger3pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger3=hanger3Val;
			}
			if (hanger4Val != hangerClothIDPairs.hanger4){
				if (hanger4Val != 0 ){
					hanger4pic.url="yellowCircle.png";
				}
				else{
					hanger4pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger4=hanger4Val;
			}
			if (hanger5Val != hangerClothIDPairs.hanger5){
				if (hanger5Val != 0 ){
					hanger5pic.url="yellowCircle.png";
				}
				else{
					hanger5pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger5=hanger5Val;
			}
			if (hanger6Val != hangerClothIDPairs.hanger6){
				if (hanger6Val != 0 ){
					hanger6pic.url="yellowCircle.png";
				}
				else{
					hanger6pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger6=hanger6Val;
			}
			if (hanger7Val != hangerClothIDPairs.hanger7){
				if (hanger7Val != 0 ){
					hanger7pic.url="yellowCircle.png";
				}
				else{
					hanger7pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger7=hanger7Val;
			}
			if (hanger8Val != hangerClothIDPairs.hanger8){
				if (hanger8Val != 0 ){
					hanger8pic.url="yellowCircle.png";
				}
				else{
					hanger8pic.url="blackCircle.png";
				}
				hangerClothIDPairs.hanger8=hanger8Val;
			}
		}}
}));

Handler.bind("/lightUp", Behavior({
    onInvoke: function(handler, message) {
        var query = parseQuery(message.query);
        var hanger = query['hanger'];
        var color = query['color'];
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