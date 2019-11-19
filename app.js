'use strict';

var allProducts = [];
var priorDisplay = new Set();
var productView = document.getElementById('product_view');
var roundsLeft = 25;
//var roundsLeft = 5;
var leftItem = document.getElementById('0');
var centerItem = document.getElementById('1');
var rightItem = document.getElementById('2');

function Product(name, imageURL) {
  this.name = name;
  this.image = imageURL;
  this.timesClicked = 0;
  this.timesDisplayed = 0; // This property is not in us

  Product.all.push(this);
};

Product.all = [];

new Product('Bag', '/lab/assets/bag.jpg');
new Product('Banana', '/lab/assets/banana.jpg');
new Product('Bathroom', '/lab/assets/bathroom.jpg');
new Product('Boots', '/lab/assets/boots.jpg');
new Product('Breakfast', '/lab/assets/breakfast.jpg');
new Product('Bubblegum', '/lab/assets/bubblegum.jpg');
new Product('Chair', '/lab/assets/chair.jpg');
new Product('Cthulhu', '/lab/assets/cthulhu.jpg');
new Product('Dog Duck', '/lab/assets/dog-duck.jpg');
new Product('Dragon', '/lab/assets/dragon.jpg');
new Product('Pen', '/lab/assets/pen.jpg');
new Product('Pet Sweep', '/lab/assets/pet-sweep.jpg');
new Product('Scissors', '/lab/assets/scissors.jpg');
new Product('Shark', '/lab/assets/shark.jpg');
new Product('Sweep', '/lab/assets/sweep.jpg');
new Product('Tauntaun', '/lab/assets/tauntaun.jpg');
new Product('Unicorn.jpg', '/lab/assets/unicorn.jpg');
new Product('USB', '/lab/assets/usb.jpg');
new Product('Water Can', '/lab/assets/water-can.jpg');
new Product('Wine Glass', '/lab/assets/wine-glass.jpg');

function showProduct(products) {
  for (var i = 0; i < products.length; i++) {
    var item = document.createElement('div');
    item.setAttribute('class', 'show-product');
    productView.appendChild(item);
    var indivImage = document.createElement('img');
    indivImage.setAttribute('id', `${i}`);
    indivImage.setAttribute('src', products[i].image);
    item.appendChild(indivImage);
    products[i].timesDisplayed++;
  }
};

function makeRandoProds() {
  var products = [];
  while (products.length < 3) {
    var productRando = Product.all[Math.floor(Math.random() * Product.all.length)];
    if (!priorDisplay.has(productRando)) {
      priorDisplay.add(productRando);
      products.push(productRando)
    }
  }
  showProduct(products);
  allProducts = products;
};

makeRandoProds();

function clickHandler(event) {
  allProducts[event.target.id].clicked++;
  productView.innerHTML = '';
  roundsLeft--;
  if (roundsLeft > 0) {
    makeRandoProds();
  } else {
    productView.innerHTML = '';
  }
  console.log(priorDisplay);
  console.log(Product.all);
  console.log(roundsLeft);
};

productView.addEventListener('click', clickHandler);
