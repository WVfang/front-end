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

	$.post("assets/php/data_save.php", messageData, function(data) {
		console.log(data);
	})
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