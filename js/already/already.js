$(function(){

	// 获取并缓存tab url数据
	getAndCacheTabUrl();

	// 添加初始标题
	changePanelTitle(["已办事项"]);

	// 展开事件绑定
	acSelectEvent();

	// 绑定菜单click事件
	navBtnOnClickEvent();

	// 初始化tab页
	initTabPage();
});

// 初始化tab页
function initTabPage(){
	$("#ml_tab").tabs({
		onSelect:function(title,index){
			// 获取title数据
			var titles = getPanelTitledata();
			// 修改title
			if(titles[2] == title){
				titles.length = 3;
			}else{
				titles[3] = title;
			}
			changePanelTitle(titles);
			// 缓存title
			$(this).tabs("getTab",title).data("title",title);
		}
	});
}

// accordion展开事件绑定
function acSelectEvent(){
	$("#ml_accordion").accordion({
		selected:false,
		onSelect:function(title,index){
			// 获取title数据
			var titles = getPanelTitledata();
			// 修改title
			titles[1] = title;
			changePanelTitle(titles);
			// 手动触发第一个菜单按钮click事件
			$(this).accordion("getPanel",index)
				   .find(".mlaamb_link")
				   .eq(0)
				   .trigger("click");
		}
	});
}

// 获取并缓存tab url数据
function getAndCacheTabUrl(){
	// ajax获取url
	$.ajax({
		url: rootUrl + "/html/already/tabUrl.json",
		type: "POST",
		dataType: "json",
		success:function(data){
		// 缓存在tab页元素上
			for(var i=0; i<data.length; i++){
				$(".mlaamb_link").eq(i).data("yg-url",data[i]);
			}
			// 手动触发一次展开事件
			$("#ml_accordion").accordion("select",0);
		},
		error:function(){
			alert("服务器链接失败");
		}
	});
}

// 菜单按钮绑定click事件
function navBtnOnClickEvent(){
	$(".mlaamb_link").on("click",function(){
		// 清除其他active样式
		$(".mlaam_btn").removeClass("active");
		// 添加active样式
		$(this).closest(".mlaam_btn").addClass("active");
		// 获取title数据
		var titles = getPanelTitledata();
		// 修改title
		var title = $(this).html();
		titles[2] = title;
		changePanelTitle(titles);
		// 清除所有tab页
		var num = $("#ml_tab").tabs("tabs").length;
		for(var i=0; i<num; i++){
			$("#ml_tab").tabs("close",0);
		}
		// 获取URL数组
		var urls = $(this).data("yg-url");
		// 加载tab页
		for(var i=0; i<urls.length; i++){
			createTabPage(urls[i].title,urls[i].url);
		}
		// 选择第一个tab页
		$("#ml_tab").tabs("select",0);
		return false;
	});
}

// 创建tab页
function createTabPage(title,url){
	// 加载tab页
	$("#ml_tab").tabs("add",{
		title:title
	});
	// 加载iframe
	var miframe = '<iframe class="mlt_iframe"  frameborder="0" scrolling="no" src="'
				+rootUrl
				+url
				+'" ></iframe>'
	$("#ml_tab").tabs("getTab",title).append(miframe);
}

// 获取center标题数据
function getPanelTitledata(){
	var headele = $("#m_layout").layout("panel","center").panel("header").find(".panel-title");
	var title = headele.data("yg-title");
	return title;
}

// 改变center标题为面包屑导航
function changePanelTitle(title){
	// 获取title元素
	var headele = $("#m_layout").layout("panel","center").panel("header").find(".panel-title");
	// 改变title值
	var text ="";
	for(var i=0; i<title.length; i++){
		if(i == 0){
			text += title[i];
			continue;
		}
		text += "&gt;" + title[i];
	}
	headele.html(text);
	// 缓存数据
	headele.data("yg-title", title);
}

// 改变iframe滚动条
function changeIframeScroll(sele,state){
	$(sele).attr("scrolling",state);
}

// 获取标题
function getTabTitle(){
	var title = $("#ml_tab").tabs("getSelected").data("title");
	return title;
}