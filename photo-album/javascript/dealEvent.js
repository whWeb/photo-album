// JavaScript Document
window.onload = onEvent;
function onEvent(){
	var menu = document.querySelector(".icon-menu");
	menu.style.cursor = "hand";
	menu.onclick = function(){
		if(document.querySelector("#param").style.display == "block"){
			return false;
		}
		var display = document.querySelector("#menu").style.display;		
		if( display == "" || display == "none"){
			document.querySelector("#menu").style.display = "inline-block";
			document.querySelector("#config").style.width = "15%";
			document.querySelector("#config").style.minWidth = 220 + 'px';
		}
		else{
			document.querySelector("#menu").style.display = "none";	
			document.querySelector("#config").style.width = 60 + 'px';
			document.querySelector("#config").style.minWidth = 0 + 'px';			
		}
	}
	var cog = document.querySelector(".set");
	cog.style.cursor = "hand";
	cog.onclick = function(){
		var display = document.querySelector("#param").style.display;		
		if( display == "" || display == "none"){
			document.querySelector("#param").style.display = "block";
		}
		else
			document.querySelector("#param").style.display = "none";		
	}	
	var fullScreen = document.querySelector("#fullScreen");
	var album = document.querySelector("#album");
	album.onclick = function(){
		if(fullScreen.value == "True"){
			if (event.target.tagName === 'IMG'){
				var index = event.target.index;
				var Div = document.createElement("div");
				Div.className = "cover";
				var Body = document.querySelector('body')
				Body.appendChild(Div);
				Div.innerHTML = "<span class = 'lArrow'><</span><img src = " + event.target.src + " class = 'disImg'/><span class = 'rArrow'>></span>";	
				var Img = document.querySelector('.disImg');
				document.querySelector(".lArrow").onclick = function(){
					if(index>0)
						Img.src = "images/" + window.g_option.images[--index].src+ ".jpg";
				}
				document.querySelector(".rArrow").onclick = function(){
					if(index < window.g_option.images.length-1)
						Img.src = "images/" + window.g_option.images[++index].src+ ".jpg";
				}				
				Img.addEventListener('click', function(event){
						Body.removeChild(Div);							   
				})
			}	
		}
	}
}

