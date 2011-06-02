MeetingServiceImpl = Ext.extend(Object, {
	
	onAjaxResponse: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },
    
    //Get the list of meetings
	getList : function(cb, scope) {
		console.log('Invoking the check service');
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/list',			
			success: this.onAjaxResponse
		});
	},

	//Get the meetings by club id
	getByClubId : function(clubId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/getByClubId/' + clubId,
			success : this.onAjaxResponse
		});
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
	},

	//Save the Table Topic question
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
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(tableTopics)
			},
			success : this.onAjaxResponse
		});
	},
	
	//Process the response to parse out the content
	onGetContent: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		var rContent = null;
		if(data.success && data.returnVal.rows.length>0){
			rContent = eval("(" + data.returnVal.rows[0].content+ ")");
			questionDataStore.rowId = data.returnVal.rows[0].id;
			var questions = rContent.questions;				
			var rQuestions = new Array();
			if(questions){
				for(var i=0 ; i<questions.length; i++){
					rQuestions[i] = {id:questions[i].id,text:questions[i].text};
				}
			}
			data.returnVal = rQuestions;
		}
        cb.call(scope || window, data);
    },
	
	//Get the content for a specific meetingrole
	getContent : function(contentId, cb, scope) {
	    this.onGetContent = Ext.createDelegate(MeetingServiceImpl.prototype.onGetContent, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
 			url : urlStore.meetingUrl + '/getContent/'+contentId,
			success: this.onGetContent
		});
	},

});

MeetingService = new MeetingServiceImpl();