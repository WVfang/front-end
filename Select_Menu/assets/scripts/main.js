$(document).ready(function (){
	$("#friend-options").hide ();

	$(".friend-selected").hover (
		function() {
			$("#friend-options").show();
			$(".friend-selected").addClass("active-border");
		},
		function() {
			$("#friend-options").hide();
			$(".friend-selected").removeClass("active-border");
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
		var selectedFriend = $(this).children().text();
		console.log(selectedFriend);
		$(".friend-selected div:first").text(selectedFriend);
	})
});
