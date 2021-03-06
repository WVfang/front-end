$(document).ready(function() {

    jsonDatabase();

    // Load data when one of the buttons(JSON, DATABASE or API) is clicked
    $("nav a").bind("click", function(event) {

        if($(this).attr("class") == "active") {
            return;
        }

        $(".active").removeClass("active");
        $(this).addClass("active");

        databaseLoad($(this).attr("id"));
    });

});

function databaseLoad(buttonId) {

    $(".forecast").empty();
    if(buttonId == "btn-json") {
        jsonDatabase();
        return;
    }

    if(buttonId == "btn-sql") {
        sglDatabase();
        return;
    }

    if(buttonId == "btn-api") {
        apiDatabase();
        return;
    }

}


function displayForecastData(infoToday) {

    if(!infoToday) {
        console.log("No information for today");
        return;
    }

    if(!(typeof infoToday == "object")) {
        console.log("Incorrect data");
        console.log("infoToday: " + infoToday + "\ntype: " + typeof infoToday);
        return;
    }

    // today is essentially a "new Date($.now())", but since there is no 
    // current day in SQL and JSON databases, the execution of the code loses its meaning
    var today = infoToday["today"]; // today is date in seconds

    // Set current date 
    $(".date").html(new Date(today).format("dddd dd/mm"));

    // Display info(time/temperature/icon)
    displayData(infoToday["forecast"], today);
}

function displayData(data, todayDate) {

    if(!(typeof data == "object" && typeof todayDate == "number")) {
        console.log("Incorrect data");
        console.log("data: " + data + "\ntype: " + typeof data +
                    "todayDate: " + todayDate + "\ntype: " + typeof todayDate);
        return;
    }

    for(var i = 0; data[i]; i++) {

        var hourlyForecast = $("<div class=\"hourly-forecast clearfix\"><div class=\"forecast-date\"></div><div class=\"forecast-weather\"><div class=\"forecast-temperature\"></div><div class=\"forecast-icon\"><img src=\"\"/></div></div></div>")
        
        var time = (new Date(data[i]["time"])).format("HH:MM");
        var temperature = data[i]["temp"] + " &deg;";
        var icon = getIconLink(data[i]["icon"]);

        hourlyForecast.children(".forecast-date").html(time);
        hourlyForecast.find(".forecast-temperature").html(temperature);
        hourlyForecast.find("img").attr("src", icon);

        $(".forecast").append(hourlyForecast);

        // Set current temperature/icon
        var forecastDate = Date.parse(new Date(data[i]["time"]));
        if(forecastDate <= todayDate) {
            $(".current-temperature").html(temperature);
            $(".weather-icon").find("img").attr("src", icon);
        }
    }
}

function getIconLink(iconName) {

    if(!(typeof iconName == "string")) {
        console.log("Incorrect data");
        console.log("iconName: " + iconName + "\ntype: " + typeof iconName);
        return;
    }

    if(iconName == "Cloudy") iconName = "Clouds";
    if(iconName == "Mostly cloudy") iconName = "Clouds";
    if(iconName == "Intermittent clouds") iconName = "Partly clouds";
    if(iconName == "Partly cloudy") iconName = "Partly clouds";
    if(iconName == "Showers") iconName = "Rain";

	var iconsBase = {
		"Flash":        "assets/img/icons/001-flash.svg#flash",
		"Clear":        "assets/img/icons/002-sun.svg#sun",
		"Rain":         "assets/img/icons/003-rain.svg#rain",
		"Partly clouds":"assets/img/icons/004-cloud-sun.svg#cloud-sun",
		"Clouds":       "assets/img/icons/005-cloud.svg#cloud"
	}

	if(iconsBase[iconName]) {
		return iconsBase[iconName];
	}

    console.log("Icon " + iconName + " hasn't been found");
	return false;
}