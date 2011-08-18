ClubDAOImpl = Ext.extend(Object, {
	maxId : 0,
	save : function(club)
	{
		this.setData(club);
	},

	deleteObject: function(id){
		var meetings = this.getData();
		if(!id)
		{
			return null;
		}
		meetings[id] = null;
		this.setData(meetings);
	},

	getData: function(){
		var json = db.getValue(db.CLUB);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.CLUB, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.CLUB, '({})');
	},

	setData: function(obj){
		db.setValue(db.CLUB, Ext.encode(obj));
	}
});

var clubDAO = new ClubDAOImpl();