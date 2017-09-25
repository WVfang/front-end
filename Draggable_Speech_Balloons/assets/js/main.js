$(document).ready(function() {

	var dragElements = document.querySelectorAll("div.draggable-phrase");
	var dragSpace = document.getElementById("image-wrapper");
	var btnAddDiv = document.getElementById("btn-add-div");
	var selectedMessage;
	var messageId = 0;

	// Add dragover&drop listeners to draggable space
	dragSpace.addEventListener("dragover", drag_over);
	dragSpace.addEventListener("drop", drop);

	// Display messages
	$.getJSON("assets/jsons/data.json", {}, function(data) {

		// Find the length of the object
	
	    if(!data.length > 0) {
			console.log("Data storage is empty");
			return;
		}

		messageId = parseInt(data[data.length-1]["id"]) + 1;

		// Add divs into image-wrapper, set their position, add listener and make them editable
		for(var i = 0; i < data.length; i++) {
			$("#image-wrapper").append("<div id=\"" + data[i]["id"] + "\" class=\"draggable-phrase\" draggable=\"true\">" + data[i]["content"] + "</div>");
			$("#image-wrapper .draggable-phrase:last-child")
				.css({
					"left": data[i]["leftOffset"] + 'px',
					"top": data[i]["topOffset"] + 'px'
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
							  parseFloat(window.getComputedStyle(selectedMessage, null).getPropertyValue("width"));
		var maxAllowedHeight = parseFloat(window.getComputedStyle(event.path[1], null).getPropertyValue("height")) - 
							  (parseFloat(window.getComputedStyle(selectedMessage, null).getPropertyValue("height")) + 15); // + 15px for message "corner" at the bottom 

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

	// Update jsonData when user edits or moves draggable divs 
	function updatingJsonData(id, content, leftOffset, topOffset, removing) {

		if(!(typeof parseInt(id) == "number") &&  parseInt(id) <= 0) {
			console.log("Incorrect data");
			console.log(id + ": " + typeof id);
			return;
		}

		if(!(typeof content == "string" || typeof content == "undefined")) {
			console.log("Incorrect data");
			console.log(content + ": " + typeof content);
			return;
		}

		if((!(typeof leftOffset == "number" || typeof leftOffset == "undefined") && leftOffset < 0) ||
			(!(typeof topOffset == "number" || typeof topOffset == "undefined") && topOffset < 0)) {
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

		$.post("assets/php/data_save.php", messageData, function(data) {
			//console.log(data);
		});
	}

	// Function on double click on draggable div
	(function($) {
		$.fn.editable = function() {

			var textBlocks = $(this);
			var textBox = $(this).next();


			
	        // Create a new input for every div that is selected
	        for(var i = 0; i < textBlocks.length; i+=1){
	            var textBox = $('<textarea class="my-text-box"></textarea>');
	            var textBlock = textBlocks.eq(i);               
	            textBox.hide().insertAfter(textBlock).val(textBlock.html());
	        }

	        // Hiding the div and showing an input to allow editing the value.
	        textBlocks.dblclick(function() {
	            toggleVisiblity($(this), true); // pass the dbl clicked div element via $(this) 
	        });


	        // Hiding the input and showing the original div
	        $(".my-text-box").keypress(function() {

	        	console.log("Hello world!");

	        	if(event.keyCode == 13) {
	        		$(this).blur();
	        		return false;
	        	}
	        	if(event.keyCode == 27) {
	        		$(this).val($(this).prev().html());
	        		$(this).blur();
	        		return false;
	        	}
		      
	        })

	        $(".my-text-box").blur(function() {
	            toggleVisiblity($(this), false); // pass the input that loses focus via $(this)
	        });

	        toggleVisiblity = function(element, editMode) {

	        	console.log("Hello world");

	            var textBlock, textBox;

	            if (editMode === true) {
	                textBlock = element; // here the element is the div

	                var position = textBlock.position();
	                var width = textBlock[0].offsetWidth;
	                var height = textBlock[0].offsetHeight;

	                textBox = element.next(); // here element is the div so the textbox is next
	                textBlock.hide();
	                textBox.show().focus(); 

	                textBox[0].style.width = width + 'px'; 
	                textBox[0].style.height = height + 'px';
	                textBox[0].style.top = position["top"] + 'px';
	                textBox[0].style.left =  position["left"] + 'px';

	                // workaround, to move the cursor at the end in input box.
	                textBox[0].value = textBox[0].value;
	            } else {
	                textBlock = element.prev(); // here element is the input so the div is previous
	                textBox = element; // here element is the textbox
	                textBlock.show();
	                textBox.hide();

	                if(textBox.val() == "") {
	                	var removing = true;
	                	textBlock[0].remove();
	                	textBlock.next().remove();
	                }

	                textBlock.html(textBox.val());

	                /* Updating data of content of draggable elements */
	                updatingJsonData(textBlock[0].id, textBox.val(), undefined, undefined, removing);
	            }
	        };
        };
	})(jQuery);
});
