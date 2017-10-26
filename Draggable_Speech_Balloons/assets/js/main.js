$(document).ready(function() {
	
	var addDiv = $("#btn-add-div");

	// Add dragover&drop listeners to draggable space
	setListeners();

	// Display messages 
	$.post("assets/php/psql_data_get.php")
		.done(function(json) {

			console.log("Successful request");
			console.log(json);
			
			var data = JSON.parse(json);
			if(data["empty"]) {
				return;
			}

			if(!dataTypeCheck({[typeof data]: "object"})) {
				console.log("Incorrect data");
				return;
			}

			// Add divs into drag-space, set their position, add listener and make them editable
			displayData(data); // data - array of objects those include info about messages
		})
		.fail(function(xhr, event) {
			errorLogs(xhr, event);
		})
		.always(function() {
			console.log("Request finished");
		});

	// Function on btn click to add draggable div
	addDiv.bind("click", function() {

		// Updating data of position of draggable elements (starting location in the upper-left corner)
		updatingJsonData({"content": "Hello world!", "left": 0, "top": 0}, function(id) {
			
			var newDraggableDiv = $("<div id=\"" + id + "\" class=\"draggable-phrase\" draggable=\"true\">Hello world!</div>");
			
			$("#drag-space").append(newDraggableDiv).children(".draggable-phrase:last").on("dragstart", drag_start).editable();
		});
			
	});

	function setListeners() {
		var dragSpace = document.getElementById("drag-space");

		dragSpace.addEventListener("dragover", drag_over);
		dragSpace.addEventListener("drop", drop);
	}

	function displayData(data) {

		if(!dataTypeCheck({[typeof data]: "object"})) {
			console.log("Incorrect data");
			return;
		}

		for(var i = 0; data[i]; i++) {
			$("#drag-space").append("<div id=\"" + data[i]["id"] + "\" class=\"draggable-phrase\" draggable=\"true\">" + data[i]["content"] + "</div>");
			$("#drag-space .draggable-phrase:last")
				.css({
					"left": data[i]["left"] + 'px',
					"top": data[i]["top"] + 'px'
				})
				.on("dragstart", drag_start)
				.editable();
		}
	}

});
