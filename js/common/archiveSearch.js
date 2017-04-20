// 初始化表格
function initSearchDataGrid(gridid){
	$(gridid).datagrid({
		method: "get",
		// toolbar: "#mg_tb",
		fit:true,
		title:"搜索结果",
		fitColumns: true,
		resizeHandle: "both",
		striped: true,
		loadMsg: "请稍后...",
		pagination: true,
		checkOnSelect:false,
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
	$.ajax({
		url: rootUrl + "/html/common/personalInfo.json",
		type: "POST",
		dataType: "json",
		success:function(data){
			if(data.state < 1){
				return false;
			}
			// 缓存个人信息数据
			$("body").data("personal",data.data);
			if(data.data.realName == undefined){
				return false;
			}
			$(id).val(data.data.realName);
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 修改dagatrid 标题
function setDatagridTitle(num){
	var title = $("#mg_grid").datagrid("getPanel")
							.panel("header")
							.find(".panel-title");
	// var taps = '搜索结果：专利版权&nbsp;共<a class="title_link" mode="patent">'+num[0]+'</a>条记录'
	// 			+'&nbsp;|&nbsp;科研获奖证书&nbsp;共<a class="title_link" mode="ccie">'+num[1]+'</a>条记录'
	// 			+'&nbsp;|&nbsp;科研项目&nbsp;共<a class="title_link" mode="project">'+num[2]+'</a>条记录';
	var types = $(".searchtype");
	var taps = "搜索结果：";
	for(var i=0; i<types.length; i++){
		var typename = types.eq(i).siblings(".b_text").html();
		var valuename = types.eq(i).val();
		taps += "|&nbsp;" +typename 
						  +'&nbsp;共<a class="title_link" mode="'+valuename+'">'
						  +num[valuename]+'</a>条记录&nbsp;';
	}
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
			if(data.state < 1){
				return false;
			}
			setDatagridTitle(data.data);
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
		return false;
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
		var inputid = $("#upload_file").filebox("textbox").siblings("input[type='file']").attr("id");
		console.log(inputid);
		$.ajaxFileUpload({
			url:rootUrl + "/html/common/fileUpload.json",
			// url:rootUrl + "/php/common/fileUpload.php",   //测试处理图片的脚本路径
			type: "POST",       //提交的方式
	        secureuri :false,   //是否启用安全提交
	        fileElementId :inputid,     //file控件ID
	        dataType : 'json',  //服务器返回的数据类型
	        success : function (data){  //提交成功后自动执行的处理函数
	        	if(data.state < 1){
	        		return false;
	        	}
				// 显示信息
	        	showInteractionInfo("success",data.data.msg,"#upload_info");

	        },
	        error: function(data,status,e){   //提交失败自动执行的处理函数
				// 显示信息
				showInteractionInfo("worry","链接服务器失败，请稍后再试","#upload_info");
	        }
		});
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
		if(!IdentityCodeValid($("#ppt_idcard").textbox("getValue"))){
			alert("请输入正确的身份证号");
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
		// 获取值
		var userInfo = {};
		userInfo.realName = $("#ppt_name").textbox("getValue");
		userInfo.sex = $(".b_radio[name='b_sex']:checked").val();
		userInfo.IDcard = $("#ppt_idcard").textbox("getValue");
		userInfo.telephone = $("#pp_phone").textbox("getValue");
		userInfo.department = $("#pp_department").textbox("getValue");

		// 上传
		$.ajax({
			url: rootUrl + "/html/common/userInfoUpload.json",
			type: "POST",
			dataType: "json",
			data: {data: userInfo},
			success:function(data){
				if(data.state < 1){
					return false;
				}
				// 显示信息
				showInteractionInfo("success",data.data.msg,"#save_info");
			},
			error:function(){
				// 显示信息
				showInteractionInfo("worry","链接服务器失败，请稍后再试","#save_info");
			}
		});
	});
}

// 显示交互信息
function showInteractionInfo(state,msg,sele){
	initInteractionInfo(sele);
	if(state == "success"){
		var icon = "fa-check-circle";
	}else{
		var icon = "fa-exclamation-triangle";
	}
	// 显示信息
	$(sele).addClass(state) //添加状态
					 .find(".btn_icon") //找到图标
					 .addClass(icon) //添加样式
					 .after(msg); //添加信息
}

// 初始化交互信息
function initInteractionInfo(sele){
	$(sele).removeClass('success worry').html("");
	$(sele).append('<span class="btn_icon fa"></span>');
}

// 绑定方式单选框选中事件
function wayRadioChangeEvent(){
	// $(".b_radio[name='b_way']").on("change",function(){
	// 	if($(this).val() == "post"){
	// 		$(".b_post").removeClass("hide");
	// 	}else{
	// 		$(".b_post").addClass("hide");
	// 	}
	// });
	$(".b_radio[name='b_way'][value='post']").on("change",function(){
		if($(this).prop("checked")){
			$(".b_post").removeClass("hide");
		}else{
			$(".b_post").addClass("hide");
		}
	})
}



// 初始化window添加open事件
function addWindowOpenEvent(){
	$("#popup_perinfo").window({
		onOpen:function(){
			$(this).prop("scrollTop",0);
		}
	})
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
	// 获取缓存的用户信息
	var data = $("body").data("personal");
	// 自动填充用户基本信息
	if(data.userName == undefined){
		$("#ppt_user").textbox("reset");
	}else{
		$("#ppt_user").textbox("setValue",data.userName);
	}

	if(data.email == undefined){
		$("#ppt_email").textbox("reset");
	}else{
		$("#ppt_email").textbox("setValue",data.email);
	}

	// 自动填充用户身份信息
	if(data.realName == undefined){
		$("#ppt_name").textbox("reset");
	}else{
		$("#ppt_name").textbox("setValue",data.realName);
	}
	if(data.sex == undefined && data.sex == ""){
		$(".b_radio[name='b_sex']").prop("checked",false);
	}else{
		$(".b_radio[name='b_sex'][value='"+data.sex+"']").prop("checked",true);
	}
	if(data.IDcard == undefined){
		$("#ppt_idcard").textbox("reset");
	}else{
		$("#ppt_idcard").textbox("setValue",data.IDcard);
	}
	if(data.telephone == undefined){
		$("#pp_phone").textbox("reset");
	}else{
		$("#pp_phone").textbox("setValue",data.telephone);
	}
	if(data.department == undefined){
		$("#pp_department").textbox("reset");
	}else{
		$("#pp_department").textbox("setValue",data.department);
	}
	initInteractionInfo("#save_info");
	// 清空档案查询要求
	$("#pp_ask").textbox("reset");
	$("#pp_askremark").textbox("reset");
	// 清空证件提供
	$("#upload_file").filebox("reset");
	initInteractionInfo("#upload_info");
	// 清空证件提供
	$("#pp_days").textbox("reset");
	$("#pp_aim").combobox("reset");
	$("#pp_aimask").textbox("reset");
	$("#pp_aimremark").textbox("reset");
	$(".b_radio[name='b_way']").prop("checked",false);
	$(".b_radio[name='b_way'][value='online']").prop("checked",true);
	$(".b_post").addClass("hide");
	$("#pp_add").textbox("reset");
	$("#pp_post").combobox("reset");
}

// 提交信息
function submitAllApplyInfo(forminfo,func){
	$.ajax({
		url: rootUrl + "/html/common/allInfo.json",
		type: "POST",
		dataType: "json",
		data: forminfo,
		success:function(data){
			if(data.state < 1){
				return false;
			}
			if(func == undefined){
				return false;
			}
			func();
		},
		error:function(){
			alert("服务器链接失败！");
		}
	});
}

// 邮箱验证
function verifyEmailAdd(email){
	if(email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
		return true;
	}
	return false;
}