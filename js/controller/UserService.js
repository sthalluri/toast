UserServiceImpl = Ext.extend(Object, {

	onCheckLogin: function(response, args, cb, scope) {
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
        cb.call(scope || window, data.success);
    },
    
	checkLogin : function(userId, password, cb, scope) {
		console.log('Invoking the check service');
		var authToken = {
			userId : userId,
			password : password
		};

	    this.onCheckLogin = Ext.createDelegate(UserServiceImpl.prototype.onCheckLogin, scope || window, [cb, scope], true);

		Ext.Ajax.request({
			url : urlStore.userUrl + '/checkLogin',
			params : {
				json : Ext.encode(authToken)
			},
			success: this.onCheckLogin
		});
	},
	
	onRegister : function(response,args, cb, scope ){
    	data = eval("("+response.responseText+")");
    	console.log(data);
        cb.call(scope || window, data);
	},
	
	register : function(formValues, cb, scope) { 
		console.log('Invoking the check service');
		var user = {
			userId : formValues.email,
			password : formValues.password,
			firstName : formValues.firstName,
			lastName : formValues.lastName
		};
	    this.onRegister = Ext.createDelegate(UserServiceImpl.prototype.onRegister, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.userUrl + '/register',
			params : {
				json:Ext.encode(user)
			},
            success: this.onRegister
       });
	}

});

UserService = new UserServiceImpl();