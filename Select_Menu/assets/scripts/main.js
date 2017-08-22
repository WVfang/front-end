$(document).ready(function (){
	/* Создание списка с информации */
	var persons = [["Jenny Hess", "assets\\images\\Cancer.jpg"],
	 				["Elliot Fu", "assets\\images\\Leo.jpg"],
	 				["Stevie Feliciano", "assets\\images\\Gemini.jpg"],
	 				["Christian", "assets\\images\\Pisces.jpg"],
	 				["Matt","assets\\images\\Scorpio.jpg"]];

	for(var i = 0; i < persons.length; i++) {
		$("#friend-total-options").append("<li class=\"friend-option\"><img src=\"" + 
			persons[i][1] + "\"></img><div>" + persons[i][0] + "</div></li>");
	}
	/* Изначальное скрытие списка */
	$("#friend-total-options").hide ();
	/* Выдвижение/задвижение списка при клике на него/вне списка */
	$("body").click (
		function(event) {
			if($(event.target).closest("#select-menu").length) {
				$("#friend-total-options").show();
				$("#select-menu")
					.css("border-color", "#87ceeb");
			}
			else {
				$("#friend-total-options").hide();
				$("#select-menu")
					.css("border-color", "#d3d3d3");
			}
		}
	);
	/* Смена фона при наведении на элемент списка и выбор элемента при клике на него */
	$(".friend-option").hover (
		function() {
			$(this).addClass("active-background");
		},
		function() {
			$(this).removeClass("active-background");
		}
	).on("click", function() {
		$("#select-menu div:first").removeAttr("id").addClass("friend-option");
		$("#select-menu div:first").children().not(".fa").remove();
		$(this).children().clone().appendTo($("#select-menu div:first"));
	})
});
