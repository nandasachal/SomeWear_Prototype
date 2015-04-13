//@module

//Category objects should have a name, color, its subcategories, and the clothing within its category
var categories = [
		//The following placeholder categories test all available colors
	    /*{name: 'Business', color:limeGreenVariantColor},
    	{name: 'Date', color:watermelonVariantColor},
    	{name: 'Moneymaker Fit', color:purpleVariantColor},
    	{name: 'Pokemon Gear', color:pikachuYellowVariantColor},
    	{name: 'Artsy', color:renaissanceBlueVariantColor},
    	{name: 'Halloween', color:orangeCreamsicleVariantColor},
    	{name: 'Hiking', color:caterpieGreenVariantColor},
    	{name: 'Dessert Date', color:cremeBruleeVariantColor},*/
	];
	
//
//Example usage:
//
//		ASSUME: baseball, basketball, soccer are Category objects
//  	ASSUME: blueShirt, whitePants are Clothing objects
//
//		subcatoriesArray = [baseball, basketball, soccer];
//  	clothingArray = [blueShirt, whitePants]
//		sports = category.Category(name="Sports", color="orange", subcategories=subcategoriesArray, clothing=clothingArray);

var Category = function(name, color, subcategories, clothing) {
	var returnCategory = Object();
	returnCategory.name = name;
	returnCategory.color = color;
	returnCategory.subcategories = subcategories;
	returnCategory.clothing = clothing;
	//returnCategory.skin;
	return returnCategory;
};


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


var generateCategorySkinColor = function() {
	return categorySkinColors[categories.length % 8];
};

exports.Category = Category;
exports.categories = categories;
exports.generateCategorySkinColor = generateCategorySkinColor;