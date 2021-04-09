var trex , trex_running;
var ground , ground_image;
var invisibleground;
var obstacle, obstacle1,obstacle2,obstacle3,obstacle4;
var obstacle5,obstacle6;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameover_img , restart , restart_img;
var jumpsound;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image = loadAnimation("ground2.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  cloudImage = loadAnimation("cloud.png");
  obstacle1 = loadAnimation("obstacle1.png");
  obstacle2 = loadAnimation("obstacle2.png");
  obstacle3 = loadAnimation("obstacle3.png");
  obstacle4 = loadAnimation("obstacle4.png");
  obstacle5 = loadAnimation("obstacle5.png");
  obstacle6 = loadAnimation("obstacle6.png");
  
  gameover_img = loadAnimation("gameOver.png");
  restart_img = loadAnimation("restart.png");
  
  jumpsound = loadSound("jump.mp3");
}
function setup() {
  createCanvas(600, 200);
  
  // X position, Y position , Width , height
  trex = createSprite(50,160,20,50);
  trex.addAnimation("test",trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = true;
  
  //create ground sprite
  ground = createSprite(200,180,400,20);
  ground.addAnimation("ground",ground_image);
  
  invisibleground = createSprite(200,195,400,20);
  invisibleground.visible = false;
  
  score= 0;
  obstaclesGroup = new Group ();
  cloudsGroup = new Group();
  
  gameover = createSprite(300,100);
  gameover.addAnimation("game",gameover_img);
  gameover.scale = 0.5;
  
  restart = createSprite(300,140);
  restart.addAnimation("restart",restart_img);
  restart.scale = 0.5;
  
}

function draw() {
  background("white");
  //print the score on the canvas
  text("score: " + score, 500,50);
  score = score + Math.round(random(frameCount/60));
  
  
  if(gameState === PLAY){
    
    trex.changeAnimation("test",trex_running);
    
    gameover.visible = false;
    restart.visible = false;
    
    // on pressing space key the trex jumps
  if(keyDown("space") && trex.y >= 100){
    trex.velocityY = -10;
    jumpsound.play();
  }
  // add Gravity
  trex.velocityY = trex.velocityY + 0.5; 
  
  //make the ground move infinitely
  ground.velocityX = -2;
  if(ground.x < 0){
    ground.x = 200;
  }
  
  trex.collide(invisibleground);
  
  spawnClouds();
  spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
    
}else if(gameState === END){
    gameover.visible = true;
    restart.visible = true;
    ground.x = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY = 0;

    //To avoid the obstacles and clouds from disappearing
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    //change animation when trex tounches the obstacle
    trex.changeAnimation("collided",trex_collided);
  
    if(mousePressedOver(restart)){
      reset();
    }
}
  
  drawSprites();
  
}

function spawnClouds(){
  //Create Clouds after each 60 frames so there is a distance between each cloud
  if(frameCount % 60 === 0){
  cloud = createSprite(600,100,40,10);
  cloud.addAnimation("clouds",cloudImage);
  cloud.velocityX = -3;
    
  // The clouds have to appear in random heights(Y position) 
  cloud.y = Math.round(random(10,60));
    
  //The trex is appearing below the cloud so we increase the depth of trex 
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1; 
    
  // print the depth in the console
  console.log(trex.depth);
  console.log(cloud.depth);
    
  cloud.lifetime = 200;
  cloudsGroup.add(cloud);
    
  } 
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -3;
    var rand = Math.round(random(1,6));
      switch(rand){
        case 1: obstacle.addAnimation("obstacle1",obstacle1);
                break;
        case 2: obstacle.addAnimation("obstacle1",obstacle2);
                break;
        case 3: obstacle.addAnimation("obstacle1",obstacle3);
                break;
        case 4: obstacle.addAnimation("obstacle1",obstacle4);
                break;
        case 5: obstacle.addAnimation("obstacle1",obstacle5);
                break;
        case 6: obstacle.addAnimation("obstacle1",obstacle6);
                break;
        default: break;
      }
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
    }
  
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  
}

