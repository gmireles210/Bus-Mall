'use strict';

// Declare array to store objects created via constructor function
var allProducts = [];

// Constructor function that create an object for each product
function Product(name) {
  this.name = name;
  this.path = `lab/assets/${name}.jpg`;
  this.timesClicked = 0;
  this.numTimeShown = 0; // This property is not in use
}

// Constructor function that will contain all data the user will interact with
var pageControl = {};

// Determines how many products to display
pageControl.NumProdToDisplay = 3;

pageControl.ulEl = document.getElementById('image-products');
pageControl.spanEl = document.getElementById('votes');
pageControl.displayVoteCountProd = document.getElementById('graph-info');
pageControl.previousProductsShown = [];
pageControl.currentProductsShown = [];
pageControl.productsVoteCounts = [];
pageControl.total_Votes = 25;
pageControl.productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates unique random numbers that are different than the previous unique random numbers
pageControl.grabUniqueRandoNums = function() {
  var randoNum;
  pageControl.previousProductsShown = pageControl.currentProductsShown;
  pageControl.currentProductsShown = [];

  // Makes sure the new randomly generated number is not a duplicate
  while (pageControl.currentProductsShown.length < pageControl.NumProdToDisplay) {
    randoNum = fetchRandomNumber();
    if (pageControl.currentProductsShown.indexOf(randoNum) === -1 &&
    pageControl.previousProductsShown.indexOf(randoNum) === -1) {
      pageControl.currentProductsShown.push(randoNum);
    }
  }
};

// Renders products to the screen
pageControl.renderProducts = function() {
  pageControl.grabUniqueRandoNums();
  pageControl.ulEl.innerHTML = '';

  var Li_Page = 'li';
  var Fig_Page = 'figure';
  var Img_Page = 'img';
  var FigCap_Page = 'figcaption';

  for (var i = 0; i < pageControl.NumProdToDisplay; i++) {
    var ilElem = document.createElement(Li_Page);
    var figureElem = document.createElement(Fig_Page);
    var imgElem = document.createElement(Img_Page);
    imgElem.src = allProducts[pageControl.currentProductsShown[i]].path;
    imgElem.alt = allProducts[pageControl.currentProductsShown[i]].name;
    var figCapElem = document.createElement(FigCap_Page);
    figCapElem.textContent = allProducts[pageControl.currentProductsShown[i]].name;

    pageControl.ulEl.appendChild(ilElem);
    ilElem.appendChild(figureElem);
    figureElem.appendChild(imgElem);
    figureElem.appendChild(figCapElem);

    allProducts[pageControl.currentProductsShown[i]].numTimeShown++;
  }
};

// Retrieves the object that was clicked on then increments its timesClicked value
pageControl.clickedOn = function(event) {
  var clickedOnElem = event.target.textContent;
  if (!clickedOnElem) {
    clickedOnElem = event.target.alt;
  }

  // Returns an array with one value, the object that was clicked on
  var objToRevise = allProducts.filter(function(object) {
    return object.name === clickedOnElem;
  });

  objToRevise[0].timesClicked++;

  pageControl.updateClicksLocalStore();
  pageControl.verifyVotingFinish();
};

// Adds products vote counts to the pageControl.productsVoteCounts array
pageControl.groupProdVoteCounts = function() {
  pageControl.productsVoteCounts = [];
  allProducts.forEach(function(product) {
    pageControl.productsVoteCounts.push(product.timesClicked);
  });
};

// Changes styles of the canvas and main > p elements to be used when the user finishes voting
pageControl.updateElemStyle = function() {
  var directionsPageEl = document.getElementById('user-directions');
  var resPageElem = document.getElementById('graph-results');

  pageControl.displayVoteCountProd.style.display = 'block';
  directionsPageEl.style.display = 'none';
  resPageElem.style.display = 'block';
};

// Calculates product vote counts and sends to localStorage
pageControl.updateClicksLocalStore = function() {
  pageControl.groupProdVoteCounts();
  localStorage.setItem('voteCounts', JSON.stringify(pageControl.productsVoteCounts));
};

// If 'voteCounts' is in localStorage, updates the timesClicked values on each object
pageControl.updateVoteNumsLocalStor = function() {
  var savedProdVoteTally =  JSON.parse(localStorage.getItem('voteCounts'));
  if (savedProdVoteTally !== null && savedProdVoteTally.length > 0) {
    for (var i = 0; i < allProducts.length; i++) {
      allProducts[i].timesClicked = savedProdVoteTally[i];
    }
  }
};

// Displays the graph if the user is done voting
pageControl.verifyVotingFinish = function() {
  var finalUserClicks = pageControl.productsVoteCounts.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });

  if (finalUserClicks === pageControl.total_Votes) {
    pageControl.ulEl.removeEventListener('click', pageControl.clickedOn);
    pageControl.ulEl.innerHTML = '';
    // pageControl.groupProdVoteCounts();
    pageControl.updateElemStyle();
    drawGraphOfProductsVoteCounts();
    pageControl.productsVoteCounts = [];
    localStorage.setItem('voteCounts', JSON.stringify(pageControl.productsVoteCounts));
  } else {
    pageControl.renderProducts();
  }
};

// Generates a random number
var fetchRandomNumber = function() {
  return Math.floor(Math.random() * pageControl.productNames.length);
};

// Starts the app
(function() {
  // Creates a new object for each product using the constructor function
  pageControl.productNames.forEach(function(product) {
    allProducts.push(new Product(product));
  });

  pageControl.spanEl.textContent = pageControl.total_Votes;

  // Binds clickedOn to ulEl
  pageControl.ulEl.addEventListener('click', pageControl.clickedOn);

  pageControl.renderProducts();
  pageControl.updateVoteNumsLocalStor();
})();

// Graph information
var drawGraphOfProductsVoteCounts = function() {
  var TWO_D = '2d';
  var red = 'rgba(255, 99, 132, 0.2)';
  var blue = 'rgba(54, 162, 235, 0.2)';
  var yellow = 'rgba(255, 206, 86, 0.2)';
  var green = 'rgba(75, 192, 192, 0.2)';
  var purple = 'rgba(153, 102, 255, 0.2)';
  var redBorder = 'rgba(255, 99, 132, 1)';
  var blueBorder = 'rgba(54, 162, 235, 1)';
  var yellowBorder = 'rgba(255, 206, 86, 1)';
  var greenBorder = 'rgba(75, 192, 192, 1)';
  var purpleBorder = 'rgba(153, 102, 255, 1)';

  var context = pageControl.displayVoteCountProd.getContext(TWO_D);

  new Chart(context, {
    type: 'bar',
    data: {
      labels: pageControl.productNames,
      responsive: true,
      datasets: [{
        label: 'Number of Votes',
        data: pageControl.productsVoteCounts,
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
