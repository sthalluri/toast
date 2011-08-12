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
				'<td><img width="40px" height="40px" src="images/pictos/desktop.png" onclick="navPanel.viewMyClub()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/nervous.ico" onclick="navPanel.viewNervousTest()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">Club Board</td>'+
				'<td width="20px"></td>'+
				'<td class="label">Nervous Test</td>'+
				'</tr>'+
				'<tr align ="center"><td height="30px"></td></tr>'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="images/pictos/files_text.png" onclick="navPanel.viewMyProfile()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/unlock.png" onclick="navPanel.viewLogout()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">My Profile</td>'+
				'<td width="20px"></td>'+
				'<td class="label">Logout</td>'+
				'</tr>'+
				'<tr align ="center">'+
				'<td colspan="4"><br/><img width="40px" height="40px" src="images/pictos/help1.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td colspan="4" class="label">Help</td>'+
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
        Ext.Msg.alert('Under Construction', 'Coming Soon!'+'<br/><br/>', Ext.emptyFn);		
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
		showPanel(loginPanel);
		homePanel.showButtons();
	}

});
