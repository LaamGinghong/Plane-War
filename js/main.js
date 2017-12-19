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
var selfplane = new ourplane(125, 410);
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

//暂停事件
var number = 0;
var zanting = function() {
	if(number == 0) {
		suspend.css('display', 'block');
		if($(document).unbind) {
			main.unbind('mousemove', move, true);
			body.unbind('mousemove', border, true);
		} else if(document.detachEvent) {
			main.detachEvent('onmousemove', move);
			body.detachEvent('onmousemove', border);
		}
		clearInterval(set);
		number = 1;
	} else {
		suspend.css('display', 'none');
		if(document.addEventListener) {
			main.addEventListener('mousemove', move, true);
			body.addEventListener('mousemove', border, true);
		} else if(document.attachEvent) {
			main.attachEvent('onmousemove', move);
			body.attachEvent('onmousemove', border);
		}
		set = setInterval(start, 20);
		number = 0;
	}
}

//判断奔放飞机是否移出边界，如果移出边界，则取消mousemove事件，反之加上mousemove事件
var border = function() {
	var oevent = window.event || arguments[0];
	var bodyobjx = oevent.clientX;
	var bodyobjy = oevent.clientY;
	if(bodyobjx < 0 || bodyobjx > 320 || bodyobjy < 0 || bodyobjy > 568) {
		if(document.removeEventListener) {
			main.removeEventListener('mousemove', move, true);
		} else if(document.detachEvent) {
			main.detachEvent('onmousemove', move);
		}
	} else {
		if(document.addEventListener) {
			main.addEventListener('mousemove', move, true);
		} else if(document.attachEvent) {
			main.attachEvent('onmousemove', move);
		}
	}
}
//暂停界面重新开始事件
var body = $('body').eq(0);
if(document.addEventListener) {
	main.addEventListener('mousemove', move, true);
	selfplane.imagenode.addEventListener('click', zanting, true);
	body.addEventListener('mousemove', border, true);
	$('#suspend button').eq(0).addEventListener('click', zanting, true);
	$('#suspend button').eq(2).addEventListener('click', again, true);
} else if(document.attachEvent) {
	main.attachEvent('onmousemove', move);
	selfplane.imagenode.attachEvent('onclick', zanting);
	body.attachEvent('onmousemove', border);
	$('#suspend button').eq(0).attachEvent('onclick', zanting);
	$('#suspend button').eq(2).attachEvent('click', again, true);
}
//初始化隐藏本方飞机
$(selfplane.imagenode).css('display', 'none');

//敌方飞机数组
var enemys = [];

//子弹对象数组
var bullets = [];
var mark1 = 0;
var mark2 = 0;
var backgroundPositionY = 0;

//开始函数
function start() {
	$(main).css(backgroundPositionY, backgroundPositionY + "px");
	backgroundPositionY += 0.5;
	if(backgroundPositionY == 568) {
		backgroundPositionY = 0;
	}
	mark1++;

	//创建敌方飞机
	if(mark1 == 20) {
		mark2++;
		//中飞机
		if(mark2 % 5 == 0) {
			enemys.push(new enemyplane(6, 25, 274, 46, 60, 5000, 360, random(1, 3), "img/中飞机爆炸.gif", 'img/enemy3_fly_1.png'));
		}
		//打飞机
		if(mark2 == 20) {
			enemys.push(new enemyplane(12, 57, 210, 110, 164, 30000, 540, 1, 'img/大飞机爆炸.gif', 'img/enemy2_fly_1.png'));
			mark2 = 0;
		}
		//小飞机
		else {
			enemys.push(new enemyplane(1, 19, 286, 34, 24, 1000, 360, random(1, 4), 'img/小飞机爆炸.gif', 'img/enemy1_fly_1.png'));
		}
		mark1 = 0;
	}

	//移动敌方飞机
	var enemyslen = enemys.length;
	for(var i = 0; i < enemyslen; i++) {
		if(enemys[i].planeisdie != true) {
			enemys[i].planemove();
		}

		//如果敌机超出边界，则删除敌机
		if(enemys[i].imagenode.offsetTop > 568) {
			main.children(enemys[i].imagenode).remove();
			enemys.splice(i, 1);
			enemyslen--;
		}
		//如果敌机死亡标记为true时，经过一段时间后清除敌机
		if(enemys[i].planeisdie == true) {
			enemys[i].planedeathtimes += 20;
			if(enemys[i].planedeathtimes == enemys[i].planedeathtime) {
				main.children(enemys[i].imagenode).remove();
				enemys.splice(i, 1);
				enemyslen--;
			}
		}
	}

	//创建子弹
	if(mark1 % 5 == 0) {
		bullets.push(new fire(parseInt($(selfplane.imagenode).css('left')) + 31, parseInt($(selfplane.imagenode).css('top')) - 10));
	}

	//移动子弹
	var bulletslen = bullets.length;
	for(var i = 0; i < bulletslen; i++) {
		bullets[i].bulletmove();

		//如果子弹超出边界，则删除子弹
		if(bullets[i].bulletimage.offsetTop < 0) {
			main.children(bullets[i].bulletimage).remove();
			bullets.splice(i, 1);
			bulletslen--;
		}
	}

	//碰撞判断
	for(var k = 0; k < bulletslen; k++) {
		for(var j = 0; j < enemyslen; j++) {

			//判断碰撞本方飞机
			if(enemys[j].planeisdie == false) {
				if(enemys[j].imagenode.offsetLeft + enemys[j].plansizeX >= selfplan.imagenode.offsetLeft && enemys[j].imagenode.offsetLeft <= selfplan.imagenode.offsetLeft + selfplan.plansizeX) {
					if(enemys[j].imagenode.offsetTop + enemys[j].plansizeY >= selfplan.imagenode.offsetTop + 40 && enemys[j].imagenode.offsetTop <= selfplan.imagenode.offsetTop - 20 + selfplan.plansizeY) {
						selfplane.imagenode.src='img/本方飞机爆炸.gif';
						$(end).css('display','block');
					}
				}
			}
		}
	}
}

//开始游戏点击事件
var start_btn = $('#start_btn');

var set;
start_btn.click(function() {
	start.css('display', 'none');
	main.css('display', 'block');
	score.css('display', 'block');
	$(selfplane.imagenode).css('display', 'block');
	set = setInterval(start, 20);
});