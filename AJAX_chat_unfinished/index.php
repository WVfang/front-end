<!DOCTYPE html>
<html>
<head>
	<title>AJAX</title>
	<link rel="stylesheet" type="text/css" href="assets/styles.css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico" rel="stylesheet">
	<script type="text/javascript" src="assets/js/jquery-3.2.1.min.js"></script>
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
	<section id="login-wrapper">
		<div class="login-form">
			<label>
				Enter your name
				<input id="name" type="text" name="name" value="Robin">
			</label>
			<div id="error-message">This nickname already exists</div>
			<label>
				Enter your password
				<input id="password" type="password" name="password" value="robin1997">
			</label>
			<input  id="btn-login" type="submit" name="submit" value="Submit">
			<div id="btn-shadow">
				<div></div>
			</div>
		</div>
	</section>
	<script type="text/javascript">
		$("#btn-login").click(function() {

			var name = $("#name").val();
			var pass = $("#password").val();
		
			$.post("assets/php/login_script.php", {"name": name, "password": pass}, function(json) {
				var arr = JSON.parse(json);
				var userName = arr.userName;

				if(userName == "This nickname already exists")
					$("#error-message").show();
				else if(userName != "") 
					window.location.replace("chat.php");		
				else
					alert("Enter name and pass");
		
			});
						
		});
	</script>
</body>
</html>