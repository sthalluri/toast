MeetingActionPanel = Ext.extend(Ext.Panel, {
    layout: 'card',
    title : 'Actions',
    initComponent: function(){
        this.list = new Ext.List({
            itemTpl: '<div class="page"><img width="20px" height="20px" src="js/ext/resources/themes/images/default/pictos/{image}" onclick="navPanel.viewMyClub()"/>&nbsp;&nbsp;{title}</div>',
            ui: 'round',
            grouped: true,
            indexBar: false,
        	cls: 'demo-list',
		    singleSelect:true,
            store: new Ext.data.Store({
                fields: ['name', 'card'],
                getGroupString : function(record) {
            		return record.get('actionGroup');
                },
                data: [
                       {title:'Speech',name:'SpeechNotes',actionGroup:'Play A Role',image:'chat4.png'},
                       {title:'Tabletopic',name:'TableTopics',actionGroup:'Play A Role',image:'twitter2.png'},
                       {title:'Grammarian',name:'Gram',actionGroup:'Play A Role',image:'user_business.png'},
                       {title:'Timer',name:'Timer',actionGroup:'Play A Role',image:'time.png'},
                       {title:'Grammarian Report',name:'MyGram',actionGroup:'Add My Report',image:'doc_list.png'},
                       {title:'Timer Report',name:'MyTimer',actionGroup:'Add My Report',image:'doc_list.png'}]
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
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
        	var data = records[0].data;
        	meetingListPanel.hide();
        	if("Gram"==data.name){
            	gramPanel.show();
        	}else if("Timer"==data.name){
				timerPanel.show();
			}else if("TableTopics"==data.name){
				//this.loadTableTopics();
				tableTopicPanel.loadAndShow();
			}else if("SpeechNotes"==data.name){
				//speechNoteListPanel.show();
				speechNoteListPanel.loadAndShow();
			}else if("MyGram"==data.name){
				myGramPanel.refresh();
			}else if("MyTimer"==data.name){
				myTimerPanel.show();
			}
        }
    }

});

Ext.reg('meetingActionPanel', MeetingActionPanel);


//{title:'Be a Timer',name:'new',card: {
//     xtype: 'htmlpage',
//     url: 'README'
// }}