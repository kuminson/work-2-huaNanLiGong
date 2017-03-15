var rootUrl = "/work-2-huaNanLiGong";

// 获取页面url信息
function GetUrlParms(){
    var args=new Object();
    var query=location.search.substring(1);//获取查询串
    var pairs=query.split("&");//在逗号处断开
    for(var   i=0;i<pairs.length;i++){
        var pos=pairs[i].indexOf('=');//查找name=value
        if(pos==-1){
	        continue;//如果没有找到就跳过
        }
        var argname=pairs[i].substring(0,pos);//提取name
        var value=pairs[i].substring(pos+1);//提取value
        args[argname]=decodeURI(value);//存为属性
    }
    return args;
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