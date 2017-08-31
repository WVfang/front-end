<?php

	function getData($dataStore) {
		if(@file_get_contents($dataStore)) {
			$data = file_get_contents($dataStore);
			$data = json_decode($data, true);
		} else {
			$data = ["counter" => 0];
		}

		$data["counter"]++;
		return $data;
	}

	function dataToStore($dataStore, $data) {
		$data = json_encode($data, JSON_PRETTY_PRINT);

		$dStore = fopen($dataStore, "w");
		fwrite($dStore, $data);
		fclose($dStore);
	}

	$dataStore = "mes_history.json";
	// Возобновление сессии для перехвата переменной userName
	session_start();
	// Загрузка json данных и создание нового ключа под новый элемент
	$data = getData($dataStore);
	$messageKey = "message" . $data["counter"];
	// Замена символов смайлов на смайлы-картинки или как альтернатива кодовые смайлы ["&#128522;", "&#128542;"]
	$message = str_replace([":)", ":("], ["<img src=\"assets/php/img/smile_happy.png\">", "<img src=\"assets/php/img/smile_sad.png\">"], $_POST["chat-message"]);
	// Формирование нового элемента и добавление его в json файл
	$data[$messageKey] = ["date" => strtotime(date("H:i:s")), "time" => date("H:i:s"), "user" => $_SESSION["userName"], "message" => $message];
	dataToStore($dataStore, $data);
?>