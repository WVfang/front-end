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
			
		</div>
		<div id="chat-send-form">
			<input id="chat-message" type="text" name="chat-message">
			<button id="btn-send">Send</button>
		</div>
	</section>
	<script type="text/javascript">
		$("#btn-send").click(function() {
			// Имя будет храниться так же в json строке
			var userName = "<?php session_start();
							  echo $_SESSION["userName"];
							?>"
			$.ajax({
				type: "POST",
				url: "assets/php/json_save.php",
				data: $("#chat-message").serialize(),
				complete: function() {
					$.getJSON("assets/php/json.json", {}, function(json) {
							var messageKey = "message" + json["counter"];
							$("#chat-history").append("<div><span id=\"userName\">" + userName + ":</span> " + json[messageKey] + "</div>");
					})
				}
			});

			$("#chat-message").val("");
		});
	</script>
</body>
</html>