//@module

//All Categories

var clothingInCloset = [];


var sampleClothes = [
    	{name: 'blue shirt', idNum: 1, photo:"../assets/shirt.png", toggleOn: false},
    	{name: 'gray jacket', idNum: 2, photo:"../assets/shirt.png", toggleOn: false},
    	{name: 'black dress', idNum: 3, photo: "../assets/shirt.png", toggleOn: false},
    	{name: 'red hoodie', idNum: 4, photo: "../assets/shirt.png", toggleOn: false},
    	{name: 'purple t-shirt', idNum: 5, photo: "../assets/shirt.png", toggleOn: false},
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
	returnClothing.id = id;
	returnClothing.categories = categories;
	returnClothing.hangerId = hangerId;
	returnClothing.photo = photo;
	return returnClothing;
}


//loading sample clothes into existing closet...

for (var i = 0; i < sampleClothes.length; i++) {
	var newClothing = new Clothing();
	newClothing.name = sampleClothes[i].name;
	newClothing.id = sampleClothes[i].idNum;
	newClothing.photo = sampleClothes[i].photo;
	clothingInCloset.push(newClothing);
	
	trace("newClothing.name = " + newClothing.name + "\n");
}

trace("clothingInCloset = " + clothingInCloset+"\n");


exports.Clothing = Clothing;
exports.clothingInCloset = clothingInCloset;