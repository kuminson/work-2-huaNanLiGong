$(function(){
	// 初始化表格
	initDatagrid();
	// 弹性宽高
	autoHeight();
});

var datacolumn = [[
			{
				"field":"tm",
				"title":"题名",
				"align":"left",
				"width":250,
				"iscp":1
			},{
				"field":"mj",
				"title":"密级",
				"align":"left",
				"width":60,
				"iscp":1
			},{
				"field":"wjsj",
				"title":"文件时间",
				"align":"left",
				"width":120,
				"iscp":0
			},{
				"field":"zrdw",
				"title":"责任单位",
				"align":"left",
				"width":120,
				"iscp":0
			},{
				"field":"tjyysj",
				"title":"提交预约时间",
				"align":"left",
				"width":120,
				"iscp":0
			},{
				"field":"sptgsj",
				"title":"审批通过时间",
				"align":"left",
				"width":120,
				"iscp":0
			},{
				"field":"spzt",
				"title":"审批状态",
				"align":"left",
				"width":60,
				"iscp":0
			},{
				"field":"blzt",
				"title":"办理状态",
				"align":"left",
				"width":60,
				"iscp":0
			},{
				"field":"blsj",
				"title":"办理时间",
				"align":"left",
				"width":120,
				"iscp":0
			},{
				"field":"blr",
				"title":"办理人",
				"align":"left",
				"width":100,
				"iscp":0
			}
			]];

// 初始化表格
function initDatagrid(){
	$("#g_datagrid").datagrid({
		method: "get",
		url: rootUrl + "/html/backlog/apply_data.json",
		fitColumns: true,
		columns:datacolumn,
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

// 弹性高度
function autoHeight(){
	$(window).resize(function(){
		var aheight = $(window).height();
		$("#grid").height(aheight);
	});
	$(window).trigger("resize");
}