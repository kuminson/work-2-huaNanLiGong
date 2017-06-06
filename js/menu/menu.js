$(function(){
	// 页面初始化
	initPageLoad();
	// 获取并加载二级菜单数据
	getScdMnuData();
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
	// 获取一百来个字的内容
	getTextToTitle("#mb_remote");
});

// 获取二级菜单数据
function getScdMnuData(){
	$.ajax({
		url: rootUrl + "/html/menu/scdmnu.json",
		type: "GET",
		dataType: "json",
		success:function(data){
			// 加载二级菜单
			loadScdMnu(data);
		},
		error:function(){
			// alert("链接服务器失败");
		}
	});
}

// 加载二级菜单
function loadScdMnu(data){
	// 清空原有
	$("#scdmnu").html("");
	// 拼接标签
	var tags = "";
	var rowpls;
	for(var i=0,dlth=data.length; i<dlth; i++){
		// 判断是否是行首
		if(i%4 == 0){
			rowpls = "first";
		}else{
			rowpls = "";
		}
		tags += '<li class="mb_list scdmnu '+rowpls+'" yg-url="'
				+ data[i].url +'" logging="'+ data[i].logging +'">'
				+'<span class="mbl_circle fa fa-circle"></span>'
				+'<span class="mbl_icon fa '+ data[i].icon +'"></span>'
				+'<h3 class="mbl_title">'+ data[i].title +'</h3>'
				+'</li>';
	}
	// 加载标签
	$("#scdmnu").append(tags);
}


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
		// 判断登录权限
		if($(this).attr("logging") == "true"){
			var obj = this;
			// 判断session
			judgeSessionState({
				timeout:function(){
					alert("请先登录！");
				},
				timekeep:function(){
					menuBtnTurnAction(obj);
				}
			});
			return false;
		}
		// 菜单跳转操作
		menuBtnTurnAction(this);
	});
}

// 菜单按钮跳转操作
function menuBtnTurnAction(obj){
	
	var url = $(obj).attr("yg-url");
	// 默认不二次刷新
	var refresh = 0;
	if($(obj).attr("yg-url") != undefined){
		refresh = $(obj).attr("refresh");
	}
	// 调用顶层函数
	window.top.iframeTurnOtherPage(url,refresh);
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
		// 判断登录权限
		if($(this).attr("logging") == "true"){
			var obj = this;
			// 判断session
			judgeSessionState({
				timeout:function(){
					alert("请先登录！");
				},
				timekeep:function(){
					// 跳转链接
					window.open(rootUrl + $(obj).attr(atr));
				}
			});
			return false;
		}
		// 跳转链接
		window.open(rootUrl + $(this).attr(atr));
	});
}

// 获取一百来个字的内容
function getTextToTitle($id){
	$.ajax({
		url: rootUrl + "/html/menu/fileSearch_title.json",
		type: "GET",
		dataType: "json",
		data: {param1: 'value1'},
		success:function(data){
			$($id).attr("title",data.text);
		},
		error:function(){
			alert("链接服务器失败");
		}
	})
}