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
						var role = values['role'];
						var obj = thisMeeting.roles[role];
						if(role.substring(0,5) == 'speak'){
							this.parentForm.timings = timingStore.speech;
						}
						if(role.substring(0,5) == 'ttRes'){
							this.parentForm.timings = timingStore.ttResponse;
						}
						if(role.substring(0,5) == 'evalu'){
							this.parentForm.timings = timingStore.evaluator;
						}
						console.log(this.parentForm.timeIndicatorTmpl.apply(this.parentForm.timings));
						Ext.getCmp('timeIndicator').el.dom.innerHTML= this.parentForm.timeIndicatorTmpl.apply(this.parentForm.timings);
						if(obj && obj.userId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							this.parentForm.clockField.reset();
							this.parentForm.timerPanelClock.setSecs(obj.timeSpent);
							this.parentForm.updateTime();
						}else{
							this.parentForm.updateColor('silverIndi');
							this.parentForm.userSelector.reset();
						}
						this.parentForm.updateMessage('');
			        }
			    }
		});
		
		this.timeIndicatorTmpl = Ext.XTemplate.from('time-indicator');
		this.timeIndicatorTmpl.compile();
		this.timings = {red:'0', yellow:'0', green:'0', className:'silverIndi'};
		var indicatorHtml = this.timeIndicatorTmpl.apply(this.timings);
		
		this.clockField = new Ext.form.TextArea({
                xtype : 'textareafield',
                id : 'clock',
                name  : 'timer',
                value : '0:00',
                maxLength : 6,
                height:10,
                maxRows : 1,
			     parentForm: this,
                style : 'font-weight:bold;font-size:40pt;color:#00008b;text-align:center;',
			     scope: this,
			     listeners:{
			    		change : function(selector, value){
			    			this.parentForm.timerPanelClock.setSecsFromStr(value);
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
                {
                	 html:'	<table class="contentTable" style="width: 100%">'+
								'<tr>'+
									'<td width="100%"><div class="silverIndi" style="height: 20px"  id="timeColorDiv"></div></td>'+
									'<td style="text-align: right" ><img width="20px" height="20px" src="js/ext/resources/themes/images/default/pictos/card2.png" onclick="timerPanel.showCard();"/></td>'+
								'</tr>'+
							'</table>'
                },
				this.roleSelector,
				this.userSelector,
 				{
					id: 'timeIndicator',
					html:indicatorHtml
				},
				this.clockField
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
                        	//roleListPanel.show();
                        	meetingListPanel.show();
                        }
                    },
                    {xtype: 'spacer'}
//                    ,
//                    {
//                        text: 'Change Role',
//                        ui: 'confirm',
//                        handler: function() {
//                        	timerPanel.hide();
//                        	roleListPanel.show();
//                        }
//                    }
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
	},
	
	updateTime: function(){
		var clock = this.formFields.items.getByKey('clock');
		clock.setValue(this.timerPanelClock.getMins());
		var value = this.timerPanelClock.getSecs();
		if(value > this.timings.red){
			this.updateColor("redIndi");
		}else if(value > this.timings.yellow){
			this.updateColor("yellowIndi");
		}else if(value > this.timings.green){
			this.updateColor("greenIndi");
		}else{
			this.updateColor("silverIndi");
		}
	},
	
	updateColor: function(colourClass){
		var colorDiv = document.getElementById('timeColorDiv');
		if(colorDiv.className != colourClass){
			colorDiv.className= colourClass;
			this.timings.className = colourClass;
			cardPanel.updateColor(colourClass);
			console.log('Changing to yello');
		}
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
	},
	
	showCard: function(){
		this.hide();
		cardPanel.showCard(this.timings.className);
	}
});

//Ext.getCmp('timeIndicator').el.dom.innerHTML='NEW'

Ext.reg('timerPanel', TimerPanel);
