//@module
var limeGreenVariantColor = '#FFC4EE6F';
var watermelonVariantColor = '#FFFF7777';
var cremeBruleeVariantColor = '#FFFFD277';
var purpleVariantColor = '#FF7E76B7';
var renaissanceBlueVariantColor = '#FF4A9BCD';
var orangeCreamsicleVariantColor = '#FFF3A05B';
var caterpieGreenVariantColor = '#FFDA78B0';
var pikachuYellowVariantColor = '#FFFEF493';

var categorySkinColors = [limeGreenVariantColor, watermelonVariantColor, cremeBruleeVariantColor, 
							purpleVariantColor, renaissanceBlueVariantColor, orangeCreamsicleVariantColor, 
							caterpieGreenVariantColor, pikachuYellowVariantColor];

var categories = [];

var sampleCategories = [
	    {name: 'Casual', color: limeGreenVariantColor, clothing: []},
    	{name: 'Date', color: watermelonVariantColor, clothing: []},
    	{name: 'Business', color: cremeBruleeVariantColor, clothing: []},
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

function addClothingToCategories(selectedCategoriesArray, clothingObject) {
	for (var i = 0; i < selectedCategoriesArray.length; i++) {
		for (var j = 0; j < categories.length; j++) {
			if (selectedCategoriesArray[i].name == categories[j].name) {
				categories[j].clothing.push(clothingObject);
				trace(clothingObject.name + " is being added to " + categories[j].name + "\n");
				trace("TRACE ME");
			}
		}
	}
}


var generateCategorySkinColor = function() {
	return categorySkinColors[categories.length % 8];
};

exports.Category = Category;
exports.categories = categories;

for (var i = 0; i < sampleCategories.length; i++) {
	var newCategory = new Category();
	newCategory.name = sampleCategories[i].name;
	newCategory.color = sampleCategories[i].color;
	newCategory.clothing = sampleCategories[i].clothing;
	newCategory.toggleOn = false;
	categories.push(newCategory);
}

exports.Category = Category;
exports.categories = categories;
exports.generateCategorySkinColor = generateCategorySkinColor;
exports.categorySkinColors = categorySkinColors;
exports.addClothingToCategories = addClothingToCategories;
