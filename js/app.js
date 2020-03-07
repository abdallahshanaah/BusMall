var allimage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var leftimage = document.querySelector('#left-img');// TO GET THE LEFT IMG FROM THE FORM IN HTML
var middleimage = document.querySelector('#middle-img');// TO GET THE MIDDLE IMG FROM THE FORM IN HTML
var rightimage = document.querySelector('#right-img');// TO GET THE RIGHT IMG FROM THE FORM IN HTML
var imhgroup = document.getElementById('allbusmall');// TO GET THE SECTION BY ID FROM THE IN HTML
var photos = []; // object array
var storage = [];//for local starage
var totalClicks = 0;// THE TOTAL CLICK FOR THE ALL IMAGE NUMBER 
var leftImgRand;// THE RANDOM LEFT IMG THAT THE FUNCTION WITH SECLECT
var middleImgRand;// THE RANDOM MIDDLE IMG THAT THE FUNCTION WITH SECLECT
var rightImgRand;// THE RANDOM RIGHT IMG THAT THE FUNCTION WITH SECLECT
var notrepeat=[]; // ARRAY OF NOT  TEPEAT IMG IN THE WEBSITE

// THE CUNSTRUCTRE FUNCTION 
function Imagegame(name) {
    this.name = name;
    this.imagelink = `img/${this.name}`;
    this.votes = 0;
    this.view = 0;
    photos.push(this);
    storage.push(this);
}
// FOR TO CALL THE ALL OBJECT 
for (let a = 0; a < allimage.length; a++) {
    new Imagegame(allimage[a]);
     setItem();
}





// FUNCTION TO PAKE RANDOM IMG 
function RandomImages() {
    leftImgRand = photos[randomNumber(0, photos.length - 1)];
    middleImgRand = photos[randomNumber(0, photos.length - 1)];
    rightImgRand = photos[randomNumber(0, photos.length - 1)];

// TO CHECK THE THE ALL IMG IS DEFFERENET 
    while ((leftImgRand.name === middleImgRand.name) || (leftImgRand.name === rightImgRand.name) || (middleImgRand.name === rightImgRand.name)||notrepeat.includes(leftImgRand) || notrepeat.includes(middleImgRand) || notrepeat.includes(rightImgRand)) {
        console.log('first while ')
        leftImgRand = photos[randomNumber(0, photos.length - 1)];
        middleImgRand = photos[randomNumber(0, photos.length - 1)];
        rightImgRand = photos[randomNumber(0, photos.length - 1)];
    }
    notrepeat = []; // array to check repeat img
    notrepeat.push(leftImgRand);
    notrepeat.push(middleImgRand);
    notrepeat.push(rightImgRand);
    
    middleimage.src = middleImgRand.imagelink;
    middleimage.alt = middleImgRand.name;
    middleImgRand.view += 1;
    //console.log(leftImgRand.view);
    rightimage.src = rightImgRand.imagelink;
    rightimage.alt = rightImgRand.name;
    rightImgRand.view += 1;
    leftimage.src = leftImgRand.imagelink;
    leftimage.alt = leftImgRand.name;
    leftImgRand.view += 1;

}
RandomImages();

imhgroup.addEventListener('click', clickImage);
//console.log(imhgroup);
// FUNCTION TO ACTIVE THE CLICK THE THE IMG 
function clickImage(img) {

    if (img.target.id === 'left-img') {
        totalClicks++;
        leftImgRand.votes += 1;
        RandomImages();

        //console.log('left'+leftImgRand.votes);
    }
    else if (img.target.id === 'middle-img') {
        totalClicks++;
        middleImgRand.votes += 1;
        RandomImages();
    }
    else if (img.target.id === 'right-img') {
        totalClicks++;
        rightImgRand.votes += 1;
        RandomImages();
        console.log('f');
    }
    if (totalClicks === 25) {
        console.log("final");
        imhgroup.removeEventListener('click', clickImage);
        var ulEL = document.getElementById('newlist');
        for (let i = 0; i < photos.length; i++) {
            var liEL = document.createElement('li');
            ulEL.appendChild(liEL);
            // var newname=photos[i].name.splice('.')[0]
            liEL.textContent = `${photos[i].name.split('.')[0]} Slicer had ${photos[i].votes} votes and was shown ${photos[i].view} times`;
        }
        ulEL.appendChild('showdiv');
        console.log('showdiv');
    }
     result_of_canves();
}
// TO SET IN THE LOCIAL STORAGE 
function setItem(){
    var order = JSON.stringify(storage);
  localStorage.setItem( 'storage', order);
}
// TO GET FROM THE LOCIAL STORAGE 
function getItem(){
    var storageOrders = localStorage.getItem('storageOrders');
    storage = JSON.parse(storageOrders);
    RandomImages();
  }

RandomImages();
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// TO ACTIVET THE CHART.JS WITH THE VIEW AND VOTES
function result_of_canves() {
    var imgnames=[];
    var imhviews=[];
    var imgvotes=[];
    for(let i =0 ; i< photos.length ;i++){
        var imgname =photos[i].name.split('.')[0];
        imgnames.push(imgname);
        var imgview =photos[i].view;
        imhviews.push(imgview);
        var imgvote =photos[i].votes;
        imgvotes.push(imgvote);
   }
   
// CHART FUNCTION 
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: imgnames,
        datasets: [{
            label: '# of view',
            data: imhviews,
            backgroundColor:  'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: '# of votes',
            data: imgvotes,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }

    ]
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
getItem();