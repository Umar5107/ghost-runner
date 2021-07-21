var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();

  ghost = createSprite(300,300,20,30);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
 
  invisibleBlockGroup = new Group();

 // spookySound.play();
}

function draw() {
  background("black");

  
  if(tower.y > 400){
      tower.y = 300;
    }

  if(keyDown("space")){
    ghost.velocityY = -6;
  }

  ghost.velocityY += 0.8;

  if(keyDown("RIGHT_ARROW")){
    ghost.x += 2;
  }

  if(keyDown("LEFT_ARROW")){
    ghost.x += -2;
  }

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y > 600){
    gameState = "end";
  }

  if(gameState == "end"){
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    ghost.destroy();
    tower.destroy();
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }

    spawnDoors();
    drawSprites();
}

function spawnDoors(){
  if(frameCount % 60 == 0){
    door = createSprite(450,-50);
    door.addImage(doorImg);
    door.x = Math.round(random(100,400));
    door.velocityY = 3;
    door.scale = 0.5;
    door.lifetime = 200;
    doorsGroup.add(door);
    ghost.depth = door.depth;
    door.depth += 1;

    climber = createSprite(450,-10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 3;
    climber.scale = 0.5;
    climber.lifetime = 200;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(450,-5);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 1;
    invisibleBlock.lifetime = 200;
    invisibleBlock.velocityY = 3;
    invisibleBlock.x = climber.x;
    invisibleBlockGroup.add(invisibleBlock);
   // invisibleBlock.debug = true;
    invisibleBlock.visible = false;
  }
}


