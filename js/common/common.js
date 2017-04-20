/*
 * 后台ajax返回格式
 *
 * 正常数据返回
 * {"state":1, "msg":"", "data":"数据"}
 *
 * session超时返回
 * {"state":-1, "msg":"登录超时，请重新登录！"}
 *
 * 异常情况数据返回
 * {"state":0, "msg":"你没有权限！"}
 *
**/
$(function(){
    
});
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

// 获取时间对象
function getTodayDateObj(){
    var timedate = {};
    timedate.now = new Date;
    timedate.year = timedate.now.getFullYear();
    timedate.month = timedate.now.getMonth()+1;
    timedate.date = timedate.now.getDate();
    timedate.day = timedate.now.getDay()+1;
    return timedate;
}

// 根据状态跳转
function judgeStateAction(XHR){
    // 获取data
    var data = JSON.parse(XHR.responseText);
    // session超时，跳转
    if(data.state == -1){
        // 在index页 不操作
        if(window.location.href.search("/index.html") > -1){
            return false;
        }
        alert("登录超时，请重新登录！");
        // 回到首页
        backLoginPage();
        return false;
    }
    if(data.state == 0){
        // 其他异常情况，显示提示
        alert(data.msg);
        return false;
    }
}

// 回到首页
function backLoginPage(){
    window.top.location.href = rootUrl + "/index.html";
}

// 全局拦截ajax判断session是否过期
function initAllAjaxJudgeSession(){
    $.ajaxSetup({
        complete:function(XHR){
            // 根据状态跳转
            judgeStateAction(XHR);
        }
    });
}

// 判断session是否过期
function judgeSessionState(obj){
    $.ajax({
        url: rootUrl + "/html/common/sessionState.json",
        type: "GET",
        dataType: "json",
        success:function(data){
            // session超时
            if(data.state == -1){
                if(obj != undefined && obj.timeout != undefined){
                    obj.timeout();
                }
                return false;
            }
            if(data.state == 0){
                // 其他异常情况，显示提示
                alert(data.msg);
                return false;
            }
            if(obj != undefined && obj.timekeep != undefined){
                obj.timekeep();
            }
        }
    });
}

// 用户登录
function userLoginEvent(){
    $("#login").on("click",function(){
        // 获取值
        var info = {};
        info.un = $("#username").val();
        info.pw = $("#password").val();
        // 检测
        if(info.un == ""){
            alert("用户名不能为空！");
            return false;
        }
        if(info.pw == ""){
            alert("密码不能为空！");
            return false;
        }
        // 传递登录信息
        loginInfoToBackend(info);

    });
}

// 传递登录信息
function loginInfoToBackend(info){
    $.ajax({
        url: rootUrl + "/html/common/login.json",
        type: "POST",
        dataType: "json",
        data: {username: info.un,password:info.pw},
        success:function(data){
            // 判断状态存在
            if(data.state == undefined){
                alert("登录失败！");
                return false;
            }
            // 有错误信息
            if(data.state == 0){
                alert(data.msg);
                $("#password").val("");
                $("#username").val("").focus();
                return false;
            }
            // 登录成功
            if(data.state == 1){
                alert("登录成功！");
                $("#hi_login").hide();
                $("#hi_loginfo").show();
                $("#hil_info").html(data.data.name + "，欢迎您！");
            }
        },
        error:function(){
            alert("服务器链接失败！");
        }
    });
}

// 回车登录事件
function enterLoginKeypressEvent(input,btn){
    $(input).on("keypress",function(e){
        // 有焦点
        if(!$(this).is(":focus")){
            return;
        }
        // 是回车键
        if(e.which != "13"){
            return;
        }
        // 触发登录按钮
        $(btn).click();
    });
}

// 退出按钮点击事件
function userLogoutEvent(){
    $("#logout").on("click",function(){
        $.ajax({
            url: rootUrl + "/html/common/logout.json",
            type: "POST",
            dataType: "json",
            success:function(data){
                if(data.state == undefined){
                    alert("登出失败！");
                    return false;
                }
                if(data.state == 0){
                    alert(data.msg);
                    return false;
                }
                if(data.state == 1){
                    $("#hi_loginfo").hide();
                    $("#hi_login").show();
                    $(".hil_input").val("");
                    alert("已经安全退出！");
                    // 回到首页
                    backLoginPage();
                }
            },
            error:function(){
                alert("服务器链接失败！");
            }
        });
    });
}

// 检查用户是登录状态
function judgeUserLogging(){
    $.ajax({
        url: rootUrl + "/html/common/logging.json",
        type: "POST",
        dataType: "json",
        success:function(data){
            // 判断状态存在
            if(data.state == undefined){
                return false;
            }
            // 有错误信息
            if(data.state == 0){
                return false;
            }
            // 处在登录状态
            if(data.state == 1){
                $("#hi_login").hide();
                $("#hi_loginfo").show();
                $("#hil_info").html(data.data.name + "，欢迎您！");
            }
        },
        error:function(){
            alert("服务器链接失败！");
        }
    });
}

// 身份证号验证
function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    return pass;
}


