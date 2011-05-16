RegisterController = function(panel) {
    var url = 'mockResponse/registerSuccess.jsp';
	return {
		register : function(formValues) { 
			console.log('Invoking the check service');
			Ext.Ajax.request({
                url: url,
    			params : {
    				userId:formValues.email,
    				password:formValues.password,
    				firstName:formValues.firstName,
    				lastName:formValues.lastName,
    				clubId:formValues.clubId,
    				clubPasscode:formValues.clubPasscode
    			},
                success: function(response, opts) {
                	data = eval("("+response.responseText+")");
                	console.log(data);
                	if(data.success){
                		registerPanel.registerSuccess();
                	}else{
                		registerPanel.updateMessage(data.error.msg);
                	}
                }
            });
		}
	};
};

