function authCheck(auth) {
	if(auth) {
		return true;
	} else {
		console.log("Error");
		return false;
	}
}

function userIndex(ATM) {
	for(var i = 0; i < ATM.users.length; i++) {
		if(ATM.users[i].number == ATM.current_user) {
			return i;
		}
	}

	return 0;
}

var logs = {};
var ATM = {
	is_auth: false,
	current_user: false,
	current_type: false,

	// all cash of ATM
	cash: 2000,
	// all available users
	users: [
		{number: "0000", pin: "000", debet: 0, type: "admin"},
		{number: "0025", pin: "123", debet: 657, type: "user"}
	],
	// authoriazation ATM.auth("0025", "123");
	auth: function(number, pin) {

		if(authCheck(this.is_auth)) return;

		for(var i = 0; i < this.users.length; i++) {
			if(this.users[i].number == number && this.users[i].pin == pin) {

				this.is_auth = true;
				this.current_user = number;
				this.current_type = this.users[i].type;

				console.log("Loged in " + number);

				// ==================================================
				logs.is_auth = ATM.is_auth;
				console.log(logs);
				// ==================================================

				return;
			}
		}

	},
	// check current debet
	check: function() {

		if(!authCheck(this.is_auth)) return;

		for(var i = 0; i < this.users.length; i++) {
			if(this.users[i].number == this.current_user) {
				console.log("Current debet: " + this.users[i].debet);
				break;
			}
		}
	},
	// get cash - available for user only ATM.getCash(300);
	getCash: function(amount) {

		if(!authCheck(this.is_auth)) return;

		
		var index;
		if(index = userIndex(ATM)) {
			

			if(this.users[index].debet < amount) {
				amount = this.users[index].debet;
				console.log("No more money in cash");
			} else if(this.cash < amount) {
				amount = this.cash;
				console.log("No more money in ATM");
			} 

			this.users[index].debet -= amount;
			this.cash -= amount;
			break;
		}

		console.log("Cashed " + amount + "$");

		// ==================================================
		logs.cash = ATM.cash;
		logs.users = ATM.users;
		console.log(logs);
		// ==================================================

	},
	// load cash - available for user only
	loadCash: function(amount) {	

		if(!authCheck(this.is_auth)) return;

		for(var i = 0; i < this.users.length; i++) {
			if(this.users[i].number == this.current_user) {
				this.users[i].debet += amount;
				break;
			}
		}

		this.cash += amount;

		console.log("Loaded " + amount + "$");

		// ==================================================
		logs.cash = ATM.cash;
		logs.users = ATM.users;
		console.log(logs);
		// ==================================================

	},
	// load cash to ATM - available for admin only - EXTENDED
	load_cash: function(addition) {

		if(!authCheck(this.is_auth) || this.current_type != "admin") return;

		this.cash += addition;
		console.log("Added " + addition + "$ to ATM cash");

		// ==================================================
		logs.cash = ATM.cash;
		logs.users = ATM.users;
		console.log(logs);
		// ==================================================
	},
	// get report about cash action for admin only
	getReport: function() {

	},
	// log out
	logout: function() {

		if(!authCheck(this.is_auth)) return;

		this.is_auth = false;
		this.current_user = false;
		this.current_type = false;

		console.log("Loged out");

		// ==================================================
		logs.is_auth = ATM.is_auth;
		console.log(logs);
		// ==================================================

	}
}