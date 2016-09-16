//定义全局变量
var can1,//画布1
	can2,//画布2
	ctx1,//画布1上下文对象
	ctx2,//画布2上下文对象
	canWidth,//画布宽度
	canHeight,//画布高度
	lastTime,
	deltaTime,//动画帧间间隔时间
	ane,//海葵
	mom,//大鱼
	baby,//小鱼
	mx,//画布中央x坐标
	my,//画布中央y坐标
	babyTail = [],//小鱼尾巴变化数组
	babyEye = [],//小鱼眼睛变化数组
	babyBody = [],//小鱼身体变化数组
	momTail = [],//大鱼尾巴变化数组
	momEye = [],//大鱼眼睛变化数组
	momBodyOra = [],//吃到黄色果实时大鱼身体变化数组
	momBodyBlue = [],//吃到蓝色果实时大鱼身体变化数组
	data,//数据信息
	fruit,//海葵产生的果实对象
    bgPic = new Image(),//
    wave,//圆圈运动对象
    halo,//鱼吃到果实时产生的圆圈
    dust,//漂浮物对象
    dustPic = [];//漂浮物图片数组
    
document.body.onload = game;

function game() {
	lastTime = Date.now();
	deltaTime = 0;
	init();
	gameloop();
}
function init() {
	can1 = document.getElementById('canvas1');//画出fishes,dust,UI,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');//画出background,ane,fruits
	ctx2 = can2.getContext('2d');
	can1.addEventListener('mousemove',onMouseMove,false);
	
	
	bgPic.src = "./img/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;
	
	//创建海葵对象并初始化
	ane = new aneObj();
	ane.init();
	
	//创建果实对象并初始化
	fruit = new fruitObj();
	fruit.init();
	
	//创建大鱼对象并初始化
	mom = new momObj();
	mom.init();
	
	//创建小鱼对象并初始化
	baby = new babyObj();
	baby.init();
	
	//
	mx = canWidth * 0.5;
	my = canHeight * 0.5;
	
	//小鱼尾巴图片
	for(var i = 0; i < 8; i ++) {
		babyTail[i] = new Image();
		babyTail[i].src = "img/babyTail" + i + ".png";
	}
	
	//小鱼眼睛图片
	for(var i = 0; i < 2;i ++) {
		babyEye[i] = new Image();
		babyEye[i].src = "img/babyEye" + i + ".png";
	}
	
	//小鱼身体图片
	for(var i = 0; i < 20; i ++) {
		babyBody[i] = new Image();
		babyBody[i].src = "img/babyFade" + i + ".png";
	}
	
	//大鱼尾巴图片
	for(var i = 0; i < 8; i ++) {
		momTail[i] = new Image();
		momTail[i].src = "img/bigTail" + i + ".png";
	}
	
	//大鱼眼睛图片
	for(var i = 0; i < 2;i ++) {
		momEye[i] = new Image();
		momEye[i].src = "img/bigEye" + i + ".png";
	}
	
	//创建数据信息对象
	data = new dataObj();
	
	//大鱼执行动画
	for(var i = 0; i < 8;i ++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = "img/bigSwimBlue" + i + ".png";
		momBodyOra[i].src = "img/bigSwim" + i + ".png";
	}
	
	//填充颜色
	ctx1.fillStyle = "white";
	ctx1.font = "30px Arial";
	
	//创建海葵摆动对象并初始化
	wave = new waveObj();
	wave.init();
	
	//创建大鱼喂小鱼对象并初始化
	halo = new haloObj();
	halo.init();
	
	//漂浮物变化
	for(var i = 0; i < 7; i ++) {
		dustPic[i] = new Image();
		dustPic[i].src = "img/dust" + i + ".png";
 	}
	
	//创建漂浮物对象并初始化
	dust = new dustObj();
	dust.init();
}

//游戏动画循环执行
function gameloop() {
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

//鼠标移动
function onMouseMove(e) {
	
	if(!data.gameOver) {
		if(e.offsetX || e.layerX) {
		mx = e.offsetX == 'undefined' ? e.layerX : e.offsetX;
		my = e.offsetY == 'undefined' ? e.layerY : e.offsetY;
		}
	}
}
