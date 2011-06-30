UserServiceImpl = Ext.extend(Object, {

	onAjaxResponse: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
		loadMask.hide();
    },

	checkLogin : function(userId, password, cb, scope) {
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
		loadMask.show();
	},
	
	register : function(formValues, cb, scope) { 
		var user = {
			userId : formValues.email,
			password : hex_md5(formValues.password),
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
	   loadMask.show();
	},
	

	getName: function(userId){
		if(userId){
			return memberStore.getById(userId).data.name;
		}else{
			return 'Not Assigned';
		}
	},
	
	createClubMember : function(formValues, cb, scope)
	{
		var user = 
		{
			email : formValues.email,
			phone : formValues.phone,
			firstName : formValues.fname,
			lastName : formValues.lname,
			aboutMe: formValues.aboutme,
			defaultClubId: thisUser.defaultClubId
		};
		if(formValues.id)
		{
			user.id = formValues.id;
		}
		this.onCreate = Ext.createDelegate(UserServiceImpl.prototype.onCreate, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/create',
			params: {
				json:Ext.encode(user)
			},
			success:this.onAjaxResponse
		});
		loadMask.show();
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		this.onDelete = Ext.createDelegate(UserServiceImpl.prototype.onDelete, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/delete',
			params: {id: id},
			success:this.onAjaxResponse
		});
		loadMask.show();
	},
	
	savePassword : function(password, cb, scope)
	{
		this.onSavePassword = Ext.createDelegate(UserServiceImpl.prototype.onSavePassword, scope || window, [cb, scope], true);
		thisUser.password = password;
		Ext.Ajax.request({
			url: urlStore.userUrl + '/create',
			params: {json:Ext.encode(thisUser)},
			success: this.onAjaxResponse
		});
		loadMask.show();
	}
});

UserService = new UserServiceImpl();