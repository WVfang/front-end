// Function on double click on draggable div

function resizeArea(elem_id, maxHeight) {

    var area = $("#" + elem_id);
    var area_hidden = $("#" + elem_id + "_hidden");
    var text = '';

    // delete last symbol if maxHeight reached
    if(area[0].scrollHeight > maxHeight) {
        area.val(area.val().substring(0, area.val().length - 1));
        console.log("The limit of symbols is reached");
        return false;
    }

    // split text into lines and insert it into hidden text area
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
    height = Math.min(maxHeight, height);
    var width = area_hidden.outerWidth();

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

    return true;
}

(function($) {
    $.fn.editable = function() {

        var textBlocks = $(this);
        var textBox = $(this).next();

        // Create a new input for every div that is selected
        for(var i = 0; i < textBlocks.length; i+=1) {
            var textBlock = textBlocks.eq(i);

            // Textarea creating
            var textBox = $('<textarea id=' + "input_" + textBlocks[0].id 
                + ' class="draggable-phrase-input"></textarea>');

            textBox.bind("input propertychange", function() {
                var textBoxMaxHeight = $("#drag-space").height() - 15;
                return resizeArea(textBox[0].id, textBoxMaxHeight);
            });

            // Hidden textarea(div) creating (for dynamic height of textarea)
            var textBoxHidden = $('<div id=' + "input_" + textBlocks[0].id 
                + "_hidden" + ' class="draggable-phrase-input"></div>')
            .css({
                "visibility": "hidden",
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
        textBox.keypress(function(event) {
            if(event.keyCode == 13) {
                $(this).blur();
                return false;
            }
        });

        textBox.keyup(function(event) {
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
                var width = textBlock.outerWidth();
                var height = textBlock.outerHeight();

                textBox = element.next(); // here element is the div so the textbox is next
                textBlock.hide();
                textBox.show().focus(); 

                textBoxStyle = textBox[0].style;
                textBoxStyle.width = width + 'px'; 
                textBoxStyle.height = height + 'px';
                textBoxStyle.top = position["top"] + 'px';
                textBoxStyle.left =  position["left"] + 'px';

                // Workaround, to move the cursor at the end in input box.
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
