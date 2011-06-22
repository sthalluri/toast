QuestionPanel = Ext.extend(Ext.form.FormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Add Question',

	initComponent : function() {

		this.formFields = [ {
				xtype : 'textareafield',
				name : 'question',
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
                title:'Edit Meeting',
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
    
        QuestionPanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		if(this.items.get(0).titleEl){
			this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
		}
	},
	loadQuestion: function(pQuestion){
		this.updateMessage('');
		this.reset();
		for(var i=0; i< this.fields.items.length ; i++){
			var comp = this.fields.items[i];
			if(comp.name == 'question'){
				comp.setValue(pQuestion.text);
			}
		}
		this.question = pQuestion;
	},
	
	goBack: function(){
		MeetingService.getContent(questionDataStore.contentId, this.onTableTopicsLoad, this);
	},
	
	onTableTopicsLoad: function(data){
		if (data.success) {
	    	this.hide();
	    	tableTopicPanel.onTableTopicsLoad(data, true);
			//questionDataStore.loadData(data.returnVal);
	    	tableTopicPanel.listMode();
	    	tableTopicPanel.show();
		} else {
			this.updateMessage(data.errorMessage);
		}
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
		this.question.text = values.question;
		for(var i=0 ; i<questionDataStore.data.length; i++){
			var qData = questionDataStore.getAt(i).data;
			if(qData && qData.id == this.question.id){
				qData.text = values.question;
			}
		}
		//this.controller.saveTableTopics();
        MeetingService.saveTableTopics(this.onSave, this);
	}
});


Ext.reg('questionPanel', QuestionPanel);