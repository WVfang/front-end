/*	Task 1
	========================================
	var sum = 0, number = -1000;
	for (; number <= 1000; number++) {
		sum = sum + number;
	}
	========================================
*/

/*	Task 2
	========================================
	var sum = 0, number = -1000;
	for (; number <= 1000; number++) {
		var last_numeral = number%10;
		if (Math.abs(last_numeral) == 2 || Math.abs(last_numeral) == 3 ||
		 Math.abs(last_numeral) == 7) {
			sum = sum + number;
		}
	}
	========================================
*/

/*	Task 3
	========================================
	var list = document.getElementById('list');
	var stars = "";

	for (var i = 0; i < 50; i++) {
		var li = document.createElement('li');
		
		stars += "*";
	
		li.innerHTML = stars;
		list.appendChild(li);
	}
	========================================
*/

/*	Task 4
	========================================
	var confirmButton = document.getElementById("button");
	var numberOfSeconds = document.getElementById("seconds");
	var timeOutput = document.getElementById("time");

	function valueChecking (value) { 
		if (value < 1) return 0;
		else return value;
	}

	function zeroBeforeOneSymbol (value) {
		if ((String(value).split("")).length == 1) value = "0" + value;
		return value;
	}

	confirmButton.onclick = function() {
		var secondsNumber = +numberOfSeconds.value;

		var seconds = secondsNumber % 60;
		var minutes = valueChecking(((secondsNumber % 3600) - seconds)/60);
		var hours = valueChecking((secondsNumber - minutes*60 - seconds)/3600);

		timeOutput.innerHTML = zeroBeforeOneSymbol(hours) + ":" + zeroBeforeOneSymbol(minutes)
		 + ":" + zeroBeforeOneSymbol(seconds);

		==============================================================================
		Это фрагмент решения с помощью Date, который просто все усложнил и забрал кучу
		времени, да еще и с багом (вычисления). Но все же я оставил его лежать тут.
		time = new Date;
		time.setHours(hours, minutes, seconds, 0);
		time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
		==============================================================================
		
	}
	========================================
*/

/*	Task 5
	========================================
	var usersAgeInput = document.getElementById("input-users-age");
	var usersAgeOutput = document.getElementById("output-users-age");
	var btnAgeConfirm = document.getElementById("age-confirm");

	function endOfArray (array, numFromTheEnd) {
		return array[array.length - numFromTheEnd];
	}

	btnAgeConfirm.onclick = function() {
		var ageNumber = usersAgeInput.value;
		var ageWord;

		var ageNumeralsArray = String(ageNumber).split("");

		if (endOfArray(ageNumeralsArray, 1) == 1 && endOfArray(ageNumeralsArray, 2) != 1) {
			ageWord = " год";
		} 
		else if (endOfArray(ageNumeralsArray, 1) == 2 || endOfArray(ageNumeralsArray, 1) == 3 ||
		 endOfArray(ageNumeralsArray, 1) == 4 && endOfArray(ageNumeralsArray, 2) != 1) {
			ageWord = " года";
		}
		else {
			ageWord = " лет";
		}

		usersAgeOutput.innerHTML = ageNumber + ageWord;
	}
	========================================
*/

/*
	========================================

	========================================
*/

var date1 = document.getElementById("input-time-1");
var date2 = document.getElementById("input-time-2");
var interval = document.getElementById("time-interval");
var btnConfirm = document.getElementById("time-confirm");

btnConfirm.onclick = function() {
	var dateML1 = Date.parse(date1.value);
	var dateML2 = Date.parse(date2.value);
	var intervalML = (dateML2-dateML1)/1000;

	console.log(intervalML);

	var seconds = intervalML&60;
	var minutes = intervalML&3600 - (intervalML/1000)&60;
	var hours = intervalML&86400 - intervalML&3600;
	
	var years = Math.floor(intervalML/(365*24*60*60));
	var months = Math.floor((intervalML - years*30*24*60*60)/(30*24*60*60));
	var days = Math.floor((intervalML - years*30*24*60*60 - months*30*24*60*60)/(24*60*60));

	interval.innerHTML = years + " years, " + months + " months, " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
}