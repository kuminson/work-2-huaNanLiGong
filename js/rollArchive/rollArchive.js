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

