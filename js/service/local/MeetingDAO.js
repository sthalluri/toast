MeetingDAOImpl = Ext.extend(Object, {
	maxId : 0,
	
	save : function(pMeeting)
	{
		var meetings = this.getData();
		if(!pMeeting.id)
		{
			pMeeting.id = this.getNextId();
		}
		meetings[pMeeting.id] = pMeeting;
		pMeeting.dirty = true;
		this.setData(meetings);
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

	getNextId: function(){
		var id = db.getValue(db.MEETING_ID);
		if(id){
			id = parseInt(id);
			id++;
		}else{
			id = 1;
		}
		db.setValue(db.MEETING_ID, id);
		return id;
	},
	
	getData: function(){
		var json = db.getValue(db.MEETING);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.MEETING, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.MEETING, '({})');
	},

	setData: function(obj){
		db.setValue(db.MEETING, Ext.encode(obj));
	}
});

var meetingDAO = new MeetingDAOImpl();