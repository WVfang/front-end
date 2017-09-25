<?php
	
	$dataStore = "../jsons/data.json";
	$updatedData = $_POST;

	/* get data from json file */
	if(file_get_contents($dataStore)) {
		$data = file_get_contents($dataStore);
		$data = json_decode($data, true);
	}

	/* create(or delete) element of array or edit existing */
	if(@$updatedData["removing"]) {
		unset($data[$updatedData["id"]]);
		array_values($data);
	} 

	else if(@$data[$updatedData["id"]]) {
		$data[$updatedData["id"]] = array_merge($data[$updatedData["id"]], $updatedData);
	} 

	else {
		$data[$updatedData["id"]] = $updatedData;
	}

	/* push updated data to json file */
	$data = json_encode($data, JSON_PRETTY_PRINT);
	$dStore = fopen($dataStore, "w");
	fwrite($dStore, $data);
	fclose($dStore);



	print_r($updatedData);

?>