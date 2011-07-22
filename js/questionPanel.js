QuestionPanel = Ext.extend(BaseFormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Add Question',

	initComponent : function() {

		this.formFields = [ {
				xtype : 'textareafield',
				name : 'question',
				useClearIcon : true,
				height : 300,
				maxRows : 10,
				autoCapitalize : false
			}
		];

        this.items= [
                     this.getMessageComp(),{
                xtype: 'fieldset',
    			title : 'Question:',
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
                title:'TableTopic',
                items: [
                    {
                        text: 'Cancel',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    },{
						xtype : 'spacer'
					}, new Ext.Button({
		                text: 'Done',
						scope: this,
		                ui : 'confirm',
		                handler: this.save
		            })
                ]
            }
        ];
    
        QuestionPanel.superclass.initComponent.call(this);	
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
	    	//tableTopicPanel.show();
			showPanel(tableTopicPanel);
			tableTopicPanel.showActiveCard();
		} else {
			this.updateMessage(data.errorMessage);
		}
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
		if(!values.question || trim(values.question) ==''){
			this.updateMessage('Please enter a valid question');
			return false;
		}
		return noErrors;
	},

	save : function(){
		if(this.validate()){
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
	}
});


Ext.reg('questionPanel', QuestionPanel);