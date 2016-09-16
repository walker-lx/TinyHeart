//漂浮物对象
var dustObj = function() {
	this.x = [];
	this.y = [];
	this.NO = [];//索引值
	this.amp = [];//变化值
	this.alpha;
}

dustObj.prototype.num = 30;//数量

dustObj.prototype.init = function() {
	for(var i = 0; i < this.num; i ++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 15;
		this.NO[i] = Math.floor(Math.random() * 7);
	}
	this.alpha = 0;
}

//绘制漂浮物
dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0007;
	var l = Math.sin(this.alpha);
	for(var i = 0; i < this.num; i ++) {
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no],this.x[i] + this.amp[i] * l,this.y[i]);
	}
}
