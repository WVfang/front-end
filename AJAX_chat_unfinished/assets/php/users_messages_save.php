<?php
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$message = str_replace([":)", ":("], ["<img src=\"assets/php/img/smile_happy.png\">", "<img src=\"assets/php/img/smile_sad.png\">"], $_POST["message"]);

	//$date = strtotime(date("H:i:s"));
	//$time = date("H:i:s");

	session_start();

	if(!$mysqli->query("INSERT INTO messages(DateSeconds, SendTime, User, Message) VALUES(
		'" . strtotime(date("H:i:s")) . "',
		'" . date("H:i:s") . "',
		'" . $_SESSION["userName"] . "',
		'" . $message . "')")) {
		echo "Не удалось создать строку: (" . $mysqli->errno . ") " . $mysqli->error;
	}

	$res = $mysqli->query("SELECT DateSeconds, SendTime, User, Message FROM messages");

	while($row = $res->fetch_assoc()) {
		print_r($row);
	}

	//echo "completed";

?>