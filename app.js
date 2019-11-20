'use strict';
//Global functions
var allProdImages = document.getElementById('allProdImages');

var prodOneImage = document.getElementById('prodOneImage');
var prodTwoImage = document.getElementById('prodTwoImage');
var prodThreeImage = document.getElementById('prodThreeImage');
var resultList = document.getElementById('resultList');
var ctx = document.getElementById('chartResults').getContext('2d');

var firstProduct = null;
var secondProduct = null;
var thirdProduct = null;

function Product(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Product.allProducts.push(this);
}

Product.arrayImg = [];

// Helper function to display document elements
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}

function checkDuplicate(objName, arr) {
  var match = 0;
  for (var i = 0; i < arr.length; i++) {
    if (objName === arr[i].name) {
      match++;
    }
  }
  return match;
}

new Product('Bag', 'lab/assets/bag.jpg');
new Product('Banana', 'lab/assets/banana.jpg');
new Product('Bathroom', 'lab/assets/bathroom.jpg');
new Product('Boots', 'lab/assets/boots.jpg');
new Product('Breakfast', 'lab/assets/breakfast.jpg');
new Product('Bubble Gum', 'lab/assets/bubblegum.jpg');
new Product('Chair', 'lab/assets/chair.jpg');
new Product('Cthulhu', 'lab/assets/cthulhu.jpg');
new Product('Dog Duck', 'lab/assets/dog-duck.jpg');
new Product('Dragon', 'lab/assets/dragon.jpg');
new Product('Pen', 'lab/assets/pen.jpg');
new Product('Pet Sweep', 'lab/assets/pet-sweep.jpg');
new Product('Scissors', 'lab/assets/scissors.jpg');
new Product('Shark', 'lab/assets/shark.jpg');
new Product('Sweep', 'lab/assets/sweep.jpg');
new Product('Tauntaun', 'lab/assets/tauntaun.jpg');
new Product('Unicorn', 'lab/assets/unicorn.jpg');
new Product('USB', 'lab/assets/usb.jpg');
new Product('Water Can', 'lab/assets/water-can.jpg');
new Product('Wine Glass', 'lab/assets/wine-glass.jpg');

// Used Stackoverflow for assistance with below equation //
function fetchThreeProd() {
  var previousSet = [];
  if (firstProduct !== null) {
    previousSet.push(firstProduct.name);
    previousSet.push(secondProduct.name);
    previousSet.push(thirdProduct.name);
  }

  var disp_Images = [];
  while (disp_Images.length < 3) {
    var radnoIndex = Math.floor(Math.random() * Product.allProducts.length);
    // Check Ducplicate on three displayed img
    if (checkDuplicate(Product.allProducts[radnoIndex].name, disp_Images) === 0) {
      // Check immediate previous set
      if (previousSet.includes(Product.allProducts[radnoIndex].name) === false) {
        disp_Images.push(Product.allProducts[radnoIndex]);
      }
    }
  }
  prodOneImage.src = disp_Images[0].imgURL;
  prodTwoImage.src = disp_Images[1].imgURL;
  prodThreeImage.src = disp_Images[2].imgURL;

  firstProduct = disp_Images[0];
  secondProduct = disp_Images[1];
  thirdProduct = disp_Images[2];
}

fetchThreeProd();

function totalResult() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    addElement('li', resultList, Product.allProducts[i].name + ' had ' + Product.allProducts[i].clickCtr + ' votes and was shown ' + Product.allProducts[i].shownCtr + ' times');
  }
}

var counter = 0;
function clicker(event) {
  if (counter < 25) {
    var id = event.target.id;

    // Counter goes up every time the img is shown
    firstProduct.shownCtr++;
    secondProduct.shownCtr++;
    thirdProduct.shownCtr++;

    if(id === 'prodOneImage') {
      firstProduct.clickCtr++;
    } else if(id === 'prodTwoImage') {
      secondProduct.clickCtr++;
    } else if(id === 'prodThreeImage') {
      thirdProduct.clickCtr++;
    }

    fetchThreeProd();
  }
  counter++;

  if(counter === 25) {
    alert('Done!');
    createChart();
    totalResult();
  }
}

allProdImages.addEventListener('click', clicker);

// Create result chart
function createChart() {
  var label = [];
  var v_Data = [];
  var displayedData = [];
  for (var i = 0; i < Product.allProducts.length; i++) {
    label.push(Product.allProducts[i].name);
    v_Data.push(Product.allProducts[i].clickCtr);
    displayedData.push(Product.allProducts[i].shownCtr);
  }
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: 'Number of Votes',
        data: v_Data,
        backgroundColor: [
          red,
          blue,
          yellow,
          green,
          purple,
          red,
          blue,
          yellow,
          green,
          purple,
          red,
          blue,
          yellow,
          green,
          purple,
          red,
          blue,
          yellow,
          green,
          purple,
        ],
        borderColor: [
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero:true
          }
        }]
      }
    }
  });
};
