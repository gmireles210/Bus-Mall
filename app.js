// var productImageContainer = document.getElementById('productImageContainer');
var allProdImages = document.getElementById('allProdImages');
var prodOneImages = document.getElementById('prodOneImages');
var prodTwoImages = document.getElementById('prodTwoImages');
var prodThreeImages = document.getElementById('prodThreeImages');
var resultList = document.getElementById('resultList');
var ctx = document.getElementById('myChart').getContext('2d');

var firstProduct = null;
var secondProduct = null;
var thirdProduct = null;

// Set a constructor
function Product(name, imgURL) {
  this.name = name;
  this.imgURL = imgURL;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Product.allProducts.push(this);
}

// Array to store all the products
Product.allProducts = [];

// Helper function to display document elements
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  element.textContent = text;
  return element;
}

// Helper function to check the duplication
function checkDups(objName, arr) {
  var match = 0;
  for (var i = 0; i < arr.length; i++) {
    if (objName === arr[i].name) {
      match++;
    }
  }
  return match;
}


new Product('bag', 'lab/assets/bag.jpg');
new Product('banana', 'lab/assets/banana.jpg');
new Product('boots', 'lab/assets/boots.jpg');
new Product('breakfast', 'lab/assets/breakfast.jpg');
new Product('bubblegum', 'lab/assets/bubblegum.jpg');
new Product('chair', 'lab/assets/chair.jpg');
new Product('cthulhu', 'lab/assets/cthulhu.jpg');
new Product('dog-duck', 'lab/assets/dog-duck.jpg');
new Product('dragon', 'lab/assets/dragon.jpg');
new Product('pen', 'lab/assets/pen.jpg');
new Product('pet-sweep', 'lab/assets/pet-sweep.jpg');
new Product('scissors', 'lab/assets/scissors.jpg');
new Product('shark', 'lab/assets/shark.jpg');
new Product('sweep', 'lab/assets/sweep.jpg');
new Product('tauntaun', 'lab/assets/tauntaun.jpg');
new Product('unicorn', 'lab/assets/unicorn.jpg');
new Product('usb', 'lab/assets/usb.jpg');
new Product('water-can', 'lab/assets/water-can.jpg');
new Product('wine-glass', 'lab/assets/wine-glass.jpg');


function fetchThreeProd() {
  var previousSet = [];
  if (firstProduct !== null) {
    previousSet.push(firstProduct.name);
    previousSet.push(secondProduct.name);
    previousSet.push(thirdProduct.name);
  }
  var imagesDisplayed = [];
  while (imagesDisplayed.length < 3) {
    var randoIndex = Math.floor(Math.random() * Product.allProducts.length);
    // Check Ducplicate on three displayed img
    if (checkDups(Product.allProducts[randoIndex].name, imagesDisplayed) === 0) {
      // Check immediate previous set
      if (previousSet.includes(Product.allProducts[randoIndex].name) === false) {
        imagesDisplayed.push(Product.allProducts[randoIndex]);
      }
    }
  }
  prodOneImages.src = imagesDisplayed[0].imgURL;
  prodTwoImages.src = imagesDisplayed[1].imgURL;
  prodThreeImages.src = imagesDisplayed[2].imgURL;

  firstProduct = imagesDisplayed[0];
  secondProduct = imagesDisplayed[1];
  thirdProduct = imagesDisplayed[2];
}

fetchThreeProd();

function totalResultsDisp() {
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

    if(id === 'prodOneImages') {
      firstProduct.clickCtr++;
    } else if(id === 'prodTwoImages') {
      secondProduct.clickCtr++;
    } else if(id === 'prodThreeImages') {
      thirdProduct.clickCtr++;
    }

    fetchThreeProd();
  }
  counter++;

  if(counter === 25) {
    alert('Done!');
    createChart();
    totalResultsDisp();
  }
}

allProdImages.addEventListener('click', clicker);

// Create result chart
function createChart() {
  var label = [];
  var voteData = [];
  var shownData = [];
  for (var i = 0; i < Product.allProducts.length; i++) {
    label.push(Product.allProducts[i].name);
    voteData.push(Product.allProducts[i].clickCtr);
    shownData.push(Product.allProducts[i].shownCtr);
  }
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: [{
        label: '# of Votes',
        data: voteData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: '# of Views',
        data: shownData,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}