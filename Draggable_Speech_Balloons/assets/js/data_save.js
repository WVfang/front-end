// Update jsonData when user edits or moves draggable divs 
function updatingJsonData(id, content, leftOffset, topOffset, removing) {

	if(!(typeof parseInt(id) == "number" && parseInt(id) > 0 &&
	   (typeof content == "string" || typeof content == "undefined") &&
	   (typeof leftOffset == "number" || typeof leftOffset == "undefined") && leftOffset > 0 &&
	   (typeof topOffset == "number" || typeof topOffset == "undefined") && topOffset > 0)
	) {
		console.log("Incorrect data");
		console.log("id: " + id + " type: " + typeof id + "\ncontent: " + content + " type: " + typeof content 
			+ "\nleftoffset: " + leftOffset + " type: " + typeof leftOffset + "\ntopOffset: " + topOffset  + " type: " + typeof topOffset);
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
