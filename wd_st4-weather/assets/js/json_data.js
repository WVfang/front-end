function jsonDatabase() {

    var dataStore = "data/today.json"

    $.getJSON(dataStore, function(data) {

        var today = new Date("Feb 17 2017 12:00:00");
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
                infoUnit.icon = info["weather"]["main"];
                
                infoToday.forecast.push(infoUnit);
            }
        }

        // Call function to display received data
        displayForecastData(infoToday);
    });
}
