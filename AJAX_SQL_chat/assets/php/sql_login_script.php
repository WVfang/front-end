<?php

	include "log_functions.php";

	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		connectError($mysqli);
	}

	$login = $mysqli->real_escape_string($_POST["login"]);
	$password = $mysqli->real_escape_string($_POST["password"]);

	if(!$res = $mysqli->query("SELECT Login, Password FROM people WHERE Login = '" . $login . "'")) {
		getDataError($mysqli);
	}

	// Проверка логина и пароля
	$userName = "";
	if($row = $res->fetch_assoc()) { // Если найдено совпадение с логином
		if($row["Password"] == $_POST["password"]) { // Тогда если найдено совпадение с паролем - возвращает имя существующего акка
			$userName = $row["Login"];
		} else { // Иначе, возвращает пустую строку
			$userName = "";
		}
	} else { // Если совпадение с логином не найдено - создает новый акк
		if(!$mysqli->query("INSERT INTO people(Login, Password) VALUES('" . $login . "', '" . $password . "')")) {
			addRowError($mysqli);
		}

		$userName = $_POST["login"];
	}

	// Передача имени обратно на сраницу входа
	$data["userName"] = $userName;
	echo(json_encode($data, JSON_PRETTY_PRINT));

	// Создание сессионной перенной для ее использование при создании сообщений
	if($userName) {
		session_start();
		$_SESSION["userName"] = $userName;
	}
?>