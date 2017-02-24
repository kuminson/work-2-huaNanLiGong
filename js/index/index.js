$(function(){
	// 窗口变化 高度自适应
	windowChangeWithAutoHeight();

	// 显示时间
	getnowtime("#hid_date");
	// 菜单按钮跳转
	menuBtnTurn();
});

// 改变iframe滚动条
function changeIframeScroll(state){
	$("#main_ifrm").attr("scrolling",state);
}

// 菜单按钮跳转
function menuBtnTurn(){
	$(".hmm_btn").on("click",function(e){
		$(".hmm_btn").removeClass("active");
		$(this).addClass("active");
		var url = rootUrl + $(this).attr("yg-url");
		// iframe页面跳转
		iframeTurnOtherPage(url);
	});
}

// iframe页面跳转
function iframeTurnOtherPage(url){
	$("#main_ifrm").attr("src",url);
}

// iframe高度弹性
function iframeAutoHeight(){
	var iframeh = $(window).height()
				- $("#headerinfo").height()
				- $("#headermenu").height()
				- $("#footer").height()
				- parseInt($("#footer").css("border-top-width"));
	$("#main_ifrm").height(iframeh);
}

// 窗口变化 高度自适应
function windowChangeWithAutoHeight(){
	// 绑定窗口变化事件
	$(window).resize(function(){
		// iframe高度弹性
		iframeAutoHeight();
	});
	// 手动触发一次高度调整
	$(window).trigger("resize");
}

/*
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * getnowtime(id)  加载当前日期
 *
 * id             需要显示时间的标签id
 *
 * 使用方法
 * getnowtime("#labelid");
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */
// >>>>>>>>>>>>>>>>>>>>>>>>>>> start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getnowtime(id){
	var timedate = {};
	timedate.now = new Date;
	timedate.year = timedate.now.getFullYear();
	timedate.month = timedate.now.getMonth()+1;
	timedate.date = timedate.now.getDate();
	timedate.day = timedate.now.getDay()+1;

	switch(timedate.day){
		case 1:
		timedate.week = "星期日";
		break;
		case 2:
		timedate.week = "星期一";
		break;
		case 3:
		timedate.week = "星期二";
		break;
		case 4:
		timedate.week = "星期三";
		break;
		case 5:
		timedate.week = "星期四";
		break;
		case 6:
		timedate.week = "星期五";
		break;
		case 7:
		timedate.week = "星期六";
		break;
	}
	$(id).html("今天是&nbsp;"+ timedate.year +"年"+ timedate.month +"月"+ timedate.date +"日&nbsp;"+ timedate.week);
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>> over  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>