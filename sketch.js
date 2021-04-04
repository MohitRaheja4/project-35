var balloon,balloonImage1,balloonImage2,database,pos;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,280,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var posi=database.ref('balloon/position')
  posi.on('value',readPosition,showError)
  var resizing=database.ref('balloon/scale')
  resizing.on('value',readScale,showError)
  textSize(20); 
}


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(10,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(0,-10)
    updatesize(-0.01)
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePos(0,10)
    updatesize(0.01)
    
  }
console.log(balloon.x)
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updatePos(x,y)
{
  database.ref('balloon/position').set({
    'x':posi.x+x,
    'y':posi.y+y
})
}


function updatesize(sDigit)
{  
  database.ref('balloon/scale').set({
  'scal':balloon.scale+sDigit,
})


}

function readPosition(data)
{
  posi=data.val();
  balloon.x=posi.x;
  balloon.y=posi.y;
}
function readScale(data)
{
 resizing=data.val();
 balloon.scale=resizing.scal
}
function showError()
{
  console.log("error")
}