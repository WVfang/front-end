/*$("span#select-friend-menu").on('click', function(event){
	$(this).toggleClass('active');
	return false;
});
 
//...


$(function() {
 
	var dd = new DropDown( $('#dd') );
 
	$(document).click(function() {
	$('.wrapper-dropdown-1').removeClass('active');
	});
});
*/

$(document).ready(function (){
	$("#friend-options").hide ();

	$("#friend-selected").hover (
		function() {
			$("#friend-options").show();
		},
		function() {
			$("#friend-options").hide();
		}
	);

	$("#friend-options li").hover (
		function() {
			$(this).addClass("active");
		},
		function() {
			$(this).removeClass("active");
		}
	).on("click", function() {
		var selectedFriend = $(this).children().text();
		console.log(selectedFriend);
		$("#friend-selected div:first").text(selectedFriend);
	})
});
