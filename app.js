
'use strict';
//Global functions
var allProdImages = document.getElementById('allProdImages');

function ProductAll(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
}
ProductAll.arrayImg = [];

ProductAll.arrayImg.push(new ProductAll('Bag', 'lab/assets/bag.jpg'));
ProductAll.arrayImg.push(new ProductAll('Banana', 'lab/assets/banana.jpg'));
ProductAll.arrayImg.push(new ProductAll('Bathroom', 'lab/assets/bathroom.jpg'));
ProductAll.arrayImg.push(new ProductAll('Boots', 'lab/assets/boots.jpg'));
ProductAll.arrayImg.push(new ProductAll('Breakfast', 'lab/assets/breakfast.jpg'));
ProductAll.arrayImg.push(new ProductAll('Bubble Gum', 'lab/assets/bubblegum.jpg'));
ProductAll.arrayImg.push(new ProductAll('Chair', 'lab/assets/chair.jpg'));
ProductAll.arrayImg.push(new ProductAll('Cthulhu', 'lab/assets/cthulhu.jpg'));
ProductAll.arrayImg.push(new ProductAll('Dog Duck', 'lab/assets/dog-duck.jpg'));
ProductAll.arrayImg.push(new ProductAll('Dragon', 'lab/assets/dragon.jpg'));
ProductAll.arrayImg.push(new ProductAll('Pen', 'lab/assets/pen.jpg'));
ProductAll.arrayImg.push(new ProductAll('Pet Sweep', 'lab/assets/pet-sweep.jpg'));
ProductAll.arrayImg.push(new ProductAll('Scissors', 'lab/assets/scissors.jpg'));
ProductAll.arrayImg.push(new ProductAll('Shark', 'lab/assets/shark.jpg'));
ProductAll.arrayImg.push(new ProductAll('Sweep', 'lab/assets/sweep.jpg'));
ProductAll.arrayImg.push(new ProductAll('Tauntaun', 'lab/assets/tauntaun.jpg'));
ProductAll.arrayImg.push(new ProductAll('Unicorn', 'lab/assets/unicorn.jpg'));
ProductAll.arrayImg.push(new ProductAll('USB', 'lab/assets/usb.jpg'));
ProductAll.arrayImg.push(new ProductAll('Water Can', 'lab/assets/water-can.jpg'));
ProductAll.arrayImg.push(new ProductAll('Wine Glass', 'lab/assets/wine-glass.jpg'));

// Used Stackoverflow for assistance with below equation //
ProductAll.prototype.fetchRandomImages = function() {
  var prodThreeImages = [];
  var prodDuplex = false;
  for(var i = 0; i < 3; i++) {
    prodThreeImages.push(ProductAll.arrayImg[Math.floor(ProductAll.arrayImg.length * Math.random())]);
  }

  prodThreeImages.map(function(ProductAll){
    return ProductAll.name;
  }).forEach(function(element, index, array){
    if(array.indexOf(element) !== index) {
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
