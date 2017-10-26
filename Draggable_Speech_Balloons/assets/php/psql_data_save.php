<?php
	
	include("psql_php_scripts.php");

	// Get post data and test it
	$updatedData;
	if(isset($_POST["id"])) {
		$id = intval($_POST["id"]);
	}
	if(isset($_POST["removing"])) {
		$removing = $_POST["removing"];
	}
	if(isset($_POST["content"])) {
		$updatedData["content"] = strip_tags($_POST["content"]);
		$updatedData["content"] = htmlspecialchars($updatedData["content"]);
		$updatedData["content"] = "'" . $updatedData["content"] . "'";
	}
	if(isset($_POST["left"])) {
		$updatedData["left_"] = intval($_POST["left"]);
	}
	if(isset($_POST["top"])) {
		$updatedData["top"] = intval($_POST["top"]);
	}

	// Connection to the server, choose DB
	$dbconn = connectToDatabase("mydb");

	// Create table if it doesn't exist
	createTableIfNotExists();

	// If updatedData hasn't id, we create new info row adding date of creation to find last created message and return its id
	if(!isset($id)) {
		$query = "INSERT INTO
			messages(content, left_, top, date_of_creation)
			VALUES("
				. $updatedData["content"] . ","
				. $updatedData["left_"] . ","
				. $updatedData["top"] . ","
				. "'" . date("Y-m-d H:i:s") . "'" .
			")";
		pg_query($query) or die("Row wasn't created: " . pg_last_error());	
		getIdOfTheLastCreatedRow();
	} else if(isset($removing)) {
		$query = "DELETE FROM messages WHERE id = " . $id;
		pg_query($query) or die("Row haven't removed: " . pg_last_error());
	} else {
		foreach ($updatedData as $key => $value) {
			$query = "UPDATE messages SET $key = $value WHERE id = " . $id;
			pg_query($query) or die("Row wasn't created: " . pg_last_error());
		}	
	}

	// Get id of the last created message
	function getIdOfTheLastCreatedRow() {
		$query = "SELECT max(id) FROM messages";
		$result = pg_query($query) or die("Query error: " . pg_last_error());
		$data = pg_fetch_array($result, null, PGSQL_ASSOC);
		$data = json_encode($data, JSON_PRETTY_PRINT);
		print_r($data);
	}
	
	// Close connection with DB
	pg_close($dbconn);

?>