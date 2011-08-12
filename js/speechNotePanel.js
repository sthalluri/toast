SpeechNotePanel = Ext.extend(BaseFormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Add Card',

	initComponent : function() {

		this.formFields = [ 
		    {
				xtype : 'textareafield',
				name : 'speechNote',
				useClearIcon : true,
				height : 300,
				maxRows : 10,
				autoCapitalize : false
			}
		];

        this.items= [this.getMessageComp(),{
                xtype: 'fieldset',
    			title : 'Edit Notes:',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [this.formFields]
            }
        ];
    
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Card Note',
                items: [
                    {
                        text: 'Cancel',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    },{
						xtype : 'spacer'
					}, new Ext.Button({
						text : 'Done',
						scope : this,
						ui : 'confirm',
						handler : this.save
					})
                ]
            }
            ];
    
        SpeechNotePanel.superclass.initComponent.call(this);	
	},
	loadSpeechNote: function(pSpeechNote){
		this.updateMessage('');
		this.reset();
		for(var i=0; i< this.fields.items.length ; i++){
			var comp = this.fields.items[i];
			if(comp.name == 'speechNote'){
				comp.setValue(pSpeechNote.text);
			}
		}
		this.speechNote = pSpeechNote;
	},
	
	
	onSpeechNotesLoad: function(data){
		if (data.success) {
	    	this.hide();
	    	speechNoteListPanel.onSpeechNotesLoad(data, true);
	    	//speechNoteListPanel.updateCarousel();
	    	//speechNoteListPanel.listMode();
	    	//speechNoteListPanel.show();
			showPanel(speechNoteListPanel);
	    	speechNoteListPanel.showActiveCard();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	goBack: function(){
		MeetingService.getContent(speechNoteDataStore.contentId, this.onSpeechNotesLoad, this);
	},
	
	onSave:function(data){
		if (data.success) {
			this.goBack();
			//this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.speechNote || trim(values.speechNote) ==''){
			this.updateMessage('Please enter a valid notes');
			return false;
		}
		return noErrors;
	},

	save : function(){
		if(this.validate()){
			var values = this.getValues();
			this.speechNote.text = values.speechNotes;
			for(var i=0 ; i<speechNoteDataStore.data.length; i++){
				var qData = speechNoteDataStore.getAt(i).data;
				if(qData && qData.id == this.speechNote.id){
					qData.text = values.speechNote;
				}
			}
			//this.controller.saveTableTopics();
	        MeetingService.saveSpeechNotes(this.onSave, this);
		}
	}
});


Ext.reg('speechNotePanel', SpeechNotePanel );