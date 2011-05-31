MeetingController = Ext.extend(Object, {
	
	getList : function() {
		console.log('Invoking the check service');
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/list',			
			success : function(response, opts) {
				data = eval("(" + response.responseText + ")");
				if (data.success) {
					meetings = data.returnVal.rows;
					console.log(meetings);
					meetingListPanel.loadData(meetings);
				} else {
					meetingListPanel.updateMessage(data.errorMessage);
				}
			}
		});
	},

	save : function(meeting) {
		console.log('Invoking the save service');
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/save',
			params : {
				json : Ext.encode(meeting)
			},
			success : function(response, opts) {
				data = eval("(" + response.responseText + ")");
				if (data.success) {
					meetingStore.reload(thisUser.defaultClubId);
					
					//meetingPanel.updateMessage(data.successMessage);
				} else {
					//meetingPanel.updateMessage(data.errorMessage);
				}
			}
		});
	},
	
	saveTableTopics : function() {
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
		
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(tableTopics)
			},
			success : function(response, opts) {
				console.log(response.responseText);
				data = eval("(" + response.responseText + ")");
				if (data.success) {
					questionDataStore.reload();
				} 
			}
		});
	}

});