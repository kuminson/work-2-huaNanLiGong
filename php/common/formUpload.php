<?php
	// 获取对象
	$sname = $_REQUEST["selfName"];
	// 输出对象
	$data = [
		"state" => -1,
		"msg" => "",
		"data" => [$sname]
		];
	echo json_encode($data);
?>