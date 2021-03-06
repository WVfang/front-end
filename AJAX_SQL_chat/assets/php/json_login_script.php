<?php 
	
	function getJSONData($dataStore) {

		$dataArray = [];
		if(@file_get_contents($dataStore)) {
			$dataString = file_get_contents($dataStore);
			$dataArray = json_decode($dataString, true);
		}
	
		return $dataArray;
	}

	function addNewUser(&$usersData, $usersDataStore) {
		
		$userName = $_POST["name"];
		$usersData[$userName] = $_POST["password"];

		$usersJSONData = json_encode($usersData, JSON_PRETTY_PRINT);

		$dStore = fopen($usersDataStore, "w");
		fwrite($dStore, $usersJSONData);
		fclose($dStore);

		return $userName;
	}

	function personVerification(&$usersData, $usersDataStore) {

		if($_POST["name"] == "") 
			return "";
		
		foreach ($usersData as $name => $pass) { 
			if($_POST["name"] == $name) {
			    if($_POST["password"] == $pass) 
					return $name;
				else if(strlen($_POST["password"]) != 0)
					return "This nickname already exists";
				else 
					return "";
			}
		}

		return addNewUser($usersData, $usersDataStore);
	}
	//print_r($_POST);
	if(isset($_POST["name"]) and isset($_POST["password"])) {

		$usersDataStore = "jsons/users_personal_data.json";
		$usersData = getJSONData($usersDataStore);
		$userName = personVerification($usersData, $usersDataStore);
		// Создание сессионной перенной для ее использование при создании json-элементов-сообщений
		session_start();
		$_SESSION["userName"] = $userName;
		// Возвращение json строки, которая используется в функции запроса post в index.php
		$arr = ["userName" => $userName];
		echo json_encode($arr);
	}
?>




			