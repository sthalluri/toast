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
				registerPanel.initScreen();
			}
		}) ;
		
		this.loginButton = new Ext.Button({
			ui : 'confirm',
			text : 'Login',
			width : 150,	
			handler : function() {
				loginPanel.show();
			}
		});
		
		this.items = [
				{
					html : '<div class="home-panel"><br/><br/><h2>Toast Buddy</h2><br/><br/><br/></div>'
				}, {
					layout : 'hbox',
					defaults : {
						flex : 1,
						style : 'margin: .5em;'
					},
					items : [ this.loginButton, this.registerButton]
				} ];
		
		this.loginButton.hide();
		this.registerButton.hide();
		
		HomePanel.superclass.initComponent.call(this);
	},
	

	showButtons:function(){
		this.loginButton.show();
		this.registerButton.show();
	},

	
});
