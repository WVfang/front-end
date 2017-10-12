function apiDatabase() {

	$.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Kirovograd&APPID=e5899f03d2ec08fa1c95a34d30fd44e8", function(data) {
		
		var today = new Date();
        var infoToday = {};
        infoToday.today = today;

        // Choose data(info) for today
        infoToday.forecast = selectTodaysInfo(data, today);

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
        for(var i = 0; dataTotal["list"][i]; i++) {

            var info = dataTotal["list"][i];
            var infoDate = new Date(info["dt_txt"]);

            if(infoDate.format("yyyy/mm/dd") == todayDate.format("yyyy/mm/dd")) {
                var infoUnit = {};
                infoUnit.time = new Date(info["dt_txt"]).format("HH:MM");
                infoUnit.temp = Math.round((info["main"]["temp"] + KELVIN_IN_CELSIUS));
                infoUnit.icon = info["weather"][0]["main"];
                
                infoToday.push(infoUnit);
            }
        }

        return infoToday;
    }
}

