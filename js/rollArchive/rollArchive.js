$(function(){
	// 验证登录中
	judgeSessionState({
		timeout:function(){
			alert("登录状态超时，请重新登录！")
			// 回到登录页
	        backLoginPage();
		}
	});
	// 全局拦截ajax判断session是否过期
	initAllAjaxJudgeSession();
	// 初始化表格
	initSearchDataGrid("#mg_grid");
	// 弹性高度
	autoHeight("#gridbox");
	// 自动填表
	autoSetSearchValue("#s_input");
	// 绑定回车提交
	enterLoginKeypressEvent("#s_input","#s_btn");
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
	// 初始化window添加open事件
	addWindowOpenEvent();
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

// 绑定身份信息提交按钮点击事件
function personalInfoSubmitClickEvent(){
	$("#pp_submit").on("click",function(){
		// 禁用提交按钮
		$("#pp_submit").prop("disabled",true);
		var forminfo = {};
		// 表单验证
		if($("#ppt_email").textbox("getValue") == ""){
			alert("请填写邮箱地址！");
			return false;
		}
		if(!verifyEmailAdd($("#ppt_email").textbox("getValue"))){
			alert("请填写正确的邮箱地址！");
			return false;
		}
		if($("#pp_ask").textbox("getValue") == ""){
			alert("请填写查询要求！");
			return false;
		}
		if($("#pp_days").textbox("getValue") == ""){
			alert("请填写申请天数！");
			return false;
		}
		if($("#pp_aimask").textbox("getValue") == ""){
			alert("请填写目的描述！");
			return false;
		}
		if($(".b_radio[name='b_way']:checked").length < 1){
			alert("请至少选择一种查看方式！");
			return false;
		}
		if($(".b_radio[name='b_way'][value='post']").is(":checked")){
			if($("#pp_add").textbox("getValue") == ""){
				alert("请填写邮寄地址！");
				return false;
			}
			forminfo.add = $("#pp_add").textbox("getValue");
			forminfo.post = $("#pp_post").textbox("getValue");
		}
		forminfo.user = $("#ppt_user").textbox("getValue");
		forminfo.email = $("#ppt_email").textbox("getValue");
		forminfo.ask = $("#pp_ask").textbox("getValue");
		forminfo.askremark = $("#pp_askremark").textbox("getValue");
		forminfo.days = $("#pp_days").textbox("getValue");
		forminfo.aim = $("#pp_aim").combobox("getValue");
		forminfo.aimask = $("#pp_aimask").textbox("getValue");
		forminfo.aimremark = $("#pp_aimremark").textbox("getValue");
		forminfo.b_way = [];
		$way = $(".b_radio[name='b_way']:checked");
		for(var i=0; i<$way.length; i++){
			forminfo.b_way.push($way.eq(i).val());
		}

		// 验证个人信息和证件是否提交
		verifyInfoAndfileExist(function(data){
			// 不存在 提示
			if(!data.exist){
				alert("请先提交个人信息和证件电子版！");
				return false;
			}
			// 存在 提交信息
			submitAllApplyInfo(forminfo,function(){
				// 关闭身份信息
				$("#popup_perinfo").window("close");
				// 弹出框成功
				$("#alert_result").dialog("open");
				// 加载时间
				$("#ar_time").html("办理时间："+getTodayDate("-"));
				$("#ar_user").html("办理人："+ $("body").data("personal").realName);
				// 激活提交按钮
				$("#pp_submit").prop("disabled",false);
			});
		});
	});
}

// 验证个人信息和证件是否提交
function verifyInfoAndfileExist(func){
	$.ajax({
		url: rootUrl + "/html/common/infoFile.json",
		type: "GET",
		dataType: "json",
		success:function(data){
			if(data.state < 1){
				return false;
			}
			if(func == undefined){
				return false;
			}
			func(data.data);
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

