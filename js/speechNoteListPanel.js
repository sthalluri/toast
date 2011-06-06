SpeechNoteListPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
	initComponent : function() {

	this.speechNoteTmpl = new Ext.Template([
	                                     '<div class="notes">{text}</div>',
	                                 ]);
	this.speechNoteTmpl.compile();
	
	this.base = {
	    itemTpl: '<div class="contact2">{text}..</div>',
	    selModel: {
	        mode: 'SINGLE',
	        allowDeselect: true
	    },
	    grouped: false,
	    indexBar: false,
	    parentPanel:this,	   
	    id:'speechNoteListPanel',
	    onItemDisclosure: {
	        scope: this,
	        handler: this.updateDetailsPanel
	    },
	    store: speechNoteDataStore
	};

    this.speechNoteTopicCarousel = new Ext.Panel({
        padding:10,
    	xtype:'carousel',
    	activeItem:0,
    	height:'80%',
        id:'speechNoteTopicCarousel',
    	layout: 'card',
    	items:[
    	    new Ext.List(Ext.apply(this.base, {
               fullscreen: true
           	})),
           	{
    	    	html:'Sample content here'
           	}
    	]
    });
    
	this.items= [
                {
                	padding:10,
                	html : '<b>Cards</b>'
                },
                this.speechNoteTopicCarousel
	];
    this.dockedItems = [
        {
            xtype: 'toolbar',
            dock: 'top',
            title:'Cards',
            items: [
				{
				    text: 'Back',
	                ui: 'back',
				    scope:this,
				    handler: function() {
				    	if(this.speechNoteTopicCarousel.getActiveItem().id =='speechNoteListPanel'){
				    		speechNoteListPanel.hide();
                        	meetingListPanel.show();
	                	}else{
	    		    		this.listMode();
	                	}
				    }
				},
				{xtype: 'spacer'},
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'action',
                	scope:this,
                    handler: this.editSpeechNote
                },
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'add',
                	scope:this,
                    handler: this.newSpeechNote
                }
            ]
        }
	   ];
	
    SpeechNoteListPanel.superclass.initComponent.call(this);
	},
	
	loadAndShow: function(){
		if(thisMeeting.roles.speaker1){
			var contentId = thisMeeting.roles.speaker1.id;
			console.log('Setting the contentid '+contentId);
			speechNoteDataStore.contentId = contentId;
			MeetingService.getContent(contentId, this.onSpeechNotesLoad, this);
		}
	},
	
	onSpeechNotesLoad: function(data){
		if(data.success && data.returnVal.rows.length>0){
			rContent = eval("(" + data.returnVal.rows[0].content+ ")");
			speechNoteDataStore.rowId = data.returnVal.rows[0].id;
			var speechNotes = rContent.speechNotes;				
			var rSpeechNotes = new Array();
			if(speechNotes){
				for(var i=0 ; i<speechNotes.length; i++){
					rSpeechNotes[i] = {id:speechNotes[i].id,text:speechNotes[i].text};
				}
			}
			data.returnVal = rSpeechNotes;
			console.log(data.returnVal);
			if(data.returnVal.length>0){
				speechNoteDataStore.loadData(data.returnVal);
			}else{
				speechNoteDataStore.removeAll();
			}
			this.show();
		}
		
		if (data.success) {
			console.log(data.returnVal);
			if(data.returnVal.length>0){
				speechNoteDataStore.loadData(data.returnVal);
			}else{
				speechNoteDataStore.removeAll();
			}
			this.show();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	updateCarousel: function(){
		for(var i=0 ; i<speechNotes.length; i++){
			speechNoteDataStore.add({id:speechNotes[i].id,text:speechNotes[i].text});
		}		
	},
	
	listMode: function(){
		this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(0));
	},
	
	newSpeechNote:function(){
		this.activeSpeechNote = null;
		this.editSpeechNote();
	},
	
	editSpeechNote: function(){
		speechNoteListPanel.hide();
		if(!this.activeSpeechNote){
			var speechNote = new Object();
			speechNote.id = speechNoteDataStore.data.length;
			speechNoteDataStore.add(speechNote);
			this.activeSpeechNote = speechNote;
		}
		speechNotePanel.loadSpeechNote(this.activeSpeechNote);
		speechNotePanel.show();
	},
	
	updateDetailsPanel : function(record, btn, index) {
    	this.parentPanel.speechNoteIndex = index;
		var carousel = this.parentPanel.speechNoteTopicCarousel;
		var speechNote = speechNoteDataStore.getAt(index).data;
		this.parentPanel.activeSpeechNote = speechNote;
		var html = this.parentPanel.speechNoteTmpl.apply(speechNote);
		var detailsPanel = carousel.items.get(1);
		detailsPanel.el.setHTML(html);
		carousel.setActiveItem(carousel.items.get(1));
    }	
});


Ext.reg('speechNoteListPanel', SpeechNoteListPanel);