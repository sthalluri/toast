RoleListPanel = Ext.extend(Ext.Panel, 
{
	    	title : 'User Home',
	fullscreen : true,
	layout : 'vbox',
	initComponent : function() {
		this.items = [ {
			html : '<br/>Pick a role<br/><br/>'
		}, {
			items : [ new Ext.Button({
				text : 'Grammarian',
				width : 300,
				pack : 'center',
				handler : function() {
					roleListPanel.hide();
					gramPanel.reset();
					gramPanel.show();
				}
			}) ]
		}, {
			html : '<br/><br/>'
		}, {
			items : [ new Ext.Button({
				text : 'Timer',
				width : 300,
				pack : 'center',
				handler : function() {
					roleListPanel.hide();
					timerPanel.reset();
					timerPanel.show();
				}
			}) ]
		}, {
			html : '<br/><br/>'
		}, {
			items : [ new Ext.Button({
				text : 'Speaker',
				width : 300,
				pack : 'center',
				handler : function() {
					roleListPanel.hide();
					speakerPanel.show();
				}
			}) ]
		}, {
			html : '<br/><br/>'
		}, {
			items : [ new Ext.Button({
				text : 'Table Topics',
				width : 300,
				pack : 'center',
				scope: this,
				handler : this.loadTableTopics
			}) ]
		}, {
			html : '<br/><br/>'
		}
//		, {
//			items : [ new Ext.Button({
//				text : 'End Meeting',
//				width : 300,
//				pack : 'center',
//				ui : 'decline',
//				handler : function() {
//					roleListPanel.hide();
//					//meetingCardPanel.show();
//					mainPanel.setActiveItem(mainPanel.items.get(2));
//				}
//			}) ]
//		} 
		];

		this.dockedItems = [ {
			xtype : 'toolbar',
			title : 'Meeting Log',
			dock : 'top',
			defaults : {
				iconMask : true,
				ui : 'plain'
			},
			layout : {
				pack : 'center'
			},
			items : [
					{
						text : 'Back',
						ui : 'back',
						scope : this,
						handler : this.goMeetingList
					}, {
						xtype : 'spacer'
					} ]
		} ];
		RoleListPanel.superclass.initComponent.call(this);
	},
	goMeetingList: function(){
		roleListPanel.hide();
		navPanel.show();
	},
	loadTableTopics: function(){
		roleListPanel.hide();
		if(thisMeeting.roles.tableTopics){
			var contentId = thisMeeting.roles.tableTopics.id;
			questionDataStore.reload(contentId);
		}
		tableTopicPanel.show();
	}
});