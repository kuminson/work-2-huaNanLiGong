$(function(){
	// 页面初始化
	initPageLoad();
	// 绑定菜单跳转事件
	menuTurnEvent();
	// 绑定搜索按钮跳转事件
	searchBtnTurnEvent();
	// iframe消去滚动条
	if(window.top.changeIframeScroll){
		window.top.changeIframeScroll("no");
	}
	// 展开二级菜单
	showScdMenuEvent();
	// 新页面跳转
	menuOpenNewPage(".mb_list.scdmnu","yg-url");
});

// 绑定菜单跳转事件
function menuTurnEvent(){
	$("body").on("click",".mb_list.fstmnu",function(){
		// 判定按钮失效
		if($(this).hasClass("disabled")){
			return false;
		}
		// 判定按钮 进入二级菜单
		if($(this).hasClass("scdlvl")){
			return false;
		}
		var url = $(this).attr("yg-url");
		// 默认不二次刷新
		var refresh = 0;
		if($(this).attr("yg-url") != undefined){
			refresh = $(this).attr("refresh");
		}
		// 调用顶层函数
		window.top.iframeTurnOtherPage(url,refresh);
	});
}

// 绑定搜索按钮跳转事件
function searchBtnTurnEvent(){
	$("#ms_btn").on("click",function(){
		var url = $(this).attr("yg-url");
		// 拼接关键字
		url += "?text=" + $("#ms_input").val();
		// 调用顶层函数
		window.top.iframeTurnOtherPage(url);
	});
}

// 展开二级菜单
function showScdMenuEvent(){
	$("body").on("click",".mb_list.scdlvl",function(){
		// 隐藏一级菜单
		$("#fstmnu").stop(true,true).hide('fast',function(){
			// 显示二级菜单
			$(".m_btn.scdmnu").removeClass("hide");
		});
	});
}

// 页面初始化
function initPageLoad(){
	$("#fstmnu").stop(true,true).show();
	$(".m_btn.scdmnu").addClass("hide");
}

// 新页面跳转
function menuOpenNewPage(sele,atr){
	$("body").on("click",sele,function(){
		// 判断无连接 跳出
		if($(this).attr(atr) == undefined){
			return false;
		}
		// 跳转链接
		window.open(rootUrl + $(this).attr(atr));

	});
}