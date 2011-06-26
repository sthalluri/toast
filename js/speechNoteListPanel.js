SpeechNoteListPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
    layout: 'card',    
	initComponent : function() {

	this.speechNoteTmpl = new Ext.Template([
                             '<div class="background"><div class="notesIndex"><p>{cardIndex}</p></div><div class="notesHeading"><p>{heading}</p></div><div class="transbox"><p>{formatText}</p></div></div>',
                         ]);
	this.speechNoteTmpl.compile();
	
	this.activeIndex =1;
	this.base = {
	    itemTpl: 	'<div class="legislator-list-item">'+
	    			'<div class="legislator-tnail" style="background-image: url(./images/stickyBig.jpg)"></div>'+
	    			'{heading}'+
	    			'</div>',
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

	this.deleteButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'delete',
    	scope:this,
        handler: this.deleteConfirm
    });
	
	this.editButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'compose',
    	scope:this,
        handler: this.editSpeechNote
    });

	this.addButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'add',
    	scope:this,
        handler: this.newSpeechNote
    });

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
                	closePanel(this);
			    }
			},
			{xtype: 'spacer'},
			this.deleteButton,
			this.editButton,
			this.addButton
        ]
    }
   ];
	
    this.editButton.hide();
    this.deleteButton.hide();
    
    SpeechNoteListPanel.superclass.initComponent.call(this);
	},
	
	loadAndShow: function(){
		if(thisMeeting.roles.speaker1){
			var contentId = thisMeeting.roles.speaker1.id;
			speechNoteDataStore.contentId = contentId;
			MeetingService.getContent(contentId, this.onSpeechNotesLoad, this);
		}
	},

	
	formatNotes: function(note){
		
		var obj = new Object();
		obj.id = note.id;
		obj.text = note.text;
		var firstBreak = obj.text.indexOf("\n");
		
		if(firstBreak>0){
			obj.heading = obj.text.substring(0, firstBreak);
		}else{
			obj.heading = obj.text;
		}
		if(obj.heading.length>20){
			obj.shortHeading = obj.heading.substring(0, 20)+"..";
		}else{
			obj.shortHeading = obj.heading;
		}
		if(firstBreak<0){
			obj.formatText = '';
		}else{
			obj.formatText = obj.text.substring(firstBreak+1);
		}
		obj.cardIndex = note.cardIndex;
		obj.formatText = obj.formatText.replace(
				// Replace out the new line character.
				new RegExp( "\\n", "g" ), "<br/>" );
		return obj;
	},
	
	onSpeechNotesLoad: function(data){
		
		if(data.success && data.returnVal.rows.length>0){
			rContent = eval("(" + data.returnVal.rows[0].content+ ")");
			speechNoteDataStore.rowId = data.returnVal.rows[0].id;
			var speechNotes = rContent.speechNotes;				
			var rSpeechNotes = new Array();
			if(speechNotes){
				for(var i=0 ; i<speechNotes.length; i++){
					var obj = new Object();
					obj.id = speechNotes[i].id;
					obj.text = speechNotes[i].text;
					if(obj.text.indexOf("\n")>0){
						obj.heading = obj.text.substring(0, obj.text.indexOf("\n"));
					}else{
						obj.heading = obj.text;
					}
					if(obj.heading.length > 20){
						obj.heading = obj.text.substring(0, 20)+"..";
					}
					obj.cardIndex = i+1;
					rSpeechNotes[i] = obj;
				}
			}
			data.returnVal = rSpeechNotes;
			if(data.returnVal.length>0){
				speechNoteDataStore.loadData(data.returnVal);
			}else{
				speechNoteDataStore.removeAll();
			}
			if(!this.carouselInit){
				this.initCarousel();
				this.carouselInit = true;
			}else{
				this.updateCarousel();
			}
			this.show();
			this.speechNoteTopicCarousel.doLayout();
		}
	},
	
	initCarousel: function(){
		var items = [];
		if(this.speechNoteTopicCarousel){
			this.remove(this.speechNoteTopicCarousel);
		}
		
		this.listPanel = new Ext.List(Ext.apply(this.base, {
		}));
		
		items.push(this.listPanel);

		speechNoteDataStore.each(function(rec){
			var data = rec.data;
			console.log(data);
            items.push({
                html: this.speechNoteTmpl.apply(this.formatNotes(data))
            });
        }, this); 
		
		
		this.speechNoteTopicCarousel = new Ext.Carousel({
            items: items,
            scope:this,
            cardSwitchAnimation: 'cube',
            listeners: {
                cardswitch: {fn: this.cardChanged, scope: this}
            }
        });
        this.add(this.speechNoteTopicCarousel);
        this.cardChanged(null, null, null, this.activeIndex);
        this.doLayout();
        this.addButton.show();
		this.editButton.hide();
		this.deleteButton.hide();
	},
	
	
	updateCarousel: function(){
		var i = 1;
		speechNoteDataStore.each(function(rec){
			var data = rec.data;			
			console.log(data);
			var card = this.speechNoteTopicCarousel.items.get(i);
			if(card){
				card.el.dom.innerHTML = this.speechNoteTmpl.apply(this.formatNotes(data));
			}else{
				this.speechNoteTopicCarousel.add({
					html: this.speechNoteTmpl.apply(this.formatNotes(data))
				});
			}
			i++;
        }, this);
	},
	
	listMode: function(){
		//this.updateCarousel();
		var activeCard = this.speechNoteTopicCarousel.items.get(this.activeIndex);
		if(activeCard && activeCard.el && activeCard.el.dom){
			activeCard.el.dom.innerHTML = this.speechNoteTmpl.apply(this.formatNotes(speechNoteDataStore.getAt(this.activeIndex-1).data));
			this.speechNoteTopicCarousel.setActiveItem(activeCard);
		}else{
			activeCard = this.speechNoteTopicCarousel.items.get(0);
			this.speechNoteTopicCarousel.setActiveItem(activeCard);
		}
	},
	
	cardChanged:function(firstCard, newCard, oldCard, index, newIndex){
		if(index>0&&speechNoteDataStore.getAt(index-1)){
			this.addButton.hide();
			this.editButton.show();
			this.deleteButton.show();
			this.activeIndex = index;
			console.log(this.activeIndex);
			this.activeSpeechNote = speechNoteDataStore.getAt(index-1).data;
		}else{
			this.addButton.show();
			this.editButton.hide();
			this.deleteButton.hide();
		}
	},

	onDelete:function(data){
		if (data.success) {
			this.speechNoteTopicCarousel.remove(this.speechNoteTopicCarousel.items.get(this.activeIndex));
			this.activeIndex = 1;
			this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(0));
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	deleteConfirm : function()
	{
		Ext.Msg.confirm("Confirm delete card", "Do you want to continue?", this.deleteCard, this);
	},

	deleteCard: function(opt){
		if(opt == "yes")
		{
			speechNoteDataStore.removeAt(this.activeIndex-1);
	        MeetingService.saveSpeechNotes(this.onDelete, this);
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
    },
    
    showLastCard: function(){
		this.activeIndex = this.speechNoteTopicCarousel.items.length;
		this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(this.activeIndex));
    	this.cardChanged(null, null, null, this.activeIndex);
    }
});


Ext.reg('speechNoteListPanel', SpeechNoteListPanel);