// Function on double click on draggable div
(function($) {
	$.fn.editable = function() {

		var textBlocks = $(this);
		var textBox = $(this).next();

        // Create a new input for every div that is selected
        for(var i = 0; i < textBlocks.length; i+=1) {
            var textBlock = textBlocks.eq(i);  

            // Input creating
            var textBox = $('<textarea id=' + "input_" + textBlocks[0].id 
            	+ ' class="draggable-phrase-input"></textarea>');
        	
        	textBox.bind("keyup", function() {

        		var textBoxMaxHeight = getComputedStyle($("#image-wrapper")[0], null).getPropertyValue("height").replace(/px/, "") 
        							//- getComputedStyle(textBlock[0], null).getPropertyValue("top").replace(/px/, "")
        							- 15;

        		resizeArea(textBox[0].id, 32, textBoxMaxHeight);
        	});//.keydown(limitTextarea);
	           

        	// Hidden div (for dynamic height of text area)
            var textBoxHidden = $('<div id=' + "input_" + textBlocks[0].id 
            	+ "_hidden" + ' class="draggable-phrase-input"></div>')
            	.css({
            		"visibility": "",
            		"position": "absolute"
            	});       

            textBox.hide().insertAfter(textBlock).val(textBlock.html());
            textBoxHidden.insertAfter(textBox);
        }

        // Hiding the div and showing an input to allow editing the value.
        textBlocks.dblclick(function() {
            toggleVisiblity($(this), true); // pass the dbl clicked div element via $(this) 
        });


        // Hiding the input and showing the original div
        textBox.keypress(function() {
        	if(event.keyCode == 13) {
        		$(this).blur();
        		return false;
        	}
        });

        textBox.keyup(function() {
        	if(event.keyCode == 27) {
        		$(this).val($(this).prev().html());
        		$(this).blur();
        		return false;
        	}
        });

        textBox.blur(function(event) {
            toggleVisiblity($(this), false); // pass the input that loses focus via $(this)
        });

        toggleVisiblity = function(element, editMode) {

            var textBlock, textBox;

            if (editMode === true) {
                textBlock = element; // here the element is the div

                var position = textBlock.position();
                var width = getComputedStyle(textBlock[0], null).getPropertyValue("width");
                var height = getComputedStyle(textBlock[0], null).getPropertyValue("height");

                textBox = element.next(); // here element is the div so the textbox is next
                textBlock.hide();
                textBox.show().focus(); 

                textBoxStyle = textBox[0].style;

                textBoxStyle.width = width; 
                textBoxStyle.height = height;
                textBoxStyle.top = position["top"] + 'px';
                textBoxStyle.left =  position["left"] + 'px';

                // workaround, to move the cursor at the end in input box.
                textBox[0].value = textBox[0].value;
            } else {
                textBlock = element.prev(); // here element is the input so the div is previous
                textBox = element; // here element is the textbox
                textBlock.show();
                textBox.hide();

                if(textBox.val() == "") {
                	var removing = true;
                	textBlock.next().remove();
                	textBlock.next().remove();
                	textBlock.remove();
                }

                textBlock.html(textBox.val());

                /* Updating data of content of draggable elements */
                updatingJsonData(textBlock[0].id, textBox.val(), undefined, undefined, removing);
            }
        };
    };
})(jQuery);

