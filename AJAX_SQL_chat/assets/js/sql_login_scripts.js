$(document).ready(function() {

	var logs = {};

	$("#btn-login").click(function() {

		if($("#login").val() == "" || $("#password").val() == "") {
			alert("Enter name and password!");
			return;
		}

		// Запрос на подтверждение имени/пароля или на создание нового пользователя
		$.post("assets/php/sql_login_script.php", {"login": $("#login").val(),
		 "password": $("#password").val()}, function(data) {

		 	logs["login_script_data"] = JSON.parse(data);

			var userName = JSON.parse(data)["userName"];

			logs["user_name"] = userName;
			
			if(!userName) {
				$("#error-message").show();
				setTimeout(function() {
					$("#error-message").fadeOut();
				}, 1000);
			} else {
				window.location.replace("chat.php");		
			}
			
		});

		console.clear();
		console.log(logs);
	});
});