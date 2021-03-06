//@module

var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
/*var addCategoryToClothing = require("addCategoryToClothing.js");
var addCategoryToClothingNavBar = require("addCategoryToClothingNavBar.js");
var category = require("category.js");*/

var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

var nameInputSkin = new Skin({ borders: { left:4, right:4, top:4, bottom:4 }, stroke: "white",});
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: lighterTealColor, font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var labelStyle = new Style( { font: "Roboto bold 30px", color:"white" } );
var titleStyle = new Style( { font: "bold 30px", color:"white" } );
var tealSkin = new Skin({fill:tealColor});
var whiteSkin = new Skin({fill: "white"});
var blackSkin = new Skin({fill: "black"});

var addCategoriesTexture = new Texture('../assets/new_addCategoriesButtonGraphic.png');
var addCategoriesButtonSkin = new Skin({ texture: addCategoriesTexture, width: 252.5, height: 41.75});//height:55, width: 70, aspect: 'fit', });

var shutterSound = new Sound( mergeURI( application.url, "../assets/shutter-02.wav" ) );

var cancelTexture = new Texture('../assets/newlarge_backButtonGraphic.png');
var okayTexture = new Texture('../assets/newlarge_doneButtonGraphic.png');
var cancelButtonSkin = new Skin({ texture: cancelTexture, width: 74.11, height: 50});
var okayButtonSkin = new Skin({ texture: okayTexture, width: 74.11, height: 50});

var add_queue={};
var id= 0;
var hanger_name="hanger1";
var title = ''

var clothingScreen = require("clothingScreen.js");
var clothing = require("clothing.js");
//var navigationBar = require("navigationBar.js");

function getClothingInfo() {
  return {
    title: title
  }
}

function clear() {
  titleField.scroller.label.string = '';
  categoriesField.scroller.label.string = '';
}


function update(hanger,id_num) {
	hanger_name=hanger;
	id=id_num;
}

var counter = 0;

var title = '';
var TitleField = Container.template(function($) { return { 
  width: 250, height: 36, skin: nameInputSkin, contents: [
    Scroller($, { 
      name: 'scroller', left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          name: 'label', left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'TITLE',
          editable: true, string: $.name,
            behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
                onEdited: { value: function(label){
                    var data = this.data;
                    data.name = label.string;
                    label.container.titleHint.visible = ( data.name.length == 0 );
                    title = label.string;
                }},
                onKeyDown: { value:  function(label, key, repeat, ticks) {
                    if (key) {
                        var code = key.charCodeAt(0);
                        if (code == 3 /* enter */ || code == 13 /* return */) {
                            KEYBOARD.hide();
                        } else {
                            CONTROL.FieldLabelBehavior.prototype.onKeyDown.call(this, label, key, repeat, ticks);
                        }
                    }
                }}
                

            }),
         }),
         Label($, {
                left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Clothing Title", name:"titleHint"
         })
      ]
    })
  ]
}});
var titleField = new TitleField({ name: '' });

var categories = '';
var CategoriesField = Container.template(function($) { return { 
  width: 250, height: 36, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      name: 'scroller', behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          name: 'label', left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'CATEGORIES',
          editable: true, string: $.name,
            behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
                onEdited: { value: function(label){
                    var data = this.data;
                    data.name = label.string;
                    label.container.categoriesHint.visible = ( data.name.length == 0 );
                    categories = label.string; 
                }}
            }),
         }),
         Label($, {
                left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Clothing Categories", name:"categoriesHint"
         })
      ]
    })
  ]
}});
var categoriesField = new CategoriesField({ name: '' });

var OkayButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            
            photographScreen.photographImage.url = clothing.sampleAddedClothesPhotos[counter];
            trace("current image = " + clothing.sampleAddedClothesPhotos[counter] + "\n");
            trace('Title: ' + title + '\n' + 'Categories: ' + categories + '\n');

           	if (title == "") {
	           	var oldScreen = clothingScreen.blankScreen;
	           	if (navigationBar.currentScreen == 0) {
	           	    clothingScreen.refreshClothingScreen()
	                application.replace(oldScreen, categoryScreen.screen);
	            } else if (navigationBar.currentScreen == 1) {
	                application.replace(oldScreen, clothingScreen.refreshClothingScreen());
	            }
	            application.remove(modal);
	            application.invoke(new Message("/skipClothing?" + serializeQuery({
		    		hanger: hanger_name
				})), Message.JSON);
           		return;
           	}
            
            var newAddedClothing = clothing.Clothing();
           	newAddedClothing.name = title;
           	newAddedClothing.idNum = id;

           	newAddedClothing.hangerId = hanger_name; 

           	//newAddedClothing.hangerId = 'hanger1';


           	clothing.sampleAddedClothesPhotos.splice(clothing.sampleAddedClothesCounter, -1);
           	
           	trace(clothing.sampleAddedClothesPhotos + "\n");
           	
           	if (clothing.sampleAddedClothesCounter == clothing.sampleAddedClothesPhotos.length - 1) {
           		newAddedClothing.photo = "../assets/shirt-lighter.png";
           	} else {
          		newAddedClothing.photo = clothing.sampleAddedClothesPhotos[clothing.sampleAddedClothesCounter];
          		clothing.sampleAddedClothesCounter++;
          		counter++;
          	}
           	//photographTexture = new Texture(clothing.sampleAddedClothesPhotos[counter]);
           	photographScreen.first.url = clothing.sampleAddedClothesPhotos[counter];
           	
           	newAddedClothing.toggleOn = false;
           	newAddedClothing.categories = [];
           	for (var i = 0; i < addCategoryToClothing.selectedCategories.length; i++) {
           		newAddedClothing.categories.push(addCategoryToClothing.selectedCategories[i]);
           	}
           	trace("selectedCategories of this added clothing = " + addCategoryToClothing.selectedCategories + "\n");
            //clothingScreen.clothingList.unshift(newAddedClothing);
            clothing.clothingInCloset.unshift(newAddedClothing);
            clothingScreen.clothingList = clothing.clothingInCloset;

            category.addClothingToCategories(addCategoryToClothing.selectedCategories, newAddedClothing);

            var oldScreen = clothingScreen.blankScreen;

            if (navigationBar.currentScreen == 0) {
                clothingScreen.refreshClothingScreen()
                application.replace(oldScreen, categoryScreen.screen);
            } else if (navigationBar.currentScreen == 1) {
                application.replace(oldScreen, clothingScreen.refreshClothingScreen());
            }

            application.remove(modal);
            title = "";
			application.invoke(new Message("/newClothingAdded?" + serializeQuery({
	    		id: id,
	    		hanger: hanger_name
			})), Message.JSON);
        }},
    })
}});
var CancelButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            application.remove(modal);
            if (navigationBar.currentScreen == 0) {
                application.replace(clothingScreen.blankScreen, categoryScreen.screen);
            } else if (navigationBar.currentScreen == 1) {
                application.replace(clothingScreen.blankScreen, clothingScreen.screen);
            }
            application.invoke(new Message("/skipClothing?" + serializeQuery({
	    		hanger: hanger_name
			})), Message.JSON);
        }},
    })
}});

var addCategoriesButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        //new Label({left:0, right:0, height:40, string: "Cancel", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
        	KEYBOARD.hide();
            trace("trying to add categories...\n");
            application.add(addCategoryToClothing.bg);
            application.add(addCategoryToClothing.screen);
            application.add(addCategoryToClothingNavBar.navBar);
           
        }},
    })
}});

var addCategoriesButton = new addCategoriesButtonTemplate();
addCategoriesButton.skin = addCategoriesButtonSkin;
var cancelButton = new CancelButtonTemplate();
cancelButton.skin = cancelButtonSkin;
var okayButton = new OkayButtonTemplate();
okayButton.skin = okayButtonSkin;

var addCategoriesButtonLine = new Line({ bottom: 20,
	contents: [
		addCategoriesButton
	]
});

var buttons = new Line({
    contents: [
      cancelButton,
      new Container({ width: 50 }),
      okayButton
    ]
});


var photographButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            application.remove(photographScreen);
            trace("is it erroring here?\n");
            shutterSound.play();
        
            //photographSkin = new Skin({texture: photographTexture, x: 100, y: 100, width: 200, height: 160, aspect: 'fit'});
            //photograph.skin = photographSkin;
            
            
            
            /*photographScreen = new Column({left:0, right:0, top:0, bottom: 0, skin: blackSkin, contents: [
	 			new Picture({top: 0, left: 0, right:0, width: 300, height: 400, url: clothing.sampleAddedClothesPhotos[counter]}),
				photographButton,
			]});*/
			
            //if (counter < clothing.sampleAddedClothesPhotos.length - 1) {
            //photographScreen.photographImage.url = clothing.sampleAddedClothesPhotos[counter];
            	//counter++;
            	//takenPicture = false;
            /*} else {
            	photographScreen.photographImage.url = clothing.sampleAddedClothesPhotos[counter];
            }*/
            trace(photographScreen.first.url+"\n");

        }},
    })
}});

var photographTexture = new Texture("../assets/takePictureGraphic.png");
//var photographSkin = new Skin({ texture: photographTexture, width: 200, height: 160});

var shutterTexture = new Texture('../assets/shutter-button.png');
var shutterButtonSkin = new Skin({ texture: shutterTexture, width: 62.8, height: 62.8});
var photographButton = new photographButtonTemplate();
photographButton.skin = shutterButtonSkin;

var photograph = new Container({width: 200, height: 160, top: 20, active: true, //skin: photographSkin, 

	contents: [
		new Picture( {width: 200, height: 160, url: "../assets/takePictureGraphic.png"}),
	],
	behavior: {
		onTouchEnded: function(){
			trace("tapped photograph option!\n");
			application.add(photographScreen);
			
			}
	}	
});

var photographScreen = new Column({left:0, right:0, top:0, bottom: 0, skin: blackSkin, contents: [
	 new Picture({top: 0, left: 0, right:0, width: 300, height: 400, name: "photographImage", url: clothing.sampleAddedClothesPhotos[counter]}),
	 photographButton,
]});


var modal = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: tealSkin,
    contents: [
        new Label({string:"Add Clothing", style: titleStyle, top: 20}),
        photograph,
        new Container({ height: 20 }),
        titleField,
        new Container({ height: 10 }),
        //categoriesField,
        addCategoriesButtonLine,
        buttons,
    ],
});

exports.modal = modal;
exports.getClothingInfo = getClothingInfo;
exports.clear = clear;
exports.update=update;
