<?php

	include "log_functions.php";

	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		connectError($mysqli);
	}

	$login = $mysqli->real_escape_string($_POST["login"]);
	$password = $mysqli->real_escape_string($_POST["password"]);

	if(!$res = $mysqli->query("SELECT Login, Password FROM people WHERE Login = '" . $login . "'")){
		getDataError($mysqli);
	};

	if($row = $res->fetch_assoc()) {
		if($row["Password"] == $_POST["password"]) {
			$userName = $row["Login"];
		} else {
			$userName = "";
		}
	} else {
		if(!$mysqli->query("INSERT INTO people(Login, Password) VALUES('" . $login . "',
		'" . $password . "')")) {
			addSQLRowError($mysqli);
		}

		$userName = $_POST["login"];
	}

	// Передача имени обратно на сраницу входа
	$data = array("userName" => $userName);
	$data = json_encode($data, JSON_PRETTY_PRINT);
	print_r($data);

	// Создание сессионной перенной для ее использование при создании сообщений
	session_start();
	$_SESSION["userName"] = $userName;

?>