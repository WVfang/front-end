<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script type="text/javascript" src="assets/js/jquery-3.2.1.min.js"></script>
	<!--<script type="text/javascript" src="http://www.xiper.net/examples/js-plugins/forms/autoresize/js/autoresize.jquery.js"></script>-->
	<script type="text/javascript" src="assets/js/data_save.js"></script>
	<script type="text/javascript" src="assets/js/drag_and_drop.js"></script>
	<script type="text/javascript" src="assets/js/edit_on_dblclick.js"></script>
	<script type="text/javascript" src="assets/js/main.js"></script>
	<link rel="stylesheet" type="text/css" href="assets/css/main.css">

	<script>
		function resizeArea(elem_id, minHeight, maxHeight) {

		   var area = $("#" + elem_id);
		   var area_hidden = $("#" + elem_id + "_hidden");
		   var text = '';

		   var lines = area.val().replace(/[<>]/g, '_').split("\n")

		   $.each(lines, function(key, value) {
		           text = text + '<div>' + value.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
		   });

		   area_hidden.text(lines);
		   var height = area_hidden[0].offsetHeight + 15;
		   height = Math.max(minHeight, height);
		   height = Math.min(maxHeight, height);

		   //console.log(area[0].scrollHeight);
		   
		   if(+event.path[0].style.top.replace(/px/, "") + height > maxHeight) {
		    	event.path[0].style.top =  (maxHeight - height) + 'px';
		   }
		  
		   

		   area[0].style.height = height + 'px';
		}
	</script>

</head>
<body>
	<div id="image-wrapper">
		<img src="assets/img/crowd.jpg" draggable="false">
		<!--<div id="0" class="draggable-phrase" draggable="true">The idea is a box with zero width and height. The actual width and height of the arrow is determined by the width of the border. In an up arrow, for example, the bottom border is a colored while the left and right are transparent, which forms the triangle.</div>-->
	</div>
	<button id="btn-add-div">Add new div</button>
</body>
</html>