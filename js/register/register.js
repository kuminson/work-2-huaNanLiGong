$(function(){
	// 绑定点击事件
	moreAddClick();
});

// 绑定点击事件
function moreAddClick(){
	$("#more").on("click",function(){
		$(".hbox").removeClass("hide");
		$(window).triggerHandler("resize");
	});
}
