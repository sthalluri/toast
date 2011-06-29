HelpTabPanel = Ext.extend(Ext.TabPanel, {
	cls: 'legislator-tabs',
	fullscreen : false,
	initComponent : function() {
		this.items = [ helpPanel, roleHelpPanel ];

		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			title : 'ToastMasters',
			items : [ {
				text : 'Back',
				scope : this,
				ui : 'back',
				handler: this.goBack
			} ]
		} ];

		HelpTabPanel.superclass.initComponent.call(this);
	},
	
	goBack: function(){
		this.hide();
		navPanel.show();
	}
});
