MeetingServiceImpl = Ext.extend(Object, {
	
	onAjaxResponse: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
		loadMask.hide();
    },
    
    //Get the list of meetings
	getList : function(cb, scope) {
		console.log('Invoking the check service');
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/list',			
			success: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Get the meetings by club id
	getByClubId : function(clubId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/getByClubId/' + clubId,
			success : this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the meeting
	save : function(meeting, cb, scope) {
		console.log('Invoking the save service');
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/save',
			params : {
				json : Ext.encode(meeting)
			},
			success : this.onAjaxResponse
		});
		loadMask.show();
	},

	//Get the meetings by club id
	deleteMeeting : function(meetingId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/delete/' + meetingId,
			success : this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the Table Topic question
	saveTableTopics : function(cb, scope) {
		console.log('Invoking the save table topics service');		
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
		console.log(tableTopics);
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(tableTopics)
			},
			success : this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the Table Topic question
	saveSpeechNotes : function(cb, scope) {
		console.log('Invoking the save table topics service');		
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
		console.log(speechNotes);
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(speechNotes)
			},
			success : this.onAjaxResponse
		});
		loadMask.show();
	},

	//Process the response to parse out the content
	onGetContent: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
		loadMask.hide();
    },

    
	//Get the content for a specific meetingrole
	getContent : function(contentId, cb, scope) {
	    this.onGetContent = Ext.createDelegate(MeetingServiceImpl.prototype.onGetContent, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
 			url : urlStore.meetingUrl + '/getContent/'+contentId,
			success: this.onGetContent
		});
		loadMask.show();
	}
});

MeetingService = new MeetingServiceImpl();