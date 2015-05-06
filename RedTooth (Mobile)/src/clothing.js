//@module

//All Categories

var clothingInCloset = [];


var sampleClothes = [
    	{name: 'blue shirt', idNum: 1, photo:"../assets/blue-shirt-photo.jpg", toggleOn: false, categories: ["Business"]},
    	{name: 'gray jacket', idNum: 2, photo:"../assets/gray-jacket-photo.jpg", toggleOn: false, categories: ["Business"]},
    	{name: 'black dress', idNum: 3, photo: "../assets/black-dress-photo.jpg", toggleOn: false, categories: ["Date"]},
    	{name: 'red hoodie', idNum: 4, photo: "../assets/red-hoodie-photo.jpg", toggleOn: false, categories: ["Date"]},
    	{name: 'purple t-shirt', idNum: 5, photo: "../assets/purple-tshirt-photo.jpg", toggleOn: false, categories: ["Business", "Date"]},
    	{name: 'blue cal t-shirt', idNum: 5, photo: "../assets/blue-caltshirt-photo.jpg", toggleOn: false, categories: ["Business", "Date"]},
    	{name: 'black dress pants', idNum: 5, photo: "../assets/black-dress-pants.jpg", toggleOn: false, categories: ["Business", "Date"]}
];





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

var Clothing = function(name, id, categories, hangerId, photo) {
	var returnClothing = Object();
	returnClothing.name = name;
	returnClothing.idNum = id;
	returnClothing.categories = categories;
	returnClothing.hangerId = hangerId;
	returnClothing.photo = photo;
	return returnClothing;
}


function addCategoriesToClothing(selectedClothingArray, categoryObject) {
	for (var i = 0; i < selectedClothingArray.length; i++) {
		for (var j = 0; j < clothingInCloset.length; j++) {
			if (selectedClothingArray[i].name == clothingInCloset[j].name) {
				clothingInCloset[j].categories.push(categoryObject);
				trace(categoryObject.name + " is being added to " + clothingInCloset[j].name + "\n");
			}
		}
	}
}



//loading sample clothes into existing closet...

for (var i = 0; i < sampleClothes.length; i++) {
	var newClothing = new Clothing();
	newClothing.name = sampleClothes[i].name;
	newClothing.idNum = sampleClothes[i].idNum;
	newClothing.photo = sampleClothes[i].photo;
	newClothing.categories = [];
	newClothing.hangerId = '';
	clothingInCloset.push(newClothing);
	
	trace("newClothing.name = " + newClothing.name + "\n");
}


trace("clothingInCloset = " + clothingInCloset+"\n");


exports.Clothing = Clothing;
exports.clothingInCloset = clothingInCloset;
exports.addCategoriesToClothing = addCategoriesToClothing;
exports.sampleClothes = sampleClothes;
