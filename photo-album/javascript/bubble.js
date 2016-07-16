// JavaScript Document
function bubbleCanvas(){
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.bubbles = [];
	this.initBubbles();
	canvasBubble = this;
	drawBubbles();
}
bubbleCanvas.prototype.initBubbles = function(){
	canvas.width = this.width;
	canvas.height = this.height;
	var num = parseInt(this.width)*0.1;
	for(var i = 0; i < num;i++){
		var bubbleAttr = {};
		bubbleAttr.x = this.width*Math.random();
		bubbleAttr.y = this.height*Math.random() + this.height;			
		bubbleAttr.r = 10 * Math.random()+10;	
		bubbleAttr.a = Math.ceil(Math.random()*255);
		bubbleAttr.b = Math.ceil(Math.random()*255);
		bubbleAttr.c = Math.ceil(Math.random()*255);	
		bubbleAttr.o = 0.3+Math.random()*0.5;
		bubbleAttr.v =2+4* Math.random();		
		this.bubbles.push(bubbleAttr);
	}
}

drawBubbles = function(){
	var bubble = canvasBubble.bubbles;
	ctx.clearRect(0,0,canvasBubble.width,canvasBubble.height);
	for(var i in bubble){
		bubble[i].y -= bubble[i].v;
		ctx.beginPath();
		ctx.arc(bubble[i].x, bubble[i].y, bubble[i].r, 0,2*Math.PI);
		ctx.fillStyle = "rgba("+bubble[i].a+","+bubble[i].b+","+bubble[i].c+","+ bubble[i].o +")";
		ctx.fill();
		ctx.closePath();
	}
	cancelAnimationFrame(idTimer);
	idTimer = requestAnimationFrame(drawBubbles);
}

function resize(){
	 canvasBubble.width = window.innerWidth;
	 canvasBubble.height = window.innerHeight;
	 new bubbleCanvas();
}

window.addEventListener("resize", resize);

var canvas = document.getElementById("bubble");
var ctx = canvas.getContext("2d");
var canvasBubble;
var idTimer = 0;
new bubbleCanvas();
