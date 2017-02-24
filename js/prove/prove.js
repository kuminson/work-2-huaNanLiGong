$(function(){
	// iframe增加滚动条
	window.top.changeIframeScroll("yes");

	// 绑定子业务变更事件
	bnsAddChangeEvent();

	// 绑定提交事件
	$("#m_smt").on("click",function(){
		alert("办理时间：2017-02-24，‘档案查阅’登记号：001，请到前台办理");
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