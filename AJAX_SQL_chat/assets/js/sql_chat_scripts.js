$(document).ready(function() {	

	function freshnessCheck(time, interval) {

		if($.now()/1000 - time < interval) {
			return true;
		} else {
			return false;
		}
	}

	function messageVisualisation(jsonData, logs) {
		if(!jsonData) return;
		var data = JSON.parse(jsonData);

		logs["messages_time_interval"] = {};

		for(var i = 0; i < data.length; i++) {
			if(freshnessCheck(data[i]["date"], 3600)) {
				logs["messages_time_interval"][i] = $.now()/1000 - data[i]["date"];

				data[i]["message"] = data[i]["message"].replace(/:\)/, "<img src=\"assets/php/img/smile_happy.png\">");
				data[i]["message"] = data[i]["message"].replace(/:\(/, "<img src=\"assets/php/img/smile_sad.png\">");
				$("#chat-history").append("<div class=\"history-message\"><span class=\"mes-time-and-name\">[" + data[i]["time"] + "] " + data[i]["user"] + ":</span> " + data[i]["message"] + "</div>");

				var marginTop = $("#message-block").height() - $(".history-message:last").height();
				$("#message-block").css({"height": marginTop});
			}
		}

		$("#chat-history").animate({
		 		scrollTop: $('#chat-history')[0].scrollHeight
			}, 800);
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

	var logs = {};

	// Скрипт отображения истории сообщений при загрузке страницы
	$.post("assets/php/sql_get_messages_history.php", {"dataAmount": "full"}, function(json) {
		logs["messages_full_history"] = JSON.parse(json);
		messageVisualisation(json, logs);
	});

	$("#btn-send").add("#chat-message").bind("click keypress", function(event) {

		logs["event_data"] = event;
		if(eventCheck(event)) return;

		// Запрос на сохранение последнего сообщения в json файл с его последующим появлением в чате
		$.post("assets/php/sql_messages_save.php", {"message":$("#chat-message").val()}, function() {
			$.post("assets/php/sql_get_messages_history.php", {"dataAmount": "last"}, function(json) {
				logs["messages_last_history"] = JSON.parse(json);
				messageVisualisation(json, logs);
			});
		})

		$("#chat-message").val("");

		console.clear();
		console.log(logs);
	});

	console.clear();
	console.log(logs);
});