<!DOCTYPE html>
<html>
<head>
	<title>Statistics</title>
	<script src="assets/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript">
    	google.charts.load('current', {'packages':['corechart']});
    	google.charts.setOnLoadCallback(drawChart);

    	var votes = [];	
    	$.getJSON("assets/js/votes.json", function(data) {
    		$.each(data, function(key, val) {
    			votes.push(val);
    		});
    	});

    	function drawChart() {

    	var data = google.visualization.arrayToDataTable([
        	['Suspect', 'Votes'],
        	['Cat',     votes[0]],
        	['Dog',      votes[1]],
        	['Rhino',  votes[2]]
        ]);

        var options = {
        	title: 'Sausage thief'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart-thieft-votes'));

        chart.draw(data, options);
      }
    </script> 
</head>
<body style="background: rgb(240, 230, 140);">

	<?php

		function visitsCounter() {

			if(empty($_SESSION["visits"])) {
				$_SESSION["visits"] = 1;
			} else {
				$_SESSION["visits"]++;
			}
		}

		function getJSONData($dataStore) {

			if(@file_get_contents($dataStore)) {
				$dataString = file_get_contents($dataStore);
				$dataArray = json_decode($dataString, true);
			}
			else {
				$dataArray = ["cat" => 0, "dog" => 0, "rhino" => 0];
			}

			return $dataArray;
		}

		function voiceAdding($dataArray, $chosenVariant, $dataSource) {

			$dataArray[$chosenVariant]++;
			$dataArray = json_encode($dataArray, JSON_PRETTY_PRINT);
			$fp = fopen($dataSource, "w");
			fwrite($fp, $dataArray);
			fclose($fp);
		}

		session_start();
		visitsCounter();

		if($_SESSION["visits"] == 1 and @$_POST["thief"]) {

			$votes = "assets/js/votes.json";
			$totalVotes = getJSONData($votes);
			voiceAdding($totalVotes, $_POST["thief"], $votes);

		} else if(!empty($_POST["thief"])){
			$_SESSION["visits"] = 0;
     		header("Location: index.php");
		}
	?>
	<div id="piechart-thieft-votes" style="width: 900px; height: 500px; margin: 0 auto; border: 2px solid rgb(189, 183, 107);"></div>
</body>
</html>