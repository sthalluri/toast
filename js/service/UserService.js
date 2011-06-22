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
	},
	
	onCreate : function(response, args, cb, scope)
	{
		var data = eval("("+response.responseText+")");
		cb.call(scope || window, data);
	},
	
	createClubMember : function(formValues, cb, scope)
	{
		var user = 
		{
			email : formValues.email,
			phone : formValues.phone,
			firstName : formValues.fname,
			lastName : formValues.lname,
			aboutMe: formValues.aboutme
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
			success:this.onCreate
		});
	},
	
	onDelete : function(response, args, cb, scope)
	{
		var data = eval("(" +response.responseText + ")");
		cb.call(scope || window, data);
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		this.onDelete = Ext.createDelegate(UserServiceImpl.prototype.onDelete, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/delete',
			params: {id: id},
			success:this.onDelete
		});
	}
});

UserService = new UserServiceImpl();