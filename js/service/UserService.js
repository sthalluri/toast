UserServiceImpl = Ext.extend(Object, {

	onCheckLogin: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
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
		var data = eval("("+response.responseText+")");
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