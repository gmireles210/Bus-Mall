'use strict';

// Declared array
var allProducts = [];

// Constructor function 
function Product(name) {
  this.name = name;
  this.path = `lab/assets/${name}.jpg`;
  this.timesClicked = 0;
  this.numTimeShown = 0; // This property is not in use
}

// Constructor function that will contain data for user interaction
var pageControl = {};

// Products to display
pageControl.NumProdToDisplay = 3;

pageControl.ulEl = document.getElementById('image-products');
pageControl.spanEl = document.getElementById('votes');
pageControl.displayVoteCountProd = document.getElementById('graph-info');
pageControl.previousProductsShown = [];
pageControl.currentProductsShown = [];
pageControl.productsVoteCounts = [];
pageControl.total_Votes = 25;
pageControl.productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates unique random numbers that differ from previous
pageControl.grabUniqueRandoNums = function() {
  var randoNum;
  pageControl.previousProductsShown = pageControl.currentProductsShown;
  pageControl.currentProductsShown = [];

  // Makes sure the new rando num is not the same as previous
  while (pageControl.currentProductsShown.length < pageControl.NumProdToDisplay) {
    randoNum = fetchRandomNumber();
    if (pageControl.currentProductsShown.indexOf(randoNum) === -1 &&
    pageControl.previousProductsShown.indexOf(randoNum) === -1) {
      pageControl.currentProductsShown.push(randoNum);
    }
  }
};

// Renders to screen
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

// Retrieves the object that was clicked, then increments its timesClicked value
pageControl.clickedOn = function(event) {
  var clickedOnElem = event.target.textContent;
  if (!clickedOnElem) {
    clickedOnElem = event.target.alt;
  }

  // Returns an array with a single value of obj clicked
  var objToRevise = allProducts.filter(function(object) {
    return object.name === clickedOnElem;
  });

  objToRevise[0].timesClicked++;

  pageControl.updateClicksLocalStore();
  pageControl.verifyVotingFinish();
};

// Adds vote tallys to the pageControl.productsVoteCounts array
pageControl.groupProdVoteCounts = function() {
  pageControl.productsVoteCounts = [];
  allProducts.forEach(function(product) {
    pageControl.productsVoteCounts.push(product.timesClicked);
  });
};

// Changes styles of canvas and main > p elements to be utilized when finished voting
pageControl.updateElemStyle = function() {
  var directionsPageEl = document.getElementById('user-directions');
  var resPageElem = document.getElementById('graph-results');

  pageControl.displayVoteCountProd.style.display = 'block';
  directionsPageEl.style.display = 'none';
  resPageElem.style.display = 'block';
};

// Calculates the vote counts, sends to localStor
pageControl.updateClicksLocalStore = function() {
  pageControl.groupProdVoteCounts();
  localStorage.setItem('voteCounts', JSON.stringify(pageControl.productsVoteCounts));
};

// If 'voteCounts' is in localStor, updates the timesClicked values on each object
pageControl.updateVoteNumsLocalStor = function() {
  var savedProdVoteTally =  JSON.parse(localStorage.getItem('voteCounts'));
  if (savedProdVoteTally !== null && savedProdVoteTally.length > 0) {
    for (var i = 0; i < allProducts.length; i++) {
      allProducts[i].timesClicked = savedProdVoteTally[i];
    }
  }
};

// Displays the graph if and when user is done voting
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

// Creates a random number
var fetchRandomNumber = function() {
  return Math.floor(Math.random() * pageControl.productNames.length);
};

// Start app
(function() {
  // Creates a new object for each product using the constructor function
  pageControl.productNames.forEach(function(product) {
    allProducts.push(new Product(product));
  });

  pageControl.spanEl.textContent = pageControl.total_Votes;

  // Appends clickedOn to ulEl
  pageControl.ulEl.addEventListener('click', pageControl.clickedOn);

  pageControl.renderProducts();
  pageControl.updateVoteNumsLocalStor();
})();

// Graph info
var drawGraphOfProductsVoteCounts = function() {
  var two_Dim = '2d';
  var red = 'rgb(145,0,63)';
  var blue = 'rgb(34,94,168)';
  var yellow = 'rgb(255,255,204)';
  var green = 'rgb(0,90,50)';
  var purple = 'rgb(74,20,134)';
  var redBorder = 'rgb(145,0,63)';
  var blueBorder = 'rgb(34,94,168)';
  var yellowBorder = 'rgb(255,237,160)';
  var greenBorder = 'rgb(0,90,50)';
  var purpleBorder = 'rgb(74,20,134)';

  var context = pageControl.displayVoteCountProd.getContext(two_Dim);

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
