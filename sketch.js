var Ball, database;
var position;


function setup(){
  //linking the code to database
  database= firebase.database();
  console.log(database);
  createCanvas(500,500);

  Ball = createSprite(250,250,10,10);
  Ball.shapeColor = "red";
  // the position of the ball is linked to database
  var ballPosition = database.ref("ball/position");
  ballPosition.on("value", readPosition);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}
// if we change the value of x and y axis in the database, the position of ball also will change
function writePosition(x,y){
 database.ref("ball/position").set({
  'x':position.x+x,
  'y':position.y+y
 })
}
// the position of the ball will change when using arrow keys
// accordingly the x and y axis also changes in the database
function readPosition(data){
 position=data.val()
 Ball.x = position.x
 Ball.y = position.y
}
// set means to on the values and on means to read the value
