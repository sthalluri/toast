AppDB = Ext.extend(Object, {

	/**
	 * @constructor
	 * @param {HTMLElement/Ext.Element/String/Object} config The parent element or configuration options.
	 * @ptype fittoparent
	 */
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

	onDeviceReady : function() {
		window.localStorage.setItem("key", "value");
		var keyname = window.localStorage.key(i);
		// keyname is now equal to "key"
		var value = window.localStorage.getItem("key");
		// value is now equal to "value"
		window.localStorage.removeItem("key");
		window.localStorage.setItem("key2", "value2");
		window.localStorage.clear();
		// localStorage is now empty
	}

});