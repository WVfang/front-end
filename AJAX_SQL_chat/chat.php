<!DOCTYPE html>
<html>
<head>
	<title>Chat</title>
	<link rel="stylesheet" type="text/css" href="assets/styles.css?ver=1">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico" rel="stylesheet">
	<script src="assets/js/jquery-3.2.1.min.js"></script>

	<!-- Скрипт для отображения сообщений в чате -->
	<script>
		function messageVisualisation(jsonData) {
			if(!jsonData) return;
			var data = JSON.parse(jsonData);

			for(var i = 0; i < data.length; i++) {
				//console.log($.now()/1000 - data[i]["date"]);
				if($.now()/1000 - data[i]["date"] < 3600) {
					$("#chat-history").append("<div class=\"history-message\"><span class=\"mes-time-and-name\">[" + data[i]["time"] + "] " + data[i]["user"] + ":</span> " + data[i]["message"] + "</div>");

					var marginTop = $("#message-block").height() - $(".history-message:last").height();
					$("#message-block").css({"height": marginTop});
				}
			}

			$("#chat-history").animate({
			 		scrollTop: $('#chat-history')[0].scrollHeight
				}, 800);
		}
	</script>

	<!-- Альтернатива с json -->
	<!--
	<script type="text/javascript">
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
	</script>
	-->
</head>
<body>
	<header>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>
		<div class="row-top"></div>	
	</header>
	<div id="main-title">
			Easy Chat
	</div>
	<section id="chat-wrapper">
		<div id="chat-history">
			<div id="message-block"></div>
		</div>
		<div id="chat-send-form">
			<input id="chat-message" type="text" name="chat-message">
			<button id="btn-send">Send</button>
		</div>
	</section>

	<script type="text/javascript">
		$("#btn-send").add("#chat-message").bind("click keypress", function(event) {

			if((event.type == "keypress" && event.keyCode != 13) || 
			   (event.type == "click" && event.currentTarget.id == "chat-message") ||
			   ($("#chat-message").val() == ""))
				return;

			// Запрос на сохранение последнего сообщения в json файл с его последующим появлением в чате
			$.post("assets/php/sql_messages_save.php", {"message":$("#chat-message").val()}, function(data) {
				$.post("assets/php/sql_get_messages_history.php", {"dataAmount": "last"}, function(json) {
					messageVisualisation(json);
				})
			})

			// Альтернатива с json
			/*
			$.ajax({
				type: "POST",
				url: "assets/php/json_messages_save.php",
				data: $("#chat-message").serialize(),
				complete: function() {
					getJSONajax("assets/php/jsons/messages_history.json", "last");
				}
			});
			*/

			$("#chat-message").val("");
		});
	</script>

	<script type="text/javascript">
		$(document).ready(function() {

			// Скрипт отображения истории сообщений при загрузке страницы
			$.post("assets/php/sql_get_messages_history.php", {"dataAmount": "full"}, function(json) {
				messageVisualisation(json);
			});

			// Альтернатива с json
			/*
				getJSONajax("assets/php/jsons/messages_history.json", "all");
			*/

		})	
	</script>
	
</body>
</html>