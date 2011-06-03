MeetingActionPanel = Ext.extend(Ext.Panel, {
    layout: 'card',
    title : 'Actions',
    initComponent: function(){
        
        this.list = new Ext.List({
            itemTpl: '<div class="page">{title}</div>',
            ui: 'round',
            store: new Ext.data.Store({
                fields: ['name', 'card'],
                data: [{title:'Add Your Grammarian Log',name:'Gram'},
                       {title:'Add Your Timer Log',name:'Timer'},
                       {title:'Add Your Tabletopic Qns',name:'TableTopics'},
                       {title:'Add Your Speech Notes',name:'SpeechNotes',card: {
                    xtype: 'htmlpage',
                    url: 'README'
                }},{title:'Be a Grammarian',name:'new',card: {
                    xtype: 'htmlpage',
                    url: 'README'
                }},{title:'Be a Timer',name:'new',card: {
                    xtype: 'htmlpage',
                    url: 'README'
                }}]
            }),
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
            title: 'About'
        });
        
        this.listpanel = new Ext.Panel({
            items: this.list,
            layout: 'fit'
        });
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        this.items = [this.listpanel];
        
        MeetingActionPanel.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records, p2, p3, p4){
        if (records[0] !== undefined) {
        	var data = records[0].data;
        	meetingListPanel.hide();
        	if("Gram"==data.name){
            	gramPanel.show();
        	}else if("Timer"==data.name){
				timerPanel.show();
			}else if("TableTopics"==data.name){
				tableTopicPanel.show();
			}else if("SpeechNotes"==data.name){
				gramPanel.show();
			}
        }
    }
});

Ext.reg('meetingActionPanel', MeetingActionPanel);


