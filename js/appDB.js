AppDB = Ext.extend(Object, {

	USERID: '1', 
	PASSWD: '2',
	LOGGEDIN: '3',
	AUTH_TOKEN: '4',
	AUTH_EXP_TIME: '5',
	AUTH_INIT_TIME: '6',
	CURR_MEETING: '7',
	REMEMBER_ME: '8',

	constructor : function(config) {
		Ext.apply(this, config);
	},

	init : function(c) {
		this.db = window.openDatabase("test", "1.0", this.dbName, 1000000);
	},

	populateDB : function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS DEMO');
		tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
		tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
	},

	errorCB : function(err) {
		alert("Error processing SQL: " + err);
	},

	successCB : function() {
		alert("success!");
	},

	runQuery : function(fn) {
		db.transaction(fn, this.errorCB, this.successCB);
	},
	
	getValue: function(key){
		return window.localStorage.getItem(key);
	},
	
	setValue: function(key, value){
		window.localStorage.setItem(key, value);
	},
	
	removeValue: function(key){
		window.localStorage.removeItem(key);
	},
	
	removeAll: function(key){
		window.localStorage.clear();
	},
	
	toString: function(){
		return objectToString(window.localStorage);
	},
	
	resetLoginData: function(){
		db.removeValue(db.USERID);
		db.removeValue(db.PASSWD);
		db.removeValue(db.REMEMBER_ME);
	}
});