MeetingListPanel = Ext.extend(Ext.Panel, 
{	
	fullscreen: true,
	iconCls:'bookmarks',
	controller: null,
    layout : {
		align:'stretch'
	},
	defaults:{
		flex : 1
	},
	getHeaderConfig: function(title) {
        return {
            xtype: 'component',
            html: title,
            cls: 'x-list-header'
        };
    },
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
		    onItemDisclosure: {
		        scope: this,
		        handler: function(record, btn, index) {
		            //alert('Disclose more info for ' + record.get('firstName'));
		    		var carousel = this.parentPanel.meetingCarousel;
		    		var meeting = this.parentPanel.meetingStore.getAt(index).data;
		    		thisMeeting = meeting;
		    		this.parentPanel.activeMeeting = meeting;
		    		
		    		//Set the content for the agenda tab
		    		var html = this.parentPanel.meetingTmpl.apply(meeting);		    		
		    		this.parentPanel.meetingPanel.html = html;
		    		
		    		//Set the content for the meeting report tab
		    		html = this.parentPanel.meetingReportTmpl.apply(meeting);		    		
		    		this.parentPanel.meetingReportPanel.html = html;
		    		
		    		var tabPanel = carousel.items.get(1);
		    		carousel.setActiveItem(tabPanel);
		    		this.parentPanel.detailMode();
		        }
		    },
		    store: this.meetingStore
		};
	
		this.meetingActionPanel = new MeetingActionPanel();
		this.meetingPanel = new Ext.Panel({html:'Loading..', title:'Agenda',scroll: 'vertical'});
		this.meetingReportPanel = new Ext.Panel({html:'Loading..', title:'Report',scroll: 'vertical'});

		this.meetingDetailTabPanel = new Ext.TabPanel({
			cls: 'legislator-tabs',
			fullscreen : false,
			items : [ this.meetingActionPanel, this.meetingPanel, this.meetingReportPanel ]
		});
	    this.meetingCarousel = new Ext.Panel({
	    	activeItem:0,
	    	height:'95%',	
        	layout: 'card',
	    	items:[
	    	    new Ext.List(Ext.apply(this.logBase, {
	               fullscreen: false
	           	})),
	           	this.meetingDetailTabPanel,
	           	{html:'Sample text here'}
	    	]
	    });
	
	   this.items=[
	         //   this.getHeaderConfig('Meeting'),
	        	this.meetingCarousel
	   ];
	   
	   this.dockedItems=[
	        {
	            xtype: 'toolbar',
	            title:'ToastMasters',
	            dock: 'top',
	            defaults: {
	                iconMask: true,
	                ui: 'plain'
	            },
	            layout: {
	                pack: 'center'
	            },
	            items: [
	                {
		                text: 'Back',
		                ui: 'back',
		                scope:this,
		                handler: function() {	
		                	if(this.meetingCarousel.getActiveItem().id =='meetingListPanel'){
		                		this.hide();
		                    	navPanel.show();
		                	}else{
			            		//this.meetingDetailPanel.setActiveItem(this.meetingDetailPanel.items.get(0), { type: 'slide', reverse: true });		            		
		    		    		this.listMode();
		                	}
		                }
	            	},
	            	/*
	                {
		                scope:this,
	                    ui: 'plain',
	                	iconCls:'home',
		                id : 'homeButton',
		                handler: this.goHome
	            	},
	            	*/
					{xtype: 'spacer'},
					{
	                    iconMask: true,
	                    ui: 'plain',
	                	iconCls:'action',
	                	id:'meetingPanleEditIcon',
	                	scope:this,
	                    handler: function() {
	                		meetingListPanel.hide();
	                		meetingPanel.show();
	                		meetingPanel.loadMeeting(this.activeMeeting);
	                    }
	                },
	                {
	                    iconMask: true,
	                    ui: 'plain',
	                	iconCls:'add',
	                	id:'meetingPanleAddIcon',
	                    handler: function() {
	                		meetingListPanel.hide();
	                		meetingPanel.reset();
	                		meetingPanel.show();
	                    }
	                }
	            ]
	        }
	        ];
	   //Ext.getCmp('meetingPanleEditIcon').hide();

	   MeetingListPanel.superclass.initComponent.call(this);	
	},
	
	listMode: function(){
		this.meetingCarousel.setActiveItem(this.meetingCarousel.items.get(0));
		Ext.getCmp('meetingPanleAddIcon').show();
		Ext.getCmp('meetingPanleEditIcon').hide();
	},

	detailMode: function(){
		Ext.getCmp('meetingPanleAddIcon').hide();
		Ext.getCmp('meetingPanleEditIcon').show();
	},

	onRefresh:function(){
		console.log('From the callback');
	},
	
	refresh : function(){
        MeetingService.save(this.onRefresh, this);
	},
	
	goHome: function(){
    	this.hide();
    	navPanel.show();
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
	}

});
