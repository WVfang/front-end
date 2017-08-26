<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>PHP</title>
</head>
<body style="background: rgba(144, 238, 144, 0.5);">
	<style type="">
		body {
			text-align: center;
			margin: 0;
		}
		form {
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.row {
			width: 960px;
			padding: 40px;
			margin: 0 auto;
			background: rgba(144, 238, 144, 0.5);
		}
		.task-borders {
			border-bottom: 1px solid #f5f5f5;
			padding-top: 19px;
			padding-bottom: 40px;
		}
		.task-borders:first-child {
			border-top: 1px solid #f5f5f5;
		}
		/* Style for result in Task1-2 */
		.result-box {
			display: table;
			margin: 0 auto;
			padding: 5px 20px;
			text-align: left;
			border: 2px solid #000;
		}
		/* Task3: Christmas Tree */
		#christmas-tree {
			padding-left: 0;
			margin: 0;
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
	<div class="row">
	<div class="task-borders">
		<h1>Calculation from -1000 to 1000</h1>
		<p>Calculation from -1000 to 1000</p>
	
		<div class="result-box">
			<?php
				$sum = 0;
				for($i = -1000; $i <= 1000; $i++) {
					$sum += $i;
				}
				echo $sum;
			?>
		</div>
	</div>
	<div class="task-borders">
		<h1>Calculation from -1000 to 1000</h1>
		<p>Including only numbers ending at 2, 3, 7</p>
		
		<!-- echo "wave", $i, ": ", $lastNumeral, " ", $sum, "<br>"; -->
		<div class="result-box">
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
	<div class="task-borders">
		<h1>Christmas tree</h1>
		<p>Это мог быть просто треугольник,<br> но елка выглядит немного веселее</p>

		<div>
			<ul id="christmas-tree">
				<?php
					for ($stars = "*", $i = 0; $i < 50; $stars .= "*", $i++) { 
						echo "<li class=\"christmas-tree-li\">", $stars, "</li>";
					}
				?>
			</ul>
		</div>
	</div>
	<div class="task-borders">
		<h1>Сhess board</h1>
		<p>Type size like (width)x(height)</p>

		<div>
			<form action="" method="post">
				<input name="chess-board-size">
				<input type="submit" value="Confirm">
			</form>
			<?php
				//echo htmlspecialchars(print_r($_POST));
				if (isset($_POST["chess-board-size"])) {

					function colorChanging($currentWidth, $currentHeight) {

						$colorShift = $currentHeight%2;
						
						if (($currentWidth + $colorShift)%2 == 0)
							return;
						else {
							return " chess-field-black";
						}
					}

					function boardCreation($generalWidth, $generalHeight) {
						$chessBoard = "";
						for ($currentHeight = 0; $currentHeight < $generalHeight; $currentHeight++) {
							$chessBoard .= "<div>";
							for ($currentWidth = 0; $currentWidth < $generalWidth; $currentWidth++) {
								$chessBoard .= "<div class=\"chess-field-default" . colorChanging($currentWidth, $currentHeight) . "\"></div>";
							}
							$chessBoard .= "</div>";
						}
						return $chessBoard;
					}

					list ($boardWidth, $boardHeight) = sscanf($_POST["chess-board-size"], "%dx%d");	
					echo "<div style=\"font-size: 0;\" class=\"container\">", boardCreation($boardWidth, $boardHeight), "</div>";
				}
			?>
		</div>
	</div>
	<div class="task-borders">
		<h1>Count numerals of Number</h1>
		<p>Type number</p>

		<div>
			<form action="" method="post">
				<input type="numbers" name="number-to-count-numerals">
				<input type="submit" value="Confirm">
			</form>
			<div class="result-box">
				<?php
					if (isset($_POST["number-to-count-numerals"])) {
						$number = $_POST["number-to-count-numerals"];
						$numerals = preg_split("//", $number, -1, PREG_SPLIT_NO_EMPTY);
						$sum;
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
	<div class="task-borders">
		<h1>Random and sort numbers</h1>
		<p>100 random numbers from 1 to 10 with deleted repetitions</p>
		<div class="result-box">
			<?php
				$totalArray;
				for($i = 0; $i < 100; $i++) {
					$totalArray[$i] = rand(1, 10);
				}
				$uniqueArray = array_unique($totalArray);
				sort($uniqueArray, SORT_NUMERIC);

				echo "<pre>";
				print_r($uniqueArray);
				echo "</pre>";
			?>
		</div>
	</div>
	</div>
</body>
</html>