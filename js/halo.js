//吃到果实时产生的圆圈
var haloObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];//圆圈半径
}

haloObj.prototype.num = 5;

haloObj.prototype.init = function() {
	for(var i = 0; i<this.num; i++) {
		this.x[i] = 0;
		this.y[i] = 0;
		this.r[i] = 0;
		this.alive[i] = false;
	}
}

//绘制圆圈
haloObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;//阴影效果
	ctx1.shadowColor = "rgba(203,91,0,1)";//阴影颜色和透明度
	for(var i = 0; i<this.num; i++) {
		if(this.alive[i]) {
			//draw
			this.r[i] += deltaTime * 0.05;
			if(this.r[i] > 70) {
				this.alive[i] = false;
				break;
			};
			var alpha = 1 - this.r[i] / 70;
			//draw
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(203,91,0," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}

//产生圆圈
haloObj.prototype.born = function(x,y) {
	for(var i = 0; i<this.num; i++) {
		if(!this.alive[i]) {
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] =10;
			this.alive[i] = true;
		}
	}
}



















































