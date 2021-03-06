UserServiceImpl = Ext.extend(Service, {

   checkLogin : function(userId, password, cb, scope) {
		var authToken = {
			userId : userId,
			password : password
		};

	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

		Ext.Ajax.request({
			url : urlStore.userUrl + '/checkLogin',
			timeout : 20,
			params : {
				json : Ext.encode(authToken)
			},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
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
            success: this.onAjaxResponse,
			failure: this.onAjaxResponse
       });
	   loadMask.show();
	},
	

	getName: function(userId){
		if(userId){
			if(memberStore.getMember(userId)){
				return memberStore.getMember(userId).name;
			}else{
				return 'Not Available';
			}
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
			userId: formValues.userId,
			password: formValues.password,
			defaultClubId: thisUser.defaultClubId,
			accessKey: formValues.accessKey,
			isEnabled: 'Y'
		};
		if(formValues.id)
		{
			user.id = formValues.id;
		}
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/create'+'?accessKey='+thisUser.accessKey,
			params: {
				json:Ext.encode(user)
			},
			success:this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/delete'+'?accessKey='+thisUser.accessKey,
			params: {id: id},
			success:this.onAjaxResponse
		});
		loadMask.show();
	},
	
	savePassword : function(password, cb, scope)
	{
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		thisUser.password = password;
		Ext.Ajax.request({
			url: urlStore.userUrl + '/create'+'?accessKey='+thisUser.accessKey,
			params: {json:Ext.encode(thisUser)},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	}
});

UserService = new UserServiceImpl();