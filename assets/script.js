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