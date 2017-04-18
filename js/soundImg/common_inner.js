// 绑定显示全部分类点击事件
function addShowAllClassListEvent(){
	$("#ms_show").on("click",function(){
		$(".msc_list").slideDown("nomal");
		$("#ms_hide").show();
		$("#ms_show").hide();
	});
}
// 绑定隐藏全部分类点击事件
function addHideMostClassListEvent(){
	$("#ms_hide").on("click",function(){
		if($(".msc_list:gt(5)").length > 0){
			$(".msc_list:gt(5)").slideUp("nomal");
		}
		$("#ms_hide").hide();
		$("#ms_show").show();
	});
}


// 初始化分页
function initPaginator(pgtype){
	var pagesize = $("body").data("pagesize");
	$("#mcp_paging").jqPaginator({
		totalCounts: 300,
		pageSize: pagesize,
	    visiblePages: 5,
	    currentPage: 1,
	    first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
        last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
	    onPageChange: function (num, type) {
	    	if(type == "change"){
	    		var pagesize = $("body").data("pagesize");
		    	if(pgtype == undefined || pgtype == "soundImg"){
			    	getContentImgData(num,pagesize);
		    	}else if(pgtype == "newspaper"){
		    		getContentNewsData(num,pagesize)
		    	}
	    	}
	    }
	});
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

// iframe高度弹性
function mainAutoHeight(){
    var mainh = $(window).height()
                - $("#headermenu").height()
                - $("#navbox").height()
                - $("#footer").height()
                - parseInt($("#footer").css("border-top-width"));
    if(mainh < 500){
        mainh = 500;
    }
    $("#main").css("min-height",mainh);
    var classh = mainh - parseInt($(".maininner").css("margin-top"))
    				   - parseInt($(".maininner").css("margin-bottom"))
    				   - $(".ms_title").height()
    				   - $(".mc_info").height()
    				   - parseInt($(".mc_pagbox").css("padding-top"))
    				   - parseInt($(".mc_pagbox").css("padding-bottom"))
    				   - 37;
    $(".mc_class").css("min-height",classh);
}

// 判定页面类型
function decisionPageType(){
	var udata = GetUrlParms();
	if(udata.ptype == undefined || udata.ptype == ""){
		// 默认值为毕业合影
		$("body").data("ptype","graduate");
		return false;
	}
	$("body").data("ptype",udata.ptype);
}

// 高亮导航条
function lightNavBtn(){
	// 获取页面种类
	var ptype = $("body").data("ptype");
	$(".n_btn").removeClass("active");
	$(".n_btn[yg_ptype='"+ptype+"']").addClass("active");
}

// 加载侧边栏树结构
function loadSideTreeBtn(){
	// 获取页面种类
	var ptype = $("body").data("ptype");
	// 清除原有树结构
	$(".msc_list").remove();
	// ajax获取数据
	getSideTreeData(ptype,function(data){
		// 编辑标签
		var tab = "";
		var state = "";
		for(var i=0; i<data.length; i++){
			if(i > 4){
				state = "hide";
			}
			tab += '<li class="msc_list '+state+'" yg_field="'
					+data[i].field+'" yg_text="'+data[i].text+'">'
					+data[i].text
					+'<span class="mscl_icon">&gt;</span></li>';
		}
		// 加载标签
		$(".ms_class").append(tab);
		// 触发第一个树按钮
		$(".msc_list").eq(0).trigger("click");
	});
}

// 异步获取侧边树结构
function getSideTreeData(ptype,func){
	// 临时demo使用 有后端支持时删除
	var action = "/html/common/inner_tree.json";
	if(ptype == "newspaper"){
		action = "/html/common/news_tree.json";
	}

	$.ajax({
		url: rootUrl + action,
		type: "POST",
		dataType: "json",
		data: {ptype: ptype},
		success:function(data){
			if(func != undefined){
				func(data);
			}
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 绑定侧边栏树结构点击事件
function addSideTreeBtnClickEvent(pgtype){
	$("body").on("click",".msc_list",function(){
		// 高亮按钮
		$(".msc_list").removeClass("active");
		$(this).addClass("active");
		// 缓存字段
		$("#ms_title").html($(this).attr("yg_text"));
		$("body").data("field",$(this).attr("yg_field"));
		// 加载图片
		var pagesize = $("body").data("pagesize");
		if(pgtype == undefined || pgtype == "soundImg"){
			getContentImgData(1,pagesize);
		}else if(pgtype == "newspaper"){
			getContentNewsData(1,pagesize)
		}
		// 刷新页数
		$("#mcp_paging").jqPaginator("option",{currentPage:1});
	});
}

// 获取报纸数据
function getContentNewsData(page,size){
	$.ajax({
		url: rootUrl + "/html/common/inner_newspaper.json",
		type: "POST",
		dataType: "json",
		data: {page:page,size:size},
		success:function(data){
			// 刷新分页总数
			var pageall = parseInt(data.all,10);
			$("#mcp_paging").jqPaginator("option",{totalCounts:pageall});
			var pagenum = Math.ceil(pageall/size);
			// 刷新信息
			$("#mc_info").html("共"+pageall+"条&nbsp;共"+pagenum+"页&nbsp;");
			// 清除原有标签
			$(".mcc_news").remove();
			// 编辑标签
			var tab = "";
			var idata = data.data;
			for(var i=0; i<idata.length; i++){
				tab += '<li class="mcc_news" yg_id="'+idata[i].id+'">'
						+'<h4 class="mccn_title">'+idata[i].title+'</h4>'
						+'<div class="mccn_time">'
							+'<span class="mccnt_title">出版时间：</span>'
							+'<span class="mccnt_content">'+idata[i].time+'</span>'
						+'</div>'
						+'<div class="mccn_period">'
							+'<span class="mccnp_title">期数：</span>'
							+'<span class="mccnp_content">'+idata[i].period+'</span>'
						+'</div>'
					+'</li>'
			}
			// 加载标签
			$("#mc_class").append(tab);
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 获取图片数据
function getContentImgData(page,size){
	var ptype = $("body").data("ptype");
	var field = $("body").data("field");
	$.ajax({
		url: rootUrl + "/html/common/inner_img.json",
		type: "POST",
		dataType: "json",
		data: {ptype: ptype,field:field,page:page,size:size},
		success:function(data){
			// 刷新分页总数
			var pageall = parseInt(data.all,10);
			$("#mcp_paging").jqPaginator("option",{totalCounts:pageall});
			var pagenum = Math.ceil(pageall/size);
			// 刷新信息
			$("#mc_info").html("共"+pageall+"条&nbsp;共"+pagenum+"页&nbsp;");
			// 清除原有标签
			$(".mcc_list").remove();
			// 编辑标签
			var tab = "";
			var icon = "";
			if(ptype == "video"){
				icon = '<span class="mccl_icon fa fa-play-circle-o"></span>';
			}
			var idata = data.data;
			for(var i=0; i<idata.length; i++){
				tab += '<li class="mcc_list" yg_id="'+idata[i].id+'">'
						+'<div class="mccl_imgbox">'
							+ icon
							+'<img src="'+rootUrl + idata[i].src+'" alt="'+idata[i].title+'" class="mccl_img">'
						+'</div>'
						+'<h4 class="mccl_title">'+idata[i].title+'</h4>'
						+'<span class="mccl_click">'
							+'<span class="mcclc_icon fa fa-hand-o-up"></span>'
							+'<span class="mcclc_text">&nbsp;'+idata[i].click+'</span>'
						+'</span>'
						+'<span class="mccl_class">'+idata[i].text+'</span>'
					+'</li>';
			}
			// 加载标签
			$("#mc_class").append(tab);
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 绑定图片和标题点击跳转事件
function addImgTitleClickEvent(){
	$("body").on("click",".mccl_imgbox,.mccl_title",function(){
		window.open(rootUrl + "/index.html");
	});
}

// 绑定期刊标题点击跳转事件
function addNewsTitleClickEvent(){
	$("body").on("click",".mccn_title",function(){
		window.open(rootUrl + "/index.html");
	});
}