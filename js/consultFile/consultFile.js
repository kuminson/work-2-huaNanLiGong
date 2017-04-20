$(function(){
	// 验证登录中
	judgeSessionState({
		timeout:function(){
			alert("登录状态超时，请重新登录！")
			// 回到登录页
	        backLoginPage();
		}
	});
	// 隐藏其他多行输入框
	$(".other").hide();
	// 绑定多选框其他选中事件
	addCheckboxChangeEvent("#domOther");
	// 绑定单选框其他选中事件
	addRadioChangeEvent("aim");
	addRadioChangeEvent("genus");
	// 加载当天时间
	addTodayDate();
	// 初始化表单
	initForm();
	// 表单提交
	addFormUploadEvent();
});

// 绑定多选框其他选中事件
function addCheckboxChangeEvent(sele){
	$(sele).on("change",function(){
		// 判断选中
		var name = $(this).attr("name");
		if($(this).prop("checked")){
			// 显示多行输入框
			$("#"+name+"OtherTextBox").slideDown();
			return false;
		}
		// 判断取消
		$("#"+name+"OtherTextBox").slideUp();
	});
}

// 绑定单选框其他选中事件
function addRadioChangeEvent(name){
	$(".fl_radio[name='"+name+"']").on("change",function(){
		// 判断选中
		if($("#"+name+"Other").prop("checked")){
			// 显示多行输入框
			$("#"+name+"OtherTextBox").slideDown();
			return false;
		}
		// 判断取消
		$("#"+name+"OtherTextBox").slideUp();
	});
}

// 加载当天时间
function addTodayDate(){
	var tdate = getTodayDateObj();
	$("#fp_date").html(tdate.year + "年" + tdate.month + "月" + tdate.date + "日");
}

// 初始化表单
function initForm(){
	$("#form").form({
		url:rootUrl+"/html/common/form.json",
		// url:rootUrl+"/php/common/formUpload.php", //测试用
		onSubmit:function(){
			// 表单验证
			if(!$("#form").form("validate")){
				alert("请将表单填写完整！");
				return false;
			}
			// 本人身份证号
			if(!IdentityCodeValid($("#selfID").textbox("getValue"))){
				alert("请正确输入申请人身份证号！");
				return false;
			}
			// 申请目的
			if($(".fl_radio[name='aim']:checked").length < 1){
				alert("请选择利用目的！");
				return false;
			}
			// 申请目的 其他
			if($("#aimOther").is(":checked") && $("#aimOtherText").textbox("getValue") == ""){
				alert("请输入其他利用目的！");
				return false;
			}
			// 申请材料
			if($(".fl_radio[name='documentation']:checked").length < 1){
				alert("请选择需要的材料！");
				return false;
			}
			// 申请材料 其他
			if($("#domOther").is(":checked") && $("#documentationOtherText").textbox("getValue") == ""){
				alert("请输入其他需要材料的名称！");
				return false;
			}
			// 档案属
			if($(".fl_radio[name='genus']:checked").length < 1){
				alert("请选择利用档案属！");
				return false;
			}
			// 档案属 其他
			if($("#genusOther").is(":checked") && $("#genusOtherText").textbox("getValue") == ""){
				alert("请输入其他档案属的名称！");
				return false;
			}
			// 委托人身份证号
			if(!IdentityCodeValid($("#entrustID").textbox("getValue"))){
				alert("请正确输入委托人身份证号！");
				return false;
			}
		},
		success:function(data){
			var bdata = jQuery.parseJSON(data);
			// 判定session
			if(bdata.state < 0){
				alert("登录状态超时，请重新登录！");
				// 回到首页
				backLoginPage();
				return false;
			}
			// 提示状态
			alert(bdata.data.status);
		}
	});
}

// 表单提交
function addFormUploadEvent(){
	$("#submit").on("click",function(){
		$("#form").submit();
	});
}
