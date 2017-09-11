$(document).ready(function() {
	$("#btn-commit2").click(function() {
		var inputText = $("#input-text").val();
		var inputReg = $("#input-regexp").val().match(/\/(.*)\/([igm]{0,3})?$/);

		var reg = new RegExp(inputReg[1], inputReg[2]);
		var matches = inputText.match(reg);
	
		var i = 0;
		var newText = inputText.replace(reg, function() {
			var newString = "<mark>" + matches[i] + "</mark>";
			i++;
			return newString;
		});

		$("#text-result").empty().append(newText);
	})
});
	