<?php
	include "log_functions.php";

	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		connectError($mysqli, "logs/sql_mess_save.log");
	}

	// Замена смайлов картинками и экранирование специальных символов
	$message = $_POST["message"];
	$message = $mysqli->real_escape_string($message);

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
		'" . $_SESSION["userName"] . "',
		'" . $message . "')")) {

		addSQLRowError($mysqli, "logs/sql_mess_save.log");
	}
	
?>