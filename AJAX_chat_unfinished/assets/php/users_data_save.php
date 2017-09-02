<?php
	
	$mysqli = new mysqli("localhost", "root", "", "ajax_chat");
	if($mysqli->connect_errno) {
		echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	$res = $mysqli->query("SELECT Login, Password FROM people");

	$userName = "";
	while($row = $res->fetch_assoc()) {
		if($row["Login"] == $_POST["name"]) {
			if($row["Password"] == $_POST["password"]) {
				$userName = $row["Login"];
				break;
			}
			else {
				$userName = "This nickname already exists";
			}
		}
	}

	if(!$userName) {

		if(!$mysqli->query("INSERT INTO people(Login, Password) VALUES('" . $_POST["name"] . "', '" . $_POST["password"] . "')")) {
			echo "Не удалось создать строку: (" . $mysqli->errno . ") " . $mysqli->error;
		}

		$userName = $_POST["name"];
	}

	// Создание сессионной перенной для ее использование при создании сообщений
	session_start();
	$_SESSION["userName"] = $userName;

//  ===========================================================

	//echo $userName;
	//print_r($_POST["name"] . " " . $_POST["password"] . " ");
	//echo $mysqli->host_info . "\n";

?>