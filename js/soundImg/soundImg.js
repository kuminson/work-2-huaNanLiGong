$(function(){
	// 窗口变化 高度自适应
	windowChangeWithAutoHeight();
	// 轮播图初始化
	initMyfocus();
});
// iframe高度弹性
function mainAutoHeight(){
	var mainh = $(window).height()
				- $("#headermenu").height()
				- $("#navbox").height()
				- $("#footer").height()
				- parseInt($("#footer").css("border-top-width"));
	$("#main").height(mainh);
}

// 窗口变化 高度自适应
function windowChangeWithAutoHeight(){
	// 绑定窗口变化事件
	$(window).resize(function(){
		// iframe高度弹性
		mainAutoHeight();

	});
	// 手动触发一次高度调整
	$(window).trigger("resize");
}

// 轮播图初始化
function initMyfocus(){
	var autoh = $("#main").height() - 18 -20;
	$("#m_slide").myFocus({
	    id:'m_slide',//焦点图盒子ID
	    pattern:'mF_pithy_tb',//风格应用的名称
	    time:10,//切换时间间隔(秒)
	    trigger:'click',//触发切换模式:'click'(点击)/'mouseover'(悬停)
	    width:832,//设置图片区域宽度(像素)
	    height:autoh,//设置图片区域高度(像素)
		thumbShowNum:6,//略缩图显示数目
		thumbWidth:150,//略缩图总宽度
	    txtHeight:'default'//文字层高度设置(像素),'default'为默认高度，0为隐藏
	});
}
