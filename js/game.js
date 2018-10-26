obj={
    init:function(){
        this.content = document.getElementById('content');
        this.startPage = document.getElementById('startPage');
        this.startBtn = document.getElementById('startBtn');
        this.localScore = document.getElementById('localScore');
        this.loser = document.getElementById('loser');
        this.close = document.getElementById('close');
        this.loserScore = document.getElementById('loserScore');
        this.speed = 100;
        this.startOrStop = document.getElementById('startOrStop');
        this.key = 1;
        this.reStart = document.getElementById('reStart');
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
        this.bindEvent();
    // startGame();
    
    },
    bindEvent:function(){
        var _this = this;
        this.startBtn.onclick = function () {
            _this.start_Game();
        }
        this.close.onclick = function () {
            _this.loser.style.display = 'none';
        }
        this.startOrStop.onclick = function(){
            _this.startAndPause();
        }
        this.reStart.onclick =function(){
            loser.style.display = 'none';
            _this.start_Game();
        }  
    },
    startGame:function () {
        this.startPage.style.display = 'none';
        this.startOrStop.setAttribute('src', 'image/stop.jpg');
        this.startOrStop.style.display = 'block';
        this.food();
        this.snake();
    },
    food:function () {
        var food = document.createElement('div');
        food.style.width = this.foodW + 'px';
        food.style.height = this.foodH + 'px';
        food.style.position = 'absolute';
        this.foodX = Math.floor(Math.random() * (this.mapW / 20));
        this.foodY = Math.floor(Math.random() * (this.mapH / 20));
        food.style.left = this.foodX * 20 + 'px';
        food.style.top = this.foodY * 20 + 'px';
        this.mapDiv.appendChild(food).setAttribute('class', 'food');
    },
    snake:function () {
        for (var i = 0; i < this.snakeBody.length; i++) {
            var snake = document.createElement('div');
            snake.style.width = this.snakeW + 'px';
            snake.style.height = this.snakeH + 'px';
            snake.style.position = 'absolute';
            snake.style.left = this.snakeBody[i][0] * 20 + 'px'; //x坐标
            snake.style.top = this.snakeBody[i][1] * 20 + 'px'; //y坐标
            // snake.classList.add(snakeBody[i][2]);
            snake.setAttribute('class', this.snakeBody[i][2]);
            this.mapDiv.appendChild(snake).classList.add('snake');
        }
    },
    move:function () {
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
        this.remove('snake');
        this.snake();
        //蛇头与食物接触
        if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
            var snakeTouchX = this.snakeBody[this.snakeBody.length - 1][0];
            var snakeTouchY = this.snakeBody[this.snakeBody.length - 1][1];
            //增加蛇身
            switch (this.direct) {
                case 'right':
                    this.snakeBody.push([snakeTouchX - 1, snakeTouchY, 'body']);
                    break;
                case 'left':
                    this.snakeBody.push([snakeTouchX + 1, snakeTouchY, 'body']);
                    break;
                case 'up':
                    this.snakeBody.push([snakeTouchX, snakeTouchY + 1, 'body']);
                    break;
                case 'down':
                    this.snakeBody.push([snakeTouchX, snakeTouchY - 1, 'body']);
                    break;
                default:
                    break;
            }
            //食物消失，重新出现，分数加1
            this.remove('food');
            this.food();
            this.score += 1;
            this.localScore.innerHTML = this.score;
    
        }
        // 蛇头撞到墙
        if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
            this.reloadGame();
        }
        if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
            this.reloadGame();
        }
        // 蛇头撞到自身
        var snakeHX = this.snakeBody[0][0];
        var snakeHY = this.snakeBody[0][1];
        for (var i = 1; i < this.snakeBody.length; i++) {
            if (snakeHX == this.snakeBody[i][0] && snakeHY == this.snakeBody[i][1]) {
                this.reloadGame();
            }
        }
    },
    remove:function (className) {
        var ele = document.getElementsByClassName(className);
        while (ele.length > 0) {
            ele[0].parentNode.removeChild(ele[0]);
        }
    },
    //判定方向
    direction:function (e) {
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
    },
    //游戏结束
    reloadGame:function () {
    
        this.remove('food');
        this.remove('snake');
        clearInterval(this.snakeMove);
        this.loserScore.innerHTML = this.score;
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
        this.loser.style.display = 'block';
    
        //游戏结束，按钮消失
        this.startOrStop.style.display = 'none';
        // 分数清空
        this.score = 0;
        this.localScore.innerHTML = this.score;
    },
    start_Game:function () {
        this.startGame();
        var _this = this;
        document.onkeydown = function (e) {
            var code = e.keyCode;
            _this.direction(code);
        }
       
        this.snakeMove = setInterval(function () {
            _this.move();
        }, _this.speed);
     
    },
   startAndPause :function s(){
       var _this = this;
        if(this.key == 1){
            clearInterval(this.snakeMove);
            this.startOrStop.setAttribute('src','image/startOn.png');
            this.key = 0 ;
        }else{
            this.snakeMove = setInterval(function () {
                _this.move();
            }, this.speed);
            this.key = 1;
        }
    }
}
obj.init();