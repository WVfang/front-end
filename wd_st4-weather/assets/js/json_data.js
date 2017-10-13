function jsonDatabase() {

    var dataStore = "data/today.json"

    $.getJSON(dataStore, function(data) {

        var today = Date.parse(new Date("Feb 17 2017 12:00:00"));
        var todayForecast = {};

        todayForecast.today = today;
        todayForecast.forecast = chooseTodayForecast(data["list"], today);
        
        // Call function to display received data
        displayForecastData(todayForecast);
    });

    function chooseTodayForecast(totalForecast, todayDate) {

        if(!(typeof totalForecast == "object" && typeof todayDate == "number")) {
            console.log("Incorrect data");
            console.log("totalData: " + totalForecast + "\ntype: " + typeof totalForecast +
                        "\ntodayDate: " + todayDate + "\ntype: " + typeof todayDate);
            return;
        }

        var todayForecast = [];

        for(var i = 0; totalForecast[i]; i++) {

            var infoBlock = totalForecast[i];
            var infoBlockDate = new Date(infoBlock["dt_txt"]);

            // Select only data where date equals to today's date
            if(infoBlockDate.format("yyyy/mm/dd") == new Date(todayDate).format("yyyy/mm/dd")) {
                var forecastUnit = {};
                forecastUnit.time = Date.parse(new Date(infoBlock["dt_txt"]));
                forecastUnit.temp = Math.round((infoBlock["main"]["temp"] + KELVIN_IN_CELSIUS));
                forecastUnit.icon = infoBlock["weather"]["main"];
                
                todayForecast.push(forecastUnit);
            }
        }

        return todayForecast;
    }
}
