$(document).ready(function() {
	console.log("DB-request");
	
	$.post("assets/php/psql_data_save.php")
		.done(function(data) {
			console.log(data);
			$("#DB-info").append(data);
		})
		.fail(function(xhr, event) {
			errorLogs(xhr, event);
		});
});