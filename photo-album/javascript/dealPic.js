// JavaScript Document
var dealPic = function(exe){           /* exe是个函数 */
	exe(this.deal.bind(this),this.reject.bind(this));         /* 执行exe(deal) */
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
