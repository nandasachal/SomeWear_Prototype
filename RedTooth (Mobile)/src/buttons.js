//@module

 exports.screenChangeButton =  Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen(new Object());
			$.func(this.nextScreen);	
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.modalCreationButton = Container.template(function($){ return {
	left:0, right:0, top:0, height: navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			trace("supposed to add a popup modal\n");
			//application.add();
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.modalRemovalButton = Container.template(function($){ return {
	left:50, right:50, top:10, height:40, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, height:55, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			trace("hello\n");
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			trace("supposed to remove the popup modal for sync \n");
			//application.add();
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});
 
//Object Container Buttons
exports.categoriesButton =  Container.template(function($){ return {
	left:0, right:0, active: true,
	contents:[
     	Column($.object, { left: 0, right: 0, skin: new Skin({fill: $.object.color}), contents: [
     		Container($.object, { left: 4, right: 4, height: 52,
     			contents: [
					Label($.object, { left: 10, style: productNameStyle, string: $.object.name,}),
 			    ], 
	           }),
     		Line($.object, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);;	
		},
		onTouchEnded: function(content){
			trace("goes to subCategories screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.subCategoriesButton =  Container.template(function($){ return {
	left:0, right:0, active: true,
	contents:[
     	Column($.object, { left: 0, right: 0, skin: new Skin({fill: $.object.color}), contents: [
     		Container($.object, { left: 4, right: 4, height: 52,
     			contents: [
					Label($.object, { left: 10, style: productNameStyle, string: $.object.name,}),
 			    ], 
	           }),
     		Line($.object, { left: 0, right: 0, height: 1, skin: separatorSkin, }),
     	], }),
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
		},
		onTouchEnded: function(content){
			trace("goes into subCategories detail view \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});


exports.clothingButton =  Container.template(function($){ return {
	left:0, right:0, active: true,
	skin: greenSkin,
	contents:[
     	Column($.object, { left: 0, right: 0, contents: [
     		Container($.object, { left: 0, right: 0, height: 100, width: 100, skin: whiteSkin,
     			contents: [
     			           new Picture( {left:0, right:0, top:0, width: 100, height: 100, name: 'picture', url: $.object.photo}),
     			           Label($.object, { style: productNameStyle, string: $.object.name,}),
 			           ], 
	           }),
     		Line($.object, { left: 0, right: 0, top: 0, height: 1, skin: separatorSkin, }),
     	], }), 
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object, $.source, $.subCategory);
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.clothing2Button =  Container.template(function($){ return {
	left:0, right:0, active: true,
	skin: greenSkin,
	contents:[
     	Column($.object, { left: 0, right: 0, contents: [
     		Container($.object, { left: 0, right: 0, height: 100, width: 100, skin: whiteSkin,
     			contents: [
     			           new Picture( {left:0, right:0, top:0, width: 100, height: 100, name: 'picture', url: $.object.photo}),
     			           Label($.object, { style: productNameStyle, string: $.object.name,}),
 			           ], 
	           }),
     		Line($.object, { left: 0, right: 0, top: 0, height: 1, skin: separatorSkin, }),
     	], }), 
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object, $.source, $.subCategory);
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});


//Add Buttons
exports.addCategoryButton = Container.template(function($){ return {
	left:0, right:0, top:0, height: navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			trace("supposed to remove the popup modal for sync \n");
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.addClothingToSubCategoryButton = Container.template(function($){ return {
	left:0, right:0, top:0, height: navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			trace("supposed to remove the popup modal for sync \n");
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.addSubCategoryButton = Container.template(function($){ return {
	left:0, right:0, top:0, height: navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object)
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//REST global variables
			inputData = ""
			trace("supposed to remove the popup modal for sync \n");
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.addClothingToCategoryButton = Container.template(function($){ return {
	left:0, right:0, top:0, height: navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
			KEYBOARD.hide();
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			trace("supposed to remove the popup modal for sync \n");
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});


exports.addClothingButton = Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			application.invoke(new Message("/getCloset"));
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
		},
	}),
}});

//Tabs on the pages
exports.Tab = Container.template(function($){ return {
	left:0, right:0, top:0, bottom:0, active: $.activity, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 30, right:0, height:40, string: $.textForLabel, style:headerStyle}),
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
		},
		onTouchEnded: function(content){
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
		},
	}),
}});

//Clothign Detail View Picture Population
exports.clothingItemPicture = Container.template(function(clothingItem) {return {
	contents: [
		new Picture( {left:0, right:0, top:0, width: 100, height: 100, url: clothingItem.photo})
	]
}})

//Back Buttons
exports.backToSubCategoriesButton =  Container.template(function($){ 
return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: blackSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			trace("This is it: " + $.object);
			this.nextScreen = new $.nextScreen($.object)	
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.backToCategoriesButton =  Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: blackSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);	
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.backFromClothingDetailViewButton =  Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: blackSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = $.nextScreen($.object);	
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.backFromAddClothingToCategoriesButton =  Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: blackSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = $.nextScreen($.object);	
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});
//Toggle Buttons
exports.clothingToggleButton =  Container.template(function($){ return {
	left:0, right:0, active: true,
	skin: greenSkin,
	contents:[
     	Column($.object, { left: 0, right: 0, contents: [
     		Container($.object, { left: 0, right: 0, height: 100, width: 100, skin: whiteSkin,
     			contents: [
     			           new Picture( {left:0, right:0, top:0, width: 100, height: 100, name: 'picture', url: $.object.photo}),
     			           Label($.object, { style: productNameStyle, string: $.object.name,}),
 			           ], 
	           }),
     		Line($.object, { left: 0, right: 0, top: 0, height: 1, skin: separatorSkin, }),
     	], }), 
	],
	behavior: Object.create(Behavior.prototype, {	 
    	onTouchBegan: { value: function(container) {
    	}},
    	onTouchEnded: { value: function(container) {	
			if (!$.toggleOn) {
				container.first.skin = redSkin;
				trace("toggled on!\n");
				$.toggleOn = true;
				selectedClothing.push($.object);
				//trace(selectedClothing);
			} else if ($.toggleOn) {
				container.first.skin = new Skin({fill: "blue"});
				trace("toggled off!\n");
				$.toggleOn = false;
				selectedClothing.splice(selectedClothing.indexOf($.object), 1);
				//trace(selectedClothing);
			}
		}}
    }),
}});


//Other
exports.Field = Container.template(function($) { return { 
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
                    inputData = label.string;
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

//Done or Okay Buttons for Add Pages
exports.addSubCategoryOkayButton = Container.template(function($) { return {
    left: 0, right: 0, active: true, skin: redSkin,
    contents: [
        new Label({left:0, right:0, height:40, string: $.textForLabel, style: labelStyle})
    ],
    behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			var newSubCategory = new OBJECTS.SubCategory(inputData, "red", $.object, selectedClothing);
			OBJECTS.sampleSubCategories.push(newSubCategory);
			$.object.subCategories.push(newSubCategory);
			this.nextScreen = new $.nextScreen($.object);
			KEYBOARD.hide();
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//RESET GLOBAL VARIABLES
			selectedClothing = [];
			inputData = "";
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.addCategoryOkayButton = Container.template(function($) { return {
    left: 0, right: 0, active: true, skin: redSkin,
    contents: [
        new Label({left:0, right:0, height:40, string: $.textForLabel, style: labelStyle})
    ],
    behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			var newCategory = new OBJECTS.Category(inputData, "red", [], []);
			OBJECTS.sampleCategories.push(newCategory);
			this.nextScreen = new $.nextScreen($.object);
			KEYBOARD.hide();
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//RESET GLOBAL VARIABLES
			inputData = "";
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.addClothingToNewCategoryOkayButton =  Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

exports.addClothingToCategoryOkayButton =  Container.template(function($){ return {
	left:0, right:0, top:0, height:navBarHeight, active: true, //may need to pass in these paramters
	skin: greenSkin,
	contents:[
		new Label({left: 0, right:0, string: $.textForLabel, style:bigText})
	],
	behavior: Behavior({
		onCreate: function(content){
			this.downSkin = $.downSkin;
		},
		onTouchBegan: function(content){
			content.skin = this.downSkin;
			this.nextScreen = new $.nextScreen($.object);
			for (i = 0; i < selectedClothing.length; i++) {
				$.object.clothing.push(selectedClothing[i]);
			}
		},
		onTouchEnded: function(content){
			trace("goes to another screen \n");
			content.skin = greenSkin;
			application.remove(currentScreen);
			currentScreen = this.nextScreen;
			application.add(currentScreen);
			selectedClothing = [];
			//application.run(new TRANSITIONS.CrossFade(), oldScreen, currentScreen, {duration: 500});
		},
	}),
}});

