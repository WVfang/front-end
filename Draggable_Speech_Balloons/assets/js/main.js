$(document).ready(function() {
	
	var dragSpace = document.getElementById("drag-space");
	var btnAddDiv = $("#btn-add-div");
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

		// Get id of last message 
		var dataKeys = Object.keys(data);
		messageId = parseInt(dataKeys[dataKeys.length-1].replace(/mes/, "")) + 1;

		// Add divs into drag-space, set their position, add listener and make them editable
		for(var i = 0; i < dataLength; i++) {
			$("#drag-space").append("<div id=\"" + data[dataKeys[i]]["id"] + "\" class=\"draggable-phrase\" draggable=\"true\">" + data[dataKeys[i]]["content"] + "</div>");
			$("#drag-space .draggable-phrase:last-child")
				.css({
					"left": data[dataKeys[i]]["leftOffset"] + 'px',
					"top": data[dataKeys[i]]["topOffset"] + 'px'
				})
				.on("dragstart", drag_start)
				.editable();
		}
	});		

	// Function on btn click to add draggable div
	btnAddDiv.bind("click", function() {
		$("#drag-space").append("<div id=\"" + messageId + "\" class=\"draggable-phrase\" draggable=\"true\">Hello world!</div>");
		$("#drag-space .draggable-phrase:last").on("dragstart", drag_start).editable();

		// Updating data of position of draggable elements (primary location in the upper-left corner)
		updatingJsonData(messageId, $("#drag-space .draggable-phrase:last").html(), 0, 0);

		messageId++;
	});
	
});
