// KPR Script file

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
var categoryNameStyle = new Style( { font: "bold 40px", color:"white" } );
var whiteSkin = new Skin({fill:tealColor});

var addClothingTexture = new Texture('../assets/addToCategoriesButtonGraphic.png');
var addClothingButtonSkin = new Skin({ texture: addClothingTexture, width: 252.5, height: 41.75});//height:55, width: 70, aspect: 'fit', });

/*var categoriesScreen = require("categoryScreen.js");
var category = require("category.js");*/

var categoryName = '';
var categoryColor = '';
var categorySubcategories = [];
var categoryClothing = [];
var selectedCategories = [];

var cancelTexture = new Texture('../assets/cancelButtonGraphic.png');
var okayTexture = new Texture('../assets/okayButtonGraphic.png');
var cancelButtonSkin = new Skin({ texture: cancelTexture, width: 66, height: 43});
var okayButtonSkin = new Skin({ texture: okayTexture, width: 66, height: 43});

var holder = 0;

var TitleField = Container.template(function($) { return { 
  width: 250, height: 36, skin: nameInputSkin, contents: [
    Scroller($, { name: 'scroller', 
      left: 4, right: 4, top: 4, bottom: 4, active: true, 
      behavior: Object.create(CONTROL.FieldScrollerBehavior.prototype), clip: true, contents: [
        Label($, { name: 'label',
          left: 0, top: 0, bottom: 0, skin: THEME.fieldLabelSkin, style: fieldStyle, anchor: 'TITLE',
          editable: true, string: $.name,
            behavior: Object.create( CONTROL.FieldLabelBehavior.prototype, {
                onEdited: { value: function(label){
                    var data = this.data;
                    data.name = label.string;
                    label.container.titleHint.visible = ( data.name.length == 0 );
                    clothingName = label.string;
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



var OkayButtonTemplate = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, //height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            trace("here");
            if (titleField.first.first.string == "") {
	           	application.remove(modal);
            	//application.replace(categoryDetailView.blankScreen, categoryDetailView.screen);
           		return;
            }
            var newItem = clothing.Clothing(name=clothingName, currentItem.idNum,[],currentItem.hangerId,currentItem.photo);
            for (var i = 0; i < editCategoryInClothing.selectedCategories.length; i++) {
				newItem.categories.push(editCategoryInClothing.selectedCategories[i]);
			}
            for (var i = 0; i < clothing.clothingInCloset.length; i++ ) {
				if (currentItem.name == clothing.clothingInCloset[i].name) {
					clothing.clothingInCloset.splice(i,1);
				}
			}

			//trace(JSON.stringify(newItem));
			clothing.clothingInCloset.unshift(newItem);
			//trace(JSON.stringify(clothing.clothingInCloset));
            
            titleField.first.first.string = '';

            /*newItem.clothing = editClothingInCategory.selectedClothing;
            for (var i = 0; i < editClothingInCategory.selectedClothing.length; i++) {
				var c = editClothingInCategory.selectedClothing[i];
				c.categories.push(currentCategory);
			}
            
           for (var i = 0; i < category.categories.length; i++ ) {
				if (currentCategory.name == category.categories[i].name) {
					category.categories[i].name = categoryName;
					category.categories[i].clothing = editClothingInCategory.selectedClothing;
					for (var i = 0; i < clothing.clothingInCloset.length; i++) {
						var c = clothing.clothingInCloset[i];
						if (editClothingInCategory.selectedClothing.indexOf(c) != -1 && c.categories.indexOf(currentCategory) == -1) {
							c.categories.push(currentCategory);
						} else if (editClothingInCategory.selectedClothing.indexOf(c) == -1 && c.categories.indexOf(currentCategory) != -1) {
							var index = c.categories.indexOf(currentCategory);
							c.categories.splice(index, 1);
						}
					}
					//trace("currentCategory = " + currentCategory + "\n");
				}
            }*/

  			clothingProfile.store(newItem.name,newItem.photo,newItem.categories,newItem.idNum);
  			clothingProfile.edit_refresh();
            application.remove(modal);
            application.add(clothingProfileNavBar.navBar);
            //trace("after removing modal\n");
            //application.replace(categoryDetailView.blankScreen, categoryDetailView.screen);
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
            application.add(clothingProfileNavBar.navBar);
            //application.replace(categoryDetailView.blankScreen, categoryDetailView.screen);
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
            //trace("trying to add clothing...\n");
            application.add(editCategoryInClothing.bg);
            editCategoryInClothing.initialize();
            application.add(editCategoryInClothing.screen);
            application.add(editCategoryInClothingNavBar.navBar);
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
			/*newCategory = category.Category(name=categoryName, color=category.generateCategorySkinColor(), subcategories = categorySubcategories, clothing = addClothingToCategory.selectedClothing);
			
			trace("newCategory = " + newCategory);

			category.categories.push(newCategory);
			categoriesScreen.ListBuilder(newCategory);
            
            titleField.first.first.string = '';*/
            application.remove(modal);
            application.replace(categoryDetailView.blankScreen, categoryDetailView.screen);
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

var currentItem;

var modal = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new Label({name: "modalLabel", string:"Edit Clothing", style: titleStyle, top: 20}),
        //new Label({name: "categoryNameLabel", string: "", style: categoryNameStyle, top: 20}),
        new Container({ height: 50 }),
        titleField,	
        new Container({ height: 10 }),
        addClothingButton,
        new Container({ height: 40 }),
        buttons
    ]
});

function refresh(clothingName, id, categories, hangerId, photo) {
	//trace("inputCategory = " + inputCategory + "\n")
	holder = 0;
	currentItem = clothing.Clothing(clothingName, id, categories, hangerId, photo);
	selectedCategories = categories;
	titleField.scroller.label.string = currentItem.name;
	//modal.categoryNameLabel.string = currentCategory.name;
}

exports.holder = holder;
exports.selectedCategories = selectedCategories;
exports.modal = modal;
exports.refresh = refresh;