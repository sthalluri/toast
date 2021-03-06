LocalMeetingServiceImpl = Ext.extend(Service, {
	
    //Get the list of meetings
	getMeetings : function() {
	    var meetings = meetingDAO.getData();
		var meetingArray = new Array();
		for(var id in meetings){
			if(meetings[id]){
				meetingArray.push(meetings[id]);
			}
		}
		return meetingArray;
	},
	
    //Get the list of meetings
	getList : function(cb, scope) {
		var meetingArray = this.getMeetings();
	    var returnVal = {
				"success" : true,
				"returnVal" : {
					"size" : meetingArray.length,
					"rows" : meetingArray
				}
		};
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Get the meetings by club id
	getByClubId : function(clubId, cb, scope) {
	    this.getList(cb, scope);
	},

	//Save the meeting
	save : function(meeting, cb, scope) {
	    var newMeeting = false;
		if(!meeting.id){
			newMeeting = true;
			UserService.dummyCall({m:true, id:thisUser.userId});
		}
	    meetingDAO.save(meeting);		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true',
			successMessage : 'Saved It.',
			returnVal: meeting
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		if(newMeeting){
			meetingStore.loadAndFormat(this.getMeetings());
		}
		this.onAjaxResponse(response, null, cb, scope);		
	},

	//Get the meetings by club id
	deleteMeeting : function(meetingId, cb, scope) {
	    meetingDAO.deleteObject(meetingId);		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true',
			successMessage : 'Deleted successfully.'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Save the Table Topic question
	saveTableTopics : function(meeting, cb, scope) {
		var tableTopics = new Object();
		if(!meeting.id){
		    meetingDAO.save(meeting);
			meetingStore.loadAndFormat(this.getMeetings());
		}
		tableTopics.meetingRoleId = meeting.id+1;
		var content = new Object();
		content.questions = new Array();
		if(questionDataStore.rowId){
			tableTopics.id = questionDataStore.rowId;
		}
		for(var i=0 ; i<questionDataStore.data.length; i++){
			var question = questionDataStore.getAt(i).data;
			content.questions[i]=question;
		}
		tableTopics.content = Ext.encode(content);
		meetingRoleContentDAO.save(tableTopics);	
		var returnVal = new Object({
			success:'true',
			successMessage : 'Saved successfully.'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Save the Table Topic question
	saveSpeechNotes : function(meeting, cb, scope) {
		var speechNotes = new Object();
		if(!meeting.id){
		    meetingDAO.save(meeting);		
			meetingStore.loadAndFormat(this.getMeetings());
		}
		speechNotes.meetingRoleId = meeting.id;
		var content = new Object();
		content.speechNotes = new Array();
		if(speechNoteDataStore.rowId){
			speechNotes.id = speechNoteDataStore.rowId;					
		}
		for(var i=0 ; i<speechNoteDataStore.data.length; i++){
			var speechNote = speechNoteDataStore.getAt(i).data;
			content.speechNotes[i]=speechNote;
		}
		speechNotes.content = Ext.encode(content);
		meetingRoleContentDAO.save(speechNotes);		
		var returnVal = new Object({
			success:'true',
			successMessage : 'Saved successfully.'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Process the response to parse out the content
	onGetContent: function(response, args, cb, scope) {
		loadMask.hide();
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },

    
	//Get the content for a specific meetingrole
	getContent : function(contentId, cb, scope) {
		
		var contentList = meetingRoleContentDAO.getData();
		
		var contentArray = new Array();
		for(var id in contentList){
			if(contentList[id] && contentList[id].meetingRoleId == contentId){
				contentArray.push(contentList[id]);
			}
		}
		
		var returnVal = {
				"success" : true,
				"returnVal" :  {
					"rows" :contentArray
				}
		};
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onGetContent(response, null, cb, scope);
	}
});

