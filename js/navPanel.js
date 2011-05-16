NavPanel = Ext.extend(Ext.Panel, 
{
	title:'User Home',
	fullscreen: true,
    layout: 'vbox',
	initComponent : function() {

		this.listeners = {
				render : function() {
				},
				show:function(){
				}
		};
		
        this.items = [
            {
        		html:'<br/><br/>'
        	},
            {
                items: [
                    new Ext.Button({
                        text: 'Start Meeting',
                        width:300,
                        pack:'center',
                        ui:'confirm',
                        scop:this,
                        handler: this.startMeeting
                    })
                ]
            },
            {
        		html:'<br/><br/>'
        	},
            {
                items: [
                    new Ext.Button({
                        text: 'About Roles',
                        width:300,
                        pack:'center',
                        handler: function() {
                        	homeCardPanel.hide();
                        	meetingCardPanel.show();
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
                        text: 'Club Members',
                        width:300,
                        pack:'center',
                        handler: function() {
                        	homeCardPanel.hide();
                        	meetingCardPanel.show();
                        }
                    })
                ]
            }
        ];
        this.dockedItems= [
              {
              	title: 'Home',
                  xtype: 'toolbar',
                  dock: 'top',
                  items: [
                  ]
              }
        ];
        
        NavPanel.superclass.initComponent.call(this);
	},
	
	startMeeting: function(){
    	thisMeeting = mockMeeting;
    	thisMeeting.inProgress = true;    	
    	homeCardPanel.hide();
    	//rolePanel.show();
    	mainPanel.setActiveItem(mainPanel.items.get(1));
	}

});
