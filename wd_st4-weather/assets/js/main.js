$(document).ready(function() {

    jsonDatabase();

    $("nav a").bind("click", function(event) {

        if($(this).attr("class") == "active") {
            return;
        }

        $(".active").removeClass("active");
        $(this).addClass("active");

        databaseLoad($(this).attr("id"));
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

    }

})


function displayForecastData(infoToday) {
    
    if(!infoToday) {
        console.log("No information for today");
        return;
    }

    if(!checkForDataType(infoToday, "object")) {
        return;
    }

    // today is essentially a "new Date($.now())", but since there is no 
    // current day in database, the execution of the code loses its meaning
    var today = infoToday["today"];

    // Set current date
    $(".date").html(today.format("dddd dd/mm"));

    // Display info(time/temperature/icon)
    for(var i = 0; infoToday["forecast"][i]; i++) {

        var hourlyForecast = $("<div class=\"hourly-forecast clearfix\"><div class=\"forecast-date\"></div><div class=\"forecast-weather\"><div class=\"forecast-temperature\"></div><div class=\"forecast-icon\"><img src=\"\"/></div></div></div>")

    	var time = infoToday["forecast"][i]["time"];
    	var temperature = infoToday["forecast"][i]["temp"] + " &deg;";
    	var icon = getIconLink(infoToday["forecast"][i]["icon"]);

    	hourlyForecast.children(".forecast-date").html(time);
    	hourlyForecast.find(".forecast-temperature").html(temperature);
    	hourlyForecast.find("img").attr("src", icon);

        $(".forecast").append(hourlyForecast);

    	// Set current temperature/icon
    	if(time <= today.format("HH:MM")) {
  			$(".current-temperature").html(temperature);
  			$(".weather-icon").find("img").attr("src", icon);
    	}
    }
}

function getIconLink(iconName) {
	var iconsBase = {
		"Flash":"img/icons/001-flash.svg#flash",
		"Clear":"img/icons/002-sun.svg#sun",
		"Rain":"img/icons/003-rain.svg#rain",
		"Partly clouds":"img/icons/004-cloud-sun.svg#cloud-sun",
		"Clouds":"img/icons/005-cloud.svg#cloud"
	}

    if(!checkForDataType(iconName, "string")) {
        return;
    }

	if(iconsBase[iconName]) {
		return iconsBase[iconName]
	}

    console.log("Icon " + iconName + " hasn't been found");
	return false;
}

function checkForDataType(data, dataType) {

    if(!(typeof data == dataType)) {
        console.log("Incorrect data");
        console.log(data + ": " + typeof data);
        return false;
    }

    return true;
}