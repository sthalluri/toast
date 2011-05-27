RegisterController = function(panel) {
    var url = '/toastService/user/register';
	return {
		register : function(formValues) { 
			console.log('Invoking the check service');
			var user = {
				userId : formValues.email,
				password : formValues.password,
				firstName : formValues.firstName,
				lastName : formValues.lastName
			};
			Ext.Ajax.request({
                url: url,
    			params : {
    				json:Ext.encode(user)
    			},
                success: function(response, opts) {
                	data = eval("("+response.responseText+")");
                	console.log(data);
                	if(data.success){
                		registerPanel.registerSuccess();
                		thisUser = data.returnVal;
                	}else{
                		if(data.errorMessage)
                		{
                			registerPanel.updateMessage(data.errorMessage);
                		}
                	}
                }	
            });
		}
	};
};

