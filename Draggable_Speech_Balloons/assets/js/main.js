$(document).ready(function() {

	var dragElements = document.querySelectorAll("div.draggable-phrase");
	var dragSpace = document.getElementById("image-wrapper");
	var btnAddDiv = document.getElementById("btn-add-div");
	var messageId = 0;

	// Add dragover&drop listeners to draggable space
	dragSpace.addEventListener("dragover", drag_over);
	dragSpace.addEventListener("drop", drop);

	// Display messages
	$.getJSON("assets/jsons/data.json", {}, function(data) {

		// Find the length of the object
		var dataLength = 0, key;
		for (key in data) {
	        if (data.hasOwnProperty(key)) {
	        	dataLength++;
	    	}
	    }

	    if(!dataLength > 0) {
			console.log("Data storage is empty");
			return;
		}

		var dataKeys = Object.keys(data);
		messageId = parseInt(dataKeys[dataKeys.length-1].replace(/mes/, "")) + 1;

		// Add divs into image-wrapper, set their position, add listener and make them editable
		for(var i = 0; i < dataLength; i++) {
			$("#image-wrapper").append("<div id=\"" + data[dataKeys[i]]["id"] + "\" class=\"draggable-phrase\" draggable=\"true\">" + data[dataKeys[i]]["content"] + "</div>");
			$("#image-wrapper .draggable-phrase:last-child")
				.css({
					"left": data[dataKeys[i]]["leftOffset"] + 'px',
					"top": data[dataKeys[i]]["topOffset"] + 'px'
				})
				.on("dragstart", drag_start)
				.editable();
		}
	});		

	// Function on btn click to add draggable div
	btnAddDiv.onclick = function() {
		$("#image-wrapper").append("<div id=\"" + messageId + "\" class=\"draggable-phrase\" draggable=\"true\">Hello world!</div>");
		$("#image-wrapper .draggable-phrase:last").on("dragstart", drag_start).editable();

		// Updating data of position of draggable elements (primary location in the upper-left corner)
		updatingJsonData(messageId, $("#image-wrapper .draggable-phrase:last").html(), 0, 0);

		messageId++;
	}

});
