var allimage = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
    'dog-duck.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'wine-glass.jpg'];

var leftimage = document.querySelector('#left-img');
var middleimage = document.querySelector('#middle-img');
var rightimage = document.querySelector('#right-img');
var imhgroup = document.getElementById('allbusmall');
var photos = [];
var totalClicks=0;



function Imagegame(name) {
    this.name = name;
    this.imagelink = `img/${this.name}`
    photos.push(this);
    this.count=0;
    var view=0;
}
var leftImgRand = photos[randomNumber(0, photos.length - 1)];
var middleImgRand = photos[randomNumber(0, photos.length - 1)];
var rightImgRand = photos[randomNumber(0, photos.length - 1)];



function RandomImages() {
     leftImgRand = photos[randomNumber(0, photos.length - 1)];
     middleImgRand = photos[randomNumber(0, photos.length - 1)];
     rightImgRand = photos[randomNumber(0, photos.length - 1)];
    

    leftimage.src = leftImgRand.imagelink;
    leftimage.alt = leftImgRand.name;
    leftImgRand.view+=1

    middleimage.src = middleImgRand.imagelink;
    middleimage.alt = middleImgRand.name;
    middleImgRand.view+=1
    rightimage.src = rightImgRand.imagelink;
    rightimage.alt = rightImgRand.name;
    rightImgRand.view+=1
    while((leftImgRand === middleImgRand)||(leftImgRand === rightImgRand)||(middleImgRand===rightImgRand)){
       RandomImages();
       break;
    }
}
function clickImage(img){
    if( img.target.id === 'left-img' || img.target.id === 'middle-img'|| img.target.id === 'right-img' ){
        RandomImages();
      totalClicks++;}
      
      if (img.target.id==='left-img' ){
      leftImgRand.count+=1;
      //console.log(middleImgRand.count+leftImgRand.name);
      }
      if (img.target.id==='middle-img' ){
        middleImgRand.count+=1;
       // console.log(leftImgRand.count+leftImgRand.name);
      }
        if (img.target.id==='right-img' ){
            rightimage.count+=1;
         //   console.log(leftImgRand.count+leftImgRand.name);
    }
    if(totalClicks === 25){
        imhgroup.removeEventListener ('click' , clickImage);
        var ulEL=document.getElementById('newlist');
        for (let i=0;i<photos.length;i++){
        var liEL=document.createElement('li');
        ulEL.appendChild(liEL);
        liEL.textContent=`${photos[i].name} Slicer had ${photo[i].count} votes and was shown ${photos.view} times`
        }
        ulEL.appendChild('showdiv');
    }
}







imhgroup.addEventListener('click' , clickImage);
//console.log(imhgroup);



for (let a = 0; a < allimage.length; a++) {
    new Imagegame(allimage[a]);
    //photos.push(this);
}


RandomImages();
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
