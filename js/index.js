Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        homePanel = new HomePanel();
        loginPanel = new LoginPanel();
        registerPanel = new RegisterPanel();
        navPanel = new NavPanel();
        gramPanel = new GramPanel();
        myGramPanel = new MyGramPanel();
        timerPanel = new TimerPanel();
        myTimerPanel = new MyTimerPanel();
        tableTopicPanel = new TableTopicPanel({
        	store : questionDataStore
        });
        
        speechNotePanel = new SpeechNotePanel();
        myLogPanel = new MyLogPanel({
        	store : meetingStore
        });        
        meetingListPanel = new MeetingListPanel({
        	meetingStore : meetingStore
        });
        clubMemberListPanel = new ClubMemberListPanel();
        
        meetingPanel = new MeetingPanel({
        	meetingStore : meetingStore
        });
                
        //roleListPanel = new RoleListPanel();        
        helpPanel = new HelpPanel();
        roleHelpPanel = new RoleHelpPanel();
        questionPanel = new QuestionPanel();
        helpTabPanel = new HelpTabPanel();
        cardPanel = new CardPanel();
        timeLimitPanel = new TimeLimitPanel();
        
        speechNoteListPanel = new SpeechNoteListPanel();
        
        homeCardPanel = new Ext.Panel({
        	title:'ToastMasters',
        	layout: 'card',
            iconCls:'home',
            fullscreen: true,
            items: [
                    homePanel, 
                    loginPanel, registerPanel,
                    navPanel,
                    clubMemberListPanel, 
                    meetingListPanel, meetingPanel,
                    myGramPanel, myTimerPanel,
                    //roleListPanel, 
                    timerPanel, cardPanel,timeLimitPanel,
                    gramPanel,
                    tableTopicPanel,questionPanel,
                    speechNoteListPanel,speechNotePanel,
                    myLogPanel, 
                    helpTabPanel]
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
var meetingListPanel;
var homeCardPanel;
var rolePanel;
var roleListPanel;
var helpPanel;
var meetingPanel;
var clubMemberListPanel;
var roleHelpPanel;
var questionPanel;
var myGramPanel;
var myTimerPanel;
var speechNoteListPanel;
var speechNotePanel;
var cardPanel;
var timeLimitPanel;

function viewHome(){
	homeCardPanel.show();
}

//[values.meetingDate.format("F d, Y g:i A")]