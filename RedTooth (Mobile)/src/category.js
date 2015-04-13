//@module

//Category objects should have a name, color, its subcategories, and the clothing within its category
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
	return returnCategory;
};

exports.Category = Category;