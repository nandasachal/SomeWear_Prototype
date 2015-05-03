//@module

//predefined
var one = {name: 'blue shirt', idNum: 1, photo:"../assets/shirt-lighter.png", toggleOn: false, categories: ["Business"], subCategories:[]};
var two = {name: 'gray jacket', idNum: 2, photo:"../assets/shirt-lighter.png", toggleOn: false, categories: ["Business"], subCategories:[]};
var three = {name: 'black dress', idNum: 3, photo: "../assets/shirt-lighter.png", toggleOn: false, categories: ["Date"], subCategories:[]};
var four = {name: 'red hoodie', idNum: 4, photo: "../assets/shirt-lighter.png", toggleOn: false, categories: ["Date"], subCategories:[]};
var five = {name: 'purple t-shirt', idNum: 5, photo: "../assets/shirt-lighter.png", toggleOn: false, categories: ["Business", "Date"], subCategories:[]};

var A = {name: 'Dinner Date', color: limeGreenVariantColor, clothing: [three, four]};
var B = {name: 'Coffee Date', color: watermelonVariantColor, clothing: [three, five]};
var C = {name: 'Picnic', color: cremeBruleeVariantColor, clothing: []};

var X = {name: 'Casual', color: limeGreenVariantColor, subCategories: [C], clothing: []};
var Y = {name: 'Date', color: watermelonVariantColor, subCategories: [A,B], clothing: []};
var Z = {name: 'Business', color: cremeBruleeVariantColor, subCategories: [], clothing: []};

A.parentCategory = Y;
B.parentCategory = Y;
C.parentCategory = X;

//sub-categories dictionary
exports.subCategories = [];
exports.sampleSubCategories = [A, B, C];
exports.SubCategory = function(name, color, parentCategory, clothing) {
	var returnSubCategory = Object();
	returnSubCategory.name = name;
	returnSubCategory.color = color;
	returnSubCategory.parentCategory = parentCategory;
	returnSubCategory.clothing = clothing;
	return returnSubCategory;
};

//categories dictionary
exports.categories = [];
exports.sampleCategories = [
	    X, Y, Z
	];
exports.Category = function(name, color, subCategories, clothing) {
	var returnCategory = Object();
	returnCategory.name = name;
	returnCategory.color = color;
	returnCategory.subCategories = subCategories;
	returnCategory.clothing = clothing;
	return returnCategory;
};

//clothing dictionary
exports.clothingInCloset = [];
exports.sampleClothes = [one, two, three, four, five];
exports.Clothing = function(name, id, categories, subCategories, hangerId, photo) {
	var returnClothing = Object();
	returnClothing.name = name;
	returnClothing.idNum = id;
	returnClothing.categories = categories;
	returnClothing.subCategories = subCategories;
	returnClothing.hangerId = hangerId;
	returnClothing.photo = photo;
	return returnClothing;
}