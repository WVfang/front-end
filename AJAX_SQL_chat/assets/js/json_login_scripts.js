$("#btn-login").click(function() {

	if($("#login").val() == "" || $("#password").val() == "") {
		alert("Enter name and password!");
		return;
	}

	// Запрос на подтверждение имени/пароля или на создание нового пользователя
	$.post("assets/php/json_login_script.php", {"login": $("#login").val(), "password": $("#password").val()}, function(json) {
		var arr = JSON.parse(json);
		var userName = arr.userName;

		if(userName == "This nickname already exists") {
			$("#error-message").show();
		} else if(userName != "") {
			window.location.replace("chat.php");		
		} else {
			alert("Enter name and pass");
		}
	});
	

});