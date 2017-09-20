var logs = {};
var reports = [];

var ATM = {

	is_auth: false,
	current_user_id: false,
	current_user_type: false,

	// all atm_cash of ATM
	atm_cash: 2000,

	// all available users
	users: [
		{number: "0000", pin: "000", debet: 0, type: "admin"},
		{number: "0025", pin: "123", debet: 657, type: "user"}
	],

	// authoriazation
	auth: function(cashNumber, cashPin) {

		if(this.is_auth) {
			console.log("You must log out to run this operation");
			return;
		}

		if(typeof cashNumber != "string" || typeof cashPin != "string") {
			console.log("Number and pin are numbers with string type");
			return;
		}

		// identification of user cash number
		for(var userIndex = 0; userIndex < this.users.length; userIndex++) {
			if(this.users[userIndex].number == cashNumber && this.users[userIndex].pin == cashPin) {

				updatingAuthorizationData(ATM, true, userIndex, this.users[userIndex].type);
				console.log("Loged in " + cashNumber);

				// ==================================================
				logAuthorizationData(logs, this.is_auth, this.current_user_id, this.current_user_type);
				// ==================================================

				return;
			}
		}

		console.log("Such account is not defined");
	},

	// check current debet
	checkDebet: function() {

		if(!authCheck(this.is_auth)) {
			return;
		}

		console.log("Current debet: " + this.users[this.current_user_id].debet);	
	},

	// get atm_cash - available for user only
	getCash: function(amount) {

		if(!checkForAuthAndRights(this.is_auth, this.current_user_type, "user")) {
			return;
		}

		if(!checkForPositiveNumber(amount)) {
			return;
		}

		if(this.users[this.current_user_id].debet < amount) {
			console.log("Not enough money in cash. Current debet: " + this.users[this.current_user_id].debet);
			return;
		}

		if(this.atm_cash < amount) {
			console.log("Not enough money in ATM. Current atm_cash: " + this.atm_cash);
			return;
		} 
		
		this.users[this.current_user_id].debet -= amount;
		var result = atmCashOperations(ATM, -amount);
		addReport(reports, ATM, result);
	
		console.log(result);

		// ==================================================
		logCashActionsData(logs, this.atm_cash, this.users);
		// ==================================================
	},

	// load atm_cash - available for user only
	loadCash: function(amount) {	

		if(!checkForAuthAndRights(this.is_auth, this.current_user_type, "user")) {
			return;
		}

		if(!checkForPositiveNumber(amount)) {
			return;
		}

		this.users[this.current_user_id].debet += amount;
		var result = atmCashOperations(ATM, amount);
		addReport(reports, ATM, result);

		console.log(result);

		// ==================================================
		logCashActionsData(logs, this.atm_cash, this.users);
		// ==================================================
	},

	// load atm_cash to ATM - available for admin only - EXTENDED
	load_cash: function(addition) {

		if(!checkForAuthAndRights(this.is_auth, this.current_user_type, "admin")) {
			return;
		}

		if(!checkForPositiveNumber(addition)) {
			return;
		}

		var result = atmCashOperations(ATM, addition);
		addReport(reports, ATM, result);

		console.log(result);

		// ==================================================
		logCashActionsData(logs, this.atm_cash, this.users);
		// ==================================================
	},

	// get report about atm_cash action for admin only
	getReport: function() {

		if(!checkForAuthAndRights(this.is_auth, this.current_user_type, "admin")) {
			return;
		}

		if(!(reports.length > 0)) {
			console.log("No any reports in history yet");
			return;
		}

		console.log(reports);
	},

	// log out
	logout: function() {

		if(!authCheck(this.is_auth)) {
			return;
		}

		updatingAuthorizationData(ATM, false, false, false);
		console.log("Loged out");

		// ==================================================
		logAuthorizationData(logs, this.is_auth, this.current_user_id, this.current_user_type);
		// ==================================================
	}
}

// Authorization check
function authCheck(auth) {

	if(!auth) {
		console.log("You must login to run this operation");
		return false;
	}
		
	return true;
}

// Changes on log in/log out
function updatingAuthorizationData(ATM, is_auth, current_user_id, current_user_type) {

	ATM.is_auth = is_auth;
	ATM.current_user_id = current_user_id;
	ATM.current_user_type = current_user_type;
}

// Authorization check + User_type check
function checkForAuthAndRights(auth, user_type, needed_type) {

	if(!authCheck(auth)) {
		return false;
	}

	if(user_type != needed_type) {
		console.log("This operation can be used only by " + needed_type);
		return false;
	}

	return true;
}

// Checking the input data for the data type and positivity of the value
function checkForPositiveNumber(number) {

	if(!(typeof number == "number" && number > 0)) {
		console.log("Amount must be a positive number");
		return false;
	}

	return true;
}

// Operations on atm_cash
function atmCashOperations(ATM, amount) {

	if(!(typeof amount == "number")) {
		return;
	}

	ATM.atm_cash += amount;

	if(amount > 0) {
		return "Loaded " + amount + "$";
	}

	if(amount < 0) {
		return "Cashed " + Math.abs(amount) + "$";
	}
}

// Adding a report about cash operations
function addReport(reports, ATM, cashOperation) {
	reports.push(cashOperation + ". Current atm_cash: " + ATM.atm_cash + ". " + ATM.current_user_type + ": " + ATM.users[ATM.current_user_id].number);
}

// ==================================================

function logAuthorizationData(logs, is_auth, current_user_id, current_user_type) {

	logs.is_auth = is_auth;
	logs.current_user_id = current_user_id;
	logs.current_user_type = current_user_type;
	console.log(logs);
}

function logCashActionsData(logs, atm_cash, users) {

	logs.atm_cash = atm_cash;
	logs.users = users;
	console.log(logs);
}

// ==================================================