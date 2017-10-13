function apiDatabase() {

	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Kirovograd&APPID=e5899f03d2ec08fa1c95a34d30fd44e8", function(data) {
		
		var today = new Date();
        var infoToday = {};
        infoToday.today = today;

        // Choose data(info) for today
        infoToday.forecast = selectTodaysInfo(data["list"], today);

        // Call function to display received data
        displayForecastData(infoToday);
	});

    function selectTodaysInfo(dataTotal, todayDate) {

        if(!(typeof dataTotal == "object" && typeof todayDate == "object")) {
            console.log("Incorrect data");
            console.log("data: " + dataTotal + "\ntype: " + typeof dataTotal +
                        "today: " + todayDate + "\ntype: " + typeof todayDate);
        }

        var infoToday = [];
        for(var i = 0; dataTotal[i]; i++) {

            var infoBlock = dataTotal[i];
            var infoBlockDate = new Date(infoBlock["dt_txt"]);

            if(infoBlockDate.format("yyyy/mm/dd") == todayDate.format("yyyy/mm/dd")) {
                var forecastUnit = {};
                forecastUnit.time = new Date(infoBlock["dt_txt"]).format("HH:MM");
                forecastUnit.temp = Math.round((infoBlock["main"]["temp"] + KELVIN_IN_CELSIUS));
                forecastUnit.icon = infoBlock["weather"][0]["main"];
                
                infoToday.push(forecastUnit);
            }
        }

        return infoToday;
    }
}

