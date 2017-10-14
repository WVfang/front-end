function sglDatabase() {

	$.post("assets/php/sql_database.php", function(json) {
		
		if(json.length == 0) {
			console.log("No information in database");
			return;
		}
		
		// Array of objects which contains today's forecasts
		var data = JSON.parse(json); 

		var infoToday = {};
		infoToday.today = data["today"]; // Date is already in seconds 
		infoToday.forecast = getTodayForecast(data["forecast"], data["today"]);

		// Call function to display received data
	    displayForecastData(infoToday);

	});

	function getTodayForecast(data, date) {

		if(!(typeof data == "object" && typeof date == "number")) {
			console.log("Incorrect data");
			console.log("data: " + data + "\ntype: " + typeof data
						+ "\ndate: " + date + "\ntype: " + typeof date);
			return;
		}

		var todayForecast = [];

		for(var i = 0; data[i]; i++) {

			var forecastBlock = data[i];
			var forecastBlockTime = new Date(forecastBlock["timestamp"]);

			// Add forecast unit only when it's date equals today's date
			if(forecastBlockTime.format("yyyy/mm/dd") == new Date(date).format("yyyy/mm/dd")) {
				var forecastUnit = {};
				forecastUnit.time = Date.parse(new Date(forecastBlock["timestamp"]));
				forecastUnit.temp = forecastBlock["temperature"];
				forecastUnit.icon = chooseIcon(forecastBlock["clouds"], forecastBlock["rain_possibility"]);

				todayForecast.push(forecastUnit);
			}
		}

		return todayForecast;
	}


	function chooseIcon(clouds, rainPossibility) {

		if(!((typeof clouds == "number" || typeof clouds == "string") &&
			 (typeof rainPossibility == "number" || typeof rainPossibility == "string"))) {
			console.log("Incorrect data");
			console.log("clouds: " + clouds + ": " + typeof clouds);
			console.log("rainPos: " + rainPossibility + ": " + typeof rainPossibility);
			return;
		}

		if(clouds < 0 || clouds > 100) { // clouds is percents
			console.log("Incorrect clouds index: " + clouds);
			return;
		}

		if(rainPossibility < 0 || rainPossibility > 1) { // rainPossibility is float
			console.log("Incorrect rain possibility: " + rainPossibility);
			return;
		}


		// Rain posibility more than 50%
		if(rainPossibility >= 0.5) {
			return "Rain";
		}

		// Cloud more than 20%
		if(clouds >= 20) {
			return "Clouds";
		}

		if(clouds >= 10 && clouds < 20) {
			return "Partly clouds";
		}

		return "Clear";
	}
}
