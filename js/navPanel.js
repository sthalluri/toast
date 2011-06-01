NavPanel = Ext.extend(Ext.Panel, 
{
	title : 'User Home',
	fullscreen : true,
	layout : 'vbox',
	flex :1,
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
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/chat.png" onclick="navPanel.viewMyClub()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/calendar2.png" onclick="navPanel.viewMeetings()"/></td>'+
				'</tr>'+
				'<tr>'+
				'<td align ="center">My Club</td>'+
				'<td width="30px"></td>'+
				'<td align ="center">Meetings</td>'+
				'</tr>'+
				'<tr><td height="30px"></td></tr>'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/bookmarks.png" onclick="navPanel.viewLog()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/team.png" onclick="navPanel.viewClubMembers()"/></td>'+
				'</tr>'+
				'<tr>'+
				'<td align ="center">My Log</td>'+
				'<td width="20px"></td>'+
				'<td align ="center">Members</td>'+
				'</tr>'+
				'<tr><td height="30px"></td></tr>'+
				'<tr align ="center">'+
//				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/user_list2.png" onclick="navPanel.viewRoles()"/></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/flag.png" onclick="navPanel.viewRoles()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/help_black.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td >Alerts</td>'+
				'<td width="20px"></td>'+
				'<td align ="center">About</td>'+
				'</tr>'+
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
		clubMemberListPanel.show();
	},
	
	viewRoles:function(){
		navPanel.hide();
		roleHelpPanel.show();
	},
	
	viewHelp:function(){
		navPanel.hide();
		homePanel.hide();
		helpPanel.show();
	},
	
	viewLog: function(){
		navPanel.hide();
		myLogPanel.show();
	},

	viewMyClub:function(){
        Ext.Msg.alert('Under Construction', 'Not implemented yet.', Ext.emptyFn);
	}

});
