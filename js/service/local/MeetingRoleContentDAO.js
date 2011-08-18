MeetingRoleContentDAOImpl = Ext.extend(Object, {
	maxId : 0,
	
	save : function(roleContent)
	{
		var contents = this.getData();
		if(!roleContent.id)
		{
			roleContent.id = this.getNextId();
		}
		contents[roleContent.id] = roleContent;
		roleContent.dirty = true;
		this.setData(contents);
	},

	deleteObject: function(id){
		var contents = this.getData();
		if(!id)
		{
			return null;
		}
		contents[id] = null;
		this.setData(contents);
	},

	getNextId: function(){
		var id = db.getValue(db.MEETINGROLECONTENT_ID);
		if(id){
			id = parseInt(id);
			id++;
		}else{
			id = 1;
		}
		db.setValue(db.MEETINGROLECONTENT_ID, id);
		return id;
	},
	
	getData: function(){
		var json = db.getValue(db.MEETINGROLECONTENT);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.MEETINGROLECONTENT, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.MEETINGROLECONTENT, '({})');
	},

	setData: function(obj){
		db.setValue(db.MEETINGROLECONTENT, Ext.encode(obj));
	}
});

var meetingRoleContentDAO = new MeetingRoleContentDAOImpl();