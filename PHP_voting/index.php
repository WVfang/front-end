<!DOCTYPE html>
<html>
<head>
	<title>Voting</title>
</head>
<body style="background: rgb(240, 230, 140);">
	<style type="text/css">
		#make-a-choice {
			border: 4px solid rgb(189, 183, 107);;
			width: 450px;
			padding: 20px;
		}
		#make-a-choice p, input, div {
			font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
			font-size: 24px;
			color: #696969;
		}
		#make-a-choice p, input, form {
			text-align: center;
			margin: 0 auto;
		}
		#make-a-choice div {
			display: inline-block;
		}

		#variants {
			width: 50%;
			margin-bottom: 20px;
			margin-top: 20px;
		}
		.variant {
			width: 100%;
		}
		.variant:nth-child(odd) {
			text-align: left;
		}
		.variant:nth-child(even) {
			text-align: right;
		}
		.variant div {
			margin: 0 10px;
		}
		#watch-statistics {
			width: 100px;
			height: 25px;
			margin-top: 50px;
			float: right;
			font-size: 18px;
			text-align: center;
			background: linear-gradient(#fff, #d3d3d3);
			border: 1px solid #d3d3d3;
		}
		#watch-statistics a {
			text-decoration: none;
		}
	</style>
	<div id="make-a-choice">
		<p>Who has stolen a sausage?</p>
		<form action="voting_result.php" method="post">
			<div id="variants">
				<div class="variant"><input type="radio" name="thief" value="dog" checked><div>Dog</div></div>
				<div class="variant"><div>Rhino</div><input type="radio" name="thief" value="rhino"></div>
				<div class="variant"><input type="radio" name="thief" value="cat"><div>Cat</div></div>
			</div>
			<input type="submit" name="confirm" value="Make a choice!" style="display: block;">
		</form>
		<div id="watch-statistics"><a href="voting_result.php">Statistics</a></div>
	</div>
	<?php
		session_start();
		$_SESSION["visits"] = 0;
	?>
</body>
</html>