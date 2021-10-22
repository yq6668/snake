//蛇的自调用函数
(function (w) {
    var sco=document.querySelectorAll(".sco");
    //存放小蛇身躯的数组
    var elements = [];
    //小蛇的构造函数
    function Snake(width, height, direction) {
        this.width = width || 40;
        this.height = height || 40;
        this.direction = direction || "right";
        //游戏分数统计
        this.score=0;
        sco[0].innerText=this.score;
        sco[1].innerText=this.score;
        //小蛇身躯
        this.body = [
            { x: 3, y: 2, color: "url(images/header.png)", tra: "rotate(270deg)" },
            { x: 2, y: 2, color: "url(images/body.png)", tra: "rotate(90deg)" },
            { x: 1, y: 2, color: "url(images/body.png)", tra: "rotate(90deg)" },
        ];
    }
    //小蛇的初始化方法
    
    Snake.prototype.init = function (map) {
        //移除之前的小蛇
        this.remove();
        //创建小蛇的每一个身躯
        for (var i = 0; i < this.body.length; i++) {
            var item = this.body[i];
            var bodyEle = document.createElement("div");
            bodyEle.style.position = "absolute";
            bodyEle.style.width = this.width + "px";
            bodyEle.style.height = this.height + "px";
            bodyEle.style.backgroundImage = item.color;
            bodyEle.style.left = item.x * this.width + "px";
            bodyEle.style.top = item.y * this.height + "px";
            bodyEle.style.backgroundSize = "100% 100%";
            bodyEle.style.zIndex=1;
            bodyEle.style.transform = item.tra;
            map.appendChild(bodyEle);
            elements.push(bodyEle);
        }
    };
    //移除小蛇的方法
    Snake.prototype.remove = function () {
        for (var i = elements.length - 1; i >= 0; i--) {
            console.log(elements[i]);
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    };
    //小蛇移动的方法
    Snake.prototype.move = function (map, food) {
        //改变非蛇头部分坐标
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        //改变蛇头部分坐标
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                this.body[0].tra = "rotate(270deg)";
                break;
            case "left":
                this.body[0].x -= 1;
                this.body[0].tra = "rotate(90deg)";
                break;
            case "up":
                this.body[0].y -= 1;
                this.body[0].tra = "rotate(180deg)";
                break;
            case "down":
                this.body[0].y += 1;
                this.body[0].tra = "rotate(0deg)";
                break;

            default:
                break;
        }

        //当蛇头坐标和食物坐标重叠的时候，就可以吃食物了
        if (this.body[0].x === food.x && this.body[0].y === food.y) {
            //让小蛇的身躯+1
            this.score+=500;
            sco[0].innerText=this.score;
            sco[1].innerText=this.score;
            var last = this.body[this.body.length - 1];
            var item = {
                x: last.x,
                y: last.y,
                color: last.color,
            };
            this.body.push(item);
            //在页面移除食物 新增一个新的食物
            food.init(map);
        }
        for (var i = 1; i < this.body.length; i++) {
            if (this.body[i].x === food.x && this.body[i].y === food.y) {
                food.init(map);
                // console.log('gg');
            }
        }
        //每次移动就会删除之前的，重新生成
        this.init(map);
    };
    w.Snake = Snake;
})(window);