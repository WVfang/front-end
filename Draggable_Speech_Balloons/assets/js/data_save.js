// Update jsonData when user edits or moves draggable divs 
function updatingJsonData(id, content, leftOffset, topOffset, removing) {

	if(!((typeof parseInt(id) == "number" && parseInt(id) >= 0) &&
	    (typeof content == "string" || typeof content == "undefined") &&
	   ((typeof leftOffset == "number" && leftOffset >= 0) || typeof leftOffset == "undefined") &&
	   ((typeof topOffset == "number" && topOffset >= 0) || typeof topOffset == "undefined"))
	) {
		console.log("Incorrect data");
		console.log("id: " + id + " type: " + typeof id + 
					"content: " + content + " type: " + typeof content + 
					"leftOffset: " + leftOffset + " type: " + typeof leftOffset + 
					"topOffset: " + topOffset + " type: " + typeof topOffset);
		return;
	}

	var messageData = {
		"id": id,
		"content": content,
		"leftOffset": leftOffset,
		"topOffset": topOffset
	};

	if(removing) {
		messageData.removing = true;
	}

	$.post("assets/php/data_save.php", messageData)
		.done(function() {
		    console.log("Data save success");
		})
		.fail(function() {
		    console.log("Data save error");
		})
		.always(function() {
			console.log("Data save finished");
		});
}

function checkForDataType(data, dataType) {

	if(!(typeof dataType == "string")) {
		console.log("Incorrect data");
		console.log("dataType: " + dataType + " type: " + typeof dataType);
		return;
	}

	if(!(typeof data == dataType)) {
		console.log("Incorrect data");
		console.log(checkForDataType.caller);
		console.log("data: " + data + " type: " + typeof data + "(required: " + dataType + ")");
		return false;
	}

	return true;
}