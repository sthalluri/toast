MeetingListPanel = Ext.extend(Ext.Panel, 
{	
	iconCls:'time',
    tabId: 'meetingList',
    title:'Meetings',
    fullScreen:false,
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
            ui: 'round',
		    listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
		    store: this.meetingStore
		};
	
		this.meetingActionPanel = new MeetingActionPanel();
		this.meetingPanel = new Ext.Panel({xtype:'component', id:'agendaPanel', fullScreen:false,html:'Loading..', title:'Agenda',scroll: 'vertical'});
		this.meetingReportPanel = new Ext.Panel({xtype:'component', html:'Loading..', title:'Report',scroll: 'vertical'});

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
			ui:'light',
			items : [ this.meetingActionPanel, this.meetingPanel, this.meetingReportPanel ],
			listeners : {
				beforecardswitch : {fn: this.meetingPanelChanged, scope: this}
			}
		});
		
        this.list = new Ext.List(Ext.apply(this.logBase, {
       		fullscreen: false
			}));
        
		this.pan =  new Ext.Panel({
		    fullscreen: true,
		    items: [this.list,{html:'<div class="x-form-fieldset-instructions" ><b>Add a meeting using the \'+\' button above</b></div>'}]
		});		

        this.pan.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);

		
	    this.meetingCarousel = new Ext.Panel({
	    	activeItem:0,
	    	height:'100%',	
        	layout: 'card',
	    	items:[this.pan
	    	    ,
	           	this.meetingDetailTabPanel
	    	]
	    });
	
	   this.items=[
	        	this.meetingCarousel
	   ];
	   
	   this.backButton = {
               text: 'Show All',
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
	            cls: 'grey-list-header',
	            items: [{xtype: 'spacer'},this.filterButtons,{xtype: 'spacer'}],
	            dock: 'bottom'
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
	                //this.deleteButton,
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
		//this.deleteButton.hide();
		this.mainToolbar.setTitle("Meetings");
		this.viewMode = "LIST";
	},

	detailMode: function(){
		Ext.getCmp('meetingPanleAddIcon').hide();
		Ext.getCmp('meetingPanleEditIcon').show();
		Ext.getCmp('meetingListBackButton').show();
		//this.deleteButton.show();
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
	
	getGramLog : function(meeting) {
		var gramLogs = new Array();
		for ( var userId in meeting.gramLog) {
			var user = memberStore.getMember(parseInt(userId));
			if(!user){
				continue;
			}
			var amCount = meeting.gramLog[userId];
			var gramLog = new Object();
			gramLog.amCountStr = 'None';
			var breakLength = 0;
			for ( var p in amCount) {
				if (amCount[p] > 0) {
					if (gramLog.amCountStr == 'None') {
						gramLog.amCountStr = p + ':&nbsp;'
								+ amCount[p];
					} else {
						gramLog.amCountStr += ',&nbsp;' + p
								+ ':' + amCount[p];
					}
					if(breakLength > 30){
						gramLog.amCountStr += '<br/>';
						breakLength = 0;
					}else{
						breakLength += ( ',&nbsp;' + p+ ':' + amCount[p]).length;
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

		for ( var j = 0; j < timerRoleStore.data.length; j++) {
			var role = timerRoleStore.data.getAt(j).data;
			roles[j] = role.id;
		}

		var meetingRoles = meeting.roles;
		for ( var j = 1; j < roles.length; j++) {
			var role = meetingRoles[roles[j]];
			if (role && role.timeSpent && role.userId) {
				var user = memberStore.getMember(parseInt(role.userId));
				if(!user){
					continue;
				}
				var timerLog = new Object();
				timerLog.timeSpent = role.timeSpent;
				timerLog.role = roleStore.getRole(roles[j]).description;
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
    		var htmlEl = this.meetingReportPanel.el;
    		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    			this.meetingReportPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
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
		var htmlEl = this.meetingPanel.el;
		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    		this.meetingPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
		}else{
    		this.meetingPanel.html = html;
		}
		
		var tabPanel = carousel.items.get(1);
		carousel.setActiveItem(tabPanel);
		tabPanel.setActiveItem(tabPanel.items.get(0));
		this.detailMode();
		
		//Set the header for the action panel
		this.meetingActionPanel.updateMettingHeader(meeting);
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
    }

});
