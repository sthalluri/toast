UserDAOImpl = Ext.extend(Object, {
	maxId : 0,
	
	save : function(pUser)
	{
		var users = this.getData();
		var dUser = null;
		if(pUser.id)
		{
			dUser = users[pUser.id];
		}else{
			dUser = new Object();
			dUser.id = this.getNextId();
			pUser.id = dUser.id;
			users[dUser.id] = dUser;
		}
		dUser.email = pUser.email;
		dUser.phone = pUser.phone;
		dUser.firstName = pUser.firstName;
		dUser.lastName = pUser.lastName;
		dUser.dirty = true;
		dUser.aboutMe = pUser.aboutMe;
		dUser.userId = pUser.userId;
		dUser.password = pUser.password;
		dUser.defaultClubId = pUser.defaultClubId;
		dUser.accessKey = pUser.accessKey;
		dUser.isEnabled = pUser.isEnabled;
		
		this.setData(users);
	},

	deleteObject: function(id){
		var users = this.getData();
		if(!id)
		{
			return null;
		}
		users[id] = null;
		this.setData(users);
	},

	getUser: function(id){
		if(!id){
			return null;
		}
		var users = this.getData();
		return users[id];
	},

	getNextId: function(){
		var id = db.getValue(db.USER_ID);
		if(id){
			id = parseInt(id);
			id++;
		}else{
			id = 1;
		}
		db.setValue(db.USER_ID, id);
		return id;
	},
	
	getData: function(){
		var json = db.getValue(db.USER);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.USER, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.USER, '({})');
	},

	setData: function(obj){
		db.setValue(db.USER, Ext.encode(obj));
	}
});

var userDAO = new UserDAOImpl();