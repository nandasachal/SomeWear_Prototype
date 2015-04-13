//@module

var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: '#aaa', font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var labelStyle = new Style( { font: "Roboto bold 30px", color:"black" } );
var titleStyle = new Style( { font: "bold 30px", color:"black" } );
var whiteSkin = new Skin({fill:"transparent"});


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

var OkayButton = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "Okay", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            //application.add(clothingScreen.screen);
            //application.add(navigationBar.navBar);
            trace('Title: ' + title + '\n' + 'Categories: ' + categories + '\n');

           	if (title == "") {
	           	var oldScreen = clothingScreen.blankScreen;
	            application.replace(oldScreen, clothingScreen.listRefresh());
	            application.remove(modal);
           		return;
           	}
           	
           	//var newDict = {name: title, idNum = clothingScreen.nextIdNum, photo: "../assets/shirt.png", toggleOn: "false"};
           	/*var newDict = Object();
           	newDict.name = title;
           	newDict.idNum = clothingScreen.nextIdNum;
           	newDict.photo = "../assets/shirt.png";
           	newDict.toggleOn = false;
            clothingScreen.clothingList.unshift(newDict);
            clothingScreen.nextIdNum++;
            trace("nextIdNum should be 9 " + clothingScreen.nextIdNum + "\n");*/
            
            var newAddedClothing = clothing.Clothing();
           	newAddedClothing.name = title;
           	newAddedClothing.id = clothingScreen.nextIdNum;
           	newAddedClothing.photo = "../assets/shirt.png";
           	newAddedClothing.toggleOn = false;
            //clothingScreen.clothingList.unshift(newAddedClothing);
            clothing.clothingInCloset.unshift(newAddedClothing);
            clothingScreen.clothingList = clothing.clothingInCloset;
            clothingScreen.nextIdNum++;
            trace("nextIdNum should be 9 " + clothingScreen.nextIdNum + "\n");
            
            var oldScreen = clothingScreen.blankScreen;
            application.replace(oldScreen, clothingScreen.listRefresh());
            application.remove(modal);

            for (var i = 0; i < clothingScreen.clothingList.length; i++) {
            	trace(clothingScreen.clothingList[i].name + "\n");
            	trace(clothingScreen.clothingList[i].idNum + "\n");
            }
            title = "";
        }},
    })
}});
var CancelButton = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "Cancel", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            application.remove(modal);
            application.replace(clothingScreen.blankScreen, clothingScreen.screen);
        }},
    })
}});

var whiteSkin = new Skin('white');


var buttons = new Line({
    contents: [
      new CancelButton(),
      new OkayButton(),
    ]
});

var modal = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new Label({string:"Add Clothing", style: titleStyle, top: 20}),
        new Container({ height: 50 }),
        titleField,
        new Container({ height: 10 }),
        categoriesField,
        new Container({ height: 25 }),
        buttons,
    ]
});

exports.modal = modal;
exports.getClothingInfo = getClothingInfo;
exports.clear = clear;
