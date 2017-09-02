<?php
	
	$name = $_POST["name"];
	$password = $_POST["password"];

	mysql_connect("localhost", "root", "") or die(mysql_error());
	mysql_query("CREATE DATABASE ajax_chat");
	mysql_query("CREATE TABLE people (
		id INT AUTO_INCREMENT,
		Login VARCHAR,
		Password VARCHAR
		PRIMARY KEY(id)
	)") or die(mysql_error());

	$strSQL = "INSERT INTO people(Login, Password) VALUES($name, $password)";
	mysql_query($strSQL) or die(mysql_error());

	mysql_close();

?>