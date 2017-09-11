<?php

	include "log_functions.php";

	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		connectError($mysqli);
	}

	// Получение всех сообщений
	if(!$res = $mysqli->query("SELECT DateSeconds, SendTime, User, Message FROM messages")) {
		getDataError($mysqli);
	}
		
	for($i = 0; $row = $res->fetch_assoc(); $i++) {
		$data[$i] = array("date" => $row["DateSeconds"], "time" => $row["SendTime"], "user" => $row["User"], "message" => $row["Message"]);
	}

	// Передача сообщений в chat.php
	if(@$data) {
		$data = json_encode($data, JSON_PRETTY_PRINT);
		echo($data);
	} else {
		$data = array("data" => "");
		echo json_encode($data, JSON_PRETTY_PRINT);
	}

?>