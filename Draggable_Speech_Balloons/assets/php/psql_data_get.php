<?php
	
	include("psql_php_scripts.php");

	// Connection to the server, choose DB
	$dbconn = connectToDatabase("mydb");

	// Create table if it doesn't exist
	createTableIfNotExists();

	// Get information
	$query = "SELECT id, content, left_ AS left, top FROM messages";
	$result = pg_query($query) or die("Query error: " . pg_last_error());

	// Get data
	for($i = 0; $line = pg_fetch_array($result, null, PGSQL_ASSOC); $i++) {
		foreach ($line as $key => $value) {
			$data[$i][$key] = $value;
		}
	}

	// Create JSON data and send it to js script
	if(@$data) {
		$data = json_encode($data, JSON_PRETTY_PRINT);
		print_r($data);	
	} else {
		$data["empty"] = "Empty";
		$data = json_encode($data, JSON_PRETTY_PRINT);
		print_r($data);
	}
	
	// Clean result
	pg_free_result($result);

	// Close connection with DB
	pg_close($dbconn);

?>