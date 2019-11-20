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

function product(name, imgUrl) {
  this.name = name;
  this.imgUrl = imgUrl;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Product.allProducts.push(this);
}

product.arrayImg = [];

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

new product('Bag', 'lab/assets/bag.jpg'));
new product('Banana', 'lab/assets/banana.jpg'));
new product('Bathroom', 'lab/assets/bathroom.jpg'));
new product('Boots', 'lab/assets/boots.jpg'));
new product('Breakfast', 'lab/assets/breakfast.jpg'));
new product('Bubble Gum', 'lab/assets/bubblegum.jpg'));
new product('Chair', 'lab/assets/chair.jpg'));
new product('Cthulhu', 'lab/assets/cthulhu.jpg'));
new product('Dog Duck', 'lab/assets/dog-duck.jpg'));
new product('Dragon', 'lab/assets/dragon.jpg'));
new product('Pen', 'lab/assets/pen.jpg'));
new product('Pet Sweep', 'lab/assets/pet-sweep.jpg'));
new product('Scissors', 'lab/assets/scissors.jpg'));
new product('Shark', 'lab/assets/shark.jpg'));
new product('Sweep', 'lab/assets/sweep.jpg'));
new product('Tauntaun', 'lab/assets/tauntaun.jpg'));
new product('Unicorn', 'lab/assets/unicorn.jpg'));
new product('USB', 'lab/assets/usb.jpg'));
new product('Water Can', 'lab/assets/water-can.jpg'));
new product('Wine Glass', 'lab/assets/wine-glass.jpg'));

// Used Stackoverflow for assistance with below equation //
function fetchThreeProd() {
  var previousSet = [];
  if (currentFirstProduct !== null) {
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
      currentFirstProduct.clickCtr++;
    } else if(id === 'prodTwoImage') {
      currentSecondProduct.clickCtr++;
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
