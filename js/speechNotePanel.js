SpeechNotePanel = Ext.extend(Ext.form.FormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Add Card',

	initComponent : function() {

		this.formFields = [ {
				xtype : 'textareafield',
				name : 'speechNote',
				useClearIcon : true,
				height : 250,
				maxRows : 10,
				autoCapitalize : false
			}, 
			{
				layout:'hbox',
				flex:1,
           	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
				items:[
						new Ext.Button({
			                text: 'Save',
							scope: this,
			                width:100,
			                ui : 'confirm',
			                handler: this.save
			            }), 
						new Ext.Button({
			                text: 'Reset',
							scope: this,
				        	ui:'decline',
			                width:100,
			                handler: function(){
			                	this.reset();
			                }
			            })
				]
			
			}
		];

        this.items= [{
                xtype: 'fieldset',
    			title : '&nbsp;',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.formFields
            }
        ];
    
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Edit Notes',
                items: [
                    {
                        text: 'Back',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    }
                ]
            }
        ];
    
        SpeechNotePanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		if(this.items.get(0).titleEl){
			this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
		}
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
	    	speechNoteListPanel.listMode();
	    	speechNoteListPanel.show();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	goBack: function(){
		MeetingService.getContent(speechNoteDataStore.contentId, this.onSpeechNotesLoad, this);
	},
	
	onSave:function(data){
		if (data.success) {
			this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	save : function(){
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
});


Ext.reg('speechNotePanel', SpeechNotePanel );