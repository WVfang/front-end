<?php
	
	$dataStore = "../jsons/data.json";
	$updatedData = $_POST;

	// Get data from json file
	if(file_get_contents($dataStore)) {
		$data = file_get_contents($dataStore);
		$data = json_decode($data, true);
	}

	
	if(@$updatedData["removing"]) {
		// Delete draggable div if $_POST includes "removing"
		unset($data["mes" . $updatedData["id"]]);
	} 
	else if(@$data["mes" . $updatedData["id"]]) {
		// Replace some info of draggable divs 
		foreach ($updatedData as $key => $value) {
			$data["mes" . $updatedData["id"]][$key] = $value;
		}
	} 
	else { 
		// Create new info-object (when user pushs btn "Add new")
		$data["mes" . $updatedData["id"]] = $updatedData;
	}

	// Push updated data to json file
	$data = json_encode($data, JSON_PRETTY_PRINT);
	$dStore = fopen($dataStore, "w");
	fwrite($dStore, $data);
	fclose($dStore);

?>