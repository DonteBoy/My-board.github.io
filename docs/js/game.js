const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image(); //добовляем картинку
ground.src = "/home/donte/Рабочий стол/My-board.github.io-main/docs/img/game/поле.png";
const foodImg = new Image(); //добовляем картинку
foodImg.src = "/home/donte/Рабочий стол/My-board.github.io-main/docs/img/game/еда.png";

let box = 32;
let score = 0;
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box, //диапозон появления еды
    y: Math.floor((Math.random() * 15 + 3)) * box, // 17/15 важный момент
};
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
document.addEventListener("keydown", direction); // отслеживает клафиши
let dir;

function direction(event) { //управление
    if (event.keyCode == 37 && dir != "right")
    // if (event.keyCode == 65 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
    //if (event.keyCode == 87 && dir != "down")
        dir = "up"; //управление
    else if (event.keyCode == 39 && dir != "left")
    // if (event.keyCode == 68 && dir != "rleft")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
    //  if (event.keyCode == 83 && dir != "up")
        dir = "down"; //управление

};

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}


function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y); //распологает foodImg по x и y (рандом)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red"; //цвет змейки
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    };
    ctx.fillStyle = "white"; //надпись цвет
    ctx.font = "50px Arial"; //надпись шрифт
    ctx.fillText(score, box * 2.5, box * 1.7); //надпись размер
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box, //диапозон появления еды
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    };

    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake);
    snake.unshift(newHead);
};

let game = setInterval(drawGame, 100);