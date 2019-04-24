let Cricle = function(x,y,radius,dx,dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx=  dx;
    this.dy = dy;
};
let canvas = document.getElementById('mycanvas');
let circle = new Cricle(250,470,10,10,5);
let ctx = document.getElementById('mycanvas').getContext('2d');
function createCircle() {
    ctx.beginPath();
    ctx.arc(circle.x,circle.y,circle.radius,0,2*Math.PI,true);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}
createCircle();
// HCN
let Rectangle = function (x,y,width,height,speed,movingright,movingleft) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height =height;
    this.speed = speed;
    this.movingright = movingright;
    this.movingleft = movingleft;
};
let rectangle = new Rectangle(150,canvas.height - 20,200,20,20,false,false);
function createrectangle() {
    ctx.beginPath();
    ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
createrectangle();
document.addEventListener('keyup',function (event) {
    console.log('Key up');
    console.log(event);
    if (event.keyCode === 37) {
        rectangle.movingleft = false;
    }else if(event.keyCode === 39){
        rectangle.movingright = false;
    }

})
document.addEventListener('keydown',function (event) {
    console.log('keydown');
    console.log(event);
    if (event.keyCode === 37) {
        rectangle.movingleft = true;
    }else if(event.keyCode === 39){
        rectangle.movingright = true;
    }
})
function
conditionoftherectangle() {
    if (rectangle.movingleft) {
        rectangle.x -= rectangle.speed;
    } else if (rectangle.movingright) {
        rectangle.x += rectangle.speed;
    }
    if (rectangle.x < 0) {
        rectangle.x = 0;
    }
    if (rectangle.x > canvas.width - rectangle.width) {
        rectangle.x = canvas.width - rectangle.width;
    }
}
function conditionofthecircle()  {
    if (circle.x + circle.radius >= rectangle.x &&
        circle.y + circle.radius >= canvas.height -rectangle.height &&
        circle.x + circle.radius <= rectangle.x + rectangle.width){
        circle.dy = - circle.dy;
    }
    if (circle.x < circle.radius || circle.x > canvas.width - circle.radius) {
        circle.dx = -circle.dx;
    }
    if (circle.y < circle.radius || circle.y > canvas.height - circle.radius) {
        circle.dy = -circle.dy;
    }
circle.x += circle.dx;
circle.y += circle.dy;
}
// tính điểm
let ponit = 0;
let gamewin = false;
// drawbricks
let bricks = {
    offsetX : 25,
    offsetY : 25,
    distance: 25,
    width :70,
    height : 20,
    totalrow:5,
    totalclo :5
};
let brick = [];
for (let i =0;i<bricks.totalrow;i++){
    for (let j = 0;j<bricks.totalclo;j++) {
        brick.push(
            {
                x: bricks.offsetX + j *(bricks.width + bricks.distance),
                y: bricks.offsetY + i *(bricks.height + bricks.distance),
                isBroken : false
            });
    }
}
function tiles_disappear() {
    brick.forEach(function (b) {
        if (!b.isBroken) {
            if (circle.x >= b.x && circle.x <= b.x +bricks.width &&
                circle.y + circle.radius  >= b.y && circle.y - circle.radius <= b.y +bricks.height){
                circle.dy = -circle.dy;
                b.isBroken = true;
                ponit ++;
                document.getElementById('point').innerHTML = "Score : "+ponit;
            }
        }
    })
}

function drawbrick(){
    brick.forEach(function (b) {
        if (!b.isBroken) {
            ctx.beginPath();
            ctx.rect(b.x, b.y, bricks.width, bricks.height);
            ctx.fill();
            ctx.closePath();
        }

    })
}
drawbrick();
let gameover = false;

function draw() {
    if (!gameover ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createCircle();
        createrectangle();
        drawbrick();
        tiles_disappear();
        // điều kiện của rectangle
        conditionoftherectangle();
        // điều kiện của circle
        conditionofthecircle();

        if (circle.y >canvas.height - circle.radius){
            gameover = true;
        }
        requestAnimationFrame(draw);
    }else {
        alert('Games Over');
    }
}
function docReady() {
    document.addEventListener('keydown',keyDownHandler)
}
function keyDownHandler(event) {
    switch (event.code) {
        case 'Space':
            draw();
        break;
    }
}