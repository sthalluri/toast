Service = Ext.extend(Object, {

	onAjaxResponse: function(response, args, cb, scope) {
		loadMask.hide();
		var data = new Object(); 
		if(response && response.responseText){
			data = eval("(" + response.responseText + ")");
		}else{
			data.errorMessage = "Failed to Connect to the server.";
		}
        cb.call(scope || window, data);
    }
});