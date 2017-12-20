//获取整个body界面
var body = document.getElementsByTagName('body')[0];
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

//创建子弹类
function bullet(X, Y, width, height, imagesrc) {
	this.bulletX = X;
	this.bulletY = Y;
	this.bulletimage = null;
	this.bulletattach = 1;
	this.bulletwidth = width;
	this.bulletheight = height;

	//移动行为
	this.bulletmove = function() {
		this.bulletimage.style.top = this.bulletimage.offsetTop - 20 + 'px';
	}
	this.init = function() {
		this.bulletimage = document.createElement('img');
		this.bulletimage.style.left = this.bulletX + "px";
		this.bulletimage.style.top = this.bulletY + "px";
		this.bulletimage.src = imagesrc;
		main.appendChild(this.bulletimage);
	}
	this.init();
}

//创建单行子弹类
function fire(X, Y) {
	bullet.call(this, X, Y, 6, 14, 'img/bullet1.png');
}

//创建敌方飞机类
function enemy(hp, a, b, width, height, score, deathtime, speed, boomimage, imagesrc) {
	plane.call(this, hp, random(a, b), -200, width, height, score, deathtime, speed, boomimage, imagesrc);
}

//产生min到max之间的随机数
function random(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

//创建本方飞机类
function ourplane(X, Y) {
	var imagesrc = 'img/我的飞机.gif';
	plane.call(this, 1, X, Y, 66, 80, 0, 660, 0, 'img/本方飞机爆炸.gif', imagesrc);
	this.imagenode.setAttribute('id', 'ourplane');
}

//创建本方飞机
var selfplane = new ourplane(125, 450);

//移动事件
var ourPlane = document.getElementById('ourplane');
var move = function() {
	var oevent = window.event || arguments[0];
	var go = oevent.srcElement || oevent.target;
	var selfplaneX = oevent.clientX;
	var selfplaneY = oevent.clientY;
	ourPlane.style.left = selfplaneX - selfplane.planewidth / 2 + "px";
	ourPlane.style.top = selfplaneY - selfplane.planeheight / 2 + "px";
}

//暂停事件
var number = 0;
var zanting = function() {
	if(number == 0) {
		suspend.style.display = 'block';
		if(document.removeEventListener) {
			main.removeEventListener('mousemove', move, true);
			body.removeEventListener('mousemove', border, true);
		} else if(document.detachEvent) {
			main.detachEvent('onmousemove', move);
			body.detachEvent('onmousemove', border);
		}
		clearInterval(set);
		number = 1;
	} else {
		suspend.style.display = 'none';
		if(document.addEventListener) {
			main.addEventListener('mousemove', move, true);
			body.addEventListener('mousemove', border, true);
		} else if(document.attachEvent) {
			main.attachEvent('onmousemove', move);
			body.attachEvent('onmousemove', border);
		}
		set = setInterval(begin, 40);
		number = 0;
	}
}

//判断本方飞机是否飞出边界，如果飞出边界，则移除mousemove事件，反之加上mousemove事件
var border = function() {
	var oevent = window.event || arguments[0];
	var bodyobjX = oevent.clientX;
	var bodyobjY = oevent.clientY;
	if(bodyobjX < 0 || bodyobjX > 320 || bodyobjY < 0 || bodyobjY > 568) {
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

//暂停界面按钮事件
if(document.addEventListener) {
	main.addEventListener('mousemove', move, true);
	selfplane.imagenode.addEventListener('click', zanting, true);
	body.addEventListener('mousemove', border, true);
	suspend.getElementsByTagName('button')[0].addEventListener('click', zanting, true);
	suspend.getElementsByTagName('button')[2].addEventListener('click', again, true);
} else if(document.attachEvent) {
	main.attachEvent('onmousemove', move);
	selfplane.imagenode.attachEvent('onclick', zanting);
	body.attachEvent('onmousemove', border);
	suspend.getElementsByTagName('button')[0].attachEvent('onclick', zanting);
	suspend.getElementsByTagName('button')[2].attachEvent('onclick', again);
}

//初始化隐藏本方飞机
selfplane.imagenode.style.display = "none";

//敌机对象数组
var enemys = [];

//子弹对象数组
var bullets = [];
var mark = 0;
var mark1 = 0;
var backgroundPositionY = 0;

//开始函数
function begin() {
	main.style.backgroundPositionY = backgroundPositionY + "px";
	backgroundPositionY += 0.5;
	if(backgroundPositionY == 568) {
		backgroundPositionY = 0;
	}
	mark++;

	//创建敌方飞机
	if(mark == 20) {
		mark1++;
		//中飞机
		if(mark1 % 5 == 0) {
			enemys.push(new enemy(6, 30, 290, 46, 60, 50, 360, random(1, 3), 'img/中飞机爆炸.gif', 'img/enemy3_fly_1.png'))
		}
		//大飞机
		if(mark1 == 20) {
			enemys.push(new enemy(12, 60, 260, 110, 164, 100, 540, 1, 'img/大飞机爆炸.gif', 'img/enemy2_fly_1.png'));
		} else {
			enemys.push(new enemy(1, 10, 300, 34, 24, 10, 360, random(1, 6), 'img/小飞机爆炸.gif', 'img/enemy1_fly_1.png'));
		}
		mark = 0;
	}

	//移动敌方飞机
	var enemyslen = enemys.length;
	for(var i = 0; i < enemyslen; i++) {
		if(enemys[i].planeisdie != true) {
			enemys[i].planemove();
		}

		//如果敌方飞机超出边界，则删除敌机
		if(enemys[i].imagenode.offsetTop > 568) {
			main.removeChild(enemys[i].imagenode);
			enemys.splice(i, 1);
			enemyslen--;
		}
		//当敌方飞机死亡时，经过一段时间后清除敌机
		if(enemys[i].planeisdie == true) {
			enemys[i].planedeathtimes += 20;
			if(enemys[i].planedeathtimes == enemys[i].planedeathtime) {
				main.removeChild(enemys[i].imagenode);
				enemys.splice(i, 1);
				enemyslen--;
			}
		}
	}

	//创建子弹
	if(mark % 2 == 0) {
		bullets.push(new fire(parseInt(selfplane.imagenode.style.left) + 31, parseInt(selfplane.imagenode.style.top) - 10));
	}

	//移动子弹
	var bulletslen = bullets.length;
	for(var i = 0; i < bulletslen; i++) {
		bullets[i].bulletmove();

		//如果子弹超出边界，则删除子弹
		if(bullets[i].bulletimage.offsetTop < 0) {
			main.removeChild(bullets[i].bulletimage);
			bullets.splice(i, 1);
			bulletslen--;
		}
	}

	//碰撞判断
	for(var k = 0; k < bulletslen; k++) {
		for(var j = 0; j < enemyslen; j++) {
			//判断碰撞本方飞机
			if(enemys[j].planeisdie == false) {
				if(enemys[j].imagenode.offsetLeft + enemys[j].planewidth >= selfplane.imagenode.offsetLeft && enemys[j].imagenode.offsetLeft <= selfplane.imagenode.offsetLeft + selfplane.planewidth) {
					if(enemys[j].imagenode.offsetTop + enemys[j].planeheight >= selfplane.imagenode.offsetTop + 40 && enemys[j].imagenode.offsetTop <= selfplane.imagenode.offsetTop - 20 + selfplane.planeheight) {
						//碰撞本方飞机，游戏结束，统计分数
						selfplane.imagenode.src = "img/本方飞机爆炸.gif";
						end.style.display = 'block';
						result.innerHTML = scores;
						if(document.removeEventListener) {
							main.removeEventListener('mousemove', move, true);
							body.removeEventListener('mousemove', border, true);
						} else if(document.detachEvent) {
							main.detachEvent('onmousemove', move);
							body.detachEvent('onmousemove', border);
						}
						clearInterval(set);
					}
				}
			}

			//判断子弹与敌机碰撞
			if(bullets[k].bulletimage.offsetLeft + bullets[k].bulletwidth > enemys[j].imagenode.offsetLeft && bullets[k].bulletimage.offsetLeft < enemys[j].imagenode.offsetLeft + enemys[j].planewidth) {
				if (bullets[k].bulletimage.offsetTop<=enemys[j].imagenode.offsetTop+enemys[j].planeheight&&bullets[k].bulletimage.offsetTop+bullets[k].bulletheight>=enemys[j].imagenode.offsetTop) {
					//敌机血量等于收到的子弹攻击力
					enemys[j].planehp=enemys[j].planehp-bullets[k].bulletattach;
					//当敌机血量为0，低级图片还为爆炸图片，死亡标记为true,计算得分
					if (enemys[j].planehp==0) {
						scores=scores+enemys[j].planescore;
						label.innerHTML=scores;
						enemys[j].imagenode.src=enemys[j].planeboomimage;
						enemys[j].planeisdie=true;
					}
					//删除子弹
					main.removeChild(bullets[k].bulletimage);
					bullets.splice(k,1);
					bulletslen--;
					break;
				}
			}
		}
	}
}
//点击开始游戏按钮事件
var set;
start_btn.onclick = function() {
	start.style.display = 'none';
	main.style.display = 'block';
	selfplane.imagenode.style.display = 'block';
	set = setInterval(begin, 40);
}

//点击结束界面中的继续游戏按钮事件
function again() {
	location.reload(true);
}