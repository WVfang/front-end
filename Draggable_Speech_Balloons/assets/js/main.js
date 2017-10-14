$(document).ready(function() {
	
	var addDiv = $("#btn-add-div");
	var messageId = 0; 

	// Add dragover&drop listeners to draggable space
	setListeners();

	// Display messages 
	$.getJSON("assets/jsons/data.json", {}, function(data) {

		if(!(typeof data == "object")) {
			console.log("Incorrect data");
			console.log("data: " + data + "\ntype: " + typeof data);
			return;
		}

		// Find the length of the object
		var dataLength = getObjectLength(data);
	    if(!dataLength) {
			return;
		}

		// Get id of last message 
		var dataKeys = Object.keys(data);
		// Get the last key of object and use it to get its id
		messageId = parseInt(data[dataKeys[dataKeys.length-1]]["id"]) + 1;

		// Add divs into drag-space, set their position, add listener and make them editable
		displayData(data, dataKeys);
	});		

	// Function on btn click to add draggable div
	addDiv.bind("click", function() {
		$("#drag-space").append("<div id=\"" + messageId + "\" class=\"draggable-phrase\" draggable=\"true\">Hello world!</div>");
		$("#drag-space .draggable-phrase:last").on("dragstart", drag_start).editable();

		// Updating data of position of draggable elements (starting location in the upper-left corner)
		updatingJsonData(messageId, $("#drag-space .draggable-phrase:last").html(), undefined, undefined);
		messageId++;
	});

	function setListeners() {
		var dragSpace = document.getElementById("drag-space");

		dragSpace.addEventListener("dragover", drag_over);
		dragSpace.addEventListener("drop", drop);
	}

	function getObjectLength(object) {

		if(object.length == 0) {
			console.log("Empty database");
			return;
		} 

		if(!(typeof object == "object")) {
			console.log("Incorrect data");
			console.log("data: " + object + "\ntype: " + typeof object);
			return;
		}

		var dataLength = 0, key;
		for (key in object) {
	        if (object.hasOwnProperty(key)) {
	        	dataLength++;
	    	}
	    }

	    if(!dataLength > 0) {
			console.log("Incorrect dataLength: " + dataLength);
			return;
		}

		return dataLength;
	}

	function displayData(data, keys) {

		if(!(typeof data == "object" && typeof keys == "object")) {
			console.log("Incorrect data");
			console.log("data: " + data + "\ntype: " + typeof data + "\nkeys: " + keys + "\ntype: " + typeof keys);
			return;
		}

		for(var i = 0; keys[i]; i++) {
			$("#drag-space").append("<div id=\"" + data[keys[i]]["id"] + "\" class=\"draggable-phrase\" draggable=\"true\">" + data[keys[i]]["content"] + "</div>");
			$("#drag-space .draggable-phrase:last")
				.css({
					"left": data[keys[i]]["leftOffset"] + 'px',
					"top": data[keys[i]]["topOffset"] + 'px'
				})
				.on("dragstart", drag_start)
				.editable();
		}
	}

});
