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
	meetingStore : null,
	activeMeeting:null,
	
	initComponent : function() {

		this.meetingTmpl = new Ext.Template([
            '<div name="{id}">',
                '<span class="{cls}">{id}: {wordOfTheDay}:{date}</span>',
            '</div>',
        ]);

		this.meetingTmpl.compile();
		
		this.logBase = {
		    itemTpl: '<div class="contact2">{id}:<b>{date}</b><br/>{themeOfTheDay}</div>',
		    selModel: {
		        mode: 'SINGLE',
		        allowDeselect: true
		    },
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
		                ui: 'round',
		                scope:this,
		                handler: function() {	                	
	                		this.meetingCarousel.setActiveItem(this.meetingCarousel.items.get(0));
	    		    		this.listMode();
		                }
	            	},
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
		Ext.getCmp('meetingPanleAddIcon').show();
		Ext.getCmp('meetingPanleEditIcon').hide();
	},

	detailMode: function(){
		Ext.getCmp('meetingPanleAddIcon').hide();
		Ext.getCmp('meetingPanleEditIcon').show();
	},

	loadData: function(data){
		this.meetingStore.removeAll();
		for(var i=0 ; i<data.length; i++){
			this.meetingStore.add(data[i]);
		}
		this.render();
	},
	
	refresh : function(){
		this.controller.getList();
	},
	
	save : function(){
		this.controller.save(thisMeeting);
	}
});
