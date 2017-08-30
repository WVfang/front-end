<!DOCTYPE html>
<html>
<head>
	<title>Chat</title>
	<link rel="stylesheet" type="text/css" href="assets/styles.css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico" rel="stylesheet">
	<script src="assets/js/jquery-3.2.1.min.js"></script>
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
			<script type="text/javascript">
				$(document).ready(function() {
					<?php
						$dataStore = "assets/php/mes_history.json";
						if(@file_get_contents($dataStore)) {
							$data = file_get_contents($dataStore);
							$data = json_decode($data, true);
							
						}
						else {
							$data = [];
						}

						print_r($data);
					?>
				});
			</script>
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
					$.getJSON("assets/php/mes_history.json", {}, function(json) {
							var messageKey = "message" + json["counter"];
							$("#chat-history").append("<div><span id=\"userName\">[" + json[messageKey]["time"] + "] " + json[messageKey]["user"] + ":</span> " + json[messageKey]["message"] + "</div>");
					})
				}
			});

			$("#chat-message").val("");
		});
	</script>
</body>
</html>
