<?php
	
	// Connection
 	$mysqli = new mysqli("localhost", "root", "", "weather");
 	if($mysqli->connect_errno) {
 		echo "[" . date("d/m/y H:i:s") . "] Не удалось подключиться к MySGL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
 	}

 	$today = date("d.m.Y H:i", mktime(12, 0, 0, 4, 24, 2017));
 	$todayTime = date("Y-m-d", strtotime($today));

 	// Getting data
 	if(!$res = $mysqli->query("SELECT timestamp, temperature, rain_possibility, clouds FROM forecast")) {
 		echo "[" . date("d/m/y H:i:s") . "] Не удалось выполнить запрос: (" . $mysqli->errno . ") " . $mysqli->error;
 	}

 	// Get only today's data
 	for($i = 0; $row = $res->fetch_assoc(); $i++) {
 		if(date("Y-m-d", strtotime($row["timestamp"])) == $todayTime) {
 			$data["forecast"][$i] = $row; 
 		}
 	}

 	// Send received data to java script
 	if(@$data) {
 		$data["today"] = strtotime($today)*1000;
 		$data = json_encode($data, JSON_PRETTY_PRINT);
 		echo $data;	
 	}
 	
?>