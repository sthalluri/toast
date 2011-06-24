HomePanel = Ext.extend(Ext.Panel,{
	title : 'Home',
	fullscreen : true,
	layout : 'vbox',

	initComponent : function() {

		this.items = [
				{
					html : '<div class="home"><br/><img width="250" class="imageLeft" src="images/bg_footer.gif"/><br/><h2>Welcome to ToastMasters</h2><br/><br/><br/></div>'
				}, {
					layout : 'hbox',
					defaults : {
						xtype : 'button',
						style : 'margin: .5em;'
					},
					items : [ new Ext.Button({
						ui : 'confirm',
						text : 'Login',
						width : 80,
						pack : 'center',
						handler : function() {
							loginPanel.show();
						}
					}), new Ext.Button({
						text : 'Register',
						width : 80,
						pack : 'center',
						handler : function() {
							registerPanel.show();
						}
					}) ]
				} ];

		this.dockedItems = [ {
			title : 'ToastMasters',
			xtype : 'toolbar',
			dock : 'top',
			items : []
		} ];
		HomePanel.superclass.initComponent.call(this);
	}
});
