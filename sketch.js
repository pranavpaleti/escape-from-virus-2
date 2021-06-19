var gameState="PLAY"
var boy,boyImage,boyImage2;
var ground
var bactiGroup,bacti,bactiImage;
var restart,restartImage,gameover,gameoverImage
var score=0
var bullet,bulletImage,bulletGroup;
var stone,stoneImage,stoneGroup;
var bg,bgImage;
function preload(){
  boyImage=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy7.png","boy8.png","boy9.png",)
  bactiImage=loadImage("bacti.png");
  stoneImage=loadImage("stone.png");
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  boyImage2=loadAnimation("boy1.png");
  bulletImage=loadImage("bullet.png");
  bgImage=loadImage("bg.jpg")
}
function setup(){
  createCanvas(windowWidth-50,windowHeight-20);
  bg=createSprite(350,200,10,10);
  bg.addImage(bgImage);
  bg.scale=3
  
  bg.x=bg.width/2
boy=createSprite(50,windowHeight-60,20,50);
boy.addAnimation("boy123",boyImage)
boy.addAnimation("boyrunning",boyImage2)
boy.scale=0.5

ground=createSprite(200,600,2500,20);
ground.x = ground.width /2;
gameover=createSprite(windowWidth/2,windowHeight/2,100,10);
gameover.addImage(gameoverImage);
gameover.scale=0.5
gameover.visible=false;
restart=createSprite(windowWidth/2,windowHeight/2+40)
restart.addImage(restartImage);
restart.scale=0.5
restart.visible=false;
bactiGroup = new Group();
bulletGroup = new Group();
stoneGroup = new Group();
}
function draw(){
background("white")
if(gameState==="PLAY"){
  if (bg.x<250) {
    bg.x= 500
  }  
if(keyDown("space") && boy.y >= windowHeight-80) {
  boy.velocityY = -12;
  bg.visible=true
}

if(boy.isTouching(bactiGroup)){
  gameState="END"
 bactiGroup.destroyEach()
}
if(boy.isTouching(stoneGroup)){
  gameState="END"
  stoneGroup.destroyEach();
}
boy.velocityY = boy.velocityY + 0.8
if(keyDown("s")){
  spawnBullet();
  bullet.visible=true;
  bullet.velocityX=10
}
if(bulletGroup.isTouching(bactiGroup)){
  bulletGroup.destroyEach();
  bactiGroup.destroyEach();
  score=score+10
}
spawnBacti();
spawnStone();

}
if(gameState==="END"){
  boy.velocityY=0;
  bacti.velocityX=0;
  stone.velocityX=0;
  bullet.vbelocityX=0;
  background("black")
  bg.visible=false
  gameover.visible=true;
  restart.visible=true;
  text("your score:"+score,windowWidth/2,windowHeight/2+100)
  boy.changeAnimation("boyrunning",boyImage2)
  if(mousePressedOver(restart)){
    reset();
  }
}
boy.collide(ground);
drawSprites();
text("score:"+score,displayWidth/2+400,50);
}
function spawnBacti(){
  if(frameCount % 150 === 0) {
    bacti=createSprite(windowWidth/2,windowHeight-60,10,40)
    bacti.velocityX=-10
    bacti.addImage(bactiImage)
    bacti.scale=0.2
    bactiGroup.add(bacti);
  }
}
function spawnBullet(){
  bullet=createSprite(50,windowHeight-60,20,50)
  bullet.addImage(bulletImage);
  bullet.scale=0.2
  bullet.visible=false;
  bulletGroup.add(bullet);
}
function spawnStone(){
  if(frameCount% 112 === 0){
  stone=createSprite(windowWidth/2,windowHeight-60,10,40)
  stone.addImage(stoneImage);
  stone.scale=0.1
  stone.velocityX=-10
  stoneGroup.add(stone)
}
}
function reset(){
  gameover.visible=false;
  restart.visible=false;
  gameState="PLAY"
  bactiGroup.destroyEach();
  boy.changeAnimation("boy123",boyImage)
  score=0;
}
