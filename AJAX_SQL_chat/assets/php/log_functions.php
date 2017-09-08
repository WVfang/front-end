<?php
	function connectError($mysqli, $logStore) {
		error_log("Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error, 3, $logStore);
	}

	function addSQLRowError($mysqli, $logStore) {
		error_log("Не удалось создать строку: (" . $mysqli->errno . ") " . $mysqli->error, 3, $logStore);
	}
?>