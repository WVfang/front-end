<?php
	
	// Подключение
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$res = $mysqli->query("SELECT Login, Password FROM people");

	// Проверка на совпадения и совместимость имени с паролем
	$userName = "";
	while($row = $res->fetch_assoc()) {
		if($row["Login"] == $_POST["login"]) {
			if($row["Password"] == $_POST["password"]) {
				$userName = $row["Login"];
				break;
			}
			else {
				$userName = "This nickname already exists";
			}
		}
	}

	// Если совпадений не найдено - создание нового аккаунта
	if(!$userName) {

		if(!$mysqli->query("INSERT INTO people(Login, Password) VALUES('" . $_POST["login"] . "', '" . $_POST["password"] . "')")) {
			echo "Не удалось создать строку: (" . $mysqli->errno . ") " . $mysqli->error;
		}

		$userName = $_POST["login"];
	}

	// Передача имени обратно на сраницу входа
	echo $userName;

	// Создание сессионной перенной для ее использование при создании сообщений
	session_start();
	$_SESSION["userName"] = $userName;

?>