$(function(){
	// 检查用户是否登录
	judgeUserLogging();
	// 隐藏一级按钮
	hideFirstMenuBtn("#hm_menu","hidemenu");
	// 窗口变化 高度自适应
	windowChangeWithAutoHeight();

	// 显示时间
	getnowtime("#hid_date");
	// 菜单按钮跳转
	menuBtnTurn();
	// 绑定注册按钮点击事件
	signBtnClickEvent("#hil_register","yg-url");
	// 页面内容跳转
	getUrlTurnContentPage("urlturn");

	// 用户登录
	userLoginEvent();
	// 回车登录事件
	enterLoginKeypressEvent(".hil_input","#login");
	// 退出按钮点击事件
	userLogoutEvent();
});

// 菜单按钮跳转
function menuBtnTurn(){
	$(".hmm_btn").on("click",function(e){
		// 判断登录权限
		if($(this).attr("logging") == "true"){
			var obj = this;
			// 判断session
			judgeSessionState({
				timeout:function(){
					alert("请先登录！");
				},
				timekeep:function(){
					menuTurnAction(obj);
				}
			});
			return false;
		}
		// 菜单跳转操作
		menuTurnAction(this);
	});
}

// 菜单跳转操作
function menuTurnAction(obj){
	$(".hmm_btn").removeClass("active");
	$(obj).addClass("active");
	var url = $(obj).attr("yg-url");
	// iframe页面跳转
	iframeTurnOtherPage(url);
}

// iframe页面跳转
function iframeTurnOtherPage(url){
	$("#main_ifrm").attr("src",rootUrl + url);
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

// 隐藏一级按钮
function hideFirstMenuBtn(menuid,urlkey){
	// 获取URL参数
	var urlobj = GetUrlParms();
	// 判断没有关键字 跳出
	if(urlobj[urlkey] == undefined){
		return false;
	}
	// 隐藏按钮
	$(menuid).addClass("hide");
}

// 绑定注册按钮点击事件
function signBtnClickEvent(btnid,eleattr){
	$(btnid).on("click",function(){
		var url = $(this).attr(eleattr);
		// iframe页面跳转
		iframeTurnOtherPage(url,1);
	});
}

// 页面内容跳转
function getUrlTurnContentPage(urlkey){
	// 获取url参数
	var urlobj = GetUrlParms();
	// 判断没有关键字 跳出
	if(urlobj[urlkey] == undefined){
		$(".hmm_btn").eq(0).triggerHandler("click");
		return false;
	}
	// 跳转页面
	iframeTurnOtherPage(urlobj[urlkey]);
}