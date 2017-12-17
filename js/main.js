//获取游戏主界面
var main = $('#main');
//获取开始游戏界面
var start = $('#start');
//获取游戏中分数显示界面
var score = $('#score');
//获取游戏中分数界面
var label = $('#label');
//获取游戏暂停界面
var suspend = $('#suspend');
//获取游戏结束界面
var end = $('#end');
//获取游戏结束后的分数界面
var result = $('#result');
//初始化分数
var mark = 0;

//开始游戏点击事件
var start_btn = $('#start_btn');
start_btn.click(function() {
	start.css('display', 'none');
	main.css('display', 'block');
	score.css('display', 'block');
	$(selfplane.imagenode).css('display','block');
	
});

//创建飞机类
function plane(hp, X, Y, sizeX, sizeY, mark, deathtime, speed, boomimage, imagesrc) {
	this.planeX = X;
	this.planeY = Y;
	this.planehp = hp;
	this.planesizeX = sizeX;
	this.planesizeY = sizeY;
	this.planemark = mark;
	this.planedeathtime = deathtime;
	this.planespeed = speed;
	this.planeboomimage = boomimage;
	this.planedeathtimes = 0;
	this.planeisdie = false;
	this.imagenode = null;

	//移动行为
	this.planemove = function() {
		if(mark <= 50000) {
			$(this.imagenode).css('top', this.imagenode.offsetTop + this.planespeed + "px");
		} else if(mark > 50000 && mark <= 100000) {
			$(this.imagenode).css('top', this.imagenode.offsetTop + this.planespeed + 1 + "px");
		} else if(mark > 100000 && mark <= 150000) {
			$(this.imagenode).css('top', this.imagenode.offsetTop + this.planespeed + 2 + "px");
		}
	}
	this.init = function() {
		this.imagenode = $('<img />');
		$(this.imagenode).css('left', this.planeX + "px");
		$(this.imagenode).css('top', this.planeY + "px");
		$(this.imagenode).attr('src', imagesrc);
		main.append(this.imagenode);
	}
	this.init();
}

//创建本方飞机类
function ourplane(X, Y) {
	var imagesrc = "img/我的飞机.gif";
	plane.call(this, 1, X, Y, 66, 80, 0, 660, 0, "image/本方飞机爆炸/gif", imagesrc);
	$(this.imagenode).attr('id', 'ourplane');
}

//创建本方飞机
var selfplane=new ourplane(125,410);
//移动事件
var ourPlane = $('#ourplane');
var move = function() {
	var oevent = window.event || arguments[0];
	var begin = oevent.srcElement || oevent.target;
	var selfplaneX = oevent.clientX;
	var selfplaneY = oevent.clientY;
	ourPlane.css('left', selfplaneX - selfplane.planesizeX / 2 + "px");
	ourPlane.css('top', selfplaneY - selfplane.planesizeY / 2 + "px");
}
//创建敌方飞机
function enemyplane(hp, a, b, sizeX, sizeY, mark, deathtime, speed, boomimage, imagesrc) {
	plane.call(this, hp, random(a, b), -100, sizeX, sizeY, mark, deathtime, speed, boomimage, imagesrc);
}

//产生min和max之间的随机数
function random(min, max) {
	return Math.floor(min + random() * (max - min));
}

//创建子单类
function bullet(X, Y, sizeX, sizeY, imagesrc) {
	this.bulletX = X;
	this.bulletY = Y;
	this.bulletsizeX = sizeX;
	this.bulletsizeY = sizeY;
	this.bulletimage = null;
	this.bulletattach = 1;

	//移动行为
	this.bulletmove = function() {
		$(this.bulletimage).css('top', this.bulletimage.offsetTop - 20 + "px");
	}
	this.init = function() {
		this.bulletimage = $('<img />');
		$(this.bulletimage).css('left', this.bulletX + "px");
		$(this.bulletimage).css('top', this.bulletY + "px");
		$(this.bulletimage).attr('src', imagesrc);
		main.append(this.bulletimage);
	}
	this.init();
}

//创建子弹发射
function fire(X, Y) {
	bullet.call(this, X, Y, 6, 14, "img/bullet1.png");
}