var canvas;
var canvasContext;
var xSpeed = 10, ySpeed = 0;
var eat = true;
var baitX = 0, baitY = 0;
var snakeBody = [{ xCoordinate: 0, yCoordinate: 0 }];
var snakeloop;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    this.snakeBody[0] = { xCoordinate: this.canvas.width / 2, yCoordinate: this.canvas.height / 2 }; //initial coordinates of snake
    this.bait();
    this.drawEverything(); //initial draw
    this.heartOfSnake();
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 40 && ySpeed != -10) { //key up
        this.ySpeed = 10;
        this.xSpeed = 0;
    } else if (e.keyCode == 38 && ySpeed != 10) { //key down
        this.ySpeed = -10;
        this.xSpeed = 0;
    } else if (e.keyCode == 39 && xSpeed != -10) {
        this.ySpeed = 0;
        this.xSpeed = 10;
    } else if (e.keyCode == 37 && xSpeed != 10) {
        this.ySpeed = 0;
        this.xSpeed = -10;
    }
});

function heartOfSnake() {
    this.snakeloop = setInterval(function () {
        bait();
        eatBait();
        drawEverything();
    }, 100);
}

function drawEverything() {
    //canvas
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //snake
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].xCoordinate = snakeBody[i - 1].xCoordinate;
        snakeBody[i].yCoordinate = snakeBody[i - 1].yCoordinate;
    }
    moveSnake();
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

    snakeBody[0].xCoordinate = (this.snakeBody[0].xCoordinate + this.xSpeed + canvas.width) % canvas.width;
    snakeBody[0].yCoordinate = (this.snakeBody[0].yCoordinate + this.ySpeed + canvas.height) % canvas.height;

    for (var i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0].xCoordinate == snakeBody[i].xCoordinate && snakeBody[0].yCoordinate == snakeBody[i].yCoordinate) {
            clearInterval(snakeloop);
            if (confirm("Game over! Press ok to restart.")) {
                snakeBody = [{ xCoordinate: this.canvas.width / 2, yCoordinate: this.canvas.height / 2 }];
                heartOfSnake();
              }
        }
    }
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
        snakeBody.push({ xCoordinate: this.snakeBody[snakeBody.length - 1].xCoordinate, yCoordinate: this.snakeBody[snakeBody.length - 1].yCoordinate })
    }
}