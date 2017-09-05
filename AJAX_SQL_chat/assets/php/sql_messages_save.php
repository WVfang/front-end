<?php
	
	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	// Замена смайлов картинками и экранирование специальных символов
	$message = str_replace([":)", ":("], ["<img src=\"assets/php/img/smile_happy.png\">", "<img src=\"assets/php/img/smile_sad.png\">"], $_POST["message"]);
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

		echo "Не удалось создать строку: (" . $mysqli->errno . ") " . $mysqli->error;
	}
	
?>