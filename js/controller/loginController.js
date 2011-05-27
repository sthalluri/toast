UserController = Ext.extend(Object, {

	checkLogin : function(userId, password) {
		console.log('Invoking the check service');
		var authToken = {
			userId : userId,
			password : password
		};

		Ext.Ajax.request({
			url : urlStore.userUrl + '/checkLogin',
			params : {
				json : Ext.encode(authToken)
			},
			success : function(response, opts) {
				data = eval("(" + response.responseText + ")");
				if (data.success) {
					loginPanel.loggedIn = true;
					thisUser = data.returnVal;
					loginPanel.hide();
					homePanel.hide();
					navPanel.show();
					
					//Loading all the datastores
					meetingStore.reload(thisUser.defaultClubId);
					memberStore.reload(thisUser.defaultClubId);
					roleStore.reload();
				} else {
					if (data.errorMessage) {
						loginPanel.updateMessage(data.errorMessage);
					} else {
						loginPanel.updateMessage('Login Failed.');
					}
				}
			}
		});
	}
});
