NavPanel = Ext.extend(Ext.Panel, 
{
	title : 'More',
	layout : 'vbox',
	flex :1,
	iconCls:'more',
    tabId: 'userHome',
    scroll: 'vertical',
	initComponent : function() {

		this.listeners = {
			render : function() {
			},
			show : function() {
			}
		};

		this.items = [ {
			html : '<br/><table cellpadding="30" width="100%">'+
				'<tr align ="center">'+
//				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/user_list2.png" onclick="navPanel.viewRoles()"/></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/chat.png" onclick="navPanel.viewMyClub()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/help_black.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td >My Club</td>'+
				'<td width="20px"></td>'+
				'<td align ="center">About</td>'+
				'</tr>'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/flag.png" onclick="navPanel.viewRoles()"/></td>'+
				'<td width="20px"></td>'+
				'<td></td>'+
				'</tr>'+
				'<tr>'+
				'<td align ="center">Alerts</td>'+
				'<td width="30px"></td>'+
				'<td align ="center"></td>'+
				'</tr>'+
				'<tr><td height="30px"></td></tr>'+
				'</table><br/>'
		} ];
		
		this.dockedItems = [ {
			title : 'ToastMaster',
			xtype : 'toolbar',
			dock : 'top',
			items : []
		} ];

		NavPanel.superclass.initComponent.call(this);
	},

	viewMeetings: function(){
		navPanel.hide();
		meetingListPanel.listMode();
		meetingListPanel.show();
	},

	viewClubMembers: function(){
		navPanel.hide();
		//Loading the club members
		ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
		clubMemberListPanel.show();
	},
	
	viewRoles:function(){
		navPanel.hide();
		roleHelpPanel.show();
	},
	
	viewHelp:function(){
		navPanel.hide();
		helpTabPanel.show();
	},
	
	viewLog: function(){
		navPanel.hide();
		myLogPanel.show();
	},

	viewMyClub:function(){
        Ext.Msg.alert('Under Construction', 'Not implemented yet.', Ext.emptyFn);
	},
	
	onClubMemberLoad: function(data)
	{
		if (data.success) {
			console.log('Loading meeting data');
			memberStore.loadWithDefault(data.returnVal.rows);
		} else {
			console.log('Unable to load the meetings ');
		}
	},

});
