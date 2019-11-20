// var productImageContainer = document.getElementById('productImageContainer');
var productImageList = document.getElementById('productImageList');
var firstImg = document.getElementById('firstImg');
var secondImg = document.getElementById('secondImg');
var thirdImg = document.getElementById('thirdImg');
var resultList = document.getElementById('resultList');
var ctx = document.getElementById('myChart').getContext('2d');

var currentFirstProduct = null;
var currentSecondProduct = null;
var currentThirdProduct = null;

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
function checkDuplicate(objName, arr) {
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


function grabThreeProducts() {
  var previousSet = [];
  if (currentFirstProduct !== null) {
    previousSet.push(currentFirstProduct.name);
    previousSet.push(currentSecondProduct.name);
    previousSet.push(currentThirdProduct.name);
  }
  var displayedImgs = [];
  while (displayedImgs.length < 3) {
    var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    // Check Ducplicate on three displayed img
    if (checkDuplicate(Product.allProducts[randomIndex].name, displayedImgs) === 0) {
      // Check immediate previous set
      if (previousSet.includes(Product.allProducts[randomIndex].name) === false) {
        displayedImgs.push(Product.allProducts[randomIndex]);
      }
    }
  }
  firstImg.src = displayedImgs[0].imgURL;
  secondImg.src = displayedImgs[1].imgURL;
  thirdImg.src = displayedImgs[2].imgURL;

  currentFirstProduct = displayedImgs[0];
  currentSecondProduct = displayedImgs[1];
  currentThirdProduct = displayedImgs[2];
}

grabThreeProducts();

function displayTotalResult() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    addElement('li', resultList, Product.allProducts[i].name + ' had ' + Product.allProducts[i].clickCtr + ' votes and was shown ' + Product.allProducts[i].shownCtr + ' times');
  }
}

var counter = 0;
function clickHandler(event) {
  if (counter < 25) {
    var id = event.target.id;

    // Counter goes up every time the img is shown
    currentFirstProduct.shownCtr++;
    currentSecondProduct.shownCtr++;
    currentThirdProduct.shownCtr++;

    if(id === 'firstImg') {
      currentFirstProduct.clickCtr++;
    } else if(id === 'secondImg') {
      currentSecondProduct.clickCtr++;
    } else if(id === 'thirdImg') {
      currentThirdProduct.clickCtr++;
    }

    grabThreeProducts();
  }
  counter++;

  if(counter === 25) {
    alert('Done!');
    createChart();
    displayTotalResult();
  }
}

productImageList.addEventListener('click', clickHandler);

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
