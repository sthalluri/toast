MyTimerPanel = Ext.extend(Ext.form.FormPanel, 
{
	scroll: 'vertical',
	url   : 'postUser.php',
	standardSubmit : false,
	title: 'Timer',	
	initComponent : function() {
		this.roleSelector = new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'role',
			    label: 'Role',
			    valueField : 'id',
			    displayField : 'description',
			    store : roleStore,
			    parentForm: this,
			    scope: this,
			    listeners:{
		            change : function(selector, value){
						var values = this.parentForm.getValues();
						console.log(values);
						var obj = thisMeeting.roles[values['role']];
						this.parentForm.updateMessage('');
			        }
			    }
		});
		
		this.formFields = new Ext.form.FieldSet({
			 xtype: 'fieldset',
             title:' ',
             defaults: {
                 required: true,
                 labelAlign: 'left',
                 labelWidth: '30%'
             },
             items: [
				this.roleSelector,
				{
                 xtype : 'textareafield',
                 id : 'clock',
                 name  : 'timer',
                 value : '0:00',
                 maxLength : 6,
                 height:50,
                 maxRows : 1,
 			     parentForm: this,
                 style : 'font-weight:bold;font-size:40pt;color:#00008b;text-align:center;',
 			     scope: this,
 			     listeners:{
 			    		change : function(selector, value){
 			    			this.parentForm.timerPanelClock.setSecsFromStr(value);
 			    		}
 			    	}
				}
			]
		});
	
        this.items= [this.formFields,
	        {
            xtype: 'fieldset',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '10%'
            },
            items: [        	
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
			                new Ext.Button({
			                    text: 'Save',
								scope: this,
			                    width:100,
				                handler: this.save
			                }),
			                new Ext.Button({
			                    text: 'Reset',
								scope: this,
			                    width:100,
				                handler: this.resetTimer
			                })
					       ]
				
				}
            	]
            }
        ];
        
        this.dockedItems= [
            {
            	title: 'Timer',
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Back',
		                ui: 'back',
                        handler: function() {
                        	myTimerPanel.hide();
                        	meetingListPanel.show();
                        }
                    },
                    {xtype: 'spacer'}
                ]
            }
        ];
        MyTimerPanel.superclass.initComponent.call(this);
	},
	
	resetTimer: function(){
        this.timerPanelClock.reset();
		this.reset();
	},
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
	},
	
	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.role || values.role =='none'){
			this.updateMessage('Please select the role');
			return false;
		}
		if(!values.userId || values.userId =='none'){
			this.updateMessage('Please select the user');
			return false;
		}
		return noErrors;
	},
	
	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage);
	        this.timerPanelClock.reset();
	        this.reset();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	save: function(){
		var values = this.getValues();        
        var obj = thisMeeting.roles[values['role']];
        obj.userId =  values['userId'];
        obj.timeSpent = this.timerPanelClock.getSecs();        
        MeetingService.save(thisMeeting, this.onSave, this);
	}
	
});


Ext.reg('myTimerPanel', MyTimerPanel);
