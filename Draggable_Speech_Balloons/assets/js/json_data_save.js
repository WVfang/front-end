$(document).ready(function() {

	function getJSONData() {

		var data;
		$.getJSON("json/data.json", function(json) {
			console.log(json);
		});

	}

})