/*
mainCardPanel
	|_ homePanel
	|_ loginPanel
	|_ navPanel
	|_ registerPanel
	|_ homeTabPanel
		|_ meetingListpanel 
			|_ meetingPanel
		|_ myLogPanel
		|_ clubMemberListPanel
		|_ navPanel
	|_ meetingPanel
	|_ myGramPanel
	|_ myTimerPanel
	|_ timerPanel
	|_ cardPanel	
	|_ timeLimitPanel
	|_ gramPanel
	|_ tableTopicPanel
	|_ questionPanel
	|_ speechNoteListPanel
	|_ speechNotePanel
	|_ helpTabPanel
 */

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
        clubMemberAddPanel = new ClubMemberAddPanel();
        
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

        clubMemberListPanel = new ClubMemberListPanel();
        clubMemberAddPanel = new ClubMemberAddPanel();
        
        homeTabPanel = new Ext.TabPanel({
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
            items: [meetingListPanel, clubMemberListPanel,myLogPanel, navPanel]
        });   
        
        mainCardItems = [
                         homePanel,				//0
                         loginPanel, 
                         registerPanel,
                         homeTabPanel,
                         meetingPanel,
                         myGramPanel, 			//5
                         myTimerPanel,
                         timerPanel, 
                         cardPanel,
                         timeLimitPanel,
                         gramPanel,				//10
                         tableTopicPanel,
                         questionPanel,
                         speechNoteListPanel,
                         speechNotePanel,
                         helpTabPanel,
                         clubMemberAddPanel
                         ];

        mainCardPanel = new Ext.Panel({
        	title:'ToastMasters',
        	layout: 'card',
            iconCls:'home',
            fullscreen: true,
            items: mainCardItems
        });             
    }
});

var homeTabPanel;
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
var mainCardPanel;
var rolePanel;
var roleListPanel;
var helpPanel;
var meetingPanel;
var clubMemberListPanel;
var clubMemberAddPanel;
var roleHelpPanel;
var questionPanel;
var myGramPanel;
var myTimerPanel;
var speechNoteListPanel;
var speechNotePanel;
var cardPanel;
var timeLimitPanel;
var clubMemberListPanel;
var clubMemberAddPanel;

function closePanel(panel){
	mainCardPanel.setActiveItem(3);
	meetingListPanel.meetingActionPanel.deselect();
}

function showPanel(showPanel){
	for(var i =0; i<mainCardItems.length; i++){
		if(showPanel.id == mainCardItems[i].id){
			mainCardPanel.setActiveItem(i);
		}
	}
}
//[values.meetingDate.format("F d, Y g:i A")]