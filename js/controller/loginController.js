UserController = function(panel) {
    var url = 'mockResponse/loginSuccess.jsp';
	return {
		checkLogin : function(userId, password) { 
			console.log('Invoking the check service');
			Ext.Ajax.request({
                url: url,
    			params : {
    				userId:userId,
    				password:password
    			},
                success: function(response, opts) {
                	data = eval("("+response.responseText+")");
                	if(data.success){
                		loginPanel.loggedIn = true;
                		thisUser = data.returnVal;
    					loginPanel.hide();
    					navPanel.show();
                	}else{
                		loginPanel.updateMessage(data.error.msg);
                	}
                }
            });
		}
	};
};

