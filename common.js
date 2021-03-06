//通过自调用函数产生一个随机数对象,在自调用函数外面,调用该随机数对象方法产生随机数
(function (window) {
  //产生随机数的构造函数
  function Random() {}
  //在原型对象中添加方法
  Random.getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  //把Random对象暴露给顶级对象window--->外部可以直接使用这个对象
  window.Random = Random;
})(window);
