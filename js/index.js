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
	|_ nervousTestPanel
	|_ clubMemberAddPanel
 */

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        db = new AppDB();
        db.init();
        validator = new Validator();
        
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
        changePasswordPanel = new ChangePasswordPanel();
        
        meetingPanel = new MeetingPanel({
        	meetingStore : meetingStore
        });

        questionPanel = new QuestionPanel();

        //roleListPanel = new RoleListPanel();        
        //helpPanel = new HelpPanel();
        //roleHelpPanel = new RoleHelpPanel();
        
        helpTabPanel =  new AboutList({
                title: 'About',
                xtype: 'aboutlist',
                iconCls: 'info',
                pages: aboutPages
            });
        
        nervousTestPanel = new NervousTestPanel();
        
        cardPanel = new CardPanel();
        timeLimitPanel = new TimeLimitPanel();
        timeEditPanel = new TimeEditPanel();
        
        speechNoteListPanel = new SpeechNoteListPanel();
        
        loadMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});

        homeTabPanel = new Ext.TabPanel({
        	tabBar:{
        		dock:'bottom',
        		height:50,
        		layout:{
        			pack:'center'
        		}
        	},
        	layout: 'card',
            fullscreen: true,
            cardSwitchAnimation:'fade',
            ui:'light',
            items: [meetingListPanel, clubMemberListPanel,myLogPanel, navPanel],
			listeners : {
				beforecardswitch : {fn: logSelected, scope: this}
			}
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
                         nervousTestPanel ,
                         clubMemberAddPanel,
                         changePasswordPanel,
                         timeEditPanel
                         ];

        mainCardPanel = new Ext.Panel({
        	layout: 'card',
            iconCls:'home',
            fullscreen: true,
            items: mainCardItems,
			listeners : {
				beforecardswitch : {fn: logMainSelected, scope: this}
			}
        });  
        
        document.addEventListener("backbutton", backKeyDown, true);
        
        if(db.getValue(db.REMEMBER_ME) > 0){
        	loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        }else{
        	homePanel.showButtons();
        }
    }
});

var validator;
var db;
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
var changePasswordPanel;
var nervousTestPanel ;

function logSelected(comp, newCard, oldCard, index) {
	if(index == 2){
		myLogPanel.reload();
	}
	if(index != 3){
		helpTabPanel.hide();
	}
	currentPanel = newCard;
}

function closePanel(){
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

var currentPanel;
function logMainSelected(comp, newCard, oldCard, index) {
	//console.log('Panel changed to :'+index);
	currentPanel = newCard;
}

function goBack(){
	//Get the current
	if(currentPanel&& currentPanel.goBack){
		currentPanel.goBack();
	// If the currentPanel is not defined then go to the meetingListPanel
	}else{
		if(meetingListPanel.viewMode && meetingListPanel.viewMode == "DETAIL"){
			closePanel();
			homeTabPanel.setActiveItem(0);
			meetingListPanel.goBack();
		}else{
			navigator.device.exitApp();
		}		
	}
}

function backKeyDown() { 
    //Ext.Msg.alert('Going back', 'Dong go!', Ext.emptyFn);
    goBack();
}

//<img width="30px" height="30px" src="js/ext/resources/themes/images/default/pictos/compose.png" onclick="{panel}.editTimeLimit();"/>

function showMeetingPanel(){
	homePanel.hide();
	meetingListPanel.listMode();
	homeTabPanel.show();
	homeTabPanel.setActiveItem(0);
}
