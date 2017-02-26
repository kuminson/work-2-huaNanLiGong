$(function(){
	// 初始化树
	$("#borrow").tree({
	    url: rootUrl + "/html/already/borrowTree.json"
	});
	$("#subject").tree({
	    url: rootUrl + "/html/backlog/subjectTree.json"
	});
	$("#collect").tree({
	    url: rootUrl + "/html/backlog/collectTree.json"
	});
	$("#history").tree({
	    url: rootUrl + "/html/backlog/historyTree.json"
	});

	// 展开事件绑定
	acSelectEvent();
	// 手动触发一次展开事件
	$("#ml_accordion").accordion("select",0);
});

// accordion展开事件绑定
function acSelectEvent(){
	$("#ml_accordion").accordion({
		onSelect:function(title,index){
			// 如果tab页存在
			if($("#ml_tab").tabs("exists",title)){
				$("#ml_tab").tabs("select",title);
				return false;
			}
			// 获取url
			var url = rootUrl + $(this).accordion("getPanel",index).attr("yg-url");
			// 如果tab页不存在 新建tab页
			$("#ml_tab").tabs("add",{
				title:title
			});
			// 加载iframe
			var miframe = '<iframe class="mlt_iframe"  frameborder="0" scrolling="no" src="'
						+url
						+'" ></iframe>'
			$("#ml_tab").tabs("getTab",title).append(miframe);
		}
	});
}
