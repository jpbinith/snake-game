var canvas;
var canvasContext;
var x = 0, y = 0, xSpeed = 10, ySpeed = 0;
var eat = true;
var baitX = 0, baitY = 0;
var snakeBody = [{xCoordinate: 0, yCoordinate: 0}];

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
    this.snakeBody[0] = {xCoordinate: this.x, yCoordinate: this.y}; //initial coordinates of snake
    this.bait();
    this.drawEverything(); //initial draw
    setInterval(function () {
        bait()
        this.moveSnake();
        eatBait();
        drawEverything();
    }, 100);
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 40) { //key up
        this.ySpeed = 10;
        this.xSpeed = 0;
    } else if (e.keyCode == 38) { //key down
        this.ySpeed = -10;
        this.xSpeed = 0;
    } else if (e.keyCode == 39) {
        this.ySpeed = 0;
        this.xSpeed = 10;
    } else if (e.keyCode == 37) {
        this.ySpeed = 0;
        this.xSpeed = -10;
    }
});

function drawEverything() {
    //canvas
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //snake
    for (var i = 0; i < this.snakeBody.length; i++) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(this.snakeBody[i].xCoordinate, this.snakeBody[i].yCoordinate, 10, 10);
    }
    
    //bait
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(this.baitX, this.baitY, 10, 10);
}

//move snake and handling boarders
function moveSnake() {
    console.log(this.snakeBody[0].xCoordinate);
    snakeBody[0].xCoordinate = (this.snakeBody[0].xCoordinate + this.xSpeed + canvas.width) % canvas.width;
    snakeBody[0].yCoordinate = (this.snakeBody[0].yCoordinate + this.ySpeed + canvas.height) % canvas.height;   
}

//set bait position
function bait() {
    if (eat == true) {
        baitX = Math.round(Math.random() * (canvas.width - 10) / 10) * 10;
        baitY = Math.round(Math.random() * (canvas.height - 10) / 10) * 10;
        eat = false;
    }
}

//if the snake eat bite it will appear in another position
function eatBait() {
    if (this.snakeBody[0].xCoordinate == baitX && this.snakeBody[0].yCoordinate == baitY) {
        eat = true;
        snakeBody.push({xCoordinate: this.snakeBody[0].xCoordinate, yCoordinate: this.snakeBody[0].yCoordinate})
    }
}