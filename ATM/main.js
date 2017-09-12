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
	// authoriazation
	auth: function(number, pin) {
		for(var i; i < this.users.length; i++) {
			if(this.users[i].number == number && this.users[i].pin == pin) {
				this.is_auth = true;
				this.current_user = number;
				this.current_type = this.users[i].type;

				return;
			}
		}

		alert("Incorrect data");
	},
	// check current debet
	check: function() {

	},
	// get cash - available for user only
	getCash: function(amount) {

	},
	// load cash - available for user only
	loadCash: function(amount) {	

	},
	// load cash to ATM - available for admin only - EXTENDED
	load_cash: function(addition) {

	},
	// get report about cash action for admin only
	getReport: function() {

	},
	// log out
	logout: function() {

	}
}