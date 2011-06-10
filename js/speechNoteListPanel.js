SpeechNoteListPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
    layout: 'card',    
	initComponent : function() {

	this.speechNoteTmpl = new Ext.Template([
	                                     '<div class="background"><div class="transbox"><p>{formatText}</p></div></div>',
                         ]);
	this.speechNoteTmpl.compile();
	
	this.activeIndex =1;
	this.base = {
	    itemTpl: '<div class="contact2">{text}</div>',
	    selModel: {
	        mode: 'SINGLE',
	        allowDeselect: true
	    },
	    grouped: false,
	    indexBar: false,
	    parentPanel:this,	   
	    onItemDisclosure: {
	        scope: this,
	        handler: this.updateDetailsPanel
	    },
	    store: speechNoteDataStore
	};

	
//    this.speechNoteTopicCarousel = new Ext.Carousel({
//        padding:10,
//    	xtype:'carousel',
//    	activeItem:0,
//    	height:'80%',
//        id:'speechNoteTopicCarousel',
//    	layout: 'card',
//    	items:[
//    	    new Ext.List(Ext.apply(this.base, {
//               fullscreen: true
//           	}))
//    	]
//    });

//	this.items = [ new Ext.List(Ext.apply(this.base, {
//		fullscreen : true
//	})) ];

    
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
			    		speechNoteListPanel.hide();
                    	meetingListPanel.show();
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
			speechNoteDataStore.contentId = contentId;
			if(this.loaded){
				this.show();
			}else{
				this.loaded = true;
				MeetingService.getContent(contentId, this.onSpeechNotesLoad, this);
			}
		}
	},
	
	onSpeechNotesLoad: function(data, dontDoUpdate){
		
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
			if(data.returnVal.length>0){
				speechNoteDataStore.loadData(data.returnVal);
			}else{
				speechNoteDataStore.removeAll();
			}
		}
		
		if (data.success) {
			this.show();
			if(data.returnVal.length>0){
				speechNoteDataStore.loadData(data.returnVal);
				if(!dontDoUpdate){
					this.updateCarousel();
				}
			}else{
				speechNoteDataStore.removeAll();
			}
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	updateCarousel: function(){
		var items = [];
		if(this.speechNoteTopicCarousel){
			this.remove(this.speechNoteTopicCarousel);
		}
		
		items.push(new Ext.List(Ext.apply(this.base, {
		})));

		speechNoteDataStore.each(function(rec){
			var data = rec.data;
			this.activeSpeechNote = rec;
			data.formatText = data.text.replace(
					// Replace out the new line character.
					new RegExp( "\\n", "g" ), "<br/>" );
            items.push({
                html: this.speechNoteTmpl.apply(data)
            });
        }, this); 
		
		this.speechNoteTopicCarousel = new Ext.Carousel({
            items: items,
            scope:this,
            listeners: {
                cardswitch: {fn: this.cardChanged, scope: this}
            }
        });
        this.add(this.speechNoteTopicCarousel);
        this.cardChanged(null, null, null, this.activeIndex);
        this.doLayout();
	},
	
	listMode: function(){
		//this.updateCarousel();
		console.log(this.activeIndex);
		this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(this.activeIndex));
	},
	
	cardChanged:function(p0, p1, p2, index, newIndex){
		if(index>0&&speechNoteDataStore.getAt(index-1)){
			this.activeIndex = index;
			console.log(this.activeIndex);
			this.activeSpeechNote = speechNoteDataStore.getAt(index-1).data;
		}
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
		var carousel = this.parentPanel.speechNoteTopicCarousel;
		this.parentPanel.activeIndex = index+1;
		carousel.setActiveItem(carousel.items.get(index+1));
    }	
});


Ext.reg('speechNoteListPanel', SpeechNoteListPanel);