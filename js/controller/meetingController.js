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
	
	saveMeetingRoleContent : function(meetingRoleContent) {
		console.log('Invoking the save service');
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(meetingRoleContent)
			},
			success : function(response, opts) {
				console.log(response.responseText);
				//data = eval("(" + response.responseText + ")");
				//meetingStore.reload(thisUser.defaultClubId);
				if (data.success) {
					//meetingPanel.updateMessage(data.successMessage);
				} else {
					//meetingPanel.updateMessage(data.errorMessage);
				}
			}
		});
	}

});