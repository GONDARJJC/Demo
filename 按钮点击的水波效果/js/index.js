var canvas = {},
  centerX = 0,
  centerY = 0,
  color = '',
  containers = document.getElementsByClassName('material-design')
  context = {},
  element = {},
  radius = 0,

//下面的方法是优化动画的重绘制，本质上就是对不同的浏览器之行不同的setTimeout。
requestAnimFrame = function () {
  return (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  });
}(),

init = function () {
  containers = Array.prototype.slice.call(containers);
  for (var i = 0; i < containers.length; i += 1) {//循环插入canvas
    canvas = document.createElement('canvas');//创建
    canvas.addEventListener('click', press, false);//添加事件
    containers[i].appendChild(canvas);//追加canvas
    canvas.style.width = '100%';//设置canvas宽度
    canvas.style.height = '100%';//设置canvas高度
    canvas.width = canvas.offsetWidth;//对应press函数中清除方法的宽度
    canvas.height = canvas.offsetHeight;//对应press函数中清除方法的高度
  }
},

press = function (event) {
  color = event.toElement.parentElement.dataset.color;//获取data-color的值，为下面的绘制函数时填充颜色时使用
  element = event.toElement;
  context = element.getContext('2d');
  radius = 0;//为下面的绘制函数设置圆的半径
  centerX = event.offsetX;//获取鼠标位置
  centerY = event.offsetY;//获取鼠标位置
  context.clearRect(0, 0, element.width, element.height);//点击时清空之前的绘画
  draw();//重新绘画
},

draw = function () {
  context.beginPath();//声明开始绘制
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);//绘制圆形
  context.fillStyle = color;//填充颜色
  context.fill();//绘制canvas
  radius += 6;//绘画半径增量速度设置
  if (radius < element.width) {//如果宽度小于btn的款的
    requestAnimFrame(draw);//则重新绘制圆形
  }
};

init();//初始化canvas