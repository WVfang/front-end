// Update jsonData when user edits or moves draggable divs 
function updatingJsonData(data, functionOnSuccess) {

	if(!(dataTypeCheck({[typeof data]: "object"}))) {
		console.log("Incorrect data");
		return;
	}

	if(!(data["id"] >= 0)) {
		console.log("Incorrect id");
		return;
	}

	if(data["content"] == undefined && data["leftOffset"] != undefined && data["topOffset"] != undefined) {
		if(!(data["leftOffset"] >= 0 && data["topOffset"] >= 0)) {
			console.log("Incorrect data");
			return;
		}
	}

	$.post("assets/php/data_save.php", data)
		.done(function() {
		    console.log("Data save success");
		    functionOnSuccess();
		})
		.fail(function(xhr, event) {
			errorLogs(xhr, event);
		})
		.always(function() {
			console.log("Request finished");
		});
}

function dataTypeCheck(object) { // data - object o format {typeof data: required dataTypes...}
	
	for(dataType in object) {

		var requiredType = object[dataType];

		if(typeof requiredType == "object") { // if we have a choice of the required data types

			var matchFound = false;
			for(var i = 0; requiredType[i]; i++) {
				if(dataType == requiredType[i]) {
					var matchFound = true;
					break;
				}
			}

			if(matchFound) {
				continue;
			} else {
				console.log("Incorrect data. " + dataType + ", required " + requiredType);
				return false;
			}

		} else if (typeof requiredType == "string") { // if we have the only one required data type

			if(dataType == requiredType) {
				continue;
			} else {
				console.log("Incorrect data. " + dataType + ", required " + requiredType);
				return false;
			}
		}
	}
	
	return true;
}

function errorLogs(xhr, event) {
	
	console.log("Error");

	if (xhr.status==0) {
        console.log("Please Check Your Network.");
    } else if(xhr.status == 404) {
        console.log("Requested URL not found.");
    } else if(xhr.status == 500) {
        console.log("Internel Server Error.");
    } else if(event == "parsererror") {
        console.log("Parsing JSON Request failed.");
    } else if(event == "timeout"){
        console.log("Request Time out.");
    } else {
        console.log("Unknow Error.\n" + xhr.responseText);
    }
	
}