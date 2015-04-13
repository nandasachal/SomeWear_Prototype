//@module

var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
var addCategoryToClothing = require("addCategoryToClothing.js");
var addCategoryToClothingNavBar = require("addCategoryToClothingNavBar.js");
var category = require("category.js");

var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: lightestTealColor,});
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: lighterTealColor, font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var labelStyle = new Style( { font: "Roboto bold 30px", color:"white" } );
var titleStyle = new Style( { font: "bold 30px", color:"white" } );
var whiteSkin = new Skin({fill:tealColor});

var addCategoriesTexture = new Texture('../assets/addToCategoriesButtonGraphic.png');
var addCategoriesButtonSkin = new Skin({ texture: addCategoriesTexture, width: 252.5, height: 41.75});//height:55, width: 70, aspect: 'fit', });

var cancelTexture = new Texture('../assets/cancelButtonGraphic.png');
var okayTexture = new Texture('../assets/okayButtonGraphic.png');
var cancelButtonSkin = new Skin({ texture: cancelTexture, width: 66, height: 43});
var okayButtonSkin = new Skin({ texture: okayTexture, width: 66, height: 43});

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

var OkayButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            trace('Title: ' + title + '\n' + 'Categories: ' + categories + '\n');
           	if (title == "") {
	           	var oldScreen = clothingScreen.blankScreen;
	            application.replace(oldScreen, clothingScreen.listRefresh());
	            application.remove(modal);
	            application.invoke(new Message("/skipClothing?" + serializeQuery({
		    		hanger: hanger_name
				})), Message.JSON);
           		return;
           	}
            
            var newAddedClothing = clothing.Clothing();
           	newAddedClothing.name = title;
           	newAddedClothing.id = id;

           	newAddedClothing.hangerId = hanger_name; 

           	//newAddedClothing.hangerId = 'hanger1';

           	newAddedClothing.photo = "../assets/shirt.png";
           	newAddedClothing.toggleOn = false;
           	newAddedClothing.categories = addCategoryToClothing.selectedCategories;
           	trace("selectedCategories of this added clothing = " + addCategoryToClothing.selectedCategories + "\n");
            //clothingScreen.clothingList.unshift(newAddedClothing);
            clothing.clothingInCloset.unshift(newAddedClothing);
            clothingScreen.clothingList = clothing.clothingInCloset;

            category.addClothingToCategories(addCategoryToClothing.selectedCategories, newAddedClothing);

            var oldScreen = clothingScreen.blankScreen;
            application.replace(oldScreen, clothingScreen.listRefresh());
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
            application.replace(clothingScreen.blankScreen, clothingScreen.screen);
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

var addCategoriesButtonLine = new Line({
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

var modal = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new Label({string:"Add Clothing", style: titleStyle, top: 20}),
        new Container({ height: 50 }),
        titleField,
        new Container({ height: 10 }),
        //categoriesField,
        addCategoriesButtonLine,
        new Container({ height: 40 }),
        buttons,
    ]
});

exports.modal = modal;
exports.getClothingInfo = getClothingInfo;
exports.clear = clear;
exports.update=update;
