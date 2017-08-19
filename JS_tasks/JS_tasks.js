/*	Task 1
	======================================== */
	var sum = 0, number = -1000;
	for (; number <= 1000; number++) {
		sum = sum + number;
	} /*
	======================================== 
*/

/*	Task 2
	======================================== */
	var sum = 0, number = -1000;
	for (; number <= 1000; number++) {
		var last_numeral = number%10;
		if (Math.abs(last_numeral) == 2 || Math.abs(last_numeral) == 3 ||
		 Math.abs(last_numeral) == 7) {
			sum = sum + number;
		}
	} /*
	========================================
*/

/*	Task 3
	======================================== */
	var list = document.getElementById("CT-list");

	var liPrefab = document.createElement('li');
	liPrefab.style.listStyleType = "none";
	
	var btnCTCreate = document.getElementById("btn-CT-create");
	btnCTCreate.onclick = function() {
		var stars = "";
		for (var i = 0; i < 50; i++) {
			var li = liPrefab.cloneNode(true);
			stars += "*";
	
			li.innerHTML = stars;
			list.appendChild(li);
		}
		var li = liPrefab.cloneNode(true);
		li.innerHTML = "*";
		list.appendChild(li);
	}
	
	var btnCTDelete = document.getElementById("btn-CT-delete");
	btnCTDelete.onclick = function() {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	}

	 /*
	======================================== 
*/

/*	Task 4
	======================================== */
	
	var numberOfSeconds = document.getElementById("input-seconds-to-time");
	var timeOutput = document.getElementById("seconds-in-time");
	
	function valueChecking (value) { 
		if (value < 1) return 0;
		else return value;
	}

	function zeroBeforeOneSymbol (value) {
		if ((String(value).split("")).length == 1) value = "0" + value;
		return value;
	}

	var confirmButton = document.getElementById("btn-seconds-to-time");
	confirmButton.onclick = function() {
		var secondsNumber = +numberOfSeconds.value;

		var seconds = secondsNumber % 60;
		var minutes = valueChecking(((secondsNumber % 3600) - seconds)/60);
		var hours = valueChecking((secondsNumber - minutes*60 - seconds)/3600);

		timeOutput.innerHTML = zeroBeforeOneSymbol(hours) + ":" + zeroBeforeOneSymbol(minutes)
		 + ":" + zeroBeforeOneSymbol(seconds);

		numberOfSeconds.value = "";
	} /*
	========================================
*/

/*	Task 5
	======================================== */
	var usersAgeInput = document.getElementById("input-users-age");
	var usersAgeOutput = document.getElementById("output-users-age");

	var btnAgeConfirm = document.getElementById("btn-age-confirm");
	btnAgeConfirm.onclick = function() {
		var ageNumber = usersAgeInput.value;
		var ageWord;

		var numArray = String(ageNumber).split("");
		if (numArray[numArray.length-1] == 1 && numArray[numArray.length-2] != 1) 
			ageWord = " год";
		else if ((numArray[numArray.length-1] == 2 || numArray[numArray.length-1] == 3 ||
		 numArray[numArray.length-1] == 4) && numArray[numArray.length-2] != 1) 
			ageWord = " года";
		else 
			ageWord = " лет";
		
		usersAgeOutput.innerHTML = ageNumber + ageWord;
		usersAgeInput.value = "";
	} /*
	========================================
*/

/*	Task 6
	======================================== */
	var dateBeginning = document.getElementById("input-time-beginning");
	var dateEnding = document.getElementById("input-time-ending");
	var outputInterval = document.getElementById("time-interval");

	var btnConfirm = document.getElementById("btn-interval-count");
	btnConfirm.onclick = function() {
		var intervalS = (Date.parse(dateBeginning.value) - Date.parse(dateEnding.value))/1000;
		var interval = [Math.floor(intervalS/(365*24*60*60)) + " years, ",
						(intervalS%(60*60*24*365) - intervalS%(60*60*24*365)%(60*60*24*30))/2592000 + " months (of 30days), ",
						(intervalS%(60*60*24*365)%(60*60*24*30) - intervalS%(60*60*24))/86400 + " days, ", 
						(intervalS%(60*60*24) - intervalS%(60*60))/3600 + " hours, ", 
						(intervalS%(60*60) - intervalS%60)/60 + " minutes, ", 
						intervalS%60 + " seconds!"]

		//console.log("total days: " + Math.floor(intervalS/(24*60*60)));
		//console.log("total remaining seconds: " + intervalS%(24*60*60));
		
		var output = "";
		for (var i = 0; i < interval.length; i++) {
			output += interval[i];
		}
		
		outputInterval.innerHTML = output;
		dateBeginning.value = ""; dateEnding.value = "";
	} /*
	========================================
*/

/*	Task 7
	======================================== */
	var inputDateOfBirth = document.getElementById("input-date-of-birth");
	var zodiacImage = document.getElementById("zodiac-image");
	var zodiacName = document.getElementById("zodiac-name");
	// Даты на которых меняется зодиак (12 дат - 12 месяцев)
	var changePoints = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22]; 
	var images = ["images/Aquarius.jpg", "images/Pisces.jpg", "images/Aries.jpg", "images/Taurus.jpg",
	"images/Gemini.jpg", "images/Cancer.jpg", "images/Leo.jpg", "images/Virgo.jpg", "images/Libra.jpg",
	"images/Scorpio.jpg", "images/Sagittarius.jpg", "images/Сapricorn.jpg"] 
	var names = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo",
 	"Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];

 	var button = document.getElementById("btn-zodiac-identify");
	button.onclick = function() {
		var date = new Date(inputDateOfBirth.value);
		var dateMonth = date.getMonth();
		var zodiacNumber;

		if (date.getDate() >= changePoints[dateMonth]) zodiacNumber = dateMonth; 
		else {
			if (dateMonth == 0) zodiacNumber = 11;
			else zodiacNumber = dateMonth - 1;
		}

		zodiacImage.setAttribute ("src", images[zodiacNumber]);
		zodiacName.innerHTML = names[zodiacNumber];

		inputDateOfBirth.value = "";
	} /*
	========================================
*/

/*	Task 8
	======================================== */
	var fieldPrefab = document.createElement('div');
	fieldPrefab.style.width = "0";
	fieldPrefab.style.padding = "15px";
	fieldPrefab.style.display = "inline-block";
	fieldPrefab.style.background = "white";

	var inputBoardSize = document.getElementById("input-chess-board-size");
	var chessBoard = document.getElementById("chess-board");

	var buttonCreate = document.getElementById("btn-chess-board-create");
	buttonCreate.onclick = function() {

		while (chessBoard.firstChild){
   			chessBoard.removeChild(chessBoard.firstChild);
		}

		var fieldColorChanger = true;
		for (var i = 0; i < inputBoardSize.value; i++) {
			var fieldLine = document.createElement("div");
			fieldLine.style.margin = "0";
			for (var a = 0; a < inputBoardSize.value; a++) {
				var field = fieldPrefab.cloneNode(true);
				if (!fieldColorChanger) field.style.background = "black";
			
				fieldLine.appendChild(field);
				fieldColorChanger = !fieldColorChanger;
			}
			if (inputBoardSize.value%2 == 0) fieldColorChanger = !fieldColorChanger;
			chessBoard.appendChild(fieldLine);
		}
		
		inputBoardSize.value = "";
	} /*
	========================================
*/

/*	Task 9
	======================================== */
	var inputNumOfUsersFlat = document.getElementById("input-users-flat-number");
	var inputNumOfBuilding = document.getElementById("input-buildings-total");
	var inputNumOfFloors = document.getElementById("input-floors-total");
	var inputNumOfFlats = document.getElementById("input-flats-total");
	var output = document.getElementById("users-location");

	var btnConfirm = document.getElementById("btn-identify-users-location");
	btnConfirm.onclick = function() {
		var totalBuildings = inputNumOfBuilding.value;
		var totalFloors = inputNumOfFloors.value;
		var totalFlats = inputNumOfFlats.value;
		var usersBuilding = 1, usersFloor = 1, usersFlat = inputNumOfUsersFlat.value;

		for (; usersFlat > totalFloors*totalFlats; ) {
			usersFlat -= totalFloors*totalFlats;
			usersBuilding++;
		}
		
		for (; usersFlat > totalFlats; ) {
			usersFlat -= totalFlats;
			usersFloor++;
		}
		
		output.innerHTML = "in " + usersBuilding + " building, " + usersFloor +
		 " floor, and " + inputNumOfUsersFlat.value + " flat (" + usersFlat + " of " + totalFlats + ")!"; 

		inputNumOfUsersFlat.value = ""; inputNumOfBuilding.value = "";
		 inputNumOfFloors.value = ""; inputNumOfFlats.value = "";
	} /*
	========================================
*/

/*	Task 10
	======================================== */
	var inputNumber = document.getElementById("input-number");
	var outputResult = document.getElementById("result");

	var btnCount = document.getElementById("btn-count-numerals");
	btnCount.onclick = function() {
		var numeralsArray = String(inputNumber.value).split("");
		var numeralsSum = 0;
		for (var i = 0; i < numeralsArray.length; i++) {
			numeralsSum += +numeralsArray[i];
		}
		outputResult.innerHTML = numeralsSum;
	} /*
	========================================


/*	Task 11
	======================================== */
	var inputLinks = document.getElementById("input-links");
	var linkList = document.getElementById("link-list");

	function deletePartOfWord(word, part) {
		var returnWord, wavesCounter;
		// Можно было обойтись wavesCounter = 2, но так функция будет более универсальной
		if (typeof(part) == "object") 
			wavesCounter = part.length;
		else 
			wavesCounter = 1;
		for (var i = 0; i < wavesCounter; i++) {
			returnWord = word.replace(part[i], '');
		}
		return returnWord;
	}

	var btnSort = document.getElementById("btn-sort-links");
	btnSort.onclick = function() {
		// Очитска списка
		while (linkList.firstChild){
   			linkList.removeChild(linkList.firstChild);
		}
		var links = [""], linksCounter = 0;
		// Деление строки на массив ссылок (разделителями служат " " и ",")
		for (var i = 0; i < inputLinks.value.length; i++) {
			if(!(inputLinks.value[i] == "," || inputLinks.value[i] == " ")) {
				links[linksCounter] += inputLinks.value[i];
			}
			else if(!(links[linksCounter].length == 0)) {
				linksCounter++;
				links[linksCounter] = "";
			}
		}
		// Удаление записей протоколов
		for (var i = 0; i < links.length; i++) {
			links[i] = deletePartOfWord (links[i], ["http://", "https://"]);
		}
		// Сортировка по алфавиту
		for (var i = 0; i < links.length-1; i++) {
			for (var a = 0; a < links.length-1; a++) {
				var box;
				if (links[a][0] > links[a+1][0]) {
					box = links[a+1];
					links[a+1] = links[a];
					links[a] = box;
				}
			}
		}
		// Заполнение списка
		for (var i = 0; i < links.length; i++) {
			var link = document.createElement("li");
			link.innerHTML = links[i];
			link.style.listStyleType = "none";
			linkList.appendChild(link);
		}
	} /*
	======================================== 
*/