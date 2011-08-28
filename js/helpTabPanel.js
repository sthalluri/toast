HelpTabPanel = Ext.extend(Ext.TabPanel, {
	cls: 'legislator-tabs',
	fullscreen : false,
	initComponent : function() {
		this.items = [ helpPanel, roleHelpPanel ];
		HelpTabPanel.superclass.initComponent.call(this);
	}
});
