function initTableTopicPanel(){
	
	var questionBase = {
	    itemTpl: '<div class="contact2"><strong>Question:{qnNo}</strong><br/> {text}..</div>',
	    selModel: {
	        mode: 'SINGLE',
	        allowDeselect: true
	    },
	    grouped: false,
	    indexBar: false,

	    onItemDisclosure: {
	        scope: 'test',
	        handler: function(record, btn, index) {
	        	tblTopicCarouselPanel.setActiveItem(tblTopicCarouselPanel.items.get(index+1));
	        }
	    },
	    store: questionDataStore
	};

    tblTopicCarouselPanel = new Ext.Carousel({
        padding:10,
    	xtype:'carousel',
    	activeItem:0,
    	height:'80%',
        id:'tableTopicCarousel',
    	items:[
    	    new Ext.List(Ext.apply(questionBase, {
               fullscreen: true
           	})),
    	    {
    			html:'<strong>Question:1</strong>This is a sample question which is good.'
    		},
    	    {
    			html:'<strong>Question:2</strong><br/> This is a sample question which is good.'
    		},
    	    {
    			html:'<strong>Question:3</strong><br/> This is a sample question which is good.'
    		}  
    	]
    });
    
	tableTopicPanel = new Ext.Panel({
    	title:'TbTopic',
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
                tblTopicCarouselPanel
		],
        dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'top',
            title:'Table Topics',
            items: [
				{
				    text: 'Back',
				    handler: function() {
				    	
	                	if(tblTopicCarouselPanel.getActiveIndex()==0){
					    	tableTopicPanel.hide();
					    	roleListPanel.show();
	                	}else{
	                		tblTopicCarouselPanel.setActiveItem(tblTopicCarouselPanel.items.get(0));
	                	}
				    }
				},
				{xtype: 'spacer'},
                {
                    text: 'Change Role',
                    handler: function() {
                    	tableTopicPanel.hide();
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

var tblTopicCarouselPanel ;