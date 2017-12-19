//获取游戏主界面
var main = document.getElementById('main');
//获取开始游戏界面
var start = document.getElementById('start');
//获取开始游戏按钮
var start_btn = document.getElementById('start_btn');
//获取游戏中分数显示界面
var score = document.getElementById('score');
//获取游戏中分数界面
var label = document.getElementById('label');
//获取游戏暂停界面
var suspend = document.getElementById('suspend');
//获取游戏结束界面
var end = document.getElementById('end');
//获取游戏结束后的分数界面
var result = document.getElementById('result');
//初始化分数
var scores = 0;

//创建飞机类
function plane(hp, X, Y, width, height, score, deathtime, speed, boomimage, imagesrc) {
	this.planehp = hp;
	this.planeX = X;
	this.planeY = Y;
	this.planewidth = width;
	this.planeheight = height;
	this.planescore = score;
	this.planedeathtime = deathtime;
	this.planespeed = speed;
	this.planeboomimage = boomimage;
	this.imagenode = null;
	this.planeisdie = false;
	this.planedeathtimes = 0;

	//移动行为
	this.planemove = function() {
		if(scores <= 50000) {
			this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + "px";
		} else if(scores > 50000 && scores <= 100000) {
			this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 1 + "px";
		} else if(scores > 100000 && scores <= 150000) {
			this.imagenode.style.top = this.imagenode.offsetTop + this.planespeed + 2 + "px";
		}
	}
	this.init = function() {
		this.imagenode = document.createElement('img');
		this.imagenode.style.left = this.planeX + "px";
		this.imagenode.style.top = this.planeY + "px";
		this.imagenode.src = imagesrc;
		main.appendChild(this.imagenode);
	}
	this.init();
}

//点击开始游戏按钮事件
var set;
start_btn.onclick = function() {
	start.style.display = 'none';
	main.style.display = 'block';
}

//点击结束界面中的继续游戏按钮事件
function again() {
	location.reload(true);
}