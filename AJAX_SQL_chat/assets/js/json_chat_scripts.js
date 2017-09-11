function freshnessCheck($time, $interval) {
	if($.now()/1000 - $time < $interval) {
		return true;
	} else {
		return false;
	}
}

function getJSONajax(url, amount) {
	$.getJSON(url, {}, function(json) {
		console.log(json);

		if(amount == "last")
			mesInd = json["counter"] - 1;
		else if(amount == "all")
			mesInd = 0;

		for(; mesInd < json["counter"]; mesInd++) {
			var messageKey = "message" + (mesInd+1);
			if(freshnessCheck(data[i]["date"], 3600)) {
				$("#chat-history").append("<div class=\"history-message\"><span class=\"mes-time-and-name\">[" + json[messageKey]["time"] + "] " + json[messageKey]["user"] + ":</span> " + json[messageKey]["message"] + "</div>");
			}

			var newHeight = $("#message-block").height() - $(".history-message:last").height();
			$("#message-block").css({"height": newHeight});
		}
		
		$("#chat-history").animate({
	 		scrollTop: $('#chat-history')[0].scrollHeight
		}, 800);
	})
}

function eventCheck(event) {
	if((event.type == "keypress" && event.keyCode != 13) || 
	   (event.type == "click" && event.currentTarget.id == "chat-message") ||
	   ($("#chat-message").val() == "")) {
		return true;
	} else {
		return false;
	}
}
	
$(document).ready(function() {

	getJSONajax("assets/php/jsons/messages_history.json", "all");
			
	$("#btn-send").add("#chat-message").bind("click keypress", function(event) {

		if(eventCheck(event)) return;

		$.ajax({
			type: "POST",
			url: "assets/php/json_messages_save.php",
			data: $("#chat-message").serialize(),
			complete: function() {
				getJSONajax("assets/php/jsons/messages_history.json", "last");
			}
		});
		
		$("#chat-message").val("");
	});

})	

	