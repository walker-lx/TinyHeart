//大鱼对象
var momObj = function() {
	this.x;
	this.y;
	this.angel;
	this.momTailCount = 0;
	this.momTailTimer = 0;
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	this.momBodyCount = 0;
}

momObj.prototype.init = function() {
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

//绘制大鱼
momObj.prototype.draw = function() {
	//让鱼跟随鼠标移动，lerpDistance(mx,this.x,0.9)函数为一个接近函数，最后一个参数为接近的百分比
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.99);
	//tail
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}
	
	//eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		if(this.momEyeCount == 0) {//1表示鱼闭着眼睛，此时让鱼睁开眼睛的时间变长
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}else {
			this.momEyeInterval = 200;
		}
	}
	
	//Math.atan2(y,x)计算鼠标和鱼之间的角度差
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//返回-PI到PI之间的数
	//让鱼的角度趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.7);
	ctx1.save();
	//获取鼠标的位置
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5 + 30,-momTail[momTailCount].height * 0.5);
	var momBodyCount = this.momBodyCount;
	if(data.double == 1) {//orange
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width * 0.5,-momBodyOra[momBodyCount].height * 0.5);
	} else {
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width * 0.5,-momBodyBlue[momBodyCount].height * 0.5);
	}
	
	var momEyeCount = this.momEyeCount
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width * 0.5,-momEye[momEyeCount].height * 0.5);
	ctx1.restore();
}
