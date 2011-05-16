function initMeetingPanel(){
	
	var logBase = {
	    itemTpl: '<div class="contact2"><b>{date}</b><br/>{topic}</div>',
	    selModel: {
	        mode: 'SINGLE',
	        allowDeselect: true
	    },
	    grouped: false,
	    indexBar: false,

	    onItemDisclosure: {
	        scope: 'test',
	        handler: function(record, btn, index) {
	            //alert('Disclose more info for ' + record.get('firstName'));
	        	meetingCarousel.setActiveItem(meetingCarousel.items.get(index+1));
	        }
	    },
	    store: myLogDataStore
	};

    var meetingCarousel = new Ext.Carousel({
        padding:10,
    	xtype:'carousel',
    	activeItem:0,
    	height:'80%',
    	layout: {
        	
        },
    	items:[
    	    new Ext.List(Ext.apply(logBase, {
               fullscreen: true
           	})),
    	    {
    			html:'<h3>8/24/2010<h3><hr/><b><br/>Toast Master</b><br/> Speech 1<br/> Main Speaker : Speaker 1 <br/> Time : 5.25min <br/> Grammer Log : <br/> Ahs : 5 , Ams : 7, Sos : 3<br/> ' 
    			 + '<hr/><b>Speech 2</b> <br/> Speaker : SPEAK2 <br/>Time : 5.25min <br/> Grammer Log : <br/> Ahs : 5 , Ams : 7, Sos : 3'
    			 + '<hr/><b>Grammarian</b><br/>Grammarian2'
    			 + '<hr/><b>Grammarian</b><br/>Grammarian2'
    			 + '<hr/><b>Grammarian</b><br/>Grammarian2'
    			 + '<hr/><b>Grammarian</b><br/>Grammarian2'
    		}  
    	]
    });

    meetingPanel = new Ext.Panel({
    	fullscreen: true,
    	iconCls:'bookmarks',
        layout : {
    		align:'stretch'
    	},
    	defaults:{
    		flex : 1
    	},
        items: [
            {
	        	padding:10,
	        	html : '<b></b>'
        	},
        	meetingCarousel
		],
        dockedItems:[
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
	                handler: function() {	                	
	                	if(meetingCarousel.getActiveIndex()==0){
		                	//meetingPanel.hide();
		                	//navPanel.show();
	                		mainPanel.setActiveItem(mainPanel.items.get(0));
	                	}else{
					    	meetingCarousel.setActiveItem(meetingCarousel.items.get(0));
	                	}
	                }
            	},
				{xtype: 'spacer'},
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'add',
                    handler: function() {
                	meetingPanel.hide();
                	addMeetingPanel.show();
                    }
                }
            ]
        }
	   ]

    });
}
