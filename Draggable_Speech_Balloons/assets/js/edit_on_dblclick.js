// Function on double click on draggable div

(function($) {
    $.fn.editable = function() {

        var textBlock = $(this);
        var textArea = textAreaCreating(textBlock[0].id);

        // Message tail creating
        var textAreaTail = $('<div class="draggable-phrase-tail"></div>');

        // Hidden div creating (for dynamic width/height of textarea)
        var textAreaHidden = $("<div id=" + "input_" + textBlock[0].id 
            + "_hidden" + ' class="draggable-phrase-input"></div>')
            .css({
                "visibility": "",
                "position": "absolute"
        });       

        textArea.hide().insertAfter(textBlock).val(textBlock.html());
        textAreaTail.hide().insertAfter(textArea);
        textAreaHidden.insertAfter(textAreaTail);
    
        // Hiding the div and showing an input to allow editing the value.
        textBlock.dblclick(function() {
            toggleVisiblity($(this), true);
        });

        // Hiding the input and showing the original div
        textArea.keypress(function(event) {
            if(event.keyCode == 13) {
                $(this).blur();
                return false;
            }
        });

        textArea.keyup(function(event) {
            if(event.keyCode == 27) {
                $(this).val($(this).prev().html());
                $(this).blur();
                return false;
            }
        });

        textArea.blur(function(event) {
            toggleVisiblity($(this), false);
        });

        toggleVisiblity = function(element, editMode) {

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

                textArea = setDimensionalCharacters(textArea, {"width": width, "height": height, "top": position["top"], "left": position["left"]});
                textAreaTail = setDimensionalCharacters(textAreaTail, {"top": position["top"] + height - 2.5, "left": position["left"] + width - 25});
    
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
                    textBlock.next().remove(); // remove textarea
                    textBlock.next().remove(); // remove textarea tail
                    textBlock.next().remove(); // remove hidden div
                    textBlock.remove(); // remove textblock
                } else {
                    textBlock.html(textArea.val());
                }

                // Updating data of content of draggable element
                updatingJsonData(textBlock[0].id, textArea.val(), undefined, undefined, removing);
            }
        };
    };
})(jQuery);

function resizeArea(elem_id, maxHeight) {

    if(!(checkForDataType(elem_id, "string") && checkForDataType(maxHeight, "number"))) {
        return false;
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
    // the boundaries while increasing
    checkForCorrectOffset(area, "top", areaPosition["top"], areaHeight, dragSpaceHeight);
    checkForCorrectOffset(area, "left", areaPosition["left"], areaWidth, dragSpaceWidth);

    area.css({
        "width": areaWidth + 'px',
        "height": areaHeight + 'px'
    });

    area_tail.css({
        "top": (areaPosition["top"] + areaHeight) + 'px',
        "left": (areaPosition["left"] + areaWidth - MESSAGE_TAIL_DISPLACEMENT) + 'px'
    })

    return true;
}

function textAreaCreating(id) {
    var textArea = $("<textarea id=" + "input_" + id
        + ' class="draggable-phrase-input"></textarea>');

    textArea.bind("input propertychange", function() {
        var textAreaMaxHeight = $("#drag-space").height() - SPACE_OF_MESSAGE_TAIL;
        return resizeArea(textArea.attr("id"), textAreaMaxHeight);
    });

    return textArea;
}

function checkForSymbolsLimit(content, messageHeight, maxHeight) {

    if(messageHeight > maxHeight) {
        content = content.substring(0, content.length - 1);
        console.log("The limit of symbols is reached");
    }

    return content;
}

function checkForCorrectOffset(textarea, typeOfOffset, offset, sideSize, maxSpaceSize) {
    if(offset + sideSize > maxSpaceSize) {
        var correctedOffset = maxSpaceSize - sideSize;

        textarea.css(typeOfOffset, correctedOffset);
        textarea.prev().css(typeOfOffset, correctedOffset);

        if(typeOfOffset == "left") {
            updatingJsonData(textarea.prev()[0].id, undefined,  correctedOffset, undefined);
            return;
        }

        if(typeOfOffset == "top") {
            updatingJsonData(textarea.prev()[0].id, undefined,  undefined, correctedOffset);
            return;
        }
    }
}

function splitTextIntoLines(text) {

    /*var content = '';*/
    var lines = text.replace(/[<>]/g, '_').split("\n");

    /*$.each(lines, function(key, value) {
        content = content + '<div>' + value.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
    });*/

    return lines;
}

function setDimensionalCharacters(textArea, characters) { // width, height, top, left

    if(!(checkForDataType(textArea, "object") || checkForDataType(characters, "object"))) {
        return;
    }

    var key;
    for(key in characters) {
        textArea.css({
            [key]: characters[key] + 'px'
        });
    }

    return textArea;
}

function moveCaretToEnd(inputObject) {
    if (inputObject.selectionStart) {
        var end = inputObject.value.length;
        inputObject.setSelectionRange(end,end);
    }
}