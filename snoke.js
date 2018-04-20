var s; //variable s
var scl = 20; //scale of 20
var vw = window.innerWidth; //sets var vw as entire sceen width
var vh = window.innerHeight; //sets var vh as entire screen height
var food;
var eat;

function preload(){
  soundFormats('mp3', 'ogg');
  eat = loadSound('eat.mp3');
}

function setup(){ //setup function
  createCanvas(500, 500); //creates canvas with width and height of vw and vh
  s = new Snake(); //tells it to call snake function
  foodLocation();
}

function draw(){ //draw function
  background(75,0,130); //background color
  frameRate(10);
  s.show();
  s.update();
  s.death();
  fill(255,0,0); //the apple's color
  rect(food.x, food.y, scl, scl); //shape of the apple
  if (s.eat(food)){
    foodLocation();
  }
}

function Snake(){ //Snake Constructor function
  this.x = 0; //value of x
  this.y = 0; //value of y
  this.xspeed = 1; // makes the snoke travel right
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.eat = function(pos){
  var d = dist(this.x, this.y, pos.x, pos.y)
  if (d < 1){
    this.total++
    document.getElementById('showScore').innerHTML = this.total;
    
    return true;
  }
  else{
    return false;
  }
}
  this.dir = function(x,y){
    this.xspeed = x;
    this.yspeed = y;
  }
  this.death =  function(){
    for (var i = 0; i < this.tail.length; i++){
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1){
        this.tail = [];
        this.total = 0;
        document.getElementById('showScore').innerHTML = "You have died, because you touched yourself";
        noLoop();
      }
    }
  }
  this.update = function(){
    for (var i = 0; i < this.tail.length - 1; i++){
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= i){
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }
  this.show = function(){ //inherent design of snoke
    fill(0,0,0); //color or snoke
    for (var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x,this.y,scl,scl); //rect(start point of x, start point of y, how long x, how long y)
  }
}

function keyPressed(){
  if (keyCode === UP_ARROW){
    s.dir(0,-1);
  }
  else if (keyCode === DOWN_ARROW){
    s.dir(0,1);
  }
  else if (keyCode === LEFT_ARROW){
    s.dir(-1,0);
  }
  else if (keyCode === RIGHT_ARROW){
    s.dir(1,0);
  }
}

function foodLocation(){
  var cols = floor(width / scl); //makes cols 20 pixels wide
  var rows = floor(height / scl); //makes rows 20 pixels wide
  food = createVector(floor(random(cols)), floor(random(rows))); //generates random position for the food
  food.mult(scl);
}

