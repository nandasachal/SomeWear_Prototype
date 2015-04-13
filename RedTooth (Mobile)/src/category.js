//@module
var limeGreenVariantColor = '#FFC4EE6F';
var watermelonVariantColor = '#FFFF7777';
var cremeBruleeVariantColor = '#FFFFD277';
var purpleVariantColor = '#FF705DAF';
var renaissanceBlueVariantColor = '#FF2F71A4';
var orangeCreamsicleVariantColor = '#FFFF953D';
var caterpieGreenVariantColor = '#D03285';
var pikachuYellowVariantColor = '#FFFFFF3D';

var categorySkinColors = [limeGreenVariantColor, watermelonVariantColor, cremeBruleeVariantColor, 
							purpleVariantColor, renaissanceBlueVariantColor, orangeCreamsicleVariantColor, 
							caterpieGreenVariantColor, pikachuYellowVariantColor];

var categories = [];

var sampleCategories = [
	    {name: 'Business', color:"orange"},
    	{name: 'Date', color:"blue"},
    	{name: 'Casual', color:"white"},
	];

var Category = function(name, color, subcategories, clothing) {
	var returnCategory = Object();
	returnCategory.name = name;
	returnCategory.color = color;
	returnCategory.subcategories = subcategories;
	returnCategory.clothing = clothing;
	//returnCategory.skin;
	return returnCategory;
};


var generateCategorySkinColor = function() {
	return categorySkinColors[categories.length % 8];
};

exports.Category = Category;
exports.categories = categories;

for (var i = 0; i < sampleCategories.length; i++) {
	var newCategory = new Category();
	newCategory.name = sampleCategories[i].name;
	newCategory.color = sampleCategories[i].color;
	categories.push(newCategory);
}

exports.Category = Category;
exports.categories = categories;
exports.generateCategorySkinColor = generateCategorySkinColor;
