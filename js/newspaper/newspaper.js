$(function(){
	// 缓存页面显示条目数
	$("body").data("pagesize",12);
	// 窗口变化 高度自适应
	windowChangeWithAutoHeight();
	// 绑定显示全部分类点击事件
	addShowAllClassListEvent();
	// 绑定隐藏全部分类点击事件
	addHideMostClassListEvent();
	// 初始化分页
	initPaginator("newspaper");
	// 判定页面类型
	// decisionPageType();
	$("body").data("ptype","newspaper");
	// 加载侧边栏树结构
	loadSideTreeBtn();
	// 绑定侧边栏树结构点击事件
	addSideTreeBtnClickEvent("newspaper");
	// 绑定期刊标题点击跳转事件
	addNewsTitleClickEvent();
});