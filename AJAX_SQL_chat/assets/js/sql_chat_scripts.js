function checkForFreshness(time, interval) {
	if($.now()/1000 - time < interval) {
		return true;
	} else {
		return false;
	}
}

function messageVisualisation(jsonData, logs) {
	if(!jsonData) return;
	var data = JSON.parse(jsonData);

	$("#chat-history").empty().append("<div id=\"message-block\"></div>");

	for(var i = 0; i < data.length; i++) {
		// Срок давности (или как-то так) сообщений
		logs["mess_time_total"][i] = $.now()/1000 - data[i]["date"];
	
		if(checkForFreshness(data[i]["date"], 3600)) {
			data[i]["message"] = data[i]["message"].replace(/:\)/, "<img src=\"assets/php/img/smile_happy.png\">");
			data[i]["message"] = data[i]["message"].replace(/:\(/, "<img src=\"assets/php/img/smile_sad.png\">");
			$("#chat-history").append("<div class=\"history-message\"><span class=\"mes-time-and-name\">[" +
				data[i]["time"] + "] " + data[i]["user"] + ":</span> " + data[i]["message"] + "</div>");

			var marginTop = $("#message-block").height() - $(".history-message:last").height();
			$("#message-block").css({"height": marginTop});
		}
	}

	$("#chat-history").animate({
	 		scrollTop: $('#chat-history')[0].scrollHeight
	}, 800);
}

function eventChecker() {

	if((event.type == "keypress" && event.keyCode != 13) || // При нажатии не на Enter 
	   (event.type == "click" && event.currentTarget.id == "chat-message") || // При клике на поле ввода, а не на кнопку
	   ($("#chat-message").val() == "")) // При пустом поле ввода
		return false; // Остановка выполнения скрипта
	else
		return true;
}

$(document).ready(function() {

	var logs = {};
	logs["mess_time_total"] = {};

	// Скрипт отображения истории сообщений при загрузке страницы
	$.post("assets/php/sql_get_messages_history.php", function(json) {

		if(JSON.parse(json)["data"] == "") return;

		// Все сообщения
		logs["total_mess_history"] = JSON.parse(json);

		messageVisualisation(json, logs);
	});

	$("#btn-send").add("#chat-message").bind("click keypress", function(event) {
		// Информация о событии
		logs["event_data"] = event;
		if(!eventChecker()) return;

		// Запрос на сохранение последнего сообщения с его последующим появлением в чате
		$.post("assets/php/sql_messages_save.php", {"message":$("#chat-message").val()}, function() {
			$.post("assets/php/sql_get_messages_history.php", function(json) {
				// Обновлениие данных с включением последнего сообщения
				logs["total_mess_history"] = JSON.parse(json);

				messageVisualisation(json, logs);
			})
		})

		$("#chat-message").val("");

		console.clear();
		console.log(logs);

	});

	console.clear();
	console.log(logs);
})