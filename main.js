var stage;
var bgImg = new Image();
var bg;
var bg2Img = new Image();
var bg2;
var playerSprite = new Image();
var player;
var stars = bg, bg2;
var lives = new createjs.Container();
var bullets = new createjs.Container();
var drones = new createjs.Container();
var livesLeft;
var livesImage = new Image()
var shotImage = new Image();
var droneImage = new Image();
var explosion;
var playerTween;
var KEYCODE_UP = 38,
    SPACEBAR = 32,
    KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_DOWN = 40;
var movingUp = false;
var movingDown = false;
var gameStarted;
var death;
var smallBoost;
var bigBoost;
var smallBoostImg = new Image();
var bigBoostImg = new Image();
var startScreen;
var points = 0;
var timerSource;
var pressAnyKey;
var up;
var down;
var test;
var gameOverScreen;
var f_init;
var playerDead = false;
var gameEnd = false;
var sounds;
var audioPath = "final";
function moveEnd(){
    stage.removeChild(boost)
}
function booster(distance){
    if((distance.x - player.x) > 200){
        boost.x = player.x - 40;
        boost.y = player.y;
        stage.addChild(boost);
        createjs.Tween.get(boost)
          .to({x: distance.x - 40, y: distance.y}, 1000);
    }
    else(stage.removeChild(boost));
}
function shipRotation(direction){
    if((direction.y - player.y) > 200) {
        player.gotoAndPlay("rolldown");
    }
    else if ((player.y - direction.y) > 200) {
        player.gotoAndPlay("rollup");
    }

}
function droneStrike(){
    var d = new createjs.Bitmap(droneImage);
    d.scaleX = 3;
    d.scaleY = 3;
    d.x = 2000;
    d.y = Math.floor(Math.random() * 950) + 50;
    drones.addChild(d);
    createjs.MotionGuidePlugin.install();
    createjs.Tween.get(d,{loop:false})
        .to({x: -50}, 2500,createjs.Ease.cirOut);
      /*.to({x: -50, y: 950}, 2500);*/
    createjs.Tween.get(d,{loop:false})
        .to({y: player.y}, 3000, createjs.Ease.quadOut);
}
function shotFired(){
    if(playerDead == false){
      var b = new createjs.Bitmap(shotImage);
      b.scaleX = 2.5;
      b.scaleY = 2.5;
      b.x = player.x + 20;
      b.y = player.y + 20;
      createjs.Sound.play("fire");
      bullets.addChild(b);
      createjs.Tween.get(b, {loop: false})
        .to({x: 2000}, 2000);
    }
}

function moveUp(){
    /*if(movingUp == false){
        movingUp = true;
        movingDown = false;*/
        if(player.y > 200){
            playerTween = createjs.Tween.get(player)
            .to({y: player.y - 200}, 500);
        }
}
function moveLeft(){
      if(player.x > 200){
          playerTween = createjs.Tween.get(player)
          .to({x: player.x - 200}, 500);
      }
}

function moveRight(){
    if(player.x < 1800){
          playerTween = createjs.Tween.get(player)
          .to({x: player.x + 200}, 500);
    }
}

function moveDown(){
    /*if(movingDown == false){
      movingDown = true;
      movingUp = false;*/
      if(player.y < 800){
          playerTween = createjs.Tween.get(player)
          .to({y: player.y + 200}, 500);
      }
}

function keyPressed(event){
      switch (event.keyCode) {
        case KEYCODE_UP:
              moveUp();
              break;
        case KEYCODE_DOWN:
              moveDown();
              break;
        case SPACEBAR:
              shotFired();
              break;
        case KEYCODE_LEFT:
              moveLeft();
              break;
        case KEYCODE_RIGHT:
              moveRight();
              break;
      }
}

//sets up game canvas
function preLoad(){

    sounds = [
      {id: "fire", src: "laser.M4A"},
      {id: "bof", src: "boom.M4A"}
    ];
    createjs.Sound.alternateExtensions = ['m4a'];
    createjs.Sound.registerSounds(sounds, "");
    bgImg.src = "bg.png";
    bgImg.name = "bg";
    bg = new createjs.Bitmap(bgImg);

    bg2Img.src = "bg.png";
    bg2Img.name = "bg2";
    bg2 = new createjs.Bitmap(bg2Img);
    bg2.x = 6000;

    livesImage.src = "player.png";
    livesImage.name = "playerLives";
    shotImage.src = "shot.png";
    shotImage.name = "shot";
    droneImage.src = "drone.png";
    droneImage.name = "drone";


    smallBoostImg.src = "boost/0.png";
    smallBoostImg.name = "smallboost";
    smallBoost = new createjs.Bitmap(smallBoostImg);

    bigBoostImg.src = "boost/1.png";
    bigBoostImg.name = "bigBoost";
    bigBoost = new createjs.Bitmap(bigBoostImg);

    gameOverScreen = new createjs.Text("GAME OVER", 'bold 70px Courier New', '#FFFFFF');
    gameOverScreen.x = 750;
    gameOverScreen.y = 300;

    startScreen = new createjs.Text('Welcome', 'bold 70px Courier New', '#FFFFFF');
    startScreen.x = 750;
    startScreen.y = 300;

    pressAnyKey = new createjs.Text('Press Any Key to Start', 'bold 50px Courier New', '#FFFFFF');
    pressAnyKey.x = 600;
    pressAnyKey.y = 500;

    scoreBoard = new createjs.Text('0', 'bold 30px Courier New', '#FFFFFF');
    scoreBoard.maxWidth = 1000;
    scoreBoard.x = 20;
    scoreBoard.y = 950;

    death = new createjs.Text('You Died!', 'bold 70px Courier New', '#FFFFFF');
    death.x = 750;
    death.y = 300;

    var boostSprite = new createjs.SpriteSheet({
      framerate: 10,
      images: ["boost/0.png", "boost/1.png"],
      frames: [
        [0, -4, 20, 20,0],
        [0, 0, 16, 14,1]
      ],
      animations: {
        boost: [0,1,true]
      }
    });
    boost = new createjs.Sprite(boostSprite, "boost");
    boost.scaleX = 2.5;
    boost.scaleY = 2.5;

    var playerSprite = new createjs.SpriteSheet({
    framerate: 6,
    images: ["player.png", "rolldown/1.png", "rolldown/2.png", "rolldown/3.png", "rolldown/4.png",
            "rollup/10.png", "rollup/11.png", "rollup/12.png", "rollup/13.png", "player.png"],

    frames: {width: 24 , height: 12},
    animations: {
      rolldown: {
          frames: [0,1,2,3,2,1,0],
          next: "idle",
        },
      rollup: {
          frames: [0,5,6,7,6,5,0],
          next: "idle",
        },
      idle: [0]
    }
    });
    player = new createjs.Sprite(playerSprite, "idle");
    player.scaleX = 2.5;
    player.scaleY = 2.5;
    var explode = new createjs.SpriteSheet({
    framerate: 15,
    images: ["explosion1/0.png", "explosion1/1.png", "explosion1/2.png", "explosion1/3.png",
            "explosion1/4.png","explosion1/5.png", "explosion1/6.png", "explosion1/7.png",
            "explosion1/8.png", "explosion1/9.png", "explosion1/10.png", "explosion1/11.png",
            "explosion1/12.png", "explosion1/13.png", "explosion1/14.png", "explosion1/15.png", "explosion1/16.png"],

    frames: {width: 50, height: 50},
    animations: {
      boom: [0, 16, false]
    }
    });
    explosion = new createjs.Sprite(explode, "boom");
    stage.addChild(bg, bg2, bullets, drones, scoreBoard, startScreen, pressAnyKey, lives);

    createjs.Tween.get(bg, {loop: true})
        .to({x: -6000 }, 20000);

    createjs.Tween.get(bg2, {loop: true})
        .to({x: 0 }, 20000);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function environment() {

  /* remove offscreen bullets*/
    for(var i = 0; i < bullets.children.length; ++i){
        if(bullets.children[i].x >= 2000){
          bullets.removeChildAt(i);
        }
    }
    for(var k = 0; k < drones.children.length; ++k){

        /*ship impacts player*/
        if(drones.children[k].x - 40 < player.x + 30
          && drones.children[k].x + 40 > player.x - 30
          && drones.children[k].y + 40 > player.y -30
          && drones. children[k].y - 40 < player.y + 30){
          stage.removeChild(player, boost);
          drones.removeChildAt(k);
          explosion.y = player.y;
          explosion.x = player.x;
          createjs.Sound.play("bof");
          stage.addChild(explosion);
          explosion.addEventListener("animationend", explosionEnd);
          playerDeath();
        }
        if(drones.children[k].x < 0){
          drones.removeChildAt(k);
        }

    /* bullet collison detection */
        for(var j = 0; j < bullets.children.length; ++j){
            if(bullets.children[j].x + 15 > drones.children[k].x - 60
              && bullets.children[j].x - 15 < drones.children[k].x + 60
              && bullets.children[j].y + 15 > drones.children[k].y - 60
              && bullets.children[j].y - 15 < drones.children[k].y + 30){
                scoreBoard.text = parseFloat(scoreBoard.text + 25);
                explosion.x = drones.children[k].x;
                explosion.y = drones.children[k].y;
                explosion.gotoAndPlay(0);
                stage.addChild(explosion);
                createjs.Sound.play("bof");
                explosion.addEventListener("animationend", explosionEnd);
                bullets.removeChildAt(j);
                drones.removeChildAt(k);
              }
        }
    }
}
function mouseMove(e){
  if(playerDead == false){
    var point = stage.globalToLocal(e.stageX, e.stageY);
    shipRotation(point);
    booster(point);
    createjs.Tween.get(player)
        .to({x: point.x, y: point.y}, 1000 );
  }

}
function explosionEnd(e){
  stage.removeChild(explosion);

}

function playerDeath(){
    playerDead = true;
    clearInterval(timerSource);


    --livesLeft;
    if(livesLeft >= 0){
      stage.addChild(death, pressAnyKey);
      lives.removeChild(lives.children[livesLeft]);
    }
    else{
      gameOver();
    }
    document.onkeydown = reset;
}

function gameOver(){
    stage.removeChild(death, pressAnyKey);
    stage.addChild(gameOverScreen);
    var score = scoreBoard.text;
    gameEnd = true;
    var initials = prompt("ADD SCORE TO DATABASE!", "Enter initials");
    initials = initials.slice(0,3);
    points = parseFloat(scoreBoard.text);
    saveScore(initials);
    this.document.onkeydown = gameStart;
}
function saveScore(initials){
    $.ajax({
        type: "POST",
        url: "http://localhost/final/scores.php",
        data: {score: points, id: initials},
        succcess: function(response){
          console.log(response);
          document.getElementById('demo').innerHTML = points;

      }
    });
}
function reset(){
    playerDead = false;
    player.x = 300;
    player.y = 500;
    stage.removeChild(death, pressAnyKey);
    stage.addChild(player);
    createjs.Ticker.addEventListener("tick", environment);
    timerSource = setInterval('droneStrike()', 2000);
    stage.addEventListener("stagemousedown", mouseMove);
    document.onkeydown = keyPressed;
}

//game initial start
function gameStart(){
  livesLeft = 3;
  z = new createjs.Bitmap(livesImage);
  x = new createjs.Bitmap(livesImage);
  y = new createjs.Bitmap(livesImage);
  z.x = 20;
  z.y = 25;
  x.x = 60;
  x.y = 25;
  y.x = 100;
  y.y = 25;
  lives.addChild(z,x,y);
  player.x = 300;
  player.y = 500;
  stage.addChild(player);
  stage.removeChild(startScreen, pressAnyKey);
  stage.mouseEventsEnabled = true;
  createjs.Ticker.addEventListener("tick", environment);
  timerSource = setInterval('droneStrike()', 2000);
  stage.addEventListener("stagemousedown", mouseMove);
  document.onkeydown = keyPressed;
}

//main function called from php file
function Main(){
    stage = new createjs.Stage("endersGame");
    preLoad();
    this.document.onkeydown = gameStart;



}
