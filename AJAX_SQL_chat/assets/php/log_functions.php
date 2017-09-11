<?php
	
	define("LOG_STORE", "logs/logs.log");

	function connectError($mysqli) {
		error_log("[" . date("d/m/y H:i:s") . "] Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error . "\n", 3, LOG_STORE);
	}

	function addRowError($mysqli) {
		error_log("[" . date("d/m/y H:i:s") . "] Не удалось создать строку: (" . $mysqli->errno . ") " . $mysqli->error, 3, LOG_STORE);
	}

	function getDataError($mysqli) {
		error_log("[" . date("d/m/y H:i:s") . "] Не удалось выполнить запрос: (" . $mysqli->errno . ") " . $mysqli->error, 3, LOG_STORE);
	}
?> 