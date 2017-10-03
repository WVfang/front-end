<?php
	
	function getJsonData($dataStore) {
		if(file_get_contents($dataStore)) {
			$data = file_get_content($dataStore);
			$data = json_decode($data, true);
			return $data;
		} 

		return "Empty";
	}

	$dataStore = "../data/today.json"
	$data = getJsonData($dataStore);
	print_r($data);

?>