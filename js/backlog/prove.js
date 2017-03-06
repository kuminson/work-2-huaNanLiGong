$(function(){
	// 初始化表格
	initDatagrid();
	// 开启滚动条
	window.parent.changeIframeScroll(".mlt_iframe","yes");
	// 表单只读
	formOnlyRead();
	// 变更表单条目
	changeFormInput();
});

var datacolumn = [[
			{
				"field":"",
				"checkbox":true
			},{
				"field":"sqsj",
				"title":"申请时间",
				"align":"left",
				"width":200,
				"iscp":1
			},{
				"field":"shzt",
				"title":"审核状态",
				"align":"left",
				"width":200,
				"iscp":1
			},{
				"field":"blzt",
				"title":"办理状态",
				"align":"left",
				"width":200,
				"iscp":0
			},{
				"field":"cxsq",
				"title":"撤销申请",
				"align":"left",
				"width":200,
				"iscp":0
			}
			]];

// 初始化表格
function initDatagrid(){
	$("#g_datagrid").datagrid({
		method: "get",
		url: rootUrl + "/html/backlog/prove_data.json",
		fitColumns: true,
		columns:datacolumn,
		resizeHandle: "both",
		striped: true,
		loadMsg: "请稍后...",
		pagination: true,
		rownumbers: true,
		pageNumber: 1,
		pageSize: 20,
		pageList: [20,40,60],
		onLoadSuccess:function(data){
			// 通过的行高亮
			var rows = data.rows;
			console.log(rows);
			for(var i=0; i<rows.length; i++){
				if(rows[i].shzt == "通过"){
					console.log(rows[i].shzt);
					$("#g_datagrid").datagrid("getPanel")
									.find("tr[datagrid-row-index='"+i+"']")
									.eq(1)
									.addClass("grid_row_success");
				}
			}
		}
	});
}

// 表单只读
function formOnlyRead(){
	$(".main input").prop("disabled", "disabled");
	$(".main select").prop("disabled", "disabled");
	$(".main textarea").prop("disabled", "disabled");
}

// 变更表单条目
function changeFormInput(){
	var title = window.parent.getTabTitle();
	if(title.search("学历") != -1){
		$(".mfc_list.education").removeClass("hide");
		$(".mfc_list.degree").addClass("hide");
	}else{
		$(".mfc_list.degree").removeClass("hide");
		$(".mfc_list.education").addClass("hide");
	}
}
