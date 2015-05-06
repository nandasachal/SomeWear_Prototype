// KPR Script file
//@module

var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');
/*var addClothingToCategory = require("addClothingToCategory.js");
var addClothingToCategoryNavBar = require("addClothingToCategoryNavBar.js");
var clothingFile = require("clothing.js");*/

var tealColor = "#FF52b0b0";
var lighterTealColor = "#ff84D3D1";
var lightestTealColor = "#ffDEFCFA";

/*var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: '#aaa', font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var whiteSkin = new Skin({fill:tealColor});
var labelStyle = new Style( { font: "bold 30px", color:"white" } );*/

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: lightestTealColor,});
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: lighterTealColor, font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var labelStyle = new Style( { font: "Roboto bold 30px", color:"white" } );
var titleStyle = new Style( { font: "bold 30px", color:"white" } );
var whiteSkin = new Skin({fill:tealColor});

var addClothingTexture = new Texture('../assets/new_addClothingButtonGraphic.png');
var addClothingButtonSkin = new Skin({ texture: addClothingTexture, width: 252.5, height: 41.75});//height:55, width: 70, aspect: 'fit', });

var categoriesScreen = require("categoryScreen.js");
var category = require("category.js");

var categoryName = '';
var categoryColor = '';
var categorySubcategories = [];
var categoryClothing = [];

var cancelTexture = new Texture('../assets/newlarge_backButtonGraphic.png');
var okayTexture = new Texture('../assets/newlarge_doneButtonGraphic.png');
var cancelButtonSkin = new Skin({ texture: cancelTexture, width: 74.11, height: 50});
var okayButtonSkin = new Skin({ texture: okayTexture, width: 74.11, height: 50});

var TitleField = Container.template(function($) { return { 
  width: 250, height: 36, skin: nameInputSkin, contents: [
    Scroller($, { 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { 
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'TITLE',
          editable: true, string: $.name,
            behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
                onEdited: { value: function(label){
                    var data = this.data;
                    data.name = label.string;
                    label.container.titleHint.visible = ( data.name.length == 0 );
                    categoryName = label.string;
                }}
            }),
         }),
         Label($, {
                left:4, right:4, top:4, bottom:4, style:fieldHintStyle, string:"Category Title", name:"titleHint"
         })
      ]
    })
  ]
}});

var nextCatColorIndex = category.categories.length;
var nextCatColor = category.categorySkinColors[nextCatColorIndex];

var setNextCategoryColor = function() {

	if (nextCatColorIndex >= category.categorySkinColors.length) {
		nextCatColorIndex = 0;
	} else {
		nextCatColorIndex = nextCatColorIndex + 1;
	}
	nextCatColor = category.categorySkinColors[nextCatColorIndex];
}

var OkayButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            
            if (titleField.first.first.string == "") {
	           	application.remove(modal);
            	application.replace(categoriesScreen.blankScreen, categoriesScreen.screen);
           		return;
            }
            
			newCategory = category.Category(name=categoryName, color=nextCatColor, subcategories = categorySubcategories);
			newCategory.clothing = [];
			for (var i = 0; i < addClothingToCategory.selectedClothing.length; i++) {
				newCategory.clothing.push(addClothingToCategory.selectedClothing);
			}

			trace(Object.keys(clothing) + "\n");
			clothing.addCategoriesToClothing(addClothingToCategory.selectedClothing, newCategory);
			/*trace("newCategory.clothing = " + newCategory.clothing + "\n");
			for (var i = 0; i < newCategory.clothing.length; i++) {
				trace("newCategory.clothing = " + newCategory.clothing[i].name + "\n");
			}*/

			category.categories.push(newCategory);
			categoriesScreen.ListBuilder(newCategory);
			
			setNextCategoryColor();
            
            titleField.first.first.string = '';
            application.remove(modal);
            application.replace(categoriesScreen.blankScreen, categoriesScreen.screen);
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
            application.replace(categoriesScreen.blankScreen, categoriesScreen.screen);
        }},
    })
}});

var addClothingButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        //new Label({left:0, right:0, height:40, string: "Cancel", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
        	KEYBOARD.hide();
            trace("trying to add clothing...\n");
            application.add(addClothingToCategory.bg);
            application.add(addClothingToCategory.screen);
            application.add(addClothingToCategoryNavBar.navBar);
           
        }},
    })
}});

var addClothingButton = new addClothingButtonTemplate();
addClothingButton.skin = addClothingButtonSkin;

var cancelButton = new CancelButtonTemplate();
cancelButton.skin = cancelButtonSkin;
var okayButton = new OkayButtonTemplate();
okayButton.skin = okayButtonSkin;


var doneButton = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "DONE", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
			newCategory = category.Category(name=categoryName, color=category.generateCategorySkinColor(), subcategories = categorySubcategories, clothing = addClothingToCategory.selectedClothing);
			
			trace("newCategory = " + newCategory);

			category.categories.push(newCategory);
			categoriesScreen.ListBuilder(newCategory);
            
            titleField.first.first.string = '';
            application.remove(modal);
            application.replace(categoriesScreen.blankScreen, categoriesScreen.screen);
        }},
    })
}});

var titleField = new TitleField({ name: '' }),

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
        new Label({string:"Add Category", style: titleStyle, top: 20}),
        new Container({ height: 50 }),
        titleField,	
        new Container({ height: 10 }),
        addClothingButton,
        new Container({ height: 40 }),
        buttons
    ]
});

exports.modal = modal;