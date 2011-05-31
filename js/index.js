Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        var timeline = new Ext.Component({
            title: 'Timeline',
            cls: 'timeline',
            scroll: 'vertical'
        });

        homePanel = new HomePanel();
        loginPanel = new LoginPanel();
        userController = new UserController(loginPanel);

        registerPanel = new RegisterPanel();
        registerController = new RegisterController(loginPanel);

        clubController = new ClubController();
        meetingController = new MeetingController();
        
        navPanel = new NavPanel();

        gramPanel = new GramPanel({
        	controller: meetingController
        });

        //initNavPanel();
        //initTimerPanel();
        timerPanel = new TimerPanel();

        
        tableTopicPanel = new TableTopicPanel();
        //initTableTopicPanel();
        initSpeakerPanel();
        
        myLogPanel = new MyLogPanel({
        	controller: new MeetingController(),
        	store : meetingStore
        });
        
        //initMeetingPanel();
        meetingListPanel = new MeetingListPanel({
        	controller: meetingController,
        	meetingStore : meetingStore
        });
        
        
        clubMemberListPanel = new ClubMemberListPanel();
        
        //initAddMeetingPanel();
        
        meetingPanel = new MeetingPanel({
        	controller: new MeetingController(),
        	meetingStore : meetingStore
        });
        
        
        roleListPanel = new RoleListPanel();
        //initRoleListPanel();
        roleListPanel.hide();
        
        helpPanel = new HelpPanel();
        roleHelpPanel = new RoleHelpPanel();
        
        //loginForm.hide();
        //meetingListPanel.hide();
        //myLogPanel.hide();
        
        /*
        rolePanel = new Ext.Panel({
        	title:'Now',
        	layout: 'card',
        	iconCls:'star',
            items: [roleListPanel, gramPanel, timerPanel, tableTopicPanel,speakerPanel]
        });
        */

        homeCardPanel = new Ext.Panel({
        	title:'Home',
        	layout: 'card',
            iconCls:'home',
            items: [homePanel, navPanel,
                    clubMemberListPanel, 
                    roleHelpPanel,
                    meetingListPanel, meetingPanel,
                    roleListPanel, gramPanel, timerPanel, tableTopicPanel,speakerPanel, 
                    myLogPanel, 
                    helpPanel]
        });

        /*
        meetingCardPanel = new Ext.Panel({
        	title:'Meetings',
        	layout: 'card',
            iconCls:'bookmarks',
            items: [meetingListPanel, meetingPanel]
        });
        */
        
        
        mainPanel = new Ext.Panel({
        	tabBar:{
        		dock:'bottom',
        		height:50,
        		layout:{
        			pack:'center'
        		}
        	},
        	layout: 'card',
        	title:'ToastMasters',
            fullscreen: true,
            items: [homeCardPanel 
                    //rolePanel,
                    //meetingCardPanel,
                    //myLogPanel
                    //,helpPanel
                    ]
        });       
        //rolePanel.hide();
    }
});

var mainPanel;
var loginPanel;
var homePanel;
var navPanel;
var gramPanel;
var timerPanel;
var speakerPanel;
var tableTopicPanel;
var myLogPanel;
var meetingListPanel;
var homeCardPanel;
var rolePanel;
var roleListPanel;
var helpPanel;
var meetingPanel;
var clubMemberListPanel;
var roleHelpPanel;

//Controllers
var userController ;
var registerController ;
var clubController ;
var meetingController;

//var urlStore = mockUrls;
var urlStore = {
		userUrl 		: '/toastService/user',
		meetingUrl		: '/toastService/meeting',
		registerUrl		: '/toastService/user/register',
		clubUrl			: '/toastService/club'
};

function viewHome(){
	homeCardPanel.show();
}