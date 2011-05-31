function initSpeakerPanel(){
	
	var speakerNotesBase = {
	    itemTpl: '<div class="contact2"><strong>Highlight</strong><br/> {notes}..</div>',
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
	        	speakerNotesCarousel.setActiveItem(speakerNotesCarousel.items.get(index+1));
	        }
	    },
	    store: speakerNotesDataStore
	};

	speakerNotesCarousel = new Ext.Carousel({
        padding:10,
    	xtype:'carousel',
    	activeItem:0,
    	height:'80%',
        id:'speakerNotesCarousel',
    	items:[
    	    new Ext.List(Ext.apply(speakerNotesBase, {
               fullscreen: true
           	})),
    	    {
    			html:'<strong>Hightlight1</strong><br/><br/> Some details about this.'
    		},
    	    {
    			html:'<strong>Hightlight2</strong><br/> Some details about this.'
    		},
    	    {
    			html:'<strong>Hightlight3</strong><br/> This is a sample question which is good.'
    		}  
    	]
    });

    speakerPanel = new Ext.Panel({
    	title:'SpPanl',
    	fullscreen: true,
        layout : {
    		align:'stretch'
    	},
    	defaults:{
    		flex : 1
    	},
        items: [
            {
	        	padding:10,
	        	html : '<b>Table Topic Qns</b>'
        	},
            speakerNotesCarousel
		],
        dockedItems:[
        {   
        	title:'Speaker',
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
            },
            layout: {
                pack: 'center'
            },
            items: [
				{
				    text: 'Back',
	                ui: 'back',
				    handler: function() {
	                	if(speakerNotesCarousel.getActiveIndex()==0){
	                		speakerPanel.hide();
	                    	roleListPanel.show();
	                	}else{
	                		speakerNotesCarousel.setActiveItem(speakerNotesCarousel.items.get(0));
	                	}
				    }
				},
				{xtype: 'spacer'},
                {
                    text: 'Change Role',
                    handler: function() {
                    	speakerPanel.hide();
                    	roleListPanel.show();
                    }
                },
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'add',
                    handler: function() {
                    }
                }
            ]
        }
	   ]

    });
}

var speakerNotesCarousel ;