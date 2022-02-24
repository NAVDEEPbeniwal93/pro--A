
var score=0;
var player;
var playerImg;
var spaceimg;
var bg1,bg;
var spaceship;
var spaceshipGroup;
var bullet,bulletGroup,bulletImg;
var score = 0;
var bulletImg;
var  rock,rockImg,rockGroup;
var jetblastImg;
var gameOver,gameOverImg

var gameState = 1  

function preload() {
 spaceimg = loadImage("spaceship1.png");
 bg1= loadImage("background.jpg");
jetImage = loadImage("jet.png");
bulletImg= loadImage("bulleet1.png");
rockImg = loadImage("rock.png")
jetblastImg = loadAnimation("blast.png")
gameOverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(1000,500);


 bg = createSprite(500,250)
  bg.addImage(bg1);
  bg.velocityY = 0.5

  jet= createSprite(500,400,10,10)
  jet.addImage(jetImage)
  jet.addAnimation("collided",jetblastImg)
  jet.scale = 0.21;

  spaceshipGroup = new Group();
  bulletGroup = new Group();
  rockGroup = new Group();

  gameOver = createSprite(470,200,50,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
 
  

 
}

function draw() {
  background("green");
if(gameState === 1 ){

  gameOver.visible = false
 
if (keyDown (LEFT_ARROW)&& jet.x>=50){
  jet.x = jet.x-5;
}

if (keyDown (RIGHT_ARROW)&& jet.x<=950){
  jet.x = jet.x+5;
}

if(keyDown ("space")){
  spawnBullets();
}

  if(bg.y >= 400){
    bg.y = 250
  }
  spawnSpaceship();
  spawnRock();
  moveRocks();

  destroySpaceship();
  if(spaceshipGroup.isTouching(jet)|| rockGroup.isTouching(jet)){
    gameState = 2
   
  }
}
else if(gameState=== 2 ){
  spaceshipGroup.setVelocityEach(0,0)
  rockGroup.setVelocityEach(0,0)
  spaceshipGroup.destroyEach()
  rockGroup.destroyEach()
  bg.velocityY = 0
}
  drawSprites()
  
  fill ("white")
  textSize(20)
  text(score,800,100);
 
 

  if (gameState === 2 ){
    textSize(40)
    //text (" GameOver ",450,230)
    jet.changeAnimation("collided",jetblastImg)
      gameOver.visible  = true

  }

  
}
 function destroySpaceship() {
 bulletGroup.overlap(spaceshipGroup, function(collector, collected) {
   score = score+1
   
   collected.remove();
   collector.remove();
  });

}
function moveRocks() {
  bulletGroup.overlap(rockGroup, function(collector, collected) {
    
   rockGroup.setVelocityXEach(random(-3,3))
   
   });
 
 }
function spawnSpaceship(){
  if(frameCount %200===0){
    spaceship = createSprite(random(100,900),10,50,50);
    spaceship.addImage(spaceimg);
    spaceship.velocityY = 3;
    spaceship.velocityX= random(-0.5,0.5);
    spaceship.scale = 0.1;
    spaceship.lifetime= 1000;
    spaceshipGroup.add(spaceship);
  }
}
function spawnBullets(){
  bullet = createSprite(jet.x-7,jet.y,2,10);
  //bullet.x = player.x-20
  bullet.addImage(bulletImg)
  bullet.scale = 0.06
  
  bullet.velocityY = -5;
  bullet.lifetime = 250;
  bulletGroup.add(bullet);
}

function spawnRock(){
  if(frameCount %500===0){
    rock = createSprite(random(100,900),10,50,50);
    rock.addImage(rockImg);
    rock.velocityY = 3;
    
   rock.scale = 0.1;
    rock.lifetime= 2000;
    rockGroup.add(rock);
  }
}