<?php
	
	$dataStore = "../jsons/data.json";
	$updatedData = $_POST;

	// get data from json file
	if(file_get_contents($dataStore)) {
		$data = file_get_contents($dataStore);
		$data = json_decode($data, true);
	}

	// create(or delete) element of array or edit existing
	if(@$updatedData["removing"]) {
		// delete draggable div if $_POST includes "removing"
		unset($data["mes" . $updatedData["id"]]);
	} 

	else if(@$data["mes" . $updatedData["id"]]) {
		// replace some info of draggable divs (only content or only offset)
		foreach ($updatedData as $key => $value) {
			$data["mes" . $updatedData["id"]][$key] = $value;
		}
	} 

	else {
		// create new info-object (when user pushs btn "Add new")
		$data["mes" . $updatedData["id"]] = $updatedData;
	}

	// push updated data to json file
	$data = json_encode($data, JSON_PRETTY_PRINT);
	$dStore = fopen($dataStore, "w");
	fwrite($dStore, $data);
	fclose($dStore);

?>