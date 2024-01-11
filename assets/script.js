//Board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;

//the snakes head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//the snakes food
var foodX;
var foodY;

var gameOver = false;

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('board').style.display = 'block';
    initGame();
}

window.onload = function () {
    document.getElementById('startButton').addEventListener('click', startGame);
};

function initGame() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);

    // Adding touch event listeners
    board.addEventListener('touchstart', touchStart, false);
    board.addEventListener('touchmove', touchMove, false);
    board.addEventListener('touchend', touchEnd, false);

    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black"; //gives color to the bord
    context.fillRect(0, 0, board.height, board.width); // this make it start filling the color from point 0,0 of the board

    context.fillStyle = "red"; //color for the food
    context.fillRect(foodX, foodY, blockSize, blockSize); // place for the snakes food

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }
    //body moving along with head
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "blue"; // color for the snake
    snakeX += velocityX * blockSize; // making snake speed X axis faster
    snakeY += velocityY * blockSize; // -:- but Y axis
    context.fillRect(snakeX, snakeY, blockSize, blockSize); // place for the snake

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //Condition for game over
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        showGameOverAlert();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            showGameOverAlert();
        }
    }
}