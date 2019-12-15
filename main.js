var context, controller, rectangle, loop, enemy, collision, score, gameruntime, restartbtn, level,enemy2,enemy3;

ctx = document.querySelector("canvas").getContext('2d');

ctx.canvas.height = 300;
ctx.canvas.width = 500;
score = 0;
level = 0;

gameruntime = true;
 
 rectangle = {
  height:50,
  width:50,
  x:0,
  dx:0,
  y:72,
  dy:0,
  jumping:false,
  color: 'green',
  collision:false,
  health:100,

};

/*collision = function(object1,object2){
  this.object1 = object1;
  this.object2 = object2;

if(object1.x + object )

}*/

 enemy = {
  height:40,
  width:40,
  x:500,
  y:260,
  collision:false,

}
enemy2 = {
 height:300,
 width:100,
 x:0,
 y:-300,
 collision:false,
 active:false,

}
enemy3 = {
 height:300,
 width:100,
 x:400,
 y:-300,
 collision:false,
 active:false,

}

restartbtn = {
  height:50,
  width:100,
  x:400,
  y:150,
}

controller = {
left: false,
right: false,
up: false,
keyListener: function(event){

var key_state = (event.type == "keydown")?true:false;

switch(event.keyCode){
  case 37:
  controller.left = key_state;
  break;
  case 38:
  controller.up = key_state;
  break;
  case 39:
  controller.right = key_state;
  break;

  }
 }
};

loop = function() {

if (controller.up && rectangle.jumping == false){
  rectangle.dy -= 30;
  rectangle.jumping = true;
}

if (controller.left) {
  rectangle.dx -= 0.5;
}

if (controller.right){
  rectangle.dx += 0.5
}

rectangle.dy += 1.5; //gravity
rectangle.y += rectangle.dy;
rectangle.x += rectangle.dx;
rectangle.dx *= 0.9; //friction
rectangle.dy *= 0.9; //friction

if (rectangle.y > canvas.height - rectangle.height){
  rectangle.jumping = false;
  rectangle.y = canvas.height - rectangle.height;
  rectangle.dy = 0;
}

if (rectangle.x > canvas.width - rectangle.width){
  rectangle.x = canvas.width - rectangle.width ;
}

if(rectangle.x < 0){
  rectangle.x = 0;
}


if(enemy.x < 0 - enemy.width){
  enemy.x = canvas.width;
  if(rectangle.collision == true){
    rectangle.collision = false
  }else{
    score += 10;
  }
}

if (rectangle.x >= enemy.x - enemy.width && rectangle.x <= enemy.x + enemy.width && rectangle.y >= enemy.y - enemy.height){
  rectangle.color = "darkred";
  rectangle.collision = true;
  rectangle.health -= 10;
  enemy.x = 0 - enemy.width;
}else{
  rectangle.color = "green";
}

if (rectangle.x <= enemy2.x + enemy2.width && rectangle.y - rectangle.height <= enemy2.y + enemy2.height && enemy2.active ==true ){
  rectangle.color = "darkred";
  rectangle.collision = true;
  rectangle.health -= 1;
}

if (rectangle.x + rectangle.width >= enemy3.x && rectangle.y - rectangle.height <= enemy3.y + enemy2.height  && enemy3.active ==true ){
  rectangle.color = "darkred";
  rectangle.collision = true;
  rectangle.health -= 1;
}


 if(gameruntime == true && score == 0){
 enemy.x -= 1;
}else if(gameruntime == true){
  if (score <= 100){
    level = 1;
  }else if(score >= 150 && score < 200){
    level = 2;
  }else if(score >= 200 && score < 250){
    level = 3;
  }else if(score >= 250 && score < 300){
    level = 4;
  }else if(score >= 300){
    level = 5;
  }

  switch(level){
    case 1: enemy.x -= score/10;
    break;

    case 2: enemy.x -= 10;
            rectangle.x -= 2;
    break;

    case 3: enemy.x -= 10;
            rectangle.x -= 2;
            enemy.width = 60;
            enemy.height = 50;
    break;

    case 4:  enemy.x -= 10;
            rectangle.x -= 2;
            enemy2.active = true;
            enemy2.y += 2;
            if(enemy2.y > canvas.height - enemy2.height){
              enemy2.y = 0;
            }
    break;

    case 5:  enemy.x -= 10;
            rectangle.x -= 2;
            enemy2.active = true;
            enemy2.y += 2;
            if(enemy2.y > canvas.height - enemy2.height){
              enemy2.y = 0;
            }
            enemy3.active = true;
            enemy3.y += 2;
            if(enemy3.y > canvas.height - enemy2.height){
              enemy3.y = 0;
            }
            break;

            case 6:  enemy.x -= 5;
                    rectangle.x -= 2;
                    enemy2.active = true;
                    enemy2.y += 2;
                    if(enemy2.y > canvas.height + enemy2.height){
                      enemy2.y = 300;
                    }
                    enemy3.active = true;
                    enemy3.y += 2;
                    if(enemy3.y > canvas.height + enemy2.height){
                      enemy3.y = 300;
                    }

                    break;
      }

}



let restart = function(){
  console.log("RESTARTING GAME")
  score = 0;
  rectangle.health = 100;
  rectangle.x = 0;
  rectangle.y = 72;
  gameruntime = true;
}


ctx.clearRect(0,0,canvas.width,canvas.height);

if(rectangle.health <= 0){  //Thanks to queen-adreena on reddit fixed a potential bug! (was rectangle.health == 0)
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("GAME OVER", 150, 150);
  ctx.fillText("SCORE: " + score, 155, 200);
  enemy.y = 260;
  enemy.width = 40;
  enemy2.y = -300;
  enemy3.y = -300;
  enemy2.active = false;
  enemy3.active = false;
  gameruntime = false;
  startover();
}

if(rectangle.y - rectangle.height <= restartbtn.y && rectangle.x + rectangle.width >= restartbtn.x && gameruntime == false){
  ctx.fillStyle = 'green';
    restart();
}

startover = function (){
  ctx.beginPath();
  ctx.rect(restartbtn.x, restartbtn.y, restartbtn.width, restartbtn.height);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fillText("reset", restartbtn.x + 20, restartbtn.y + 35);

}







ctx.fillStyle = "black";
ctx.font = "30px Arial";
ctx.fillText("Score: " + score, 350, 30);
ctx.fillText("Health: " + rectangle.health, 10,30);
ctx.fillStyle = rectangle.color;
ctx.beginPath();
ctx.rect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(enemy.x,enemy.y,enemy.width,enemy.height);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(enemy2.x,enemy2.y,enemy2.width,enemy2.height);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(enemy3.x,enemy3.y,enemy3.width,enemy3.height);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();




window.requestAnimationFrame(loop);

};

window.addEventListener("keydown",controller.keyListener);
window.addEventListener("keyup",controller.keyListener);
loop();
