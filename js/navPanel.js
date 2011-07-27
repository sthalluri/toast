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
				'<td><img width="40px" height="40px" src="images/nervousIcon.jpg" onclick="navPanel.viewNervousTest()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">Club Board</td>'+
				'<td width="20px"></td>'+
				'<td class="label">Nervous Test</td>'+
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
				'<tr align ="center">'+
				'<td colspan="4"><br/><img width="40px" height="40px" src="js/ext/resources/themes/images/default/pictos/help_black.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td colspan="4" class="label">About</td>'+
				'</tr>'+
				'</table><br/>'
		} ];
		
		this.dockedItems = [ {
			title : 'ToastApp',
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

	viewNervousTest:function(){
        //Ext.Msg.alert('Under Construction', 'Coming Soon!', Ext.emptyFn);		
		homeTabPanel.hide();
		showPanel(nervousTestPanel);
		nervousTestPanel.resetTimer();
	},

	viewMyProfile : function()
	{
		clubMemberAddPanel.populateUserDetails(thisUser, "profile");
    	homeTabPanel.hide();
		showPanel(clubMemberAddPanel);
	},

	viewLogout: function(){
		db.resetLoginData();
		truncateData();
		this.hide();
		closePanel();
		loginPanel.initScreen();
		homePanel.showButtons();
	}

});
