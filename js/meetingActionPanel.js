MeetingActionPanel = Ext.extend(Ext.Panel, {
    layout: 'card',
    title : 'Actions',
    initComponent: function(){
        this.list = new Ext.List({
            itemTpl: '<table width="100%"><tr><td><div class="page"><img width="20px" height="20px" src="js/ext/resources/themes/images/default/pictos/{image}"/>&nbsp;&nbsp;{title}</div></td><td align="right"></td></tr></table>',
            ui: 'round',
            grouped: true,
            indexBar: false,
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
        
//        this.meetingHeader = new Ext.Component({
//			xtype : 'component',
//			html : ''
//		});
//        this.meetingHeader,	
        
        this.listpanel = new Ext.Panel({
            items: [this.list]
        });
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        //{html: '<div class="x-list-header" >'+thisMeeting.fMeetingDate+'</div>'},
        this.items = [this.listpanel];
        
        MeetingActionPanel.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
        	var data = records[0].data;
        	homeTabPanel.hide();
        	if("Gram"==data.name){
				showPanel(gramPanel);
            	gramPanel.loadSpinners();
        	}else if("Timer"==data.name){
				showPanel(timerPanel);
			}else if("TableTopics"==data.name){
				showPanel(tableTopicPanel);
				tableTopicPanel.loadAndShow();
			}else if("SpeechNotes"==data.name){
				showPanel(speechNoteListPanel);
				speechNoteListPanel.loadAndShow();
			}else if("MyGram"==data.name){
				showPanel(myGramPanel);
				myGramPanel.refresh();
			}else if("MyTimer"==data.name){
				showPanel(myTimerPanel);
			}
        }
    },
    
    deselect: function(){
    	this.list.deselect(this.list.getSelectedRecords());
    }

});

Ext.reg('meetingActionPanel', MeetingActionPanel);


//{title:'Be a Timer',name:'new',card: {
//     xtype: 'htmlpage',
//     url: 'README'
// }}