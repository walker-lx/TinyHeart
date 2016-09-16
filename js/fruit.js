//果实对象
var fruitObj = function() {
	this.alive = [];//判断果实是否被吃掉
	this.x = [];//果实x坐标
	this.y = [];//果实y坐标
	this.aneNo = [];//记录产生果实的海葵id；
	this.l = [];//果实的大小
	this.spd = [];//果实的运动速度
	this.fruitType = [];//果实类型
	this.orange = new Image();//黄色果实
	this.blue = new Image();//蓝色果实
}

fruitObj.prototype.num = 30;

//初始化
fruitObj.prototype.init = function() {
	for(var i = 0; i < this.num; i ++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNo[i] = 0;
		this.fruitType[i] = "";
		this.spd[i] = Math.random() * 0.01 + 0.005;//每个果实运动的速度随机变化
	}
	this.orange.src = "img/fruit.png";
	this.blue.src = "img/blue.png";
}

//绘制果实
fruitObj.prototype.draw = function(){
	for(var i = 0;i<this.num;i++) {
		//在某个海葵身上画出果实
		if(this.alive[i] = true) {
			if(this.fruitType[i] == "blue") {
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}
			if(this.l[i] <= 13) { //果实成长
				var NO = this.aneNo[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime;
				ctx2.drawImage(pic,this.x[i] - this.l[i]*0.5,this.y[i] - this.l[i]*0.5,this.l[i],this.l[i]);
			} else {
				this.y[i] -= this.spd[i] * 7 * deltaTime;
				ctx2.drawImage(pic,this.x[i] - this.l[i]*0.5,this.y[i] - this.l[i]*0.5,this.l[i],this.l[i]);
		}
		if(this.y[i] < 10) {
			this.alive[i] = false;
			}
		}
	}
}

//随机生成果实的位置
fruitObj.prototype.born = function(i) {
	this.aneNo[i] = Math.floor(Math.random()*ane.num);;
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2) {
		this.fruitType[i] = "blue";
	} else {
		this.fruitType[i] = "orange";
	}
}

//果实消失
fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
}

//管理果实的数量
function fruitMonitor() {
	var num = 0;
	for(var i = 0;i<fruit.num;i++) {
		if(fruit.alive[i])  num++;
	}
	if(num < 15) {
		sendFruit();
		return ;
	}
}

//产生果实
function sendFruit() {
	for(var i = 0;i<fruit.num;i++) {
		if(!fruit.alive[i]) {
			fruit.born(i);
			return; 	
		}
	}
}

