UserServiceImpl = Ext.extend(Object, {

	onAjaxResponse: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },

	checkLogin : function(userId, password, cb, scope) {
		console.log('Invoking the check service');
		var authToken = {
			userId : userId,
			password : password
		};

	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

		Ext.Ajax.request({
			url : urlStore.userUrl + '/checkLogin',
			params : {
				json : Ext.encode(authToken)
			},
			success: this.onAjaxResponse
		});
	},
	
	register : function(formValues, cb, scope) { 
		console.log('Invoking the check service');
		var user = {
			userId : formValues.email,
			password : formValues.password,
			firstName : formValues.firstName,
			lastName : formValues.lastName
		};
	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.userUrl + '/register',
			params : {
				json:Ext.encode(user)
			},
            success: this.onAjaxResponse
       });
	},
	

	getName: function(userId){
		if(userId){
			return memberStore.getById(userId).data.name;
		}else{
			return 'Not Available';
		}
	}
	

});

UserService = new UserServiceImpl();