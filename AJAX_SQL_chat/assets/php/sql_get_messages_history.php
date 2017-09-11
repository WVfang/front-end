<?php
	include "log_functions.php";

	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");

	if($mysqli->connect_errno) {
		connectError($mysqli);
	}

	if($_POST["dataAmount"] == "last") {

		$res = $mysqli->query("SELECT DateSeconds, SendTime, User, Message FROM messages WHERE id=(SELECT MAX(id) FROM messages)");
		if($row = $res->fetch_assoc()) {
			$data[0] = array("date" => $row["DateSeconds"], "time" => $row["SendTime"], "user" => $row["User"], "message" => $row["Message"]);
		}
		
	} else if($_POST["dataAmount"] == "full") {

		$res = $mysqli->query("SELECT DateSeconds, SendTime, User, Message FROM messages");
		for($i = 0; $row = $res->fetch_assoc(); $i++) {
			$data[$i] = array("date" => $row["DateSeconds"], "time" => $row["SendTime"], "user" => $row["User"], "message" => $row["Message"]);
		}

	}

	if(@$data) {
		$data = json_encode($data, JSON_PRETTY_PRINT);
		echo($data);
	}
	
	//$mysqli->query("ALTER TABLE `messages` AUTO_INCREMENT=1");

//  ============================================================ 

	/* 
	while($row = $res->fetch_assoc()) {
		print_r($row);
	}
	*/

?>