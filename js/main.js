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
var mark = 0;




//点击开始游戏按钮事件
start_btn.onclick=function  () {
	start.style.display='none';
	main.style.display='block';
}