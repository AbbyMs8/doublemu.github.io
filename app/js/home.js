var Util = (function(){

})();

var banner = new Image();
banner.src = "../imgs/banner.jpg";


banner.addEventListener("load",start,false);

function start(){
	// $("#mask_top,#mask_bottom").animate({height:0},1000);
	$(".top-line,.bot-line,.name h2").addClass("on")
}