$(document).ready(function() {

	var dragElements = document.querySelectorAll("div.draggable-phrase");
	var dragSpace = document.getElementById("image-wrapper");
	var btnAddDiv = document.getElementById("btn-add-div");
	var selectedDiv;

	// Add dragover&drop listeners to draggable space
	dragSpace.addEventListener('dragover', drag_over);
	dragSpace.addEventListener('drop', drop);

	// Add dragstart listener to every draggable div
	$(".draggable-phrase").on("dragstart", drag_start);
	
	// Function on btn click to add draggable div
	btnAddDiv.onclick = function() {
		$("#image-wrapper").append("<div class=\"draggable-phrase\" draggable=\"true\">Hello world!</div>");
		$("#image-wrapper .draggable-phrase:last-child").on("dragstart", drag_start).editable();
	}

	// Dragging functions
	function drag_start(event) {
		selectedDiv = event.target;

		var style = window.getComputedStyle(event.target, null);
		event.originalEvent.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10)
		 - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
	}

	function drop(event) {
		var offset = event.dataTransfer.getData("text/plain").split(',');
		var dragElem = selectedDiv;
		dragElem.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
		dragElem.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';

		event.preventDefault();
		return false;
	}

	function drag_over(event) {
		event.preventDefault();
		return false;
	}

	// Function on double click on draggable div
	
	(function($) {
		$.fn.editable = function() {

			var textBlocks = $(this);
			
	        // Create a new input for every div that is selected
	 		// .my-text-box class is added so we can attach events to this class :) there is other approaches too.
	        for(var i = 0; i < textBlocks.length; i+=1){
	            var textBox = $('<input class="my-text-box"/>');
	            var textBlock = textBlocks.eq(i);               
	            textBox.hide().insertAfter(textBlock).val(textBlock.html());
	        }

	        // Hiding the div and showing a input to allow editing the value.
	        textBlocks.dblclick(function() {
	            toggleVisiblity($(this), true); // Pass the dbl clicked div element via $(this) 
	        });

	        // Hiding the input and showing the original div
	        $('.my-text-box').blur(function() {
	            toggleVisiblity($(this), false); // Pass the input that loses focus via $(this)
	        });

	        toggleVisiblity = function(element, editMode) {

	            var textBlock, textBox;

	            if (editMode === true) {
	                textBlock = element; // here the element is the div
	                var pos = textBlock.position();

	                textBox = element.next(); // here element is the div so the textbox is next
	                textBlock.hide();
	                textBox.show().focus(); 
	                textBox[0].style.top = pos["top"] + 'px';
	                textBox[0].style.left =  pos["left"] + 'px';

	                // workaround, to move the cursor at the end in input box.
	                textBox[0].value = textBox[0].value;
	            } else {
	                textBlock = element.prev(); // Here element is the input so the div is previous
	                textBox = element; // here element is the textbox
	                textBlock.show();
	                textBox.hide();
	                textBlock.html(textBox.val());
	            }
	        };
        };
	})(jQuery);

    var $edit = $('.draggable-phrase').editable();
});
