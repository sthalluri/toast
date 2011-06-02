MeetingServiceImpl = Ext.extend(Object, {
	
	onGetList: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },
	
	getList : function(cb, scope) {
		console.log('Invoking the check service');
	    this.onGetList = Ext.createDelegate(MeetingServiceImpl.prototype.onGetList, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/list',			
			success: this.onGetList
		});
	},

	
	//Get the meetings by club id
	onGetByClubId: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },
	
	getByClubId : function(clubId, cb, scope) {
	    this.onGetByClubId = Ext.createDelegate(MeetingServiceImpl.prototype.onGetByClubId, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/getByClubId/' + clubId,
			success : this.onGetByClubId
		});
	},


	onSave: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },

	save : function(meeting, cb, scope) {
		console.log('Invoking the save service');
	    this.onSave = Ext.createDelegate(MeetingServiceImpl.prototype.onSave, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/save',
			params : {
				json : Ext.encode(meeting)
			},
			success : this.onSave
		});
	},

	onsaveTableTopics: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		console.log(response.responseText);
        cb.call(scope || window, data);
    },

	saveTableTopics : function(cb, scope) {
		console.log('Invoking the save table topics service');		
		var tableTopics = new Object();
		tableTopics.meetingRoleId = questionDataStore.contentId;
		var content = new Object();
		content.questions = new Array();	
		tableTopics.id = questionDataStore.rowId;		
		for(var i=0 ; i<questionDataStore.data.length; i++){
			var question = questionDataStore.getAt(i).data;
			content.questions[i]=question;
		}
		tableTopics.content = Ext.encode(content);
	    this.onsaveTableTopics = Ext.createDelegate(MeetingServiceImpl.prototype.onsaveTableTopics, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(tableTopics)
			},
			success : this.onsaveTableTopics
		});
	}

});

MeetingService = new MeetingServiceImpl();