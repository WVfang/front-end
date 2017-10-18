var selectedMesId;

function drag_start(event) {
	selectedMesId = event.target.id;

	var style = window.getComputedStyle(event.target, null);
	event.originalEvent.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), RADIX_10)
	 - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), RADIX_10) - event.clientY));
}

function drop(event) {
	var offset = event.dataTransfer.getData("text/plain").split(',');

	var leftOffset = event.clientX + parseInt(offset[0], RADIX_10);
	var topOffset = event.clientY + parseInt(offset[1], RADIX_10);

	// Limits of left and top offset those depend on wrapper's(img) width/height and draggable element's widht/height
	var dragElem = $("#" + selectedMesId);
	var maxAllowedWidth = $("#drag-space").width() - dragElem.outerWidth();
	var maxAllowedHeight = $("#drag-space").height() - dragElem.outerHeight() - SPACE_OF_MESSAGE_TAIL; 
	var leftOffset = checkForOccurrenceInTheInterval(leftOffset, 0, maxAllowedWidth);
	var topOffset = checkForOccurrenceInTheInterval(topOffset, 0, maxAllowedHeight);
	
	// Updating data of position of draggable elements only when server returns "success"
	updatingJsonData({"id": selectedMesId, "leftOffset": leftOffset, "topOffset": topOffset},
	 function() {
	 	dragElem.css({
			"left": leftOffset,
			"top": topOffset
		});
	});
	
	event.preventDefault();
	return false;
}

function drag_over(event) {
	event.preventDefault();
	return false;
}

// Check whether numbers are in interval
function checkForOccurrenceInTheInterval(number, minAllowed, maxAllowed) {

	if(!dataTypeCheck({[typeof number]: "number",
						[typeof minAllowed]: "number",
						[typeof maxAllowed]: "number"})) {
		console.log("Incorrect data");
		return;
	}

	if(number < minAllowed) {
		return minAllowed;
	}

	if(number > maxAllowed) {
		return maxAllowed;
	}

	return number;
}
