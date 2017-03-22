$(function(){
	// 初始化表格
	initSearchDataGrid("#mg_grid");
	// 弹性高度
	autoHeight("#gridbox");
	// 自动填表
	autoSetSearchValue("#s_input");
	// 搜索点击事件
	searchBtnClickEvent();
	// 单选框change事件
	modeRadioChangeEvent();
	// 绑定表格标题数字点击事件
	datagridTitleClickEvent();
	// 申请查看原文按钮click事件
	applyBtnClickEvent();
	// 初始化文本框
	initTextBox();
	// 绑定上传文件按钮点击事件
	uploadBtnClickEvent();
	// 绑定保存信息按钮点击事件
	saveInfoBtnClickEvent();
	// 原文icon点击事件
	originalBtnClickEvent();
	// 绑定原文权限弹出框确定按钮点击事件
	originalPopupOkBtnClickEvent();
	// 绑定原文权限弹出框取消按钮点击事件
	originalPopupCancelBtnClickEvent();
	// 绑定方式单选框选中事件
	wayRadioChangeEvent();
	// 绑定身份信息提交按钮点击事件
	personalInfoSubmitClickEvent();
	// 绑定身份信息取消按钮点击事件
	personalInfoCancelClickEvent();
});
// 表格列名
var patent_column = [[
	{
		"field":"",
		"checkbox":true
	},{
		"field":"yw",
		"title":"原文",
		"align":"center",
		"width":50
	},{
		"field":"ajh",
		"title":"案卷号",
		"align":"left",
		"width":150
	},{
		"field":"zlmc",
		"title":"专利名称",
		"align":"left",
		"width":400
	},{
		"field":"zrz",
		"title":"责任者",
		"align":"left",
		"width":200
	},{
		"field":"zlh",
		"title":"专利号",
		"align":"left",
		"width":150
	},{
		"field":"sqrq",
		"title":"授权日期",
		"align":"left",
		"width":80
	},{
		"field":"lb",
		"title":"类别",
		"align":"left",
		"width":80
	}
]];
var ccie_column = [[
	{
		"field":"",
		"checkbox":true
	},{
		"field":"yw",
		"title":"原文",
		"align":"center",
		"width":50
	},{
		"field":"dh",
		"title":"档号",
		"align":"left",
		"width":150
	},{
		"field":"xmmc",
		"title":"项目名称",
		"align":"left",
		"width":400
	},{
		"field":"hjqk",
		"title":"获奖情况",
		"align":"left",
		"width":200
	},{
		"field":"zrz",
		"title":"责任者",
		"align":"left",
		"width":200
	},{
		"field":"hjsj",
		"title":"获奖时间",
		"align":"left",
		"width":100
	}
]];
var project_column = [[
	{
		"field":"",
		"checkbox":true
	},{
		"field":"yw",
		"title":"原文",
		"align":"center",
		"width":50
	},{
		"field":"dh",
		"title":"档号",
		"align":"left",
		"width":150
	},{
		"field":"xmmc",
		"title":"项目名称",
		"align":"left",
		"width":400
	},{
		"field":"xmlb",
		"title":"项目类别",
		"align":"left",
		"width":150
	},{
		"field":"xmcyz",
		"title":"项目参与者",
		"align":"left",
		"width":200
	},{
		"field":"jtsj",
		"title":"结题时间",
		"align":"left",
		"width":100
	}
]];

// 初始化表格
function initSearchDataGrid(gridid){
	$(gridid).datagrid({
		method: "get",
		toolbar: "#mg_tb",
		fit:true,
		title:"搜索结果",
		fitColumns: true,
		resizeHandle: "both",
		striped: true,
		loadMsg: "请稍后...",
		pagination: true,
		rownumbers: true,
		pageNumber: 1,
		pageSize: 20,
		pageList: [20,40,60]
	});
}

// 计算兄弟高度合
function getSiblingHeight(id){
	var $sbls = $(id).siblings();
	var num = 0;
	// 获取所有兄弟元素高度
	$sbls.each(function(index){
		num += $(this).height();
	});
	// 加上自身
	$sbls = $sbls.add(id);
	// 获取所有元素外高度
	$sbls.each(function(index) {
		num += removeNoNum(parseInt($(this).css("margin-top")));
		num += removeNoNum(parseInt($(this).css("margin-bottom")));
		num += removeNoNum(parseInt($(this).css("padding-top")));
		num += removeNoNum(parseInt($(this).css("padding-bottom")));
		num += removeNoNum(parseInt($(this).css("border-top-width")));
		num += removeNoNum(parseInt($(this).css("border-bottom-width")));
	});
	return num;
}

// 弹性高度
function autoHeight(id){
	$(window).resize(function(){
		var sblsh = getSiblingHeight(id);
		$(id).height($(window).height()-sblsh);
	});
	// 手动触发一次 resize事件
	$(window).resize();
}

// 自动填表
function autoSetSearchValue(id){
	$(id).val("黄强");
}

// 修改dagatrid 标题
function setDatagridTitle(num){
	var title = $("#mg_grid").datagrid("getPanel")
							.panel("header")
							.find(".panel-title");
	var taps = '搜索结果：专利版权&nbsp;共<a class="title_link" mode="patent">'+num[0]+'</a>条记录'
				+'&nbsp;|&nbsp;科研获奖证书&nbsp;共<a class="title_link" mode="ccie">'+num[1]+'</a>条记录'
				+'&nbsp;|&nbsp;科研项目&nbsp;共<a class="title_link" mode="project">'+num[2]+'</a>条记录';
	title.html(taps);
}

// 搜索点击事件
function searchBtnClickEvent(){
	$("#s_btn").on("click",function(){
		// 获取内容
		if($("#s_input").val() == ""){
			alert("请在搜索框输入检索内容！");
			return false;
		}
		var sval = $("#s_input").val();
		// 获取模式
		var mode = getRadioCheckedValue(".r_radio");
		if(mode == ""){
			alert("请选择检索类型！");
			return false;
		}
		// 修改mode
		if(mode == "all"){
			// 默认显示第一个
			mode = "patent";
		}
		// 显示title
		loadDatagridTitle(sval);
		// 加载表格数据
		$("#mg_grid").datagrid({
			columns:eval(mode + "_column"),
			url:rootUrl + "/html/rollSearch/data_"+mode+".json"
		});
	});
}

// 加载标题
function loadDatagridTitle(sval){
	$.ajax({
		url: rootUrl + "/html/rollSearch/data_all.json",
		type: "GET",
		dataType: "json",
		success:function(data){
			setDatagridTitle(data);
		},
		error:function(){
			alert("服务器链接失败");
		}
	});
}

// 单选框change事件
function modeRadioChangeEvent(){
	$(".r_radio").on("change",function(){
		// 触发搜索按钮
		$("#s_btn").triggerHandler("click");
	});
}

// 消除非数值 兼容IE
function removeNoNum(data){
	if(data){
		return data;
	}
	return 0;
}

// 绑定表格标题数字点击事件
function datagridTitleClickEvent(){
	$("body").on("click",".title_link",function(){
		// 获取mode
		var mode = $(this).attr("mode");
		// 找到相应radio 改变checked
		$(".r_radio[value='"+mode+"']").prop("checked",true).triggerHandler("change");
	})
}

// 获取选中的mode
function getRadioCheckedValue(sele){
	var mode = "";
	$(sele).each(function(index){
		if($(this).prop("checked")){
			mode = $(this).val();
		}
	});
	return mode;
}

// 申请查看原文按钮click事件
function applyBtnClickEvent(){
	$("#mgt_apply").on("click",function(){
		// 没有选中行 报错
		if($("#mg_grid").datagrid("getChecked").length < 1){
			alert("请选中需要查看原文的文件！");
			return false;
		}
		// 获取选中行
		var ckdata = $("#mg_grid").datagrid("getChecked");
		// 获取mode
		var mode = getRadioCheckedValue(".r_radio");
		// 弹出框显示
		$("#popup_perinfo").window("open");
		// 初始化表单
		initPersonalInfoForm();
	});
}

// 原文icon点击事件
function originalBtnClickEvent(){
	$("body").on("click",".f_r_b",function(){
		$("#popup_original").dialog("open");
	});
}

// 绑定原文权限弹出框确定按钮点击事件
function originalPopupOkBtnClickEvent(){
	$("#po_ok").on("click",function(){
		$("#popup_original").dialog("close");
		$("#mgt_apply").triggerHandler("click");
	});
}

// 绑定原文权限弹出框取消按钮点击事件
function originalPopupCancelBtnClickEvent(){
	$("#po_cancel").on("click",function(){
		$("#popup_original").dialog("close");
	});
}

// 初始化文本框
function initTextBox(){
	$(".pp_textbox").each(function(index){
		$(this).textbox({
			width:400,
			labelWidth:90
		});
	});

}

// 绑定上传文件按钮点击事件
function uploadBtnClickEvent(){
	$("#upload_btn").on("click",function(){
		if($("#upload_file").textbox("getValue") == ""){
			alert("请选择文件");
			return false;
		}
		// 显示信息
		$("#upload_info").addClass("success") //添加状态
						 .find(".btn_icon") //找到图标
						 .addClass("fa-check-circle") //添加样式
						 .after("文件上传成功"); //添加信息
		// $("#upload_info").addClass("worry")
		// 				 .find(".btn_icon")
		// 				 .addClass("fa-exclamation-circle")
		// 				 .after("文件上传失败");
	});
}

// 绑定保存信息按钮点击事件
function saveInfoBtnClickEvent(){
	$("#save_btn").on("click",function(){
		// 信息验证
		if($("#ppt_name").textbox("getValue") == ""){
			alert("请填写真实姓名");
			return false;
		}
		if($("#ppt_idcard").textbox("getValue") == ""){
			alert("请填写身份证号");
			return false;
		}
		if($("#pp_department").textbox("getValue") == ""){
			alert("请填写所在部门");
			return false;
		}
		if($(".b_radio[name='b_sex']:checked").length < 1){
			alert("请选择性别");
			return false;
		}
		// 上传
		// 显示信息
		$("#save_info").addClass("success") //添加状态
						 .find(".btn_icon") //找到图标
						 .addClass("fa-check-circle") //添加样式
						 .after("信息上传成功"); //添加信息
	});
}

// 绑定方式单选框选中事件
function wayRadioChangeEvent(){
	$(".b_radio[name='b_way']").on("change",function(){
		if($(this).val() == "post"){
			$(".b_post").removeClass("hide");
			console.log($(this).val());
		}else{
			$(".b_post").addClass("hide");
			console.log($(this).val());
		}
	});
}

// 绑定身份信息提交按钮点击事件
function personalInfoSubmitClickEvent(){
	$("#pp_submit").on("click",function(){
		// 关闭身份信息
		$("#popup_perinfo").window("close");
		// 弹出框成功
		$("#alert_result").dialog("open");
		// 加载时间
		$("#ar_time").html("办理时间："+getTodayDate("-"));
	});
}

// 绑定身份信息取消按钮点击事件
function personalInfoCancelClickEvent(){
	$("#pp_cancel").on("click",function(){
		// 关闭身份信息
		$("#popup_perinfo").window("close");
	});
}

// 身份信息表单初始化
function initPersonalInfoForm(){
	// 自动填充用户基本信息
	$("#ppt_user").textbox("setValue","hangqiang");
	$("#ppt_email").textbox("setValue","hangqiang@163.com");
	// 自动填充用户身份信息
	$("#ppt_name").textbox("setValue","黄强");
	$(".b_radio[name='b_sex']").eq(0).prop("checked",true);
	$("#ppt_idcard").textbox("setValue","154834198808158543");
	$("#pp_department").textbox("setValue","技术研发");

}