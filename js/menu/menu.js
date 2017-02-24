$(function(){
	// 绑定菜单跳转事件
	menuTurnEvent();
	// 绑定搜索按钮跳转事件
	searchBtnTurnEvent();
	// iframe消去滚动条
	window.top.changeIframeScroll("no");
});

// 绑定菜单跳转事件
function menuTurnEvent(){
	$(".mb_list").on("click",function(){
		var url = rootUrl + $(this).attr("yg-url");
		// 调用顶层函数
		window.top.iframeTurnOtherPage(url);
	});
}

// 绑定搜索按钮跳转事件
function searchBtnTurnEvent(){
	$("#ms_btn").on("click",function(){
		var url = rootUrl + $(this).attr("yg-url");
		// 拼接关键字
		url += "?text=" + $("#ms_input").val();
		// 调用顶层函数
		window.top.iframeTurnOtherPage(url);
	});
}