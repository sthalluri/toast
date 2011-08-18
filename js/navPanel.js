NavPanel = Ext.extend(Ext.Panel, 
{
	title : 'More',
	layout : 'vbox',
	flex :1,
	iconCls:'home',
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
			html : 
				'<br/>'+
				'<div class="lgrey-list-header" style="width:300px">'+
				'<table style="width: 100%; height: 50"><tr><td>Upcoming Meeting : Aug 13</td><td width="10%"><img class="imageLeft" src="images/chevron_circle.png"/></td></tr></table>'+
				'</div>'+
				'<br/><table cellpadding="2" width="100%">'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="images/pictos/meetings.png" onclick="navPanel.viewMyClub()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/club.gif" onclick="navPanel.viewNervousTest()"/></td>'+
				'<td width="2px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/nervous.ico" onclick="navPanel.viewNervousTest()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">Meetings</td>'+
				'<td width="20px"></td>'+
				'<td class="label">My Club</td>'+
				'<td width="2px"></td>'+
				'<td class="label">NervousCheck</td>'+
				'</tr>'+
				'<tr><td  colSpan="6"><hr/></td> </tr>'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="images/pictos/desktop.png" onclick="navPanel.viewMyProfile()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/folder_documents.png" onclick="navPanel.viewLogout()"/></td>'+
				'<td width="2px"></td>'+
				'<td colspan="4"><img width="40px" height="40px" src="images/pictos/help1.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">My Profile</td>'+
				'<td width="20px"></td>'+
				'<td class="label">My Reports</td>'+
				'<td width="2px"></td>'+
				'<td colspan="4" class="label">Help</td>'+
				'</tr>'+
				'</table>'
		} ];
		
		this.dockedItems = [ {
			title : 'ToastBuddy',
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
		clubMemberAddPanel.resetFields(navPanel);
		clubMemberAddPanel.populateUserDetails(thisUser, "profile");
    	homeTabPanel.hide();
		showPanel(clubMemberAddPanel);
	},

	viewLogout: function(){
		db.resetLoginData();
		truncateData();
		thisUser = null;
		this.hide();
		closePanel();
		loginPanel.initScreen();
		showPanel(loginPanel);
		homePanel.showButtons();
	}

});
