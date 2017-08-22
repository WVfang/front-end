$(document).ready(function (){
	$("#friend-options").hide ();

	$(".select-menu").hover (
		function() {
			$("#friend-options").show();
			$(".select-menu").addClass("active-border");
		},
		function() {
			$("#friend-options").hide();
			$(".select-menu").removeClass("active-border");
		}
	);

	$("#friend-options li").hover (
		function() {
			$(this).addClass("active-background");
		},
		function() {
			$(this).removeClass("active-background");
		}
	).on("click", function() {
		$(".select-menu div:first").removeAttr("id").addClass("friend-option");
		$(".select-menu div:first").children().not(".fa").remove();
		$(this).children().clone().appendTo($(".select-menu div:first"));
	})
});
