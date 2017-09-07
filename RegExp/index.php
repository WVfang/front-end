<!DOCTYPE html>
<html>
<head>
	<title>RegExp</title>
	<script src="js/jquery-3.2.1.min.js"></script>
</head>
<body>
	<style>
		.task-section {
			display: table;
			text-align: center;
		}
		input, textarea {
			display: block;
			height: 20px;
			width: 300px;
			margin-bottom: 10px;
		}
		textarea {
			height: 50px;
		}
		button {
			margin-bottom: 50px;
		}
	</style>
	<div class="task-section">
		<input id="input-id" type="" name="input-ip" placeholder="Enter IP 0-255.0-255.0-255.0-255">
		<input id="input-url" type="" name="input-url" placeholder="Enter URL https://... or http://...">
		<input id="input-email" type="" name="input-email" placeholder="Enter Email name@mail">
		<input id="input-date" type="" name="input-date" placeholder="Enter Date DD/MM/YYYY">
		<input id="input-time" type="" name="input-time" placeholder="Enter Time HH:MM:SS">
		<button id="btn-commit1">Commit</button>
	</div>
	<div class="task-section">
		<textarea id="input-text" placeholder="Enter your pattern ">Lookahead and lookbehind, collectively called "lookaround", are zero-length assertions just like the start and end of line, and start and end of word anchors explained earlier in this tutorial. The difference is that lookaround actually matches characters, but then gives up the match, returning only the result: match or no match. That is why they are called "assertions". They do not consume characters in the string, but only assert whether a match is possible or not. Lookaround allows you to create regular expressions that are impossible to create without them, or that would get very longwinded without them.</textarea>
		<input type="" id="input-regexp" name="input-regexp" placeholder="Enter regExp">
		<button id="btn-commit2">Commit</button>
		<div id="text-result"></div>
	</div>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#btn-commit1").click(function() {

				var regIP = /(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))$/;
				var regURL = /https?:\/\/[a-zA-Z0-9_-]+(?:(?:\.|\/)[a-zA-Z0-9_-]+)*$/;
				var regEmail = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*\.[a-z]+$/;
				var regDate = /[0-3][0-9]\/[0,1][0-9]\/\d{4}$/
				var regTime = /(?:(?:[0,1][0-9])|(?:2[0-3])):[0-5][0-9]:[0-5][0-9]$/;

				var totalStr = $("#input-id").val().match(regIP) + " " + $("#input-url").val().match(regURL) + " " + $("#input-email").val().match(regEmail) + " " + $("#input-date").val().match(regDate) + " " + $("#input-time").val().match(regTime);

				alert(totalStr);

			});

			$("#btn-commit2").click(function() {
				var inputText = $("#input-text").val();

				var reg = new RegExp($("#input-regexp").val(), "g");
				var result = inputText.match(reg);

				var resultStr = inputText.replace(reg, );

				alert(resultStr);
			})
		});
	</script>
</body>
</html>