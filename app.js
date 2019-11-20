'use strict';

// Grabbing all the global images
var container = document.getElementById('main-container');
var leftImage = document.getElementById('left-image');
var centerImage = document.getElementById('center-iamge');
var rightImage = document.getElementById('right-image');
var leftImagePara = document.getElementById('left-para');
var centerImagePara = document.getElementById('center-para');
var rightImagePara = document.getElementById('right-para');

// counter for total clicks
var totalClicks = 0;
var previousImage = [];
var allImages = [];
var clickLimit = 25;

// variable to store images aleady on the page
var leftImageOnPage = null;
var rightImageOnPage = null;


var img = [
  

  { imageSrc:'lab/assets/bag.jpg', name:'bag'},
  { imageSrc:'lab/assets/banana.jpg', name:'banana'},
  { imageSrc:'lab/assets/bathroom.jpg', name:'bathroom'},
  { imageSrc:'lab/assets/boots.jpg', name:'boots'},
  { imageSrc:'lab/assets/breakfast.jpg', name:'breakfast'},
  { imageSrc:'lab/assets/bubblegum.jpg', name:'bubblegum'},
  { imageSrc:'lab/assets/chair.jpg', name:'chair'},
  { imageSrc:'lab/assets/cthulhu.jpg', name:'cthulhu'},
  { imageSrc:'lab/assets/dog-duck.jpg', name:'dog-duck'},
  { imageSrc:'lab/assets/dragon.jpg', name:'dragon'},
  { imageSrc:'lab/assets/pen.jpg', name:'pen'},
  { imageSrc:'lab/assets/pet-sweep.jpg', name:'pet-sweep'},
  { imageSrc:'lab/assets/scissors.jpg', name:'scissors'},
  { imageSrc:'lab/assets/shark.jpg', name:'shark'},
  { imageSrc:'lab/assets/sweep.jpg', name:'sweep'},
  { imageSrc:'lab/assets/tauntaun.jpg', name:'tauntaun'},
  { imageSrc:'lab/assets/unicorn.jpg', name:'unicorn'},
  { imageSrc:'lab/assets/usb.jpg', name:'usb'},
  { imageSrc:'lab/assets/water-can.jpg', name:'water-can'},
  { imageSrc:'lab/assets/wine-glass.jpg', name:'wine-glass'},

];

// Images constructor
var Images = function(name, imageUrl){
  this.name = name;
  this.imageSrc = imageUrl;
  this.clicks = 0;
  this.views = 0;

  // Images.allImages.push(this);
  // Images.previousImage.push(this);
}

// Images.previousImage = [];
// Images.allImages = [];


// looping through the images
for(var i = 0; i < img.length; i++){
  allImages.push(new Images(img[i].name, img[i].imageSrc));
}
console.log(allImages);


// calculating random images to display 
var randomImages = function(){
  return Math.floor(Math.floor(Math.random() * img.length));
}

// pick random images and also take care of double images
var pickRandomImages = function(){

  previousImage = [];
  var leftIndex = randomImages();
  var leftImage = allImages[leftIndex];
  previousImage.push(leftIndex);

  var centerIndex = randomImages();
  while(centerIndex == leftIndex){
    centerIndex = randomImages();
  }
  var centerImage = allImages[centerIndex];
  previousImage.push(centerIndex);
  console.log(centerImage);

  var rightIndex = randomImages();
  while(rightIndex == centerIndex || rightIndex == leftIndex){
    rightIndex = randomImages();
  } 
  var rightImage = allImages[rightIndex];
  previousImage.push(rightIndex);

}

// rendering different images
var renderRandomImages = function(){
  // console.log('1st image', previousImage[0]);
  // console.log(leftImage);
  var leftEl = document.getElementById('left-image');
  var centerEl = document.getElementById('center-image');
  var rightEl = document.getElementById('right-image');

  var leftText = document.getElementById('left-para');
  var centerText = document.getElementById('center-para');
  var rightText = document.getElementById('right-para');


  leftEl.setAttribute('src', allImages[previousImage[0]].imageSrc);
  leftText.textContent = (allImages[previousImage[0]].name);
  leftEl.dataset.imageIndex = previousImage[0];
  allImages[previousImage[0]].views++;

  centerEl.setAttribute('src', allImages[previousImage[1]].imageSrc);
  centerText.textContent = (allImages[previousImage[1]].name);
  centerEl.dataset.imageIndex = previousImage[1];
  allImages[previousImage[1]].views++;


  rightEl.setAttribute('src', allImages[previousImage[2]].imageSrc);
  rightText.textContent = (allImages[previousImage[2]].name)
  rightEl.dataset.imageIndex = previousImage[2];
  allImages[previousImage[2]].views++;

}
pickRandomImages();
renderRandomImages();

// Creating an Event handler
container.addEventListener('click', handleClick);

function handleClick(event){
  console.log('handle click', event.target);
  console.log(event.target.dataset.imageIndex);
  var imageClick = parseInt(event.target.dataset.imageIndex);
  console.log('what is this', imageClick);
  allImages[imageClick].clicks++;
  pickRandomImages();
  console.log('this', randomImages());
  renderRandomImages();
  totalClicks++;
  imageLikes();
}

// displaying the amount of likes for each image
var imageLikes = function(){
  if(totalClicks < clickLimit){
    renderRandomImages();
  } else {
    container.removeEventListener('click', handleClick);
    makeChart();
    chartData();
  }
}


var imageClicks = [];
var imageViews = [];
var imageName = [];

var makeChart =  function() {
  document.getElementById('main-container').style.display = 'none';
  for(var i = 0; i < allImages.length; i++){
    imageName.push(allImages[i].name);
    imageViews.push(allImages[i].views);
    imageClicks.push(allImages[i].clicks);
  }
}


// Creating a chart
function chartData(){
  var ctx = document.getElementById('voteChart').getContext('2d');

  var imageChart = new Chart(ctx, {
  // The type of chart you want to create
    type: 'bar',
    data: {
      labels: imageName,
      datasets: [{
        label: 'Number of Votes',
        data: imageClicks,
        backgroundColor: '#44448',
      }, {
        label: 'Number of Views',
        data: imageViews,
        backgroundColor: [
          'rgb(225, 85, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
          'rgb(200, 180, 40)',
        ],
        borderColor: [
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
          'rgb(55, 150, 220)',
        ],
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            autoSkip: false,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });

// function chartData() {
//   return new Chart(ctx, imageChart);
// }
}
