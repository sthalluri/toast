LocalUserServiceImpl = Ext.extend(Service, {

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
	
	register : function(formValues, cb, scope) { 
		var user = {
			userId : formValues.email,
			firstName : formValues.firstName,
			lastName : formValues.lastName
		};
		userDAO.save(user);
		db.setValue(db.THIS_USER, Ext.encode(user));
		
	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

	    var returnVal = new Object({
			success:'true',
			returnVal: user
		});
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});

	    this.onAjaxResponse(response, null, cb, scope);
	},
	
	 checkLogin : function(userId, password, cb, scope) {
	    
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

	    var returnVal = new Object({
			success:'true',
			returnVal: eval('('+db.getValue(db.THIS_USER)+')')
		});
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		
		this.onAjaxResponse(response, null, cb, scope);
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
		
		userDAO.save(user);
		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		var response = new Object({
			responseText: 'Done'
		});
		this.onAjaxResponse(Ext.encode(response), null, cb, scope);
	},
	
	savePassword : function(password, cb, scope)
	{
		var response = new Object({
			responseText: 'Done'
		});
		this.onAjaxResponse(Ext.encode(response), null, cb, scope);
	}
});


