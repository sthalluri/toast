function initRoleListPanel(){
	
	roleListPanel = new Ext.Panel({
    	title:'User Home',
    	fullscreen: true,
        layout: 'vbox',
        items: [
			{
				html:'<br/>Pick a role<br/><br/>'
			},
			{
			    items: [
			        new Ext.Button({
			            text: 'Grammarian',
			            width:300,
			            pack:'center',
			            handler: function() {
			            	roleListPanel.hide();
			            	gramPanel.show();
			            }
			        })
			    ]
			},            
			{
        		html:'<br/><br/>'
        	},
            {
                items: [
                    new Ext.Button({
                        text: 'Timer',
                        width:300,
                        pack:'center',
                        handler: function() {
                        	roleListPanel.hide();
                        	timerPanel.show();
                        }
                    })
                ]
            },
            {
        		html:'<br/><br/>'
        	},
            {
                items: [
                    new Ext.Button({
                        text: 'Speaker',
                        width:300,
                        pack:'center',
                        handler: function() {
                        	roleListPanel.hide();
                        	speakerPanel.show();
                        }
                    })
                ]
            },
            {
        		html:'<br/><br/>'
        	},
            {
                items: [
                    new Ext.Button({
                        text: 'Table Topics',
                        width:300,
                        pack:'center',
                        handler: function() {
                        	roleListPanel.hide();
                        	tableTopicPanel.show();
                        }
                    })
                ]
            },
            {
        		html:'<br/><br/>'
        	},
            {
                items: [
                    new Ext.Button({
                        text: 'End Meeting',
                        width:300,
                        pack:'center',
                        ui:'decline',
                        handler: function() {
                        	roleListPanel.hide();
                        	//meetingCardPanel.show();
                        	mainPanel.setActiveItem(mainPanel.items.get(2));
                        }
                    })
                ]
            }
        ],
        dockedItems: [
              {
              	  title: 'Current Meeting',
	              xtype: 'toolbar',
	              dock: 'top',
	              items: [
	              ]
              }
        ]
    });
}
