MeetingController = Ext.extend(Object, {
	
	url : 'mockResponse/meeting.jsp',

	getList : function() {
		//console.log('Invoking the check service');
		Ext.Ajax.request( {
			url : this.url,
			params : {
				method : 'getList'
			},
			success : function(response, opts) {
				data = eval("(" + response.responseText + ")");
				if (data.success) {
					meetings = data.returnVal.meetings;
					//console.log(meetings);
					meetingListPanel.loadData(meetings);
					//navPanel.show();
				} else {
					meetingListPanel.updateMessage(data.error.msg);
				}
			}
		});
	},

	save : function(meeting) {
		//console.log('Invoking the save service');
		Ext.Ajax.request( {
			url : this.url,
			params : {
				method : 'save',
				meeting : Ext.encode(meeting)
			},
			success : function(response, opts) {
				data = eval("(" + response.responseText + ")");
				if (data.success) {

				} else {
					meetingListPanel.updateMessage(data.error.msg);
				}
			}
		});
	}
});
