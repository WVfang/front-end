var selectedMesId;

// Dragging functions
function drag_start(event) {
	selectedMesId = event.target.id;

	var style = window.getComputedStyle(event.target, null);
	event.originalEvent.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10)
	 - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
}

function drop(event) {
	var offset = event.dataTransfer.getData("text/plain").split(',');

	var leftOffset = event.clientX + parseInt(offset[0], 10);
	var topOffset = event.clientY + parseInt(offset[1], 10);

	// Limits of left and top offset those depend on wrapper's(img) width/height and draggable element's widht/height
	var dragElem = $("#" + selectedMesId);
	var dragSpace = $("#image-wrapper");
	var maxAllowedWidth = dragSpace.width() - dragElem.outerWidth();
	var maxAllowedHeight = dragSpace.height() - dragElem.outerHeight() - 15; // + 15px for message "corner" at the bottom 

	var leftOffset = checkForOccurrenceInTheInterval(leftOffset, 0, maxAllowedWidth);
	var topOffset = checkForOccurrenceInTheInterval(topOffset, 0, maxAllowedHeight);
	
	dragElem.css({
		"left": leftOffset + 'px',
		"top": topOffset + 'px'
	});

	// Updating data of position of draggable elements
	updatingJsonData(selectedMesId, undefined, leftOffset, topOffset);
	
	event.preventDefault();
	return false;
}

function drag_over(event) {
	event.preventDefault();
	return false;
}

// Check whether numbers are in interval
function checkForOccurrenceInTheInterval(number, minAllowed, maxAllowed) {

	if(!(typeof number == "number")) {
		console.log("Incorrect data");
		console.log(number + ": " + typeof number);
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
