
/**
 *  
 * @return Instance of DirectoryListing
 */
var Awake = function() { 

};

/**
 * @param directory The directory for which we want the listing
 * @param successCallback The callback which will be called when directory listing is successful
 * @param failureCallback The callback which will be called when directory listing encouters an error
 */
Awake.prototype.acquire = function(operation,successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'AwakePlugin',       //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'acquire',              //Telling the plugin, which action we want to perform
    					[operation]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};


Awake.prototype.release = function(operation,successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'AwakePlugin',       //Telling PhoneGap that we want to run "DirectoryListing" Plugin
    					'release',              //Telling the plugin, which action we want to perform
    					[operation]);        //Passing a list of arguments to the plugin, in this case this is the directory path
};

/**
 * <ul>
 * <li>Register the Directory Listing Javascript plugin.</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	//Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('awake', new Awake());
	
	//Register the native class of plugin with PhoneGap
	PluginManager.addService("AwakePlugin","com.toast.plugin.AwakePlugin");
});