// JavaScript Document
function request(url){
	
	return new dealPic(function(deal){
		var httpRequest = new XMLHttpRequest();	
		httpRequest.open('GET', url);
   		httpRequest.send();
		httpRequest.addEventListener('load', function () {
     		deal(JSON.parse(this.response));   /* �첽����, �ȼ�������load�� �Ż�ִ��deal(value)*/
    	})
	})
}
function getPhotos(url){		
	return request(url);
}
