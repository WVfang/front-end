function sglDatabase() {

	$.post("assets/php/sql_database.php", function(json) {
		
		if(!json) {
			console.log("No information in database");
			return;
		}

		// Array of objects which contains today's forecasts
		var data = JSON.parse(json); 

		var infoToday = {};
		infoToday.today = new Date(data["today"]);
		infoToday.forecast = getTodayForecast(data["forecast"]);

		// Call function to display received data
	    displayForecastData(infoToday);

	});

	function getTodayForecast(data) {

		if(!(typeof data == "object")) {
			console.log("Incorrect data");
			console.log("data: " + data + "\ntype: " + typeof data);
			return;
		}

		var todayForecast = [];

		for(var i = 0; data[i]; i++) {
			var infoUnit = {};
			infoUnit.time = new Date(data[i]["timestamp"]).format("HH:MM");
			infoUnit.temp = data[i]["temperature"];
			infoUnit.icon = chooseIcon(data[i]["clouds"], data[i]["rain_possibility"]);

			todayForecast.push(infoUnit);
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

		if(clouds < 0 || clouds > 100) {
			console.log("Incorrect clouds index: " + clouds);
			return;
		}

		if(rainPossibility < 0 || rainPossibility > 1) {
			console.log("Incorrect rain possibility: " + rainPossibility);
			return;
		}


		// Rain posibility more than 50%
		if(rainPossibility > 0.5) {
			return "Rain";
		}

		// Cloud more than 20%
		if(clouds > 20) {
			return "Clouds";
		}

		return "Clear";
	}
}
