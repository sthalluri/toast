Validator = Ext.extend(Object, {
	validateEmail : function(email)
	{
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
		return emailPattern.test(email);
	},
	
	validatePhone : function(phone)
	{
		//phone.length == 10 && 
		if(!window.isNaN(phone))
		{
			return true;
		}
		return false;
	}

});