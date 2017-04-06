<?php
// 开启session会话
session_start();

// 登录或者注销
if($_REQUEST["login"] == "true"){
	$_SESSION["userid"] = "123";
	$data = ["state" => 1,"data" => "登录成功"];
	echo json_encode($data);
}else{
	unset($_SESSION["userid"]);
	$data = ["state" => 1,"data" => "注销成功"];
	echo json_encode($data);
}
?>