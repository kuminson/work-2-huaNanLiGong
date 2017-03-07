$(function(){
	// iframe增加滚动条
	window.top.changeIframeScroll("yes");

	// 绑定子业务变更事件
	bnsAddChangeEvent();

	// 绑定办理方式变更事件
	wayAddChangeEvent();

	// 绑定提交事件
	$("#m_smt").on("click",function(){
		// alert("办理时间："+getTodayDate("-")+"，\n办理人：管理员，\n办理成功。\n请到待办页面关注审核进程");
		// 打开弹出框窗口
		$("#alert_result").dialog("open");
		// 加载时间
		$("#ar_time").html("办理时间："+getTodayDate("-"));
		return false
	});
});

// 绑定子业务变更事件
function bnsAddChangeEvent(){
	$(".mfhb_business").on("change",function(){
		var bnsval = $(".mfhb_business:checked").attr("id");
		if(bnsval == "alumnusEducation" || bnsval == "studentEducation"){
			$(".education").removeClass("hide");
			$(".degree").addClass("hide");
		}else{
			$(".education").addClass("hide");
			$(".degree").removeClass("hide");
		}
	});
	// 手动触发一次
	$(".mfhb_business").triggerHandler("change");
}
// 绑定办理方式变更事件
function wayAddChangeEvent(){
	$(".mfhv_way").on("change",function(){
		var bnsval = $(".mfhv_way:checked").attr("id");
		if(bnsval == "scene_way"){
			$(".mf_content.post").addClass("hide");
		}else{
			$(".mf_content.post").removeClass("hide");
		}
	});
	// 手动触发一次
	$(".mfhv_way").triggerHandler("change");
}

// 获取时间
function getTodayDate(symbol){
	var timedate = {};
	timedate.now = new Date;
	timedate.year = timedate.now.getFullYear();
	timedate.month = timedate.now.getMonth()+1;
	timedate.date = timedate.now.getDate();
	timedate.day = timedate.now.getDay()+1;
	var nowDate = timedate.year + symbol + timedate.month + symbol + timedate.date;
	return nowDate;
}