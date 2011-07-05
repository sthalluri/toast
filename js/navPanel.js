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
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/monitor2.png" onclick="navPanel.viewMyClub()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/help_black.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">Club Board</td>'+
				'<td width="20px"></td>'+
				'<td class="label">About</td>'+
				'</tr>'+
				'<tr align ="center"><td height="30px"></td></tr>'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/user_list2.png" onclick="navPanel.viewMyProfile()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/lock_open.png" onclick="navPanel.viewLogout()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">My Profile</td>'+
				'<td width="20px"></td>'+
				'<td class="label">Logout</td>'+
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

	viewHelp:function(){
		navPanel.hide();
		helpTabPanel.show();
	},
	
	viewMyClub:function(){
        Ext.Msg.alert('Under Construction', 'Coming Soon!', Ext.emptyFn);
	},
	
	viewMyProfile : function()
	{
		navPanel.hide();
		clubMemberAddPanel.show();
		clubMemberAddPanel.populateUserDetails(thisUser, "profile");
	},

	viewLogout: function(){
		db.resetLoginData();
		this.hide();
		closePanel();
		loginPanel.initScreen();
		homePanel.showButtons();
	}

});
