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
    tabletStartupScreen: 'icon.png',
    phoneStartupScreen: 'icon.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        db = new AppDB();
        db.init();
        validator = new Validator();
        
        homePanel = new HomePanel();
        loginPanel = new LoginPanel();
        
        if(loginRequired){
            registerPanel = new RegisterPanel();
        }else{
            registerPanel = new SetupPanel();
            homePanel.localMode();
        }
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
        		height:homeTabPadding,
        		layout:{
        			pack:'center'
        		}
        	},
        	layout: 'card',
            fullscreen: true,
            cardSwitchAnimation:'fade',
            ui:'light',
            items: [navPanel, meetingListPanel, clubMemberListPanel],
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
                         myLogPanel,
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
        
        if(loginRequired){
        	UserService = new UserServiceImpl();
        	MeetingService = new MeetingServiceImpl();
        	ClubService = new ClubServiceImpl();      
        	loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        }else{
        	UserService = new LocalUserServiceImpl();
        	MeetingService = new LocalMeetingServiceImpl();
        	ClubService = new LocalClubServiceImpl();

        	if(db.getValue(db.THIS_USER)){
        		thisUser = eval('('+db.getValue(db.THIS_USER)+')');
                loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        	}
        }
        
        
        /*
        if(db.getValue(db.REMEMBER_ME) > 0){
        	loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        }else{
        	homePanel.showButtons();
        }*/
        
    }
});

var UserService;
var MeetingService;
var ClubService;

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
	if(index != 0){
		//helpTabPanel.hide();
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

//<img width="30px" height="30px" src="images/pictos/compose.png" onclick="{panel}.editTimeLimit();"/>

function showMeetingPanel(){
	homePanel.hide();
	meetingListPanel.listMode();
	homeTabPanel.show();
	homeTabPanel.setActiveItem(1);
}

function showNavPanel(){
	homePanel.hide();
	homeTabPanel.show();
}


function acquire(){
	if(isIos){
		if (window.plugins && window.plugins.PowerManagement) {
			window.plugins.PowerManagement.acquire(function(r) {
			}, function(e) {
			});
		}
	}else{
		if(window.plugins && window.plugins.awake){
	    	window.plugins.awake.acquire('acquire',
				    function(r){},
				    function(e){}
			);
		}
	}
}

function release(){
	if(isIos){
		if (window.plugins && window.plugins.PowerManagement) {
			window.plugins.PowerManagement.release(function(r) {
			}, function(e) {
			});
		}
		
	}else{
		if(window.plugins && window.plugins.awake){
	    	window.plugins.awake.release('release',
				    function(r){},
				    function(e){}
			);
		}
	}


}



