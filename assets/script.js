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

