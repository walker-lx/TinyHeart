//定义海葵对象
var aneObj = function() {
	//绘制海葵动画（html5二次贝塞尔曲线），开始点，控制点，结束点(通过正弦函数控制海葵来回摆动)
	this.rootx = [];//海葵根部x坐标
	this.headx = [];//海葵头部x坐标
	this.heady = [];//海葵头部y坐标
	this.amp = [];//定义海葵摆动的幅度
	this.alpha = 0;//海葵摆动时间间隔变化
}
aneObj.prototype.num = 50;//海葵显示数量

//海葵初始化
aneObj.prototype.init = function(){	
	for(var i = 0; i < this.num; i ++) {
		this.rootx[i] = i*16 + Math.random()*20;//随机位置生成，每两个海葵之间的距离随进生成
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 220 + Math.random() * 50;//y坐标，左上角为（0，0）点，向下为正
		this.amp[i] = Math.random() * 50 + 30;//随机海葵摆动幅度随机变化
	}
}

//绘制海葵
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0007;//摆动时间随机变化
	var l = Math.sin(this.alpha);//正弦函数让海葵来回摆动
	
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";//线条结束时的形状为圆形
	ctx2.strokeStyle = "#3b154e";//线条颜色
	for(var i = 0; i < this.num; i ++) { //绘制每个海葵
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);//用贝塞尔曲线绘制海葵摆动动画
		ctx2.stroke();
	}
	ctx2.restore();
}
