$(function(){
	// 绑定点击事件
	moreAddClick();
	// 增加滚动条
	autoAddParentScroll();
});

// 绑定点击事件
function moreAddClick(){
	$("#more").on("click",function(){
		$(".hbox").removeClass("hide");
		$(window).triggerHandler("resize");
	});
}

// 动态增加滚动条
function autoAddParentScroll(){
	$(window).resize(function(event) {
		// 获取iframe id
		var paid = getParentId();
		// 获取iframe高度
		var paht = $(window.parent).find("#"+paid).height();
		console.log(paht,$(window).height());
		if(paht < $(window).height()){
			// iframe增加滚动条
			window.top.changeIframeScroll("yes");
		}else{
			// iframe去掉滚动条
			window.top.changeIframeScroll("no");
		}
	});
}

// 找到父iframe的id
function getParentId(){
	var ifrs = parent.document.getElementsByTagName('iframe');
        for (var i = 0, j = ifrs.length; i < j; i++){
            if (ifrs[i].contentWindow == window) {
                return ifrs[i].id;
            }
        }
}