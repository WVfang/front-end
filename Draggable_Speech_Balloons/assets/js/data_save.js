// Update jsonData when user edits or moves draggable divs 
function updatingJsonData(id, content, leftOffset, topOffset, removing) {

	if(!(typeof parseInt(id) == "number") || parseInt(id) < 0) {
		console.log("Incorrect data");
		console.log(id + ": " + typeof id);
		return;
	}

	if(!(typeof content == "string" || typeof content == "undefined")) {
		console.log("Incorrect data");
		console.log(content + ": " + typeof content);
		return;
	}

	if((!(typeof leftOffset == "number" || typeof leftOffset == "undefined") || leftOffset < 0) ||
		(!(typeof topOffset == "number" || typeof topOffset == "undefined") || topOffset < 0)) {
		console.log("Incorrect data");
		console.log(leftOffset + ": " + typeof leftOffset);
		console.log(topOffset + ": " + typeof topOffset);
		return;
	}

	var messageData = {};
	messageData.id = id;
	messageData.content = content;
	messageData.leftOffset = leftOffset;
	messageData.topOffset = topOffset;

	if(removing) {
		messageData.removing = true;
	}

	$.post("assets/php/data_save.php", messageData);
}
