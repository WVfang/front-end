$(document).ready(function() {
	
	var btnAddDiv = $("#btn-add-div");
	var messageId = 0; 

	// Add dragover&drop listeners to draggable space
	setListeners();

	// Display messages 
	$.getJSON("assets/jsons/data.json", {}, function(data) {

		// Find the length of the object
		var dataLength = getObjectLength(data);
	    if(!dataLength) {
			return;
		}

		// Get id of last message 
		var dataKeys = Object.keys(data);
		messageId = parseInt(data[dataKeys[dataKeys.length-1]]["id"]) + 1;

		// Add divs into drag-space, set their position, add listener and make them editable
		displayData(data, dataKeys);
	});		

	// Function on btn click to add draggable div
	btnAddDiv.bind("click", function() {
		$("#drag-space").append("<div id=\"" + messageId + "\" class=\"draggable-phrase\" draggable=\"true\">Hello world!</div>");
		$("#drag-space .draggable-phrase:last").on("dragstart", drag_start).editable();

		// Updating data of position of draggable elements (starting location in the upper-left corner)
		updatingJsonData(messageId, $("#drag-space .draggable-phrase:last").html(), 0, 0);
		messageId++;
	});

	function setListeners() {
		var dragSpace = document.getElementById("drag-space");

		dragSpace.addEventListener("dragover", drag_over);
		dragSpace.addEventListener("drop", drop);
	}

	function getObjectLength(object) {
		
		if(!object) {
			console.log("Empty database");
			return;
		} 

		if(!checkForDataType(object, "object")) {
			return;
		}

		var dataLength = 0, key;
		for (key in object) {
	        if (object.hasOwnProperty(key)) {
	        	dataLength++;
	    	}
	    }

	    if(!dataLength > 0) {
			console.log("Data storage is empty");
			return false;
		}

		return dataLength;
	}

	function displayData(data, keys) {

		if(!(checkForDataType(data, "object") && checkForDataType(keys, "object"))) {
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
