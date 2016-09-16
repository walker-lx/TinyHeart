//判断鱼和果实的距离，如果足够近的话，则让鱼吃掉果实
function momFruitsCollision() {
	//游戏未结束时候
	if(!data.gameOver) {
		for(var i = 0; i < fruit.num; i ++) {
		if(fruit.alive[i]) {
			//计算距离，返回一个数的平方
			var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(l < 900) {
				fruit.dead(i);
				data.fruitNum++;
				mom.momBodyCount++;
				if(mom.momBodyCount > 7) {
					mom.momBodyCount = 7;
				}
				if(fruit.fruitType[i] == "blue") {
					data.double = 2;
				};
				wave.born(fruit.x[i],fruit.y[i]);//在运动的海葵上长出果实
				}
			}
		}
	}	
}

//大鱼喂果实给小鱼
function momBabyCollision() {
	if(data.fruitNum > 0 && !data.gameOver) {
		//计算距离，返回一个数的平方
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l < 900) {
			baby.babyBodyCount = 0;
			mom.momBodyCount = 0;
			//更新分数
			data.addScore();
			//产生圆圈
			halo.born(baby.x,baby.y);
		}
	}	
}