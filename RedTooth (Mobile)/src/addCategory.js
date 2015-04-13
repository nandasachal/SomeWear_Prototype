// KPR Script file
//@module

var THEME = require('themes/sample/theme');
var CONTROL = require('mobile/control');
var KEYBOARD = require('mobile/keyboard');

var nameInputSkin = new Skin({ borders: { left:2, right:2, top:2, bottom:2 }, stroke: 'gray',});
var fieldStyle = new Style({ color: 'black', font: 'Roboto bold 24px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var fieldHintStyle = new Style({ color: '#aaa', font: 'Roboto 20px', horizontal: 'left', vertical: 'middle', left: 5, right: 5, top: 0, bottom: 0, });
var whiteSkin = new Skin({fill:"white"});


var categoriesScreen = require("categoryScreen.js");
var category = require("category.js");

var categoryName = '';
var categoryColor = '';
var categorySubcategories = [];
var categoryClothing = [];

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

var labelStyle = new Style( { font: "bold 30px", color:"black" } );
var doneButton = BUTTONS.Button.template(function($) { return {
    left: 0, right: 0, height: 50, width: 100,
    contents: [
        new Label({left:0, right:0, height:40, string: "DONE", style: labelStyle})
    ],
    behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
        onTap: { value: function(content) {
            KEYBOARD.hide();
            application.remove(modal);
            
			newCategory = category.Category(name=categoryName, color=categoryColor, subcategories = categorySubcategories, clothing = categoryClothing);
			newCategory.button = 'Hit';
			
			categoriesScreen.categories.push(newCategory);
			categoriesScreen.ListBuilder(newCategory);

            application.add(categoriesScreen.screen);
            
            titleField.first.first.string = '';
        }},
    })
}});

var titleField = new TitleField({ name: '' }),

var modal = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
        new Label({string:"Add Catty", style: labelStyle, top: 20}),
        new Container({ height: 50 }),
        titleField,
        new Container({ height: 10 }),
        new Container({ height: 25 }),
        new doneButton(),
    ]
});

exports.modal = modal;