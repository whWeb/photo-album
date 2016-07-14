// JavaScript Document
(function(window){
	'use strict';
	
	window.WhAlbum = WhAlbum; //�ⲿ����
	
	function WhAlbum() {

        // ���ֵ�ö������
        this.LAYOUT = {
            PUZZLE: 1,    // ƴͼ����
            WATERFALL: 2, // �ٲ�����
            BARREL: 3     // ľͰ����
        };
	}
	//ȫ�ֱ���
	var g_option = {};
	window.g_option = g_option;
	//����
	WhAlbum.prototype.setImage = function (image, option) {
		if (typeof image === 'string') {
		 	// ��װ�����鴦��
			 this.setImage([image]);
			 return;
		}
		extend(g_option, option);
		
		var style =  document.querySelector("#style");
		var column =  document.querySelector("#column");
		var margin =  document.querySelector("#margin");
		var width =  document.querySelector("#width");
		var minHeight = document.querySelector("#minHeight");
		var that = this;
		/*�л�����*/
	    width.onchange = margin.onchange = minHeight.onchange =
		style.onchange = function(){
			var index=this.selectedIndex; 
			if(index != undefined)
				var val = this.options[index].text;
			var dele = null;
			switch( that.getLayout()){
				case 1:
					dele = document.querySelector("#puzzel");
					break;
				case 2:
					dele = document.querySelector("#waterFall");
					g_option.clolumNum = null;
					if(!val)
						g_option.clolumNum = column.value;
					break;				
				case 3:
					dele = document.querySelector("#barrel");				
					break;				
			}
			deleChild(dele);
			g_option.margin = margin.value;
			g_option.width = width.value;
			g_option.berrelImgBoxes = [];
			g_option.berrelRowIfm = [];
			g_option.berrelRows = [];
			g_option.minHeight = minHeight.value;
			if(val){
				if(val == "Puzzle")
					g_option.layout = "PUZZLE";
				else if(val == "WaterFall"){
					g_option.layout = "WATERFALL";	
					g_option.clolumNum = column.value;
				}
				else{
					g_option.layout = "BARREL";
				}
			}
			that.setLayout();	
			g_option.isLayout = true;
					/*�ı��ٲ���������*/
			column.onchange = function(){
				dele = document.querySelector("#waterFall");
				deleChild(dele);
				g_option.clolumNum = column.value;
				that.setImage();
			}
		}
		
		this.setLayout();
		g_option.isLayout = true;
	}
	/*���ͼƬ*/
	WhAlbum.prototype.addImage = function(){
		var add = document.querySelector('#add');
		var that = this;
			add.onclick = function() {
				var len = that.photos.length;
				var randy = getRandyPic(len);
				g_option.images.push(that.photos[randy]);
				
				var src = document.querySelector('#addSrc');
				src.value = "images/" + that.photos[randy].src + ".jpg";
				
				g_option.isLayout = false;
				var dele = null;
				switch( that.getLayout()){
					case 1:
						dele = document.querySelector("#puzzel");
						deleChild(dele);
						that.addImage();
						break;
					case 2:
						that.setBoxToWaterFall(that.photos[randy]);
						break;				
					case 3:
						dele = document.querySelector("#barrel");
						that.setBoxToBarrel(that.photos[randy]);
						g_option.berrelImgBoxes = g_option.berrelImgTmpBoxes;
						break;				
				}
			}
		if(!g_option.isLayout)
			this.setLayout();
	}
	/*ɾ��ͼƬ*/
	WhAlbum.prototype.removeImage = function(){
		var remove = document.querySelector('#remove');
		var that = this;
			remove.onclick = function(){
				var dele = null;
				switch( that.getLayout()){
					case 1:
						dele = document.querySelector("#puzzel");
						break;
					case 2:
						dele = document.querySelector("#waterFall");
						break;				
					case 3:
						dele = document.querySelector("#barrel");
						g_option.berrelRowIfm = [];
						g_option.berrelRows = [];	
						g_option.berrelImgBoxes = [];
						break;
				}
					deleChild(dele);
					var randy = getRandyPic(g_option.images.length);
					var src = document.querySelector('#removeSrc');
					src.value = "images/" + g_option.images[randy].src + ".jpg";					
					g_option.images.splice(randy,1);
					g_option.isLayout = false;
					that.addImage();
			}
	}
	/*ʵ�ֲ���*/
	WhAlbum.prototype.setLayout = function(){
		var index = this.getLayout();
		switch(index){
			case 1:
				this.setPuzzle();
				break;
			case 2:
				this.setWaterFall();
				break;
			case 3:
				this.setBarrel();
				break;
		}
	}
	/*��õ�ǰ��������*/
	WhAlbum.prototype.getLayout = function(){
		return this.LAYOUT[g_option.layout];
	}
	/*ʵ��ƴͼ����*/
	WhAlbum.prototype.setPuzzle = function(){
		var parent = document.querySelector('#puzzel');
		parent.style.width = g_option.width;
		var len = g_option.images.length;
		switch(len){
			case 1:
				var Div = creatDivElement('photoBox photoContainer-1');
				parent.appendChild(Div);
				addImgToParent(g_option.images,len,Div);
				break;
			case 2:
				var Div = creatDivElement('photoBox photoContainer-2');
				parent.appendChild(Div);
				addImgToParent(g_option.images,len,Div);				
				break;			
			case 3:
				var Div = creatDivElement('photoBox photoContainer-3');
				parent.appendChild(Div);
				var boxes = addImgToParent(g_option.images,len,Div);
				resize(Div,3);
				break;
			case 4:
				var Div = creatDivElement('photoBox photoContainer-4');
				parent.appendChild(Div);
				addImgToParent(g_option.images,len,Div);
				break;
			case 5:
				var Div = creatDivElement('photoBox photoContainer-5');
				parent.appendChild(Div);
				var boxes = addImgToParent(g_option.images,len,Div);
				resize(Div,5);
				break;			
			case 6:
				var Div = creatDivElement('photoBox photoContainer-6');
				parent.appendChild(Div);
				addImgToParent(g_option.images,len,Div);
				break;
			default:
				var beg = 0;
				var tmp = len;
				while(tmp >= 6){
					var Div = creatDivElement('photoBox photoContainer-6');
					parent.appendChild(Div);
					addImgToParent(g_option.images.slice(beg,beg+6),6,Div);	
					beg = beg + 6;					
					tmp = tmp -6;
				}
					var i = len - beg;
					var className = 'photoBox photoContainer-'+ i ;
					var Div = creatDivElement(className);
					parent.appendChild(Div);
					addImgToParent(g_option.images.slice(beg,len),len - beg,Div);	
		}	
	}
	/*ʵ���ٲ�����*/
	WhAlbum.prototype.setWaterFall = function(){
		var parent = document.querySelector("#waterFall");
		parent.style.width = g_option.width;
		g_option.colums = [];
		for(var i = 0; i < g_option.clolumNum;i++){
			var Div = creatDivElement("waterfallColum");			
			g_option.colums.push(Div);
			parent.appendChild(Div);
		}
		this.setBoxToWaterFall(g_option.images,parent);
	}	
	/*Ϊ�ٲ��������ͼƬ��1��������*/
	WhAlbum.prototype.setBoxToWaterFall = function(images,parent){
		var bool = images instanceof Array;
		if (!bool) {
		 	// ��װ�����鴦��
			this.setBoxToWaterFall([images]);
			return;
		}
		var len = images.length;
		for(var i = 0; i < len;i++){
			var index = minHeightColum();
			var Img = creatImgElement(images[i], i);
			Img.style.width = g_option.colums[index].clientWidth - g_option.margin*2 + 'px';
			Img.style.margin = g_option.margin;
			g_option.colums[index].appendChild(Img);
		}		
	}
	/*ʵ��ľͰ����*/
	WhAlbum.prototype.setBarrel = function(){
		this.barrelImgBox(g_option.images);
		var rowNum = this.calBarrelRowNum();
		this.addBarrelRow(rowNum);
		this.addBarrelRowEle();
	}
	
	WhAlbum.prototype.barrelImgBox = function(photos){
		var bool = photos instanceof Array;
		if (!bool) {
		 	// ��װ�����鴦��
			this.barrelImgBox([photos]);
			return;
		}		
		for(var i = 0; i < photos.length;i++){
			g_option.berrelImgBoxes.push(creatImgElement(photos[i],i));	
		}	
	}
	
	WhAlbum.prototype.calBarrelRowNum = function(){
		var len = g_option.berrelImgBoxes.length;
		var height = parseInt(g_option.minHeight);
		var width = 0;
		var totalWidth = 0;
		var finalRatio,finalHeight;
		var margin = parseInt(g_option.margin);
		var count = 0;
		var container = document.querySelector("#barrel");
		container.style.width = g_option.width;
		for(var i = 0; i < len;i++){
			g_option.berrelImgBoxes[i].style.height = height + 'px';
			g_option.berrelImgBoxes[i].style.width = g_option.berrelImgBoxes[i].ratio * height + 'px';
			width += g_option.berrelImgBoxes[i].ratio * height + margin;
			if(width > container.clientWidth){
				count++;
				totalWidth = width - g_option.berrelImgBoxes[i].ratio * height - margin;
				finalRatio =  height/totalWidth;
				finalHeight = container.clientWidth*finalRatio;
				g_option.berrelRowIfm.push({end:i-1,finalHeight:finalHeight,width:totalWidth});  /*����i-1*/
				width = g_option.berrelImgBoxes[i].ratio * height;
			}
		}
		g_option.berrelRowIfm.push({end:i-1,finalHeight:height,width:width});
		return ++count;
	}
	
	WhAlbum.prototype.addBarrelRow = function(num){
		var container = document.querySelector("#barrel");
		for(var i = 0; i < num;i++){
			var Div = creatDivElement('berrelWallRow');
			Div.style.height = g_option.berrelRowIfm[i].finalHeight + 'px';
			Div.style.marginTop = parseInt(g_option.margin) + 'px';
			g_option.berrelRows.push(Div);
			container.appendChild(Div);
		}
	}

	WhAlbum.prototype.addBarrelRowEle = function(){
		var len = g_option.berrelRowIfm[g_option.berrelRowIfm.length-1].end;
		var index = 0;
		for(var i = 0; i <= len;i++){
			if(i > g_option.berrelRowIfm[index].end) index++;
			g_option.berrelImgBoxes[i].style.height = "100%";
			g_option.berrelImgBoxes[i].style.width = g_option.berrelRowIfm[index].finalHeight * g_option.berrelImgBoxes[i].ratio + 'px';
			g_option.berrelRows[index].appendChild(g_option.berrelImgBoxes[i]);
		}
	}
	
	WhAlbum.prototype.setBoxToBarrel = function(ele){
		 var len = g_option.berrelRowIfm.length;
		 var lastRowWidth = g_option.berrelRowIfm[len-1].width;
		 var container = document.querySelector("#barrel");
		 var count = 0;
		 g_option.berrelRowIfm = [];
		 g_option.berrelRows = [];
		 g_option.berrelImgTmpBoxes = g_option.berrelImgBoxes;
		 g_option.berrelImgBoxes = [];
		 if(lastRowWidth < container.clientWidth){
			 count  = container.lastChild.childNodes.length;
			 for(var i = 0; i < count;i++)
				 g_option.berrelImgBoxes.push(container.lastChild.childNodes[i]);
				 container.removeChild(container.lastChild);
			 }
			 g_option.berrelImgBoxes.push(creatImgElement(ele,count));
		var rowNum = this.calBarrelRowNum();
		this.addBarrelRow(rowNum);
		this.addBarrelRowEle();
	}
//���Ӻ���

	/*ʵ�����Ը���*/
	function extend(obj1,obj2){
		for(var attr in obj2){                  
			obj1[attr] = obj2[attr];
		}
	}
	/*����DivԪ��*/
	function creatDivElement(className){
		var Div = document.createElement("div");
		if(g_option.clolumNum)
			Div.style.width = (100/g_option.clolumNum) + "%";
		Div.className = className;
		return Div;
	}
	/*����bHeight bool �� ȷ���Ƿ�����ٲ�����ͼƬ����߶�*/
	function creatImgElement(photo, index){
		var Img = document.createElement("img");
		Img.src = "images/" + photo.src+ ".jpg";
		if(Img.index==undefined)
			Img.index = index;
		switch(whAlbum.getLayout()){
			case 1:break;
			case 2:
				Img.style.height = chooseHeight();
				break;
			case 3:
				Img.ratio =  photo.width/photo.height;
				Img.style.marginLeft = g_option.margin + 'px';
				break;
		}
		Img.title = photo.title;
		return Img;
	}
	/*���ͼƬ����Ӧ����*/
	function addImgToParent(photos,length,parent){
		var boxes = [];
		for(var i =0 ; i < length;i++){
			var Img = creatImgElement(photos[i],i);
			boxes.push(Img);
			parent.appendChild(Img);
		}
		return boxes;
	}
	/*������ͼƬ����*/
	function getRandyPic(num){
		var randy = parseInt(Math.random()*num);
		return randy;
	}
	/*ɾ������Ԫ��*/
	function deleChild(parent){
		var num = parent.childNodes.length;
		for(var i = 0; i < num; i++ ){
			var child = parent.childNodes[0];
			if(child)
				parent.removeChild(child);
			}	
	}
	
	//ƴͼ���֣�3��5��ͼƬ��
	function resize(parent,length){
		var boxes = parent.querySelectorAll("img");	
		if(length == 3) {   
			var offset = parseFloat(parseFloat(parent.clientHeight)/2);
			boxes[0].style.width = (parseFloat(parent.clientWidth) - offset) + 'px';
			boxes[1].style.width = offset + 'px';
			boxes[1].style.height = offset + 'px';
			boxes[2].style.top = offset + 'px';
			boxes[2].style.width = offset + 'px';
			boxes[2].style.height = offset + 'px';			
		}
	   else if(length == 5){
			var offset = parseFloat(parseFloat(parent.clientWidth)/3);
			boxes[0].style.width = (parseFloat(parent.clientWidth) - offset) + 'px';
			boxes[1].style.width = offset + 'px';
			boxes[1].style.height = offset + 'px';
			boxes[2].style.top = offset + 'px';
			boxes[2].style.width = offset + 'px';
			boxes[2].style.height = (parent.clientHeight - offset) + 'px';			
		}
	}
	//�ٲ�����
	/*������������*/
	function minHeightColum(){
		var minHeight = g_option.colums[0].clientHeight;
		var minIndex = 0;
		for(var i = 0; i < g_option.colums.length; i++){
			if(g_option.colums[i].clientHeight < minHeight){
				minIndex = i;
				minHeight = g_option.colums[i].clientHeight;
			}
		}
		return minIndex;
	}
	/*�����ø߶�*/
	function chooseHeight(){
		var arrayHeight = [200,250,300,350,400,450,500,550,600,650,700];
		var i = parseInt(Math.random() * 13);
		return arrayHeight[i];
	}

//ִ��	
	var whAlbum = new WhAlbum();
	getPhotos("picSrc.txt").then(function(photos){
		whAlbum.photos = photos;								  
		var option = {layout:"PUZZLE",images:photos.slice(0,3),isLayout:false,width:"50%"};		
		whAlbum.setImage(option.images,option);
		whAlbum.addImage();
		whAlbum.removeImage();
	});
}(window));
