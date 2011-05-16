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
        loginController = new LoginController(loginPanel);

        registerPanel = new RegisterPanel();
        registerController = new RegisterController(loginPanel);

        navPanel = new NavPanel();
        
        //initNavPanel();
        initGramPanel();
        initTimerPanel();
        initTableTopicPanel();
        initSpeakerPanel();
        myLogPanel = new MyLogPanel();
        initMeetingPanel();
        initAddMeetingPanel();
        initRoleListPanel();
        helpPanel = new HelpPanel();
        
        //loginForm.hide();
        meetingPanel.hide();
        //myLogPanel.hide();
        
        rolePanel = new Ext.Panel({
        	title:'Now',
        	layout: 'card',
        	iconCls:'star',
            items: [roleListPanel, gramPanel, timerPanel, tableTopicPanel,speakerPanel]
        });

        homeCardPanel = new Ext.Panel({
        	title:'Home',
        	layout: 'card',
            iconCls:'home',
            items: [homePanel, navPanel]
        });

        meetingCardPanel = new Ext.Panel({
        	title:'Meetings',
        	layout: 'card',
            iconCls:'bookmarks',
            items: [meetingPanel, addMeetingPanel]
        });
        
        mainPanel = new Ext.TabPanel({
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
            items: [homeCardPanel, rolePanel,
                    meetingCardPanel, myLogPanel,helpPanel]
        });       
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
var meetingPanel;
var homeCardPanel;
var rolePanel;
var roleListPanel;
var helpPanel;

//Controllers
var loginController ;
var registerController ;
