<!DOCTYPE html>
<html>
<head>
	<title>Chat</title>
	<link rel="stylesheet" type="text/css" href="assets/css/styles.css?ver=1">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico" rel="stylesheet">
	<script src="assets/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript">
		function getJSONajax(url, amount) {
			$.getJSON(url, {}, function(json) {

				if(amount == "last")
					mesInd = json["counter"] - 1;
				else if(amount == "all")
					mesInd = 0;

				for(; mesInd < json["counter"]; mesInd++) {
					var messageKey = "message" + (mesInd+1);
					if($.now()/1000 - json[messageKey]["date"] < 3600) {
						$("#chat-history").append("<div class=\"history-message\"><span class=\"userName\">[" + json[messageKey]["time"] + "] " + json[messageKey]["user"] + ":</span> " + json[messageKey]["message"] + "</div>");
					}

					var newHeight = $("#message-block").height() - $(".history-message:last").height();
					$("#message-block").css({"height": newHeight});
				}

				$("#chat-history").animate({
			 		scrollTop: $('#chat-history')[0].scrollHeight
				}, 800);
			})
		}
	</script>
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
			<div id="message-block" style="height: 340px"></div>
		</div>
		<div id="chat-send-form">
			<input id="chat-message" type="text" name="chat-message">
			<button id="btn-send">Send</button>
		</div>
	</section>
	<script type="text/javascript">
		$("#btn-send").add("#chat-message").bind("click keypress", function(event) {

			if((event.type == "keypress" && event.keyCode != 13) || 
			   (event.type == "click" && event.currentTarget.id == "chat-message"))
				return;
			
			$.ajax({
				type: "POST",
				url: "assets/php/json_save.php",
				data: $("#chat-message").serialize(),
				complete: function() {
					getJSONajax("assets/php/jsons/mes_history.json", "last");
				}
			});

			$("#chat-message").val("");
		});
	</script>
	<script type="text/javascript">
		$(document).ready(function() {
			getJSONajax("assets/php/jsons/mes_history.json", "all");
		});
	</script>
</body>
</html>