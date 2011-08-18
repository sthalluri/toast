AppDB = Ext.extend(Object, {
	
	THIS_USER: '0',
	USERID: '1', 
	PASSWD: '2',
	LOGGEDIN: '3',
	AUTH_TOKEN: '4',
	AUTH_EXP_TIME: '5',
	AUTH_INIT_TIME: '6',
	CURR_MEETING: '7',
	REMEMBER_ME: '8',

	USER: '9',
	USER_ID: '10',

	MEETING: '11',
	MEETING_ID: '12',

	CLUB: '13',

	MEETINGROLECONTENT: '14',
	MEETINGROLECONTENT_ID:'15',
		
	constructor : function(config) {
		Ext.apply(this, config);
	},

	init : function(c) {
		//this.db = window.openDatabase("toastDB", "1.0", this.dbName, 1000000);
		//this.db.transaction(db.populateDB, db.errorCB, db.successCB);
		//this.db.transaction(db.initDB, db.errorCB, db.successCB);
	},

	initDB : function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS user');
		tx.executeSql('CREATE TABLE IF NOT EXISTS user (id unique, aboubtMe, accessKey, defaultClubId, email, '
				+'firstName, isenabled, lastName, password, phone )');
	},

	populateDB : function(tx,values) {
		tx.executeSql('INSERT INTO user (id, aboutMe) VALUES (?, ?)',values);
	},

	errorCB : function(err) {
		alert("Error processing SQL: " + err);
	},

	successCB : function() {
		alert("success!");
	},

	queryDB: function(tx) {
	    tx.executeSql('SELECT * FROM DEMO', [], db.querySuccess, db.errorCB);
	},
	
	createUser: function(data, callBack){
		  db.readTransaction(function (t) {
		    t.executeSql('SELECT id FROM docs WHERE label IN (' + q + ')', labels, function (t, data) {
		    	callBack(data);
		    });
		  });
	},
	
	querySuccess: function (tx, results) {
	    // this will be empty since no rows were inserted.
	    console.log("Insert ID = " + results.insertId);
	    // this will be 0 since it is a select statement
	    console.log("Rows Affected = " + results.rowAffected);
	    // the number of rows returned by the select statement
	    console.log("Insert ID = " + results.rows.length);
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


function selectAll(){  
    db.db.transaction(  
        function (transaction) {  
            transaction.executeSql("SELECT * FROM DEMO;", [],  
                db.querySuccess, db.errorCB);  
        }  
    );  
}  