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
				handler: this.onBack
			} ]
		} ];

		HelpTabPanel.superclass.initComponent.call(this);
	},
	
	onBack: function(){
		this.hide();
		navPanel.show();
	}
});
