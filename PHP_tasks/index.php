<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body style="background: rgba(144, 238, 144, 0.5);">
	<style type="">
		body div {
			display: table;
		}
		h1 {
			width: 450px;
		}
		h1, p {
			text-align: center;
		}
		form {
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.container {
			margin: 0 auto;
		}
		/* Style for result in Task1-2 */
		.result-box {
			width: 50px;
			text-align: center;
			border: 2px solid #000;
		}
		/* Task3: Christmas Tree */
		#christmas-tree {
			padding-left: 0;
			margin: 0;
			text-align: center;
		}
		#christmas-tree li {
			list-style: none;
		}
		/* Task4: Chess board */
		.chess-field-default {
			width: 0;
			display: inline-block;
			padding: 15px;
			background: white;
		}
		.chess-field-black {
			background: black;
		}
	</style>
	<div>
		<h1>Calculation from -1000 to 1000</h1>
		<p>Calculation from -1000 to 1000</p>
	
		<div class="container result-box">
			<?php
				$sum = 0;
				for($i = -1000; $i <= 1000; $i++) {
					$sum += $i;
				}
				echo $sum;
			?>
		</div>
	</div>
	<div>
		<h1>Calculation from -1000 to 1000</h1>
		<p>Including only numbers ending at 2, 3, 7</p>
		
		<!-- echo "wave", $i, ": ", $lastNumeral, " ", $sum, "<br>"; -->
		<div class="container result-box">
			<?php
				$sum = 0;
				for($i = -1000; $i <= 1000; $i++) {
					$lastNumeral = abs($i%10);
					if($lastNumeral == 2 or
					   $lastNumeral == 3 or
					   $lastNumeral == 7) {
						$sum += $i;	
					}
				}
				echo $sum;
			?>
		</div>	
	</div>
	<div>
		<h1>Christmas tree</h1>
		<p>Это мог быть просто треугольник,<br> но елка выглядит немного веселее</p>

		<div class="container">
			<ul id="christmas-tree">
				<?php
					for ($stars = "*", $i = 0; $i < 50; $stars .= "*", $i++) { 
						echo "<li class=\"christmas-tree-li\">", $stars, "</li>";
					}
				?>
			</ul>
		</div>
	</div>
	<div>
		<h1>Сhess board</h1>
		<p>Type size like (width)x(height)</p>

		<div class="container">
			<form action="" method="post">
				<input name="chess-board-size">
				<input type="submit" value="Confirm">
			</form>
			<?php
				// $_POST
				//echo htmlspecialchars(print_r($_POST));
				if (isset($_POST["chess-board-size"])) {

					list ($boardHeight, $boardWidth) = sscanf($_POST["chess-board-size"], "%dx%d");

					function colorChanging($numOfField, $generalWidth, $currentHeight) {

						if ($generalWidth%2 != 0)
							$colorShift = $currentHeight%2;
						else if ($currentHeight%2 != 0)
							$colorShift = 1;

						if (($numOfField + $colorShift)%2 == 0)
							return "";
						else {
							return "chess-field-black";
						}
					}

					function boardCreation($generalWidth, $generalHeight) {
						$chessBoard = "";
						for ($i = 0; $i < $generalWidth; $i++) {
							$chessBoard .= "<div>";
							for ($a = 0; $a < $generalHeight; $a++) {
								$chessBoard .= "<div class=\"chess-field-default " . colorChanging($a, $generalWidth, $i) . "\"></div>";
							}
							$chessBoard .= "</div>";
						}
						return $chessBoard;
					}

					echo "<div style=\"font-size: 0;\" class=\"container\">", boardCreation($boardWidth, $boardHeight), "</div>";
				}
			?>
		</div>
	</div>
	<div>
		<h1>Count numerals of Number</h1>
		<p>Type number</p>

		<div class="container">
			<form action="" method="post">
				<input type="numbers" name="number-to-count-numerals">
				<input type="submit" value="Confirm">
			</form>
			<div class="container result-box">
				<?php
					if (isset($_POST["number-to-count-numerals"])) {
						$number = $_POST["number-to-count-numerals"];
						$numerals = preg_split("//", $number, -1, PREG_SPLIT_NO_EMPTY);
						$sum = 0;
						for ($i = 0; $i < count($numerals); $i++) {
							$sum = $sum + $numerals[$i];
						}
						echo $sum;
					}
					else {
						echo "0";
					}
				?>
			</div>
		</div>
	</div>
</body>
</html>