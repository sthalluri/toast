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
				'<tr>'+
				'<td><img width="80" height="80" src="js/ext/resources/themes/images/default/pictos/calendar2.png" onclick="navPanel.viewMeetings()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="80" height="80" src="js/ext/resources/themes/images/default/pictos/team.png" onclick="navPanel.viewClubMembers()"/></td>'+
				'</tr>'+
				'<tr>'+
				'<td align ="center">Meetings</td>'+
				'<td width="30px"></td>'+
				'<td align ="center">Members</td>'+
				'</tr>'+
				'<tr><td height="30px"></td></tr>'+
				'<tr>'+
				'<td><img width="80" height="80" src="js/ext/resources/themes/images/default/pictos/bookmarks.png" onclick="navPanel.viewLog()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="80" height="80" src="js/ext/resources/themes/images/default/pictos/chat.png" onclick="navPanel.viewClub()"/></td>'+
				'</tr>'+
				'<tr>'+
				'<td align ="center">My Log</td>'+
				'<td width="20px"></td>'+
				'<td align ="center">My Club</td>'+
				'</tr>'+
				'<tr><td height="30px"></td></tr>'+
				'<tr>'+
				'<td><img width="80" height="80" src="js/ext/resources/themes/images/default/pictos/user_list2.png" onclick="navPanel.viewRoles()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="80" height="80" src="js/ext/resources/themes/images/default/pictos/help_black.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr>'+
				'<td align ="center">View Roles</td>'+
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
	}


});
