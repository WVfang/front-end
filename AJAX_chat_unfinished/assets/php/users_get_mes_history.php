<?php
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");

	if($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	

	//while($row = $res->fetch_assoc()) {
	//	print_r($row);
	//}

	

	if($_POST["dataAmount"] == "last") {

		$res = $mysqli->query("SELECT DateSeconds, SendTime, User, Message FROM messages WHERE id=(SELECT MAX(id) FROM messages");
		if($row = $result_set->fetch_assoc()) {
			$data[0] = array("date" => $row["DateSeconds"], "time" => $row["SendTime"], "user" => $row["User"], "message" => $row["Message"]);
		}
		
	} else if($_POST["dataAmount"] == "full") {

		$res = $mysqli->query("SELECT DateSeconds, SendTime, User, Message FROM messages");
		for($i = 0; $row = $res->fetch_assoc(); $i++) {
			$data[$i] = array("date" => $row["DateSeconds"], "time" => $row["SendTime"], "user" => $row["User"], "message" => $row["Message"]);
		}

	}

	$data = json_encode($data, JSON_PRETTY_PRINT);
	echo($data);

	//"<div class=\"history-message\"><span class=\"userName\">[" . $row["SendTime"] . "] " . $row["User"] . ":</span> " . $row["Message"] . "</div>";
?>