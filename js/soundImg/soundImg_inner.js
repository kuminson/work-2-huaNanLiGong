$(function(){
	// 缓存页面显示图片数
	$("body").data("pagesize",8);
	// 窗口变化 高度自适应
	windowChangeWithAutoHeight();
	// 绑定显示全部分类点击事件
	addShowAllClassListEvent();
	// 绑定隐藏全部分类点击事件
	addHideMostClassListEvent();
	// 初始化分页
	initPaginator();
	// 判定页面类型
	decisionPageType();
	// 高亮导航条
	lightNavBtn();
	// 加载侧边栏树结构
	loadSideTreeBtn();
	// 绑定侧边栏树结构点击事件
	addSideTreeBtnClickEvent();
	// 绑定图片和标题点击跳转事件
	addImgTitleClickEvent();
});

