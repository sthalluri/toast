HomePanel = Ext.extend(Ext.Panel,{
	fullscreen : true,
    layout : {
		align:'stretch'
	},
	defaults:{
		flex : 1
	},
	initComponent : function() {

		this.items = [
				{
					html : '<div class="c-toolbar-dark"><br/><br/><h2>Welcome to Toast App</h2><br/><br/><br/></div>'
				}, {
					layout : 'hbox',
					defaults : {
						xtype : 'button',
						style : 'margin: .5em;'
					},
					items : [ new Ext.Button({
						ui : 'confirm',
						text : 'Login',
						width : 100,	
						pack : 'center',
						handler : function() {
							loginPanel.show();
						}
					}), new Ext.Button({
						text : 'Register',
						width : 100,
						pack : 'center',
						handler : function() {
							registerPanel.initScreen();
						}
					}) ]
				} ];

		HomePanel.superclass.initComponent.call(this);
	}
});
