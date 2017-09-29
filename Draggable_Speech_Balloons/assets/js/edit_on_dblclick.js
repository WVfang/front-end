// Function on double click on draggable div

function resizeArea(elem_id, maxHeight) {

    var area = $("#" + elem_id);
    var area_tail = area.next();
    var area_hidden = $("#" + elem_id + "_hidden");
    var text = '';

    // Forbid input if new symbol increase message beyond maxHeight
    if(area[0].scrollHeight > maxHeight) {
        area.val(area.val().substring(0, area.val().length - 1));
        console.log("The limit of symbols is reached");
        return false;
    }

    // Split text into lines and insert it into hidden text area to count new message height
    var lines = area.val().replace(/[<>]/g, '_').split("\n");
    $.each(lines, function(key, value) {
        text = text + '<div>' + value.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
    });
    area_hidden.text(lines);

    var dragSpace = $("#drag-space");
    var dragSpaceWidth = dragSpace.width();
    var dragSpaceHeight = dragSpace.height() - 15;

    var position = area.position();
    var height = area_hidden.outerHeight() + 15;
        height = Math.min(maxHeight, height); // height can differ (it depends on dragSpace height)
    var width = area_hidden.outerWidth(); // limited by css (100-300px)

    // If message block is at the bottom border of drag space
    if(position["top"] + height > dragSpaceHeight) {
        var topOffset = dragSpaceHeight - height;

        area.css("top", topOffset);
        area.prev().css("top", topOffset);

        updatingJsonData(area.prev()[0].id, undefined,  undefined, topOffset);
    }

    // If message block at the right border of drag space
    if(position["left"] + width > dragSpaceWidth) {
        var leftOffset = dragSpaceWidth - width;

        area.css("left", leftOffset);
        area.prev().css("left", leftOffset);

        updatingJsonData(area.prev()[0].id, undefined,  leftOffset, undefined);
    }

    area[0].style.width = width + 'px';
    area[0].style.height = height + 'px';

    // Update textarea "message-tail" position
    area_tail[0].style.top = (area.position()["top"] + height) + 'px';
    area_tail[0].style.left = (area.position()["left"] + width - 25) + 'px';

    return true;
}

(function($) {
    $.fn.editable = function() {

        var textBlocks = $(this);
        var textArea = $(this).next();

        // Create a new textarea for every selected div
        for(var i = 0; i < textBlocks.length; i+=1) {
            var textBlock = textBlocks.eq(i);

            // Textarea creating
            var textArea = $("<textarea id=" + "input_" + textBlocks[0].id 
                + ' class="draggable-phrase-input"></textarea>');

            textArea.bind("input propertychange", function() {
                var textAreaMaxHeight = $("#drag-space").height() - 15;
                return resizeArea(textArea[0].id, textAreaMaxHeight);
            });

            // Message tail creating
            var textAreaTail = $('<div class="draggable-phrase-tail"></div>');

            // Hidden div creating (for dynamic width/height of textarea)
            var textAreaHidden = $("<div id=" + "input_" + textBlocks[0].id 
                + "_hidden" + ' class="draggable-phrase-input"></div>')
                .css({
                    "visibility": "hidden",
                    "position": "absolute"
            });       

            textArea.hide().insertAfter(textBlock).val(textBlock.html());
            textAreaTail.hide().insertAfter(textArea);
            textAreaHidden.insertAfter(textAreaTail);
        }

        // Hiding the div and showing an input to allow editing the value.
        textBlocks.dblclick(function() {
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

                textAreaStyle = textArea[0].style;
                textAreaStyle.width = width + 'px'; 
                textAreaStyle.height = height + 'px';
                textAreaStyle.top = position["top"] + 'px';
                textAreaStyle.left =  position["left"] + 'px';

                textAreaTailStyle = textAreaTail[0].style;
                textAreaTailStyle.top = (position["top"] + height - 2.5) + 'px';
                textAreaTailStyle.left = (position["left"] + width - 25) + 'px'; 

                // Workaround, to move the cursor at the end in input box.
                textArea[0].value = textArea[0].value;
            } else {
                textBlock = element.prev(); // here element is the input so the div is previous
                textArea = element; // here element is the textazrea
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
