<!DOCTYPE html>
<html>
<head>
	<title>RegExp</title>
	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/main.js"></script>
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
	<form class="task-section" action=""> <!-- onsubmit="return false;" -->
		<input id="input-id" type="" name="input-ip" placeholder="Enter IP 0-255.0-255.0-255.0-255" pattern="(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))$" required>
		<input id="input-url" type="" name="input-url" placeholder="Enter url https://... or http://..." pattern="https?:\/\/[a-zA-Z0-9_-=?]+(?:(?:\.|\/)[a-zA-Z0-9_-=?]+)*$" required>
		<input id="input-email" type="" name="input-email" placeholder="Enter email name@mail" pattern="[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*\.[a-z]+$" required>
		<input id="input-date" type="" name="input-date" placeholder="Enter date DD/MM/YYYY" pattern="(?:(?:[0-2][0-9])|(?:3[01]))\/(?:(0[1-9])|(?:1[0-2]))\/\d{1,4}$" required>
		<input id="input-time" type="" name="input-time" placeholder="Enter time HH:MM:SS" pattern="(?:(?:[01][0-9])|(?:2[0-3])):[0-5][0-9]:[0-5][0-9]$" required>
		<button id="btn-commit1" type="submit">Commit</button>
	</form>
	<div class="task-section">
		<textarea id="input-text" placeholder="Enter your pattern ">Lookahead and lookbehind, collectively called "lookaround", are zero-length assertions just like the start and end of line, and start and end of word anchors explained earlier in this tutorial. The difference is that lookaround actually matches characters, but then gives up the match, returning only the result: match or no match. That is why they are called "assertions". They do not consume characters in the string, but only assert whether a match is possible or not. Lookaround allows you to create regular expressions that are impossible to create without them, or that would get very longwinded without them.</textarea>
		<input type="" id="input-regexp" name="input-regexp" placeholder="Enter regExp" value="/l/g">
		<div id="text-result"></div>
		<button id="btn-commit2">Commit</button>
	</div>
</body>
</html>