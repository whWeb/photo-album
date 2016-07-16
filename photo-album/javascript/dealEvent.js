// JavaScript Document
window.onload = onEvent;
function onEvent(){	
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
	
	var sidebar = document.querySelector("#sideArrow");
	var config = document.querySelector("#config");
	sidebar.onclick = function(){
		if(sidebar.className == "sidebar-open"){
			sidebar.className = "sidebar-close";
			config.style.left = -300 + "px";
			sidebar.style.backgroundColor = "#e6e6e6";
		}else{
			sidebar.className="sidebar-open";
			config.style.left = 0 + "px";
			sidebar.style.backgroundColor = "#FFDFFF";

		}
	}
}

