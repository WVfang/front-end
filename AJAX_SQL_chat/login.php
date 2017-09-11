<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<link rel="stylesheet" type="text/css" href="assets/styles.css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Pacifico" rel="stylesheet">
	<script type="text/javascript" src="assets/js/jquery-3.2.1.min.js"></script>
	<script src="assets/js/sql_login_scripts.js"></script> <!-- json_login_scripts.js -->
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
				<input id="login" type="text" name="name" value="">
			</label>
			<div id="error-message">This nickname already exists</div>
			<label>
				Enter your password
				<input id="password" type="password" name="password" value="">
			</label>
			<input  id="btn-login" type="submit" name="submit" value="Submit">
			<div id="btn-shadow">
				<div></div>
			</div>
		</div>
	</section>
</body>
</html>