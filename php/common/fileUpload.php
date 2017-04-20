<?php
if($_FILES["ele_img"]["error"] > 0){
	$data = array(
		"state" => 0,
		"msg" => $_FILES["ele_img"]["error"],
		"data" => ""
	);
	echo json_encode($data);
}else{
	move_uploaded_file($_FILES["ele_img"]["tmp_name"],$_SERVER["DOCUMENT_ROOT"]."/work-2-huaNanLiGong/php/common/".$_FILES["ele_img"]["name"]);
	$data = array(
		"state" => 1,
		"msg" => "上传成功",
		"data" => ["msg" => $_FILES["ele_img"]["tmp_name"]]
	);
	echo json_encode($data);
}
?>