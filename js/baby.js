//定义小鱼对象
var babyObj = function(){
	this.x;  
	this.y;
	this.angel;
	this.babyBody = new Image();//小鱼身体图像
	this.babyTailTimer = 0;//小鱼尾巴摆动时间间隔
	this.babyTailCount = 0;//小鱼尾巴
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	this.babyBodyTimer = 0;//小鱼身体动画计数
	this.babyBodyCount = 0;//取得当前身体索引值
}

//初始化小鱼
babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.babyBody.src = "img/babyFade0.png";
	
}

//绘制小鱼
babyObj.prototype.draw = function() {
	//ctx1
	//趋近于x，y
	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.99);
	
	//Math.atan2(y,x)计算鼠标和鱼之间的角度差，从而算出大鱼和小鱼的距离
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//返回-PI到PI之间的数
	
	//让鱼的角度趋向于鼠标的角度
	this.angle = lerpAngle(beta,this.angle,0.7);
	
	//鱼尾动画计时
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	
	//小鱼眼睛变化
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		if(this.babyEyeCount == 0) {//0表示鱼闭着眼睛，此时调整间隔时间让鱼睁开眼睛的时间变长
			this.babyEyeInterval = Math.random() * 1500 + 2000;
			
		}else {
			this.babyEyeInterval = 200;
		}
	}
	
	//小鱼身体变化
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300) {
		this.babyBodyCount += 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19) {//
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
		}
	}
	
	//绘制小鱼
	ctx1.save();
	
	ctx1.translate(this.x,this.y);//偏移量
	ctx1.rotate(this.angle);//小鱼旋转
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5 + 23,-babyTail[babyTailCount].height*0.5);
	
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	ctx1.restore();
}
