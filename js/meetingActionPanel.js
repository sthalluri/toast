MeetingActionPanel = Ext.extend(Ext.Panel, {
    layout: 'card',
    title : 'Actions',
	height:'100%',	
	scroll: 'vertical',
	initComponent: function(){
        this.list = new Ext.List({
            itemTpl: '<table width="100%"><tr><td><div class="page"><img width="20px" height="20px" src="js/ext/resources/themes/images/default/pictos/{image}"/>&nbsp;&nbsp;{title}</div></td><td align="right"></td></tr></table>',
            ui: 'round',
            grouped: true,
            indexBar: false,
        	scroll: 'vertical',
        	height: '100%',
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

        this.message = new Ext.Component({
            cls: 'grey-list-header',
			xtype : 'component',
			html : 'Test'
		});
        
        this.listpanel = new Ext.Panel({
        	height: '100%',
        	items: [
                    this.message,
        	        this.list]
        });
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        //{html: '<div class="x-list-header" >'+thisMeeting.fMeetingDate+'</div>'},
        this.items = [
                      this.listpanel];
        
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
				timerPanel.resetTimer();
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
				myTimerPanel.resetTimer();
			}
        }
    },
    
    deselect: function(){
    	this.list.deselect(this.list.getSelectedRecords());
    },
    
	updateMettingHeader: function(meeting){
		if(this.message.el){
			this.message.el.setHTML('<table width="100%"><tr><td><div><p>'+meeting.fMeetingDate+'</p></div></td>'+
//					'<td align="right">'+
//					'<div class=" x-button x-button-normal" style="margin-bottom: 0.5em; margin-left: 0.5em; ">'+
//					'<span class="x-button-label" onclick="{panel}.editTimeLimit();">Change</span>'+
//					'</div></td>'+
					'</tr></table>');
		}
	}
});

Ext.reg('meetingActionPanel', MeetingActionPanel);


//{title:'Be a Timer',name:'new',card: {
//     xtype: 'htmlpage',
//     url: 'README'
// }}