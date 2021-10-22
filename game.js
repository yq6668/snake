(function (w) {
    function Game() {
        this.food = new Food();
        this.snake = new Snake();
        this.map = document.getElementById("map");
        this.timer = null;
    }
    //开始游戏
    Game.prototype.startGame = function () {
        this.resetGame();
        this.bindKey();
        this.time();
    };
    
    Game.prototype.time = function (w) {
        var i;
        i = w || 300;
        this.timer = setInterval(() => {
            this.snake.move(this.map, this.food);
            this.gameOver();
        }, i);
    }
    //暂停游戏
    Game.prototype.pausee = function () {
        clearInterval(this.timer);
        timer = null;
    }
    //绑定键盘的按键
    Game.prototype.bindKey = function () {
        var that = this;
        document.onkeydown = function (e) {
            var e = e || window.event;
            switch (e.keyCode) {
                //上
                case 38:
                    if (
                        that.snake.direction === "up" ||
                        that.snake.direction === "down"
                    ) {
                        return;
                    }
                    that.snake.direction = "up";
                    break;
                //右
                case 39:
                    if (
                        that.snake.direction === "right" ||
                        that.snake.direction === "left"
                    ) {
                        return;
                    }
                    that.snake.direction = "right";
                    break;
                //下
                case 40:
                    if (
                        that.snake.direction === "up" ||
                        that.snake.direction === "down"
                    ) {
                        return;
                    }
                    that.snake.direction = "down";
                    break;
                //左
                case 37:
                    if (
                        that.snake.direction === "right" ||
                        that.snake.direction === "left"
                    ) {
                        return;
                    }
                    that.snake.direction = "left";
                    break;

                default:
                    break;
            }
        };
    };

    var arr = [3000, 2000, 1000, 0, 0, 0, 0, 0];
    var over = document.getElementById("gameover");
    var background = document.getElementById("background");
    var map2 = document.getElementById("map2");
    var list=document.querySelectorAll(".aa");
    //排行榜
    Game.prototype.lists=function(){
        //死亡出现结束页面
        over.style.display = "block";
        background.style.display = "block";
        map2.style.display = "block";
        clearInterval(spin);
        //排行榜记录
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] <= this.snake.score) {
                for(var x=arr.length-1;x>i;x--){
                    arr[x]=arr[x-1];
                }
                arr[i] = this.snake.score;
                break;
            }
        }
        for(var j=0;j<arr.length;j++){
            list[j].innerText=arr[j];
            console.log(list[j]);
          }
          
    }
    //判断游戏结束
    Game.prototype.gameOver = function () {
        //游戏结束的判定条件
        //1.蛇头超出地图边界
        var head = this.snake.body[0];
        console.log(this.map.offsetHeight)
        var maxX = Math.floor(this.map.clientWidth / this.food.width);
        var maxY = Math.floor(this.map.clientHeight / this.food.height);
        if (head.x < 0 || head.y < 0 || head.x >= maxX || head.y >= maxY) {
            clearInterval(this.timer);
            this.timer = null;
            this.lists();

        }

        //2.蛇头撞到自己的身躯  遍历每一个身躯，看每一个身躯的坐标是否和蛇头重叠
        for (var i = 1; i < this.snake.body.length; i++) {
            var item = this.snake.body[i];
            //头撞身躯了
            if (item.x === head.x && item.y === head.y) {
                clearInterval(this.timer);
                this.timer = null;
                this.lists();
                break;
            }
        }
    };
    //重置游戏
    Game.prototype.resetGame = function () {
        clearInterval(this.timer);
        this.timer = null;
        this.food = new Food();
        this.snake = new Snake();
        this.food.init(this.map);
    };

    w.Game = Game;
})(window);