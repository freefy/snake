var content = document.getElementById('content');

var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');

var localScore = document.getElementById('localScore');

var loser = document.getElementById('loser');
var close = document.getElementById('close');
var loserScore = document.getElementById('loserScore');
var speed = 100;
var startOrStop = document.getElementById('startOrStop');
var key = 1;
var reStart = document.getElementById('reStart');
init();
//初始化游戏
function init() {
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    // 运动区域 
    this.mapDiv = content;
    this.foodW = 20;
    this.foodH = 20;
    //食物大小
    this.foodX = 0;
    this.foodY = 0;
    // 食物位置
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
        // x坐标，y坐标，名称
    ];
    //蛇
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    //按键事件集合
    blinkEvent();
    // startGame();
}

//游戏开始，蛇开始运动，食物随机出现
function startGame() {
    startPage.style.display = 'none';

    startOrStop.setAttribute('src', 'image/stop.jpg');
    startOrStop.style.display = 'block';
    food();
    snake();
}
//食物
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}
// 蛇
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px'; //x坐标
        snake.style.top = this.snakeBody[i][1] * 20 + 'px'; //y坐标
        // snake.classList.add(snakeBody[i][2]);
        snake.setAttribute('class', snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
    }

}
// 蛇的移动
function move() {
    //蛇身移动
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    //蛇头移动
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
    }
    remove('snake');
    snake();
    //蛇头与食物接触
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeTouchX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeTouchY = this.snakeBody[this.snakeBody.length - 1][1];
        //增加蛇身
        switch (this.direct) {
            case 'right':
                snakeBody.push([snakeTouchX - 1, snakeTouchY, 'body']);
                break;
            case 'left':
                snakeBody.push([snakeTouchX + 1, snakeTouchY, 'body']);
                break;
            case 'up':
                snakeBody.push([snakeTouchX, snakeTouchY + 1, 'body']);
                break;
            case 'down':
                snakeBody.push([snakeTouchX, snakeTouchY - 1, 'body']);
                break;
            default:
                break;
        }
        //食物消失，重新出现，分数加1
        remove('food');
        food();
        this.score += 1;
        localScore.innerHTML = this.score;

    }
    // 蛇头撞到墙
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        reloadGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        reloadGame();
    }
    // 蛇头撞到自身
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
            reloadGame();
        }
    }

}
// 物体消失
function remove(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}
//判定方向
function direction(e) {
    switch (e) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
    }
}
//游戏结束
function reloadGame() {

    remove('food');
    remove('snake');
    clearInterval(snakeMove);
    loserScore.innerHTML = this.score;
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.style.display = 'block';

    //游戏结束，按钮消失
    startOrStop.style.display = 'none';
    // 分数清空
    this.score = 0;
    localScore.innerHTML = this.score;
}
//定义所有点击事件的函数，在出发事件时才调用
function blinkEvent() {
    startBtn.onclick = function () {
        start_Game();
    }
    close.onclick = function () {
        loser.style.display = 'none';
    }
    startOrStop.onclick = function(){
        startAndPause();
    }
    reStart.onclick =function(){
        loser.style.display = 'none';
        start_Game();
    }
}

// function speedChoose(){
//     switch(speed){
//         case 1:
//     }
// }




function start_Game() {
    startGame();
    document.onkeydown = function (e) {
        var code = e.keyCode;
        direction(code);
    }
   
    snakeMove = setInterval(function () {
        move();
    }, speed);
 
}
function startAndPause(){
    if(key == 1){
        clearInterval(snakeMove);
        startOrStop.setAttribute('src','image/startOn.png');
        key = 0 ;
    }else{
        snakeMove = setInterval(function () {
            move();
        }, speed);
        key = 1;
    }
}