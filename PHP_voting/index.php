<!DOCTYPE html>
<html>
<head>
	<title>Voting</title>
</head>
<body style="background: #fffacd;">
	<style type="text/css">
		/* Main container */
		#make-a-choice {
			width: 450px;
			padding: 20px;
			margin: 0 auto;
			border: 4px solid rgb(189, 183, 107);
			background: #fff;
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
		/* Form variants */
		#variants div {
			display: inline-block;
		}
		#variants {
			width: 50%;
			margin: 20px auto;
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
		/* Buttons */
		.btn {
			text-align: center;
			background: linear-gradient(#fff, #d3d3d3);
			border: 2px solid rgb(221, 221, 221);
			cursor: pointer;
			outline:none;
		}
		#watch-statistics {
			width: 100px;
			height: 25px;
			margin-top: 50px;
			float: right;
			font-size: 18px;	
		}
		#watch-statistics a {
			text-decoration: none;
			color: #696969;
		}

	</style>
	<div id="make-a-choice">
		<p>Who has stolen a sausage?</p>
		<form action="voting_result.php" method="post">
			<div id="variants">
				<div class="variant">
					<input type="radio" name="thief" value="dog" checked><!--
					--><div>Dog</div>
				</div>
				<div class="variant">
					<div>Rhino</div><!--
					--><input type="radio" name="thief" value="rhino">
				</div>
				<div class="variant">
					<input type="radio" name="thief" value="cat"><!--
					--><div>Cat</div>
				</div>
			</div>
			<input id="btn-submit" class="btn" type="submit" name="confirm" value="Make a choice!">
		</form>
		<div id="watch-statistics" class="btn"><a href="voting_result.php">Statistics</a></div>
	</div>
	<?php
		session_start();
		$_SESSION["visits"] = 0;
	?>
</body>
</html>