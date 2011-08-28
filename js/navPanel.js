NavPanel = Ext.extend(Ext.Panel, 
{
	title : 'Home',
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

		// Meeting Detail Template
		this.navTmpl = Ext.XTemplate.from('nav-layout');
		this.navTmpl.compile();
		var html = this.navTmpl.apply(new Object({buttonId:'bigButton'}));

		this.navLayoutPanel = new Ext.Panel({
			html : '',
			title : 'Home',
			scroll : 'vertical'
		});

		this.menuPanel = new Ext.Component({
			xtype : 'component',
			html : ''
		});

		this.items = [ {html: html}];

		
		this.dockedItems = [ {
			title : 'ToastBuddy',
			xtype : 'toolbar',
			dock : 'top',
			items : []
		} ];

        this.on('activate', function(){
            this.updateBigButton();
        }, this);

		NavPanel.superclass.initComponent.call(this);
	},

	updateBigButton: function(){
	   var today = new Date();
	   today.setHours(0);
	   today.setMinutes(0);
	   var hasNextMeeting = false;
	   var hasTodaysMeeting = false;
	   this.latestMeeting = null;
	   meetingStore.each(function(rec){
		   if(today < rec.data.meetingDate){
			   if( !this.latestMeeting || this.latestMeeting.meetingDate > rec.data.meetingDate){
				   this.latestMeeting = rec.data;
				   hasNextMeeting = true;
			   }
		   }
		   if(isToday(rec.data.meetingDate)){
			   hasTodaysMeeting = true;
		   }		   
	   }, this);

	   if(hasNextMeeting && hasTodaysMeeting){
		   document.getElementById('bigButton').innerHTML = 'Todays Meeting <br/> <b>'+this.latestMeeting.fMeetingDate+'</b>';
	   }else if(hasNextMeeting){
		   document.getElementById('bigButton').innerHTML = 'Upcoming Meeting <br/>'+this.latestMeeting.fMeetingDate;
	   }else{
		   document.getElementById('bigButton').innerHTML = '+ Quick Add Meeting';
	   }
	},
	
	goToMeeting: function(){
		if(this.latestMeeting){
			homeTabPanel.setActiveItem(1);
			meetingListPanel.showMeeting(this.latestMeeting);
		}else{
			homeTabPanel.setActiveItem(1);
			var meeting = getMeetingBareBones();
			meeting.meetingDate = new Date();
			meetingListPanel.showMeeting(meeting);
		}
	},
	
	
	viewHelp:function(){
		homeTabPanel.hide();
		showPanel(helpTabPanel);
		//helpTabPanel.show();
	},
	
	viewMeetings:function(){
		homeTabPanel.setActiveItem(1);
		meetingListPanel.listMode();
	},

	viewClubPanel: function(){
		homeTabPanel.setActiveItem(2);
	},
	
	viewMyReports: function(){
		//homeTabPanel.setActiveItem(3);
		homeTabPanel.hide();
		showPanel(myLogPanel);
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
