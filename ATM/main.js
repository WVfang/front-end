
function authCheck(auth) {

	if(!auth) {
		console.log("You must login to run this operation");
		return true;
	} else {
		return false;
	}
}

function adminCheck(auth, user) {

	if(authCheck(auth)) {
		return true;
	} else if(user != "admin") {
		console.log("This operation can be used only by admin");
		return true;
	} else {
		return false;
	}
}

var logs = {};
var reports = [];

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

		if(this.is_auth) {
			console.log("You must log out to run this operation");
			return;
		}

		for(var i = 0; i < this.users.length; i++) {
			if(this.users[i].number == number && this.users[i].pin == pin) {

				this.is_auth = true;
				this.current_user = i;
				this.current_type = this.users[i].type;

				console.log("Loged in " + number);

				// ==================================================
				logs.is_auth = ATM.is_auth;
				logs.current_user = ATM.current_user;
				logs.current_type = ATM.current_type;
				console.log(logs);
				// ==================================================

				return;
			}
		}

		console.log("Loge in failed");

	},
	// check current debet
	check: function() {

		if(authCheck(this.is_auth)) return;

		console.log("Current debet: " + this.users[this.current_user].debet);
		
	},
	// get cash - available for user only ATM.getCash(300);
	getCash: function(amount) {

		if(authCheck(this.is_auth)) return;

		if(this.users[this.current_user].debet < amount) {
			amount = this.users[this.current_user].debet;
			console.log("No more money in cash");
		}

		if(this.cash < amount) {
			amount = this.cash;
			console.log("No more money in ATM");
		} 
	
		this.users[this.current_user].debet -= amount;
		this.cash -= amount;
		reports.push("Cashed " + amount + "$ by " + this.users[this.current_user].number 
			+ " (user). Cash left: " + this.cash);
	
		console.log("Cashed " + amount + "$");

		// ==================================================
		logs.cash = ATM.cash;
		logs.users = ATM.users;
		console.log(logs);
		// ==================================================

	},
	// load cash - available for user only
	loadCash: function(amount) {	

		if(authCheck(this.is_auth)) return;

		this.users[this.current_user].debet += amount;
		this.cash += amount;
		reports.push("Loaded " + amount + "$ by " + this.users[this.current_user].number 
			+ " (user). Cash left: " + this.cash);

		console.log("Loaded " + amount + "$");

		// ==================================================
		logs.cash = ATM.cash;
		logs.users = ATM.users;
		console.log(logs);
		// ==================================================

	},
	// load cash to ATM - available for admin only - EXTENDED
	load_cash: function(addition) {

		if(adminCheck(this.is_auth, this.current_type)) return;

		this.cash += addition;
		reports.push("Added " + addition + "$ to ATM cash by " + this.users[this.current_user].number 
			+ " (admin). Cash left: " + this.cash);

		console.log("Added " + addition + "$ to ATM cash");

		// ==================================================
		logs.cash = ATM.cash;
		logs.users = ATM.users;
		console.log(logs);
		// ==================================================
	},
	// get report about cash action for admin only
	getReport: function() {

		if(adminCheck(this.is_auth, this.current_type)) return;

		console.log(reports);
	},
	// log out
	logout: function() {

		if(authCheck(this.is_auth)) return;

		this.is_auth = false;
		this.current_user = false;
		this.current_type = false;

		console.log("Loged out");

		// ==================================================
		logs.is_auth = ATM.is_auth;
		logs.current_user = ATM.current_user;
		logs.current_type = ATM.current_type;
		console.log(logs);
		// ==================================================

	}
}