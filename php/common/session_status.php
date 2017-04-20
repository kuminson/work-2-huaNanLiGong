<?php
// 启动session会话
session_start();

// session不存在 停止返回数据 在头部标记session失效
if(!isset($_SESSION["userid"])){
	$data = ["state" => -1,"msg" => "登录超时，请重新登录"];
	echo json_encode($data);
	return;
}

$data = ["state" => 1,"data" => "这是一条数据，说明session没过期"];
echo json_encode($data);

?>