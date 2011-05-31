TimerPanel = Ext.extend(Ext.form.FormPanel, 
{
	scroll: 'vertical',
	url   : 'postUser.php',
	standardSubmit : false,
	title: 'Tim',
	
	initComponent : function() {

	
		this.userSelector =	new Ext.form.Select({
		    xtype: 'selectfield',
		    name : 'userId',
		    label: 'Member',
		    valueField : 'id',
		    displayField : 'name',
		    store : memberStore
		});
		
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
						if(obj && obj.userId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							this.parentForm.timerPanelClock.setSecs(obj.timeSpent);
							this.parentForm.updateTime();
						}else{
							this.parentForm.userSelector.reset();
						}
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
				this.userSelector,
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
	
		this.startButton = new Ext.Button({
			ui : 'confirm',
			scope: this,
		    text: 'Start',
		    width:100,
            handler: this.startTimer
		});
		
		this.stopButton = new Ext.Button({
        	ui:'decline',
			scope: this,
            text: 'Stop',
            width:100,
            handler: this.stopTimer
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
							this.startButton,
							this.stopButton,
			                new Ext.Button({
			                    text: 'Reset',
								scope: this,
			                    width:100,
				                handler: this.resetTimer
			                })
					       ]
				
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
				                handler: this.save
			                })
					       ]
				
				}
            	]
            }
        ];
        
        this.listeners = {
            submit : function(loginForm, result){
                console.log('success', Ext.toArray(arguments));
            },
            exception : function(loginForm, result){
                console.log('failure', Ext.toArray(arguments));
            }
        };
    
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
                        	timerPanel.hide();
                        	roleListPanel.show();
                        }
                    },
                    {xtype: 'spacer'},
                    {
                        text: 'Change Role',
                        ui: 'confirm',
                        handler: function() {
                        	timerPanel.hide();
                        	roleListPanel.show();
                        }
                    }
                ]
            }
        ];
        
		this.timerPanelClock = new Clock(this.timerEvent);

        TimerPanel.superclass.initComponent.call(this);
	},
	
	startTimer: function(){
		if(this.validate()){
			this.startButton.disabled = true;
			this.stopButton.disabled = false;
			this.updateMessage('');
			this.timerPanelClock.start();
		}
	},
	
	stopTimer: function(){
		this.startButton.disabled = false;
		this.stopButton.disabled = true;
		this.timerPanelClock.stop();
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
	
	save: function(){
		var values = this.getValues();        
        var obj = thisMeeting.roles[values['role']];
        obj.userId =  values['userId'];
        obj.timeSpent = this.timerPanelClock.getSecs();
        
        meetingController.save(thisMeeting);        
        this.logReport();
        this.timerPanelClock.reset();
		this.updateMessage('Saved Successfully');
        this.reset();
	},
	
	updateTime: function(){
		var clock = this.formFields.items.getByKey('clock');
		clock.setValue(this.timerPanelClock.getMins());
	},
	
	logReport:function(){
		for(var i=1; i<roles.length; i++){
			var role = roles[i];
	        var obj = thisMeeting.roles[role.role];
	        if(obj){
		        console.log(role.role+'->'+obj.timeSpent);
	        }
		}
	},
	
	timerEvent: function(){
		timerPanel.updateTime();
	}
});

