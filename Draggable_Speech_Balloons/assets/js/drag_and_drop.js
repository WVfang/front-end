var selectedMessage;

// Dragging functions
function drag_start(event) {
	selectedMessage = event.target;

	var style = window.getComputedStyle(event.target, null);
	event.originalEvent.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10)
	 - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
}

function drop(event) {
	var offset = event.dataTransfer.getData("text/plain").split(',');
	var dragElem = selectedMessage;

	var leftOffset = event.clientX + parseInt(offset[0], 10);
	var topOffset = event.clientY + parseInt(offset[1], 10);

	// Limits of left and top offset those depend on wrapper's(img) width/height and draggable element's widht/height
	var maxAllowedWidth = parseFloat(window.getComputedStyle(event.path[1], null).getPropertyValue("width")) - 
						  parseFloat(window.getComputedStyle(dragElem, null).getPropertyValue("width"));
	var maxAllowedHeight = parseFloat(window.getComputedStyle(event.path[1], null).getPropertyValue("height")) - 
						  (parseFloat(window.getComputedStyle(dragElem, null).getPropertyValue("height")) + 15); // + 15px for message "corner" at the bottom 

	var leftOffset = checkForOccurrenceInTheInterval(leftOffset, 0, maxAllowedWidth);
	var topOffset = checkForOccurrenceInTheInterval(topOffset, 0, maxAllowedHeight);

	dragElem.style.left = leftOffset + 'px';
	dragElem.style.top = topOffset + 'px';

	// Updating data of position of draggable elements
	updatingJsonData(selectedMessage.id, undefined, leftOffset, topOffset);

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
