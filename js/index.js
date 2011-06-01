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

        timerPanel = new TimerPanel();
        
        tableTopicPanel = new TableTopicPanel({
        	store : questionDataStore
        });
        
        initSpeakerPanel();
        
        myLogPanel = new MyLogPanel({
        	controller: new MeetingController(),
        	store : meetingStore
        });
        
        meetingListPanel = new MeetingListPanel({
        	controller: meetingController,
        	meetingStore : meetingStore
        });
        
        
        clubMemberListPanel = new ClubMemberListPanel();
        
        meetingPanel = new MeetingPanel({
        	controller: new MeetingController(),
        	meetingStore : meetingStore
        });
        
        
        roleListPanel = new RoleListPanel();
        //initRoleListPanel();
        roleListPanel.hide();
        
        helpPanel = new HelpPanel();
        roleHelpPanel = new RoleHelpPanel();
        
        questionPanel = new QuestionPanel({
        	controller: new MeetingController()
        });
        
        homeCardPanel = new Ext.Panel({
        	title:'ToastMasters',
        	layout: 'card',
            iconCls:'home',
            fullscreen: true,
            items: [homePanel, 
                    loginPanel, registerPanel,
                    navPanel,
                    clubMemberListPanel, 
                    roleHelpPanel,
                    meetingListPanel, meetingPanel,
                    roleListPanel, gramPanel, timerPanel, 
                    tableTopicPanel,questionPanel,
                    speakerPanel, 
                    myLogPanel, 
                    helpPanel]
        });

//        
//        mainPanel = new Ext.Panel({
//        	tabBar:{
//        		dock:'bottom',
//        		height:50,
//        		layout:{
//        			pack:'center'
//        		}
//        	},
//        	layout: 'card',
//        	title:'ToastMasters',
//            fullscreen: true,
//            items: [homeCardPanel 
//                    //rolePanel,
//                    //meetingCardPanel,
//                    //myLogPanel
//                    //,helpPanel
//                    ]
//        });       
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
var questionPanel;

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