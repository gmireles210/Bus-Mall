'use strict';

// Grabbing all the global images
var container = document.getElementById('main-container');
var l_Image = document.getElementById('left-image');
var c_Image = document.getElementById('center-iamge');
var r_Image = document.getElementById('right-image');
var l_ImagePara = document.getElementById('left-para');
var c_ImagePara = document.getElementById('center-para');
var r_ImagePara = document.getElementById('right-para');

// counter for total clicks
var clicksTot = 0;
var prev_Image = [];
var total_Images = [];
var maxClick = 25;

// variable to store images aleady on the page
var l_ImagePage = null;
var r_ImagePage = null;


var imagez = [


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

}




// looping through the images
for(var i = 0; i < imagez.length; i++){
  total_Images.push(new Images(imagez[i].name, imagez[i].imageSrc));
}
console.log(total_Images);


// calculating random images to display
var randoImages = function(){
  return Math.floor(Math.floor(Math.random() * imagez.length));
}

// pick random images and also take care of double images
var selectRandoImages = function(){

  prev_Image = [];
  var leftIndex = randoImages();
  var l_Image = total_Images[leftIndex];
  prev_Image.push(leftIndex);

  var centerIndex = randoImages();
  while(centerIndex == leftIndex){
    centerIndex = randoImages();
  }
  var c_Image = total_Images[centerIndex];
  prev_Image.push(centerIndex);
  console.log(c_Image);

  var rightIndex = randoImages();
  while(rightIndex == centerIndex || rightIndex == leftIndex){
    rightIndex = randoImages();
  }
  var r_Image = total_Images[rightIndex];
  prev_Image.push(rightIndex);

}

// rendering different images
var renderrandoImages = function(){
  // console.log('1st image', prev_Image[0]);
  // console.log(l_Image);
  var leftEl = document.getElementById('left-image');
  var centerEl = document.getElementById('center-image');
  var rightEl = document.getElementById('right-image');

  var leftText = document.getElementById('left-para');
  var centerText = document.getElementById('center-para');
  var rightText = document.getElementById('right-para');


  leftEl.setAttribute('src', total_Images[prev_Image[0]].imageSrc);
  leftText.textContent = (total_Images[prev_Image[0]].name);
  leftEl.dataset.imageIndex = prev_Image[0];
  total_Images[prev_Image[0]].views++;

  centerEl.setAttribute('src', total_Images[prev_Image[1]].imageSrc);
  centerText.textContent = (total_Images[prev_Image[1]].name);
  centerEl.dataset.imageIndex = prev_Image[1];
  total_Images[prev_Image[1]].views++;


  rightEl.setAttribute('src', total_Images[prev_Image[2]].imageSrc);
  rightText.textContent = (total_Images[prev_Image[2]].name)
  rightEl.dataset.imageIndex = prev_Image[2];
  total_Images[prev_Image[2]].views++;

}
selectRandoImages();
renderrandoImages();

// Creating an Event handler
container.addEventListener('click', handleClick);

function handleClick(event){
  console.log('handle click', event.target);
  console.log(event.target.dataset.imageIndex);
  var imageClick = parseInt(event.target.dataset.imageIndex);
  console.log('what is this', imageClick);
  total_Images[imageClick].clicks++;
  selectRandoImages();
  console.log('this', randoImages());
  renderrandoImages();
  clicksTot++;
  imagePlus();
}

// displaying the amount of likes for each image
var imagePlus = function(){
  if(clicksTot < maxClick){
    renderrandoImages();
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
  for(var i = 0; i < total_Images.length; i++){
    imageName.push(total_Images[i].name);
    imageViews.push(total_Images[i].views);
    imageClicks.push(total_Images[i].clicks);
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
