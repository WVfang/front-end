$(document).ready(function() {

	var a = "Hello world";

	$.post("../php/json_database.php", {}, function(json) {
		console.log(json);
	})

	console.log(a);

});