<?php
	
	$dbconn = pg_connect("host = localhost dbname = mydb user=postgres password=postgres_24main")
		or die("Could not connect: " . pg_last_error());

	$query = "CREATE TABLE IF NOT EXISTS public.towns (i integer)";
	$result = pg_query($query) or die("Table wasn't created: " .pg_last_error());

	$query = "SELECT * FROM cities";
	$result = pg_query($query) or die("Query error: " . pg_last_error());

	echo "<table>\n";
	while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
		echo "\t<tr>\n";
		foreach ($line as $col_value) {
			echo "\t\t<td>$col_value<\td>\n";
		}
		echo "\t<\tr>\n";
	}
	echo "<\table>\n";

	pg_free_result($result);

	pg_close($dbconn);

?>