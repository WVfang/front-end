function sglDatabase() {

	$.post("assets/php/sql_database.php", function(json) {
		
		if(!json) {
			console.log("No information in database");
			return;
		}

		// array of objects which contains today's forecasts
		var data = JSON.parse(json); 

		var infoToday = {};
		infoToday.today = new Date(data["today"]);
		infoToday.forecast = [];

		for(var i = 0; data["forecast"][i]; i++) {
			var infoUnit = {};
			infoUnit.time = new Date(data["forecast"][i]["timestamp"]).format("HH:MM");
			infoUnit.temp = data["forecast"][i]["temperature"];
			infoUnit.icon = chooseIcon(data["forecast"][i]["clouds"], data["forecast"][i]["rain_possibility"]);

			infoToday.forecast.push(infoUnit);
		}

		// Call function to display received data
	    displayForecastData(infoToday);

	});


	function chooseIcon(clouds, rainPossibility) {

		if(!(checkForNumber(clouds) && checkForNumber(rainPossibility))) {
			console.log("Incorrect data");
			console.log(clouds + ": " + typeof clouds);
			console.log(rainPossibility + ": " + typeof rainPossibility);
			return;
		}

		if(clouds < 0 || clouds > 100) {
			console.log("Incorrect clouds index: " + clouds);
			return;
		}

		if(rainPossibility < 0 || rainPossibility > 1) {
			console.log("Incorrect rain possibility: " + rainPossibility);
			return;
		}



		if(rainPossibility > 0.5) {
			return "Rain";
		}

		if(clouds > 20) {
			return "Clouds";
		}

		return "Clear";
	}

	function checkForNumber(number) {

		if(typeof number == "number" || typeof number == "string") {
			return true;
		}

		return false;
	}
}
