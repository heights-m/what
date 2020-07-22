var canvasContext, controller, rectangle, gameLoop, canvas

canvas = document.getElementById('gameCanvas');

canvasContext = canvas.getContext('2d');



rectangle = {

    height:32,
    jumping:true,
    width:32,
    x:32,
    x_vel:0,
    y:0,
    y_vel:0,
    lvl:1
};

platform = function(x, y, width, height, color) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function() { 

        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.x, this.y, this.width, this.height);

    };


};

getClsn = function(box) {

    bottom = box.y + box.height;
    left = box.x;
    right = box.x + box.width;
    top = box.y;

    box.prototype = {

        bottom:bottom,
        left:left,
        right:right,
        top:top

    };

};

/*collision = function(obj1, obj2) {

    if (obj1.top > obj2.bottom || obj1.right < obj2.left || obj1.bottom < obj2.top || obj1.left > obj2.right) {
        
        if (obj1.top < obj2.bottom) {
                obj1.y = obj2.bottom;
            }

        else

        return false;
        
        

      };
  
      return true;
} */

platform1 = new platform(200, 420, 50, 16, "#1f262e");

controller = {


    left:false,
    right:false,
    up:false,
    downArw:false,

    keyListener:function(event) {
        
        var keystate = (event.type == "keydown")?true:false;

        switch(event.keyCode) {

            case 37: //left
                controller.left = keystate;
            break;

            case 38: //up
                controller.up = keystate
            break;

            case 39: //right
                controller.right = keystate
            break;

            case 40: //down??
                controller.downArw = keystate
            break;

        }

    }

};

gameLoop = function() {

    if (controller.up && rectangle.jumping == false) {

        rectangle.y_vel -= 18;
        rectangle.jumping = true;

    }

    if (controller.left) {

        rectangle.x_vel -= 0.6;

    }

    if (controller.right) {

        rectangle.x_vel += 0.6;

    }

    if (controller.downArw && rectangle.y == 148 && rectangle.lvl == 1) {

        rectangle.y == 212
        rectangle.lvl = 2
    }

    rectangle.y_vel += 1.5; //grav
    
    rectangle.x += rectangle.x_vel;  //update positions
    rectangle.y += rectangle.y_vel;

    rectangle.x_vel *= 0.8;
    //rectangle.y_vel *= 0.9; // friction

    //collision
    if (rectangle.y > 180 - 32 && rectangle.lvl == 1) {

        rectangle.jumping = false;
        rectangle.y = 180 -32;
        rectangle.y_vel = 0;
    }

    if (rectangle.y > canvas.height - 32 && rectangle.lvl == 2) {

        rectangle.jumping = false;
        rectangle.y = canvas.height -32;
        rectangle.y_vel = 0;
        
    }
    
    if (rectangle.x >  320 - 32) {

        rectangle.x = 320 - 32;

    } else if (rectangle.x < 0) {

        rectangle.x = 0;
    }

    canvasContext.fillStyle = "rgba(40,48,56,0.25)";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    
    //oox
    canvasContext.fillStyle = "#ff0000";
    canvasContext.fillRect(Math.floor(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);

    platform1.draw();

    canvasContext.strokeStyle = "#1f262e";
    canvasContext.lineWidth = 32;
    canvasContext.beginPath();
    canvasContext.moveTo(0, 196);
    canvasContext.lineTo(320, 196);
    canvasContext.stroke(); 

    window.requestAnimationFrame(gameLoop);


}

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(gameLoop);
