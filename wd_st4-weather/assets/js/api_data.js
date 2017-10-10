function apiDatabase() {

	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Kirovograd&APPID=e5899f03d2ec08fa1c95a34d30fd44e8", function(data) {
		console.log(data);

		var today = new Date();
        var infoToday = {};
        infoToday.today = today;
        infoToday.forecast = [];

        // Choose data(info) for today
        for(var i = 0; data["list"][i]; i++) {

            var info = data["list"][i];
            var infoDate = new Date(info["dt_txt"]);

            if(infoDate.format("yyyy/mm/dd") == today.format("yyyy/mm/dd")) {
                var infoUnit = {};
                infoUnit.time = new Date(info["dt_txt"]).format("HH:MM");
                infoUnit.temp = Math.round((info["main"]["temp"] - 273));
                infoUnit.icon = info["weather"][0]["main"];
                
                infoToday.forecast.push(infoUnit);
            }
        }

        // Call function to display received data
        displayForecastData(infoToday);
	});
}

