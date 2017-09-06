<!DOCTYPE html>
<html>
<head>
	<title>RegExp</title>
</head>
<body>
	<style>
		input {
			display: block;
			margin-bottom: 10px;
		}
	</style>
	<form action="">
		<input id="input-id" type="" name="input-ip">
		<input id="input-url" type="" name="input-url">
		<input id="input-email" type="" name="input-email">
		<input id="input-date" type="" name="input-date">
		<input id="input-time" type="" name="input-time">
		<button>Commit</button>
	</form>
	<script type="text/javascript">
		var str = "";

		var regIP = /(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))\.(?:(?:[10]?[0-9]?[0-9])|(?:2[0-4][0-9])|(?:25[0-5]))/;
		var regURL = /https?:\/\/[a-zA-Z0-9_-]+(?:(?:\.|\/)[a-zA-Z0-9_-]+)*/;
		var regEmail = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-z]+/;
		var regDate = /[0-3][0-9]\/[0,1][0-9]\/\d{4}/
		var regTime = /(?:(?:[0,1][0-9])|(?:2[0-3])):[0-5][0-9]:[0-5][0-9]/;

		alert(str.match(regIP));
	</script>
</body>
</html>