MeetingServiceImpl = Ext.extend(Service, {
	
	
    //Get the list of meetings
	getList : function(cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/list',			
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Get the meetings by club id
	getByClubId : function(clubId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/getByClubId/' + clubId,
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the meeting
	save : function(meeting, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/save',
			params : {
				json : Ext.encode(meeting)
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Get the meetings by club id
	deleteMeeting : function(meetingId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/delete/' + meetingId,
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the Table Topic question
	saveTableTopics : function(cb, scope) {
		var tableTopics = new Object();
		tableTopics.meetingRoleId = questionDataStore.contentId;
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
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(tableTopics)
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the Table Topic question
	saveSpeechNotes : function(cb, scope) {
		var speechNotes = new Object();
		speechNotes.meetingRoleId = speechNoteDataStore.contentId;
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
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(speechNotes)
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Process the response to parse out the content
	onGetContent: function(response, args, cb, scope) {
		loadMask.hide();
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },

    
	//Get the content for a specific meetingrole
	getContent : function(contentId, cb, scope) {
	    this.onGetContent = Ext.createDelegate(MeetingServiceImpl.prototype.onGetContent, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
 			url : urlStore.meetingUrl + '/getContent/'+contentId,
			success : this.onGetContent,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	}
});

MeetingService = new MeetingServiceImpl();