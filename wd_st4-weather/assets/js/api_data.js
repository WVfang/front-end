function apiDatabase() {

    $.getJSON("http://dataservice.accuweather.com/locations/v1/search?q=Kirovohrad&apikey=4svGTMpz9d7A0i7oc34oMEHhYEF6Fedj", function(data) {

        var locationKey = data[0]["Key"];

        $.getJSON("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + locationKey + ".json?apikey=4svGTMpz9d7A0i7oc34oMEHhYEF6Fedj", function(data) {

            var today = new Date();
            var todaysInfo = {};

            todaysInfo.today = Date.parse(today);
            todaysInfo.forecast = selectTodaysInfo(data);

            // Call function to display received data
            displayForecastData(todaysInfo);

        });
    })

    function selectTodaysInfo(data) {

        if(!(typeof data == "object")) {
            console.log("Incorrect data");
            console.log("data: " + data + "\ntype: " + typeof data);
            return;
        }

        var todaysInfo = [];

        for(var i = 0; data[i]; i++) {

            var infoBlock = data[i];
            var forecastUnit = {};

            var timeInSeconds = timeAlignedOverTimeZone(new Date(data[i]["DateTime"]));

            forecastUnit.time = timeInSeconds*1000;
            forecastUnit.temp = fahrenheitIntoCentigrade(data[i]["Temperature"]["Value"]);
            forecastUnit.icon = data[i]["IconPhrase"];

            todaysInfo.push(forecastUnit);

        }

        return todaysInfo;
    }

    function fahrenheitIntoCentigrade(fahrenheit) {

        if(!(typeof fahrenheit == "number" || typeof fahrenheit == "string")) {
            console.log("Incorrect data");
            console.log("Fahrenheit: " + fahrenheit + "\ntype: " + typeof fahrenheit);
            return;
        }

        var centigrade = Math.round((5*(fahrenheit-32))/9);
        return centigrade;
    }

    function timeAlignedOverTimeZone(time) {

        if(!(typeof time == "object")) {
            console.log("Incorrect data");
            console.log("Time: " + time + "\ntype: " + typeof time);
            return;
        }

        var timeInSeconds = Date.parse(time)/1000; // convert milliseconds into seconds
        timeInSeconds = timeInSeconds + (time.getTimezoneOffset()*60); // *60 - convert minutes into seconds

        return timeInSeconds;
    }
}