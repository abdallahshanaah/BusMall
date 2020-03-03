var allimage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var leftimage = document.querySelector('#left-img');
var middleimage = document.querySelector('#middle-img');
var rightimage = document.querySelector('#right-img');
var imhgroup = document.getElementById('allbusmall');
var photos = []; // object array
var storage = [];//for local starage
var totalClicks = 0;
var leftImgRand;
var middleImgRand;
var rightImgRand;
var notrepeat=[];


function Imagegame(name) {
    this.name = name;
    this.imagelink = `img/${this.name}`;
    this.votes = 0;
    this.view = 0;
    photos.push(this);
    storage.push(this);
}

for (let a = 0; a < allimage.length; a++) {
    new Imagegame(allimage[a]);
     setItem();
}






function RandomImages() {
    leftImgRand = photos[randomNumber(0, photos.length - 1)];
    middleImgRand = photos[randomNumber(0, photos.length - 1)];
    rightImgRand = photos[randomNumber(0, photos.length - 1)];

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
            liEL.textContent = `${photos[i].name} Slicer had ${photos[i].votes} votes and was shown ${photos[i].view} times`;
        }
        ulEL.appendChild('showdiv');
        console.log('showdiv');
    }
     result_of_canves();
}

function setItem(){
    var order = JSON.stringify(storage);
  localStorage.setItem( 'storage', order);
}

function getItem(){
    var storageOrders = localStorage.getItem('storageOrders');
    storage = JSON.parse(storageOrders);
    RandomImages();
  }

RandomImages();
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function result_of_canves() {
    var imgnames=[];
    var imhviews=[];
    var imgvotes=[];
    for(let i =0 ; i< photos.length ;i++){
        var imgname =photos[i].name;
        imgnames.push(imgname);
        var imgview =photos[i].view;
        imhviews.push(imgview);
        var imgvote =photos[i].votes;
        imgvotes.push(imgvote);
   }
   

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