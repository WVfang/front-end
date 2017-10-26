<?php
	define("HOST", "localhost");
	define("DB_USER", "postgres");
	define("DB_PASSWORD", "sql_P23WV");
	
	

	function connectToDatabase($dbName) {
		$dbconn = pg_connect("host=" . HOST . " dbname=" . $dbName . " user=" . DB_USER . " password=" . DB_PASSWORD)
			or die("Could not connect: " . pg_last_error());

		return $dbconn;
	}

	function createTableIfNotExists() {
		$query = "CREATE TABLE IF NOT EXISTS public.messages (id SERIAL PRIMARY KEY, content text, left_ int, top int, date_of_creation timestamp)";

		pg_query($query) or die("Table wasn't created: " . pg_last_error());

		return true;
	}
?>