<?php
	include "log_functions.php";

	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		connectError($mysqli);
	}

	// Начало сессии для получения доступа к переменной userName
	session_start();

	if(!$mysqli->query(

		"INSERT INTO messages(

		DateSeconds,
		SendTime,
		User,
		Message)

		VALUES(

		'" . strtotime(date("H:i:s")) . "',
		'" . date("H:i:s") . "',
		'" . $mysqli->real_escape_string($_SESSION["userName"]) . "',
		'" . $mysqli->real_escape_string($_POST["message"]) . "')")) {

		addSQLRowError($mysqli);
	}
	
?>