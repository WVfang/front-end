<?php

	function getData($dataStore) {
		if(@file_get_contents($dataStore)) {
			$data = file_get_contents($dataStore);
			$data = json_decode($data, true);
		} else {
			$data = ["counter" => 0];
		}

		return $data;
	}

	
	$dataStore = "mes_history.json";

	$data = getData($dataStore);
	$data["counter"]++;
	$messageKey = "message" . $data["counter"];

	
	session_start();
	$userName = $_SESSION["userName"];

	$dataTime = strftime(date("H:i:s"));

	$data[$messageKey] = ["time" => $dataTime, "user" => $userName, "message" => $_POST["chat-message"]];

	$data = json_encode($data, JSON_PRETTY_PRINT);

	$dStore = fopen($dataStore, "w");
	fwrite($dStore, $data);
	fclose($dStore);
?>