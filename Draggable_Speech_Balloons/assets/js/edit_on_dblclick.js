// Function on double click on draggable div

(function($) {

    $.fn.editable = function() {

        var textBlock = $(this);
        var textArea = textAreaCreating(textBlock.attr("id"));

        // Message tail creating
        var textAreaTail = $('<div class="draggable-phrase-tail"></div>');

        // Hidden div creating (for dynamic width/height of textarea)
        var textAreaHidden = $("<div id=" + "input_" + textBlock[0].id 
            + "_hidden" + ' class="draggable-phrase-input"></div>')
            .css({
                "visibility": "hidden",
                "position": "absolute"
            });       

        textArea.hide().insertAfter(textBlock).val(textBlock.html());
        textAreaTail.hide().insertAfter(textArea);
        textAreaHidden.insertAfter(textAreaTail);
    
        // Hiding the div and showing an input to allow editing the value.
        textBlock.dblclick(function() {
            toggleVisibility($(this), true);
        });

        // Hiding the input and showing the original div with entered text
        textArea.keypress(function(event) {
            if(event.keyCode == 13) {
                $(this).blur();
                return false;
            }
        });

        // Hiding the input and showing the original div without text changes
        textArea.keyup(function(event) {
            if(event.keyCode == 27) {
                $(this).val($(this).prev().html());
                $(this).blur();
                return false;
            }
        });

        textArea.blur(function(event) {
            toggleVisibility($(this), false);
        });

        toggleVisibility = function(element, editMode) {

            var textBlock, textArea;

            if (editMode === true) {
                textBlock = element; // here the element is the div

                var position = textBlock.position();
                var width = textBlock.outerWidth();
                var height = textBlock.outerHeight();

                textArea = element.next(); // here element is the div so the textarea is next
                textAreaTail = textArea.next();
                textBlock.hide();
                textArea.show().focus(); 
                textAreaTail.show();

                textArea.css({
                    "width": width,
                    "height": height,
                    "top": position["top"],
                    "left": position["left"]
                });

                textAreaTail.css({
                    "top": position["top"] + height - MESSAGE_TAIL_BOTTOM_OFFSET,
                    "left": position["left"] + width - MESSAGE_TAIL_RIGHT_OFFSET
                });
    
                // Move the cursor at the end in input box.
                moveCaretToEnd(textArea);
            } else {
                textBlock = element.prev(); // here element is the input so the div is previous
                textArea = element; // here element is the textarea
                textAreaTail = element.next();
                textBlock.show();
                textArea.hide();
                textAreaTail.hide();

                // Delete message block if it's empty
                if(textArea.val() == "") {
                    var removing = true;
                }

                // Updating data of content of draggable element
                updatingJsonData({"id": textBlock[0].id, "content": textArea.val(),
                 "removing": removing}, function() {
                    // Delete or update information only when server returns "success"
                    if(removing) {
                        // Delete all elements until next draggable phrase
                        textBlock.nextUntil(".draggable-phrase").remove().end().remove(); 
                    } else {
                        textBlock.html(textArea.val());
                    }
                });
            }
        };
    };

})(jQuery);

function resizeArea(elem_id, maxHeight) {

    if(!dataTypeCheck({[typeof elem_id]: "string",
                       [typeof maxHeight]: "number"})) {
        console.log("Incorrect data");
        return;
    }

    var area = $("#" + elem_id);
    var area_tail = area.next();
    var area_hidden = $("#" + elem_id + "_hidden");

    // Forbid input if new symbol increase height of message beyond maxHeight
    area.val(checkForSymbolsLimit(area.val(), area[0].scrollHeight, maxHeight));

    // Split text into lines and insert it into hidden text area to count new message height
    area_hidden.text(splitTextIntoLines(area.val()));

    var dragSpaceWidth = $("#drag-space").outerWidth();
    var dragSpaceHeight = $("#drag-space").outerHeight() - SPACE_OF_MESSAGE_TAIL;

    var areaPosition = area.position();
    var areaHeight = Math.min(area_hidden.outerHeight() + TEXTAREA_EMPTY_BOTTOM_SPACE, maxHeight);
    var areaWidth = area_hidden.outerWidth(); // limited by css (100-300px)

    // Displacement of the message, which does not allow it to go beyond 
    // the borders while increasing
    checkForCorrectOffset(area, "top", areaPosition["top"], areaHeight, dragSpaceHeight);
    checkForCorrectOffset(area, "left", areaPosition["left"], areaWidth, dragSpaceWidth);

    area.css({
        "width": areaWidth,
        "height": areaHeight
    });

    area_tail.css({
        "top": areaPosition["top"] + areaHeight,
        "left": areaPosition["left"] + areaWidth - MESSAGE_TAIL_DISPLACEMENT
    });

    return true;
}

function textAreaCreating(id) {

    if(!dataTypeCheck({[typeof id]: "string"})) {
        console.log("Incorrect data");
        return;
    }

    var textArea = $("<textarea id=" + "input_" + id
        + ' class="draggable-phrase-input"></textarea>');

    textArea.bind("input propertychange", function() {
        var textAreaMaxHeight = $("#drag-space").height() - SPACE_OF_MESSAGE_TAIL;
        return resizeArea(textArea.attr("id"), textAreaMaxHeight);
    });

    return textArea;
}

function checkForSymbolsLimit(content, messageHeight, maxHeight) {
    if(!dataTypeCheck({[typeof content]: "string",
                       [typeof messageHeight]: "number",
                       [typeof maxHeight]: "number"})) {
        console.log("Incorrect data");
        return;
    }

    if(messageHeight > maxHeight) {
        content = content.substring(0, content.length - 1);
        console.log("The limit of symbols is reached");
    }

    return content;
}

function checkForCorrectOffset(textarea, typeOfOffset, areaOffset, areaSideSize, parentSize) {

    if(!dataTypeCheck({[typeof textarea]: "object",
                       [typeof typeOfOffset]: "string",
                       [typeof areaOffset]: "number",
                       [typeof areaSideSize]: "number",
                       [typeof parentSize]: "number"})) {
        console.log("Incorrect data");
        return;
    }

    if(areaOffset + areaSideSize > parentSize) { 
        
        var maxOffset = parentSize - areaSideSize;

        // Update [top]Offset or [left]Offset only if server returns "success"
        updatingJsonData({"id": textarea.prev()[0].id, [typeOfOffset + "Offset"]: maxOffset}, function() {
            textarea.css(typeOfOffset, maxOffset); 
            textarea.prev().css(typeOfOffset, maxOffset); // here is a draggable div   
        });
    }
}

function splitTextIntoLines(text) {

    if(!dataTypeCheck({[typeof text]: "string"})) {
        console.log("Incorrect data");
        return;
    }

    /*var content = '';*/
    var lines = text.replace(/[<>]/g, '_').split("\n");

    /*$.each(lines, function(key, value) {
        content = content + '<div>' + value.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
    });*/

    return lines;
}

function moveCaretToEnd(inputObject) {
    if (inputObject.selectionStart) {
        var end = inputObject.value.length;
        inputObject.setSelectionRange(end,end);
    }
}