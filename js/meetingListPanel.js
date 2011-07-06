MeetingListPanel = Ext.extend(Ext.Panel, 
{	
	iconCls:'time',
    tabId: 'meetingList',
    title:'Meetings',
    fullScreen:true,
	defaults:{
		flex : 1
	},
    layout : {
		align:'stretch'
	},
	cls: 'demo-list',	
	initComponent : function() {
		// Meeting Detail Template
		this.meetingTmpl = Ext.XTemplate.from('meeting-detail');
		this.meetingTmpl.compile();

		// Meeting List Template
		this.meetingListTmpl = Ext.XTemplate.from('meeting-list');
		this.meetingListTmpl.compile();

		// Meeting Report Template
		this.meetingReportTmpl = Ext.XTemplate.from('meeting-report');
		this.meetingReportTmpl.compile();

		this.logBase = {
		    itemTpl: this.meetingListTmpl,
		    id:'meetingListPanel',
		    grouped: false,
		    parentPanel:this,
		    sorters: 'date',
		    singleSelect:true,
		    listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
		    store: this.meetingStore
		};
	
		this.meetingActionPanel = new MeetingActionPanel();
		this.meetingPanel = new Ext.Panel({xtype:'component', flex:1, xtype:'component',html:'Loading..', title:'Agenda',scroll: 'vertical', height:'100%'});
		this.meetingReportPanel = new Ext.Panel({xtype:'component', html:'Loading..', title:'Report',scroll: 'vertical', height:'100%'});

		this.meetingDetailTabPanel = new Ext.TabPanel({
			scroll: 'vertical',
			fullscreen : false,
			defaults:{
				flex : 1
			},
		    layout : {
		    	type: 'vbox',
		        align: 'left'
			},
			items : [ this.meetingActionPanel, this.meetingPanel, this.meetingReportPanel ],
			listeners : {
				beforecardswitch : {fn: this.meetingPanelChanged, scope: this}
			}
		});
		
		
	    this.meetingCarousel = new Ext.Panel({
	    	activeItem:0,
	    	height:'100%',	
        	layout: 'card',
	    	items:[
	    	    new Ext.List(Ext.apply(this.logBase, {
	               fullscreen: false
	           	})),
	           	this.meetingDetailTabPanel
	    	]
	    });
	
	   this.items=[
	         //   this.getHeaderConfig('Meeting'),
	        	this.meetingCarousel
	   ];
	   
	   this.backButton = {
               text: 'Back',
               ui: 'back',
               scope:this,
           	   id:'meetingListBackButton',
               handler: this.goBack
       };
	   
	   this.filterButtons = [ {
			xtype : 'segmentedbutton',
			allowDepress : true,
			items : [ {
				text : 'Upcoming',
				pressed : true
			}, {
				text : 'Show All',
			} ]
		} ];

	   this.filterToolBar =	  new Ext.Toolbar({
	            xtype: 'toolbar',
	            ui: 'light',
	            items: [{xtype: 'spacer'},this.filterButtons,{xtype: 'spacer'}],
	            dock: 'bottom'
	   });

		this.deleteButton = new Ext.Button({
	        iconMask: true,
	        ui: 'plain',
	    	iconCls:'delete',
	    	scope:this,
	        handler: this.deleteConfirm
	    });
		

	   this.mainToolbar = new Ext.Toolbar({
	            title:'Meetings',
	            dock: 'top',
	            defaults: {
	                iconMask: true,
	                ui: 'plain'
	            },
	            layout: {
	                pack: 'center'
	            },
	            items: [
	                this.backButton,
	                {xtype: 'spacer'},
	                this.deleteButton,
					{
	                    iconMask: true,
	                    ui: 'plain',
	                	iconCls:'compose',
	                	id:'meetingPanleEditIcon',
	                	scope:this,
	                    handler: function() {
	                    	homeTabPanel.hide();
	        				showPanel(meetingPanel);
	                    	//meetingListPanel.hide();
	                		//meetingPanel.show();
	                		meetingPanel.loadMeeting(this.activeMeeting);
	                    }
	                },
	                {
	                    iconMask: true,
	                    ui: 'plain',
	                	iconCls:'add',
	                	id:'meetingPanleAddIcon',
	                    handler: function() {
	                    	homeTabPanel.hide();
	        				showPanel(meetingPanel);
	        				meetingPanel.reset();
	        				meetingPanel.loadMeeting(getMeetingBareBones());
	        				//meetingListPanel.hide();
	                		//meetingPanel.reset();
	                		//meetingPanel.show();
	                    }
	                }
	            ]
	        }
	   );	
	   
	   this.dockedItems=[
	                     this.mainToolbar
	                     //,this.filterToolBar
	        ];
	   //Ext.getCmp('meetingPanleEditIcon').hide();

	   MeetingListPanel.superclass.initComponent.call(this);	
	},

	
	listMode: function(){
		this.meetingCarousel.setActiveItem(this.meetingCarousel.items.get(0));
		Ext.getCmp('meetingPanleAddIcon').show();
		Ext.getCmp('meetingPanleEditIcon').hide();
		Ext.getCmp('meetingListBackButton').hide();
		this.deleteButton.hide();
		this.mainToolbar.setTitle("Meetings");
		this.viewMode = "LIST";
	},

	detailMode: function(){
		Ext.getCmp('meetingPanleAddIcon').hide();
		Ext.getCmp('meetingPanleEditIcon').show();
		Ext.getCmp('meetingListBackButton').show();
		this.deleteButton.show();
		this.mainToolbar.setTitle("Meeting");
		this.viewMode = "DETAIL";
	},
	
	goHome: function(){
    	this.hide();
    	navPanel.show();
	},

	goBack: function(){
       	if(this.meetingCarousel.getActiveItem().id =='meetingListPanel'){
       		//this.hide();
           	//navPanel.show();
       	}else{
        		//this.meetingDetailPanel.setActiveItem(this.meetingDetailPanel.items.get(0), { type: 'slide', reverse: true });		            		
	    		this.listMode();
       	}
	},
	
	startMeeting : function(meetingId) {
		for(var i=0 ; i<meetingStore.data.length; i++){
			var meeting = meetingStore.getAt(i).data;
			if(meeting.id==meetingId){
				thisMeeting = meeting;
			}
		}
		thisMeeting.inProgress = true;
		this.hide();
		roleListPanel.show();
	},
	
	getGramLog : function(meeting) {
		var gramLogs = new Array();
		for ( var userId in meeting.gramLog) {
			var user = memberStore.getById(parseInt(userId)).data;
			var amCount = meeting.gramLog[userId];
			var gramLog = new Object();
			gramLog.amCountStr = 'None';
			for ( var p in amCount) {
				if (amCount[p] > 0) {
					if (gramLog.amCountStr == 'None') {
						gramLog.amCountStr = p + ':&nbsp;'
								+ amCount[p];
					} else {
						gramLog.amCountStr += ',&nbsp;' + p
								+ ':' + amCount[p];
					}
				}
				gramLog.user = user.name;
			}
			gramLogs.push(gramLog);
		}
		return gramLogs;
	},

	getTimerLog : function(meeting) {
		var timerLogs = new Array();
		var roles = new Array();

		for ( var j = 0; j < roleStore.data.length; j++) {
			var role = roleStore.data.getAt(j).data;
			roles[j] = role.id;
		}

		var meetingRoles = meeting.roles;
		for ( var j = 1; j < roles.length; j++) {
			var role = meetingRoles[roles[j]];
			if (role && role.timeSpent && role.userId) {
				var user = memberStore
						.getById(parseInt(role.userId)).data;
				var timerLog = new Object();
				timerLog.timeSpent = role.timeSpent;
				timerLog.role = roleStore.getById(roles[j]).data.description;
				timerLog.user = user.name;
				timerLog.colorCode = this.getColorCode(role.timeSpent, role.timeLimits);
				timerLog.timeLimits = role.timeLimits;
				timerLogs.push(timerLog);
			}
		}
		return timerLogs;
	},
	
	getColorCode: function (timeSpent, timeLimits){
		if(timeSpent>timeLimits.red){
			return "red";
		}else if (timeSpent>timeLimits.yellow){
			return "yellow";
		}else if (timeSpent>timeLimits.green){
			return "green";
		}else{
			return "silver";
		}					
	},
	
	meetingPanelChanged: function(comp, newCard, oldCard, index) {
		var meeting = this.activeMeeting;

		if(index == 2){
    		//Set the content for the meeting report tab
    		var wrapper = new Object();
    		wrapper.name = 'Grammarian Log';
    		if(meeting.fMeetingDate){
        		wrapper.fMeetingDate = meeting.fMeetingDate;
    		}
    		wrapper.gramLogs = this.getGramLog(meeting);
    		wrapper.timerLogs = this.getTimerLog(meeting);	
    		html = this.meetingReportTmpl.apply(wrapper);		    		
    		if(this.meetingReportPanel.el){
    			this.meetingReportPanel.el.dom.innerHTML = html;
    		}else{
	    		this.meetingReportPanel.html = html;
    		}
		}
	},
	
	
	showMeeting: function(meeting){
		var carousel = this.meetingCarousel;
		this.activeMeeting = meeting;		    		
		//Set the content for the agenda tab
		var html = this.meetingTmpl.apply(meeting);		    		
		if(this.meetingPanel.el){
    		this.meetingPanel.el.dom.innerHTML = html;
		}else{
    		this.meetingPanel.html = html;
		}
		
		var tabPanel = carousel.items.get(1);
		carousel.setActiveItem(tabPanel);
		tabPanel.setActiveItem(tabPanel.items.get(0));
		this.detailMode();
	},
	
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
        	var data = records[0].data;
    		thisMeeting = data;
    		this.showMeeting(data);
        }
    },
    
    hideFilterBar: function(){
    	//this.filterToolBar.el.hide();
    },
    
    showFilterBar: function(){
    	//this.filterToolBar.el.show();
    },
   

	onDelete:function(data){
		if (data.success) {
			meetingStore.loadAndFormat(data.returnVal.rows);
			this.listMode();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	deleteConfirm : function()
	{
		Ext.Msg.confirm("This will delete the meeting", "Do you want to continue?", this.deleteMeeting, this);
	},

	deleteMeeting: function(opt){
		if(opt == "yes")
		{
	        MeetingService.deleteMeeting(this.activeMeeting.id, this.onDelete, this);
		}
	},


});
