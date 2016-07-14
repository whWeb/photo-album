// JavaScript Document
var dealPic = function(exe){           /* exe�Ǹ����� */
	exe(this.deal.bind(this),this.reject.bind(this));         /* ִ��exe(deal) */
}
dealPic.prototype.deal = function(value){
	if(this.onDeal)
		this.onDeal(value);
}
dealPic.prototype.reject = function(value){
	if(this.onReject)
		this.onReject(value);
}
dealPic.prototype.then = function(onDeal, onReject){
	this.onDeal = onDeal;
	if (onReject) {
	    this.onReject = onReject
    }
}
