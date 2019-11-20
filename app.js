'use strict';

// Declare array to store objects created via constructor function
var allProducts = [];

// Constructor function that create an object for each product
function Product(name) {
  this.name = name;
  this.path = `lab/assets${name}.jpg`;
  this.timesClicked = 0;
  this.timesDisplayed = 0; // This property is not in use
}

// Constructor function that will contain all data the user will interact with
var pageControl = {};

// Determines how many products to display
pageControl.NumProdToDisplay = 3;

pageControl.ulEl = document.getElementById('image-products');
pageControl.spanEl = document.getElementById('votes');
pageControl.graphOfProductVoteCounts = document.getElementById('graph-info');
pageControl.previousProductsShown = [];
pageControl.currentProductsShown = [];
pageControl.productsVoteCounts = [];
pageControl.MAX_VOTES = 25;
pageControl.productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates unique random numbers that are different than the previous unique random numbers
pageControl.getUniqueRandomNumbers = function() {
  var randomNumer;
  pageControl.previousProductsShown = pageControl.currentProductsShown;
  pageControl.currentProductsShown = [];

  // Makes sure the new randomly generated number is not a duplicate
  while (pageControl.currentProductsShown.length < pageControl.NumProdToDisplay) {
    randomNumer = fetchRandomNumber();
    if (pageControl.currentProductsShown.indexOf(randomNumer) === -1 &&
    pageControl.previousProductsShown.indexOf(randomNumer) === -1) {
      pageControl.currentProductsShown.push(randomNumer);
    }
  }
};

// Renders products to the screen
pageControl.renderProducts = function() {
  pageControl.getUniqueRandomNumbers();
  pageControl.ulEl.innerHTML = '';

  var LI = 'li';
  var FIGURE = 'figure';
  var IMG = 'img';
  var FIGCAPTION = 'figcaption';

  for (var i = 0; i < pageControl.NumProdToDisplay; i++) {
    var ilEl = document.createElement(LI);
    var figureEl = document.createElement(FIGURE);
    var imgEl = document.createElement(IMG);
    imgEl.src = allProducts[pageControl.currentProductsShown[i]].path;
    imgEl.alt = allProducts[pageControl.currentProductsShown[i]].name;
    var figCaptionEl = document.createElement(FIGCAPTION);
    figCaptionEl.textContent = allProducts[pageControl.currentProductsShown[i]].name;

    pageControl.ulEl.appendChild(ilEl);
    ilEl.appendChild(figureEl);
    figureEl.appendChild(imgEl);
    figureEl.appendChild(figCaptionEl);

    allProducts[pageControl.currentProductsShown[i]].timesDisplayed++;
  }
};

// Retrieves the object that was clicked on then increments its timesClicked value
pageControl.clickedOn = function(event) {
  var elementClickedOn = event.target.textContent;
  if (!elementClickedOn) {
    elementClickedOn = event.target.alt;
  }

  // Returns an array with one value, the object that was clicked on
  var objectToUpdate = allProducts.filter(function(object) {
    return object.name === elementClickedOn;
  });

  objectToUpdate[0].timesClicked++;

  pageControl.updateTimesClickedToLocalStorage();
  pageControl.checkIfFinishedVoting();
};

// Adds products vote counts to the pageControl.productsVoteCounts array
pageControl.gatherProductsVoteCounts = function() {
  pageControl.productsVoteCounts = [];
  allProducts.forEach(function(product) {
    pageControl.productsVoteCounts.push(product.timesClicked);
  });
};

// Changes styles of the canvas and main > p elements to be used when the user finishes voting
pageControl.changeElementStyles = function() {
  var instructionPEl = document.getElementById('user-directions');
  var resultsPEl = document.getElementById('graph-results');

  pageControl.graphOfProductVoteCounts.style.display = 'block';
  instructionPEl.style.display = 'none';
  resultsPEl.style.display = 'block';
};

// Calculates product vote counts and sends to localStorage
pageControl.updateTimesClickedToLocalStorage = function() {
  pageControl.gatherProductsVoteCounts();
  localStorage.setItem('voteCounts', JSON.stringify(pageControl.productsVoteCounts));
};

// If 'voteCounts' is in localStorage, updates the timesClicked values on each object
pageControl.updateVoteCountsWithLocalStorage = function() {
  var storedProductVoteCounts =  JSON.parse(localStorage.getItem('voteCounts'));
  if (storedProductVoteCounts !== null && storedProductVoteCounts.length > 0) {
    for (var i = 0; i < allProducts.length; i++) {
      allProducts[i].timesClicked = storedProductVoteCounts[i];
    }
  }
};

// Displays the graph if the user is done voting
pageControl.checkIfFinishedVoting = function() {
  var finalUserClicks = pageControl.productsVoteCounts.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });

  if (finalUserClicks === pageControl.MAX_VOTES) {
    pageControl.ulEl.removeEventListener('click', pageControl.clickedOn);
    pageControl.ulEl.innerHTML = '';
    // pageControl.gatherProductsVoteCounts();
    pageControl.changeElementStyles();
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

  pageControl.spanEl.textContent = pageControl.MAX_VOTES;

  // Binds clickedOn to ulEl
  pageControl.ulEl.addEventListener('click', pageControl.clickedOn);

  pageControl.renderProducts();
  pageControl.updateVoteCountsWithLocalStorage();
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

  var context = pageControl.graphOfProductVoteCounts.getContext(TWO_D);

  new Chart(context, {
    type: 'bar',
    data: {
      labels: imageName,
      responsive: true,
      datasets: [{
        label: 'Number of Votes',
        data: imageClicks,
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
