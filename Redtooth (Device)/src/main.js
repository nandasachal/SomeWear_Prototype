//@program

var whiteSkin = new Skin( { fill:"white" } );
var labelStyle = new Style( { font: "bold 40px", color:"black" } );
var mainContainer = new Container({
  left:0, right:0, top:0, bottom:0,
  skin: whiteSkin,
  contents:[
    new Label({left:0, right:0, height: 40, string: "Hi RedTooth!", style: labelStyle})
  ]
});


application.add( mainContainer );