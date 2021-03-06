HomePanel = Ext.extend(Ext.Panel,{
	fullscreen : true,
    layout : {
		align:'stretch'
	},
	defaults:{
		flex : 1
	},
	initComponent : function() {

		this.registerButton = new Ext.Button({
			text : 'Register',
			width : 150,
			handler : function() {
				showPanel(registerPanel);
				registerPanel.initScreen();
			}
		}) ;
		
		this.loginButton = new Ext.Button({
			ui : 'confirm',
			text : 'Login',
			width : 150,	
			handler : function() {
				showPanel(loginPanel);
			}
		});
		
		this.setupButton = new Ext.Button({
			ui : 'confirm',
			text : 'Setup',
			width : 150,	
			handler : function() {
				showPanel(registerPanel);
			}
		});
		
		this.items = [
				{
					html : '<div class="home-panel"><br/><br/><img width="100" height="100" src="images/toastbuddy256.png"/><p class="heading">ToastBuddy</p><br/><br/><br/></div>'
				}, {
					layout : 'hbox',
					defaults : {
						flex : 1,
						style : 'margin: .5em;'
					},
					items : [ this.loginButton, this.registerButton]
				}, {
					layout : 'vbox',
					defaults : {
						style : 'margin: .5em;',
						width: 300
					},
					items : [this.setupButton]
				},
				{
					html : '<div class="link-panel"><br/><br/><br/>Visit us at <a href="http://www.toastbuddy.com">ToastBuddy.com</a></p><br/><br/><br/></div>'
				},];		
		HomePanel.superclass.initComponent.call(this);
	},
	

	showButtons:function(){
        if(loginRequired){
			this.loginButton.show();
			this.registerButton.show();
			this.setupButton.hide();
		}
	},

	
	localMode:function(){
		this.loginButton.hide();
		this.registerButton.hide();
		this.setupButton.show();
	},
	
});
