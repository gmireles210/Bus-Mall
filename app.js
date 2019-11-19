
'use strict';
//Global functions
var allProdImages = document.getElementById('allProdImages');

function ProductAll(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
}
ProductAll.arrayImg = [];

ProductAll.arrayImg.push(new ProductAll('Bag', 'lab/assets/bag.jpg'));
ProductAll.arrayImg.push(new ProductAll('Banana', 'lab/assetsbanana.jpg'));
ProductAll.arrayImg.push(new ProductAll('Bathroom', 'lab/assetsbathroom.jpg'));
ProductAll.arrayImg.push(new ProductAll('Boots', 'lab/assetsboots.jpg'));
ProductAll.arrayImg.push(new ProductAll('Breakfast', 'lab/assetsbreakfast.jpg'));
ProductAll.arrayImg.push(new ProductAll('Bubble Gum', 'lab/assetsbubblegum.jpg'));
ProductAll.arrayImg.push(new ProductAll('Chair', 'lab/assetschair.jpg'));
ProductAll.arrayImg.push(new ProductAll('Cthulhu', 'lab/assetsctulhu.jpg'));
ProductAll.arrayImg.push(new ProductAll('Dog Duck', 'lab/assetsdog-duck.jpg'));
ProductAll.arrayImg.push(new ProductAll('Dragon', 'lab/assetsdragon.jpg'));
ProductAll.arrayImg.push(new ProductAll('Pen', 'lab/assetspen.jpg'));
ProductAll.arrayImg.push(new ProductAll('Pet Sweep', 'lab/assetspet-sweep.jpg'));
ProductAll.arrayImg.push(new ProductAll('Scissors', 'lab/assetsscissors.jpg'));
ProductAll.arrayImg.push(new ProductAll('Shark', 'lab/assetsshark.jpg'));
ProductAll.arrayImg.push(new ProductAll('Sweep', 'lab/assetssweep.png'));
ProductAll.arrayImg.push(new ProductAll('Tauntaun', 'lab/assetstauntaun.jpg'));
ProductAll.arrayImg.push(new ProductAll('Unicorn', 'lab/assetsunicorn.jpg'));
ProductAll.arrayImg.push(new ProductAll('USB', 'lab/assetsusb.jpg'));
ProductAll.arrayImg.push(new ProductAll('Water Can', 'lab/assetswater-can.jpg'));
ProductAll.arrayImg.push(new ProductAll('Wine Glass', 'lab/assetswine-glass.jpg'));
// ProductAllNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

ProductAll.prototype.fetchRandomImages = function() {
  var prodThreeImages = [];
  var prodDuplex = false;
  for(var i = 0; i < 3; i++) {
    prodThreeImages.push(ProductAll.arrayImg[Math.floor(ProductAll.arrayImg.length * Math.random())]);

    // var imgOne = ProductAll.arrayImg[Math.floor(ProductAll.arrayImg.length * Math.random())];
    // var imgTwo = ProductAll.arrayImg[Math.floor(ProductAll.arrayImg.length * Math.random())];
    // var imgThree = ProductAll.arrayImg[Math.floor(ProductAll.arrayImg.length * Math.random())];
  }

  prodThreeImages.map(function(ProductAll){
    return ProductAll.name;
  }).forEach(function(element, index, arr){
    if(arr.indexOf(element) !== index) {
      prodDuplex = true;
      if(prodDuplex) {
        ProductAll.prototype.fetchRandomImages();
      }

    }
  });
  return prodThreeImages;
}

var prodOneImage = document.getElementById('prodOneImage');
var prodTwoImage = document.getElementById('prodTwoImage');
var prodThreeImage = document.getElementById('prodThreeImage');

prodOneImage.setAttribute('src', ProductAll.prototype.fetchRandomImages()[0].imgUrl);
prodTwoImage.setAttribute('src', ProductAll.prototype.fetchRandomImages()[1].imgUrl);
prodThreeImage.setAttribute('src', ProductAll.prototype.fetchRandomImages()[2].imgUrl);
