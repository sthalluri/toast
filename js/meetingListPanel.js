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
	initComponent : function() {

		this.meetingTmpl = new Ext.Template([
            '<div name="{id}">',
                '<span class="{cls}">{id}: {wordOfTheDay}:{meetingDate}</span>&nbsp;&nbsp;<br/><hr/>',
                'Log Work <img width="20" height="20" src="js/ext/resources/themes/images/default/pictos/note2.png" onclick="javascript:meetingListPanel.startMeeting({id})"/>',
            '</div>',
        ]);

		this.meetingTmpl.compile();
		
		this.logBase = {
		    itemTpl: '<span class="{cls}">{id}: {wordOfTheDay}:{meetingDate}</span>&nbsp;&nbsp;Log Work <img width="20" height="20" src="js/ext/resources/themes/images/default/pictos/note2.png" onclick="meetingListPanel.startMeeting({id})"/>',
		    selModel: {
		        mode: 'SINGLE',
		        allowDeselect: true
		    },
		    id:'meetingListPanel',
		    grouped: false,
		    indexBar: false,
		    parentPanel:this,
	
		    onItemDisclosure: {
		        scope: this,
		        handler: function(record, btn, index) {
		            //alert('Disclose more info for ' + record.get('firstName'));
		    		var carousel = this.parentPanel.meetingCarousel;
		    		var meeting = this.parentPanel.meetingStore.getAt(index).data;
		    		this.parentPanel.activeMeeting = meeting;
		    		var html = this.parentPanel.meetingTmpl.apply(meeting);
		    		var detailsPanel = carousel.items.get(1);
		    		detailsPanel.el.setHTML(html);
		    		carousel.setActiveItem(carousel.items.get(1));
		    		this.parentPanel.detailMode();
		        }
		    },
		    store: this.meetingStore
		};
	
	    this.meetingCarousel = new Ext.Panel({
	        padding:10,
	    	activeItem:0,
	    	height:'95%',	
        	layout: 'card',
	    	items:[
	    	    new Ext.List(Ext.apply(this.logBase, {
	               fullscreen: true
	           	})),
	           	{
	    	    	html:'Sample content here'
	           	}
	    	]
	    });
	
	   this.items=[
	            {
		        	padding:10,
		        	html : '<b></b>'
	        	},
	        	this.meetingCarousel
			];
	   
	   this.dockedItems=[
	        {
	            xtype: 'toolbar',
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
	                {
		                text: 'Back',
		                ui: 'back',
		                scope:this,
		                handler: function() {	 
		                	if(this.meetingCarousel.getActiveItem().id =='meetingListPanel'){
		                		this.hide();
		                    	navPanel.show();
		                	}else{
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
