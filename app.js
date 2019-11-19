'use strict';
//Global functions
var allProdImages = document.getElementById('allProdImages');

function ProductAll(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
}
ProductAll.arrayImg = [];

ProductAll.arrayImg.push(new ProductAll('Bag', 'img/bag.jpg'));
ProductAll.arrayImg.push(new ProductAll('Banana', 'img/banana.jpg'));
ProductAll.arrayImg.push(new ProductAll('Bathroom', 'img/bathroom.jpg'));
ProductAll.arrayImg.push(new ProductAll('Boots', 'img/boots.jpg'));
ProductAll.arrayImg.push(new ProductAll('Breakfast', 'img/breakfast.jpg'));
ProductAll.arrayImg.push(new ProductAll('Bubble Gum', 'img/bubblegum.jpg'));
ProductAll.arrayImg.push(new ProductAll('Chair', 'img/chair.jpg'));
ProductAll.arrayImg.push(new ProductAll('Cthulhu', 'img/ctulhu.jpg'));
ProductAll.arrayImg.push(new ProductAll('Dog Duck', 'img/dog-duck.jpg'));
ProductAll.arrayImg.push(new ProductAll('Dragon', 'img/dragon.jpg'));
ProductAll.arrayImg.push(new ProductAll('Pen', 'img/pen.jpg'));
ProductAll.arrayImg.push(new ProductAll('Pet Sweep', 'img/pet-sweep.jpg'));
ProductAll.arrayImg.push(new ProductAll('Scissors', 'img/scissors.jpg'));
ProductAll.arrayImg.push(new ProductAll('Shark', 'img/shark.jpg'));
ProductAll.arrayImg.push(new ProductAll('Sweep', 'img/sweep.png'));
ProductAll.arrayImg.push(new ProductAll('Tauntaun', 'img/tauntaun.jpg'));
ProductAll.arrayImg.push(new ProductAll('Unicorn', 'img/unicorn.jpg'));
ProductAll.arrayImg.push(new ProductAll('USB', 'img/usb.jpg'));
ProductAll.arrayImg.push(new ProductAll('Water Can', 'img/water-can.jpg'));
ProductAll.arrayImg.push(new ProductAll('Wine Glass', 'img/wine-glass.jpg'));
// ProductAllNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

ProductAll.prototype.fetchRandomImages = function() {
  var prodThreeImages = [];
  var prodDuplex = false;
  for(var i = 0; i < 3; i++) {
    prodThreeImages.push(ProductAll.arrayImg[Math.floor(ProductAll.arrayImg.length * Math.random())]);

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


