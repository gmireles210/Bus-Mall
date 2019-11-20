'use strict';

// Declare array to store objects created via constructor function
var allProducts = [];

// Constructor function that create an object for each product
function Product(name) {
  this.name = name;
  this.path = `lab/assets${name}.jpg`;
  this.numberClicks = 0;
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
pageControl.totVotesAllowed = 25;
pageControl.productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates unique random numbers that are different than the previous unique random numbers
pageControl.grabUniqueRandoNums = function() {
  var randoNumber;
  pageControl.previousProductsShown = pageControl.currentProductsShown;
  pageControl.currentProductsShown = [];

  // Makes sure the new randomly generated number is not a duplicate
  while (pageControl.currentProductsShown.length < pageControl.NumProdToDisplay) {
    randoNumber = fetchRandomNumber();
    if (pageControl.currentProductsShown.indexOf(randoNumber) === -1 &&
    pageControl.previousProductsShown.indexOf(randoNumber) === -1) {
      pageControl.currentProductsShown.push(randoNumber);
    }
  }
};

// Renders products to the screen
pageControl.renderProducts = function() {
  pageControl.grabUniqueRandoNums();
  pageControl.ulEl.innerHTML = '';

  var Li_Data = 'li';
  var Figure_Data = 'figure';
  var Img_Data = 'img';
  var FigCap_Data = 'figcaption';

  for (var i = 0; i < pageControl.NumProdToDisplay; i++) {
    var ilEl = document.createElement(Li_Data);
    var figEl = document.createElement(Figure_Data);
    var imgEl = document.createElement(Img_Data);
    imgEl.src = allProducts[pageControl.currentProductsShown[i]].path;
    imgEl.alt = allProducts[pageControl.currentProductsShown[i]].name;
    var figCapEl = document.createElement(FigCap_Data);
    figCapEl.textContent = allProducts[pageControl.currentProductsShown[i]].name;

    pageControl.ulEl.appendChild(ilEl);
    ilEl.appendChild(figEl);
    figEl.appendChild(imgEl);
    figEl.appendChild(figCapEl);

    allProducts[pageControl.currentProductsShown[i]].timesDisplayed++;
  }
};

// Retrieves the object that was clicked on then increments its numberClicks value
pageControl.clickedOn = function(event) {
  var elementClickedOn = event.target.textContent;
  if (!elementClickedOn) {
    elementClickedOn = event.target.alt;
  }

  // Returns an array with one value, the object that was clicked on
  var objUpdate = allProducts.filter(function(object) {
    return object.name === elementClickedOn;
  });

  objUpdate[0].numberClicks++;

  pageControl.reviseNumClickedLocalStorage();
  pageControl.finishedVotingChk();
};

// Adds products vote counts to the pageControl.productsVoteCounts array
pageControl.gatherProductsVoteCounts = function() {
  pageControl.productsVoteCounts = [];
  allProducts.forEach(function(product) {
    pageControl.productsVoteCounts.push(product.numberClicks);
  });
};

// Changes styles of the canvas and main > p elements to be used when the user finishes voting
pageControl.changeElementStyles = function() {
  var instructPageEl = document.getElementById('user-directions');
  var resultPageEl = document.getElementById('graph-results');

  pageControl.graphOfProductVoteCounts.style.display = 'block';
  instructPageEl.style.display = 'none';
  resultPageEl.style.display = 'block';
};

// Calculates product vote counts and sends to localStorage
pageControl.reviseNumClickedLocalStorage = function() {
  pageControl.gatherProductsVoteCounts();
  localStorage.setItem('voteCounts', JSON.stringify(pageControl.productsVoteCounts));
};

// If 'voteCounts' is in localStorage, updates the numberClicks values on each object
pageControl.updateVoteCountsWithLocalStorage = function() {
  var storedProductVoteCounts =  JSON.parse(localStorage.getItem('voteCounts'));
  if (storedProductVoteCounts !== null && storedProductVoteCounts.length > 0) {
    for (var i = 0; i < allProducts.length; i++) {
      allProducts[i].numberClicks = storedProductVoteCounts[i];
    }
  }
};

// Displays the graph if the user is done voting
pageControl.finishedVotingChk = function() {
  var finalUserClicks = pageControl.productsVoteCounts.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });

  if (finalUserClicks === pageControl.totVotesAllowed) {
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

  pageControl.spanEl.textContent = pageControl.totVotesAllowed;

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
      // eslint-disable-next-line no-undef
      labels: imageName,
      responsive: true,
      datasets: [{
        label: 'Number of Votes',
        // eslint-disable-next-line no-undef
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
