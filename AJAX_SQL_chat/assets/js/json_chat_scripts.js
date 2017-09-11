function getJSONajax(url, amount) {
	$.getJSON(url, {}, function(json) {
		console.log(json);

		if(amount == "last")
			mesInd = json["counter"] - 1;
		else if(amount == "all")
			mesInd = 0;

		for(; mesInd < json["counter"]; mesInd++) {
			var messageKey = "message" + (mesInd+1);
			//console.log(messageKey);
			if($.now()/1000 - json[messageKey]["date"] < 3600) {
				$("#chat-history").append("<div class=\"history-message\"><span class=\"mes-time-and-name\">[" + json[messageKey]["time"] + "] " + json[messageKey]["user"] + ":</span> " + json[messageKey]["message"] + "</div>");
			}

			var newHeight = $("#message-block").height() - $(".history-message:last").height();
			$("#message-block").css({"height": newHeight});
		}

		//$("#chat-history").scrollTop($("#chat-history")[0].scrollHeight);
		
		$("#chat-history").animate({
	 		scrollTop: $('#chat-history')[0].scrollHeight
		}, 800);
	})
}

function eventChecker() {

	if((event.type == "keypress" && event.keyCode != 13) || // При нажатии не на Enter 
	   (event.type == "click" && event.currentTarget.id == "chat-message") || // При клике на поле ввода, а не на кнопку
	   ($("#chat-message").val() == "")) // При пустом поле ввода
		return; // Остановка выполнения скрипта
	
}

$(document).ready(function() {

	// Скрипт отображения истории сообщений при загрузке страницы
	getJSONajax("assets/php/jsons/messages_history.json", "all");

	$("#btn-send").add("#chat-message").bind("click keypress", function(event) {

		eventChecker();

		// Запрос на сохранение последнего сообщения в json файл с его последующим появлением в чате
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