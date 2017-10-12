function jsonDatabase() {

    var dataStore = "data/today.json"

    $.getJSON(dataStore, function(data) {

        var today = new Date("Feb 17 2017 12:00:00");
        var todayForecast = {};
        todayForecast.today = today;

        // Choose data(info) for today
        todayForecast.forecast = chooseTodayForecast(data, today);
        
        // Call function to display received data
        displayForecastData(todayForecast);
    });

    function chooseTodayForecast(totalForecast, todayDate) {

        if(!(typeof totalForecast == "object" && typeof todayDate == "object")) {
            console.log("Incorrect data");
            console.log("totalData: " + totalForecast + "\ntype: " + typeof totalForecast +
                        "\ntodayDate: " + todayDate + "\ntype: " + typeof todayDate);
            return;
        }

        var todayForecast = [];

        for(var i = 0; totalForecast["list"][i]; i++) {

            var info = totalForecast["list"][i];
            var infoDate = new Date(info["dt_txt"]);

            if(infoDate.format("yyyy/mm/dd") == todayDate.format("yyyy/mm/dd")) {
                var forecastUnit = {};
                forecastUnit.time = new Date(info["dt_txt"]).format("HH:MM");
                forecastUnit.temp = Math.round((info["main"]["temp"] + KELVIN_IN_CELSIUS));
                forecastUnit.icon = info["weather"]["main"];
                
                todayForecast.push(forecastUnit);
            }
        }

        return todayForecast;
    }
}
