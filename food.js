//食物的自调用函数
(function (w) {
    //存放食物的数组
    var elements = [];

    //食物的构造函数
    function Food(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 40;
        this.height = height || 40;
        this.color = "url(images/bianbian.png)";
    }

    //食物的初始化方法
    Food.prototype.init = function (map) {
        //移除之前的食物
        this.remove();
        //指定食物的坐标
        var maxX = Math.floor(map.clientWidth / this.width);
        var maxY = Math.floor(map.clientHeight / this.height);
        var x = Random.getRandom(0, maxX);
        var y = Random.getRandom(0, maxY);
        this.x = x;
        this.y = y;

        //创建页面元素
        var foodEle = document.createElement("div");
        foodEle.style.position = "absolute";
        foodEle.style.width = this.width + "px";
        foodEle.style.height = this.height + "px";
        foodEle.style.backgroundImage = this.color;
        foodEle.style.backgroundSize = "100% 100%";
        foodEle.style.zIndex = 1;
        foodEle.style.left = this.x * this.width + "px";
        foodEle.style.top = this.y * this.height + "px";

        //把食物添加到页面
        map.appendChild(foodEle);
        //把食物添加到数组里面
        elements.push(foodEle);
    };

    w.Food = Food;

    //移除食物的方法 （私有方法）
    Food.prototype.remove = function () {
        //要分别从页面和数组中移除
        for (var i = elements.length - 1; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    };
})(window);