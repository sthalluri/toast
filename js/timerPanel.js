TimerPanel = Ext.extend(BaseFormPanel, 
{
	standardSubmit : false,
	title: 'Tim',
	scroll: 'vertical',
	initComponent : function() {

		this.userSelector =	new Ext.form.Select({
		    xtype: 'selectfield',
		    name : 'userId',
		    label: 'Member',
		    valueField : 'id',
		    displayField : 'name',
		    store : memberDropDownStore
		});

		this.roleSelector = new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'role',
			    label: 'Role',
			    valueField : 'id',
			    displayField : 'description',
			    store : timerRoleStore,
			    parentForm: this,
			    scope: this,
			    listeners:{
		            change : function(selector, value){
						var values = this.parentForm.getValues();
						var role = values['role'];
						var obj = thisMeeting.roles[role];
						if (obj && obj.timeLimits && obj.timeLimits.red > 0) {
							this.parentForm.timeLimits.red = obj.timeLimits.red;
							this.parentForm.timeLimits.green = obj.timeLimits.green;
							this.parentForm.timeLimits.yellow = obj.timeLimits.yellow;
						} else {
							if (role.substring(0, 5) == 'speak') {
								this.parentForm.timeLimits = timingStore.speech;
							}
							if (role.substring(0, 5) == 'ttRes') {
								this.parentForm.timeLimits = timingStore.ttResponse;
							}
							if (role.substring(0, 5) == 'evalu') {
								this.parentForm.timeLimits = timingStore.evaluator;
							}
						}
						if(obj && obj.userId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							//this.parentForm.clockField.reset();
							this.parentForm.updateDivTime('0:00');
							this.parentForm.timerPanelClock.setSecs(obj.timeSpent);
						}else{
							this.parentForm.timerPanelClock.setSecs(0);
							this.parentForm.updateColor('silverIndi');
							this.parentForm.userSelector.reset();
							//this.parentForm.clockField.reset();
							this.parentForm.updateDivTime('0:00');
						}
						this.parentForm.updateTimeLimitSection();
						this.parentForm.updateMessage('');
			        }
			    }
		});

		this.timeIndicatorTmpl = Ext.XTemplate.from('time-indicator');
		this.timeIndicatorTmpl.compile();
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		this.timeLimits.panel = "timerPanel";
		var indicatorHtml = this.timeIndicatorTmpl.apply(this.timeLimits);

//		this.clockField = new Ext.form.Text({
//                xtype : 'textareafield',
//                id : 'clock',
//                name  : 'timer',
//                value : '0:00',
//                maxLength : 6,
//                height:10,
//                maxRows : 1,
//			    parentForm: this,
//			    //disabled:true,
//                style : 'font-weight:bold;font-size:40pt;color:#00008b;text-align:center;',
//			    scope: this,
//			    listeners:{
//			    		change : function(selector, value){
//			    			this.parentForm.timerPanelClock.setSecsFromStr(value);
//	    					this.parentForm.updateTime();
//			    		}
//			    	}
//				});

		this.formFields = new Ext.form.FieldSet({
			 xtype: 'fieldset',
             defaults: {
                 required: true,
                 labelAlign: 'left',
                 labelWidth: '30%'
             },
             items: [
				this.roleSelector,
				this.userSelector,
 				{
					id: 'timeIndicator',
					html:indicatorHtml
				},
                {
               	 html:'	<table class="contentTable" style="width: 100%">'+
								'<tr>'+
									'<td width="100%"><div class="silverIndi"  style="height: 20px;"  id="timeColorDiv" onclick="timerPanel.showCard();"></div></td>'+
									'<td style="text-align: right;"><img width="20px" height="20px" src="images/pictos/resize.png" onclick="timerPanel.showCard();"/></td>'+
								'</tr>'+
								'<tr><td style="text-align: center; font-size:50pt; font-weight:normal" ><div id="timerPanelTimeDiv">0:00</div></td></tr>'+
							'</table>'
                }
//				,
//				this.clockField
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

		this.editTimeButton = new Ext.Button({
			scope: this,
            text: 'Edit Time',
            width:100,
            handler: this.editTime
        });

		this.addMemeberButton = new Ext.Button({
			scope: this,
            text: 'Add New Member',
            width:100,
            handler: this.addNewMember
        });

        this.items= [this.getMessageComp(),
                     this.formFields,
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
							this.startButton,
							this.stopButton
					       ]

				},
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
							this.editTimeButton
					       ]

				},
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
							this.addMemeberButton
					       ]

				}
        ];
    
		this.instructions= '*Click <b>Done</b> before selecting next role.';

    
        this.dockedItems= [
            {
            	title: 'Timer',
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Back',
		                ui: 'back',
		                scope:this,
                        handler: this.goBack
                    },
                    {xtype: 'spacer'},
                    new Ext.Button({
	                    text: 'Done',
						scope: this,
						ui : 'confirm',
		                handler: this.save
	                })
                ]
            }
        ];
        
		this.timerPanelClock = new Clock(this.timerEvent);

        TimerPanel.superclass.initComponent.call(this);
	},

	startTimer: function(){
		if(this.validate()){
			acquire();
			this.startButton.disabled = true;
			this.stopButton.disabled = false;
			this.updateMessage('');
			this.timerPanelClock.start();
		}
	},

	stopTimer: function(){
		release();
		this.startButton.disabled = false;
		this.stopButton.disabled = true;
		this.timerPanelClock.stop();
	},

	resetTimer: function(){
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		this.timerPanelClock.reset();
        this.updateTimeLimitSection();
		this.reset();
	},
	
	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.role || values.role ==='0'){
			this.updateMessage('Please select the Role');
			return false;
		}
		if(!values.userId || values.userId ==='none'){
			this.updateMessage('Please select the Member');
			return false;
		}
		return noErrors;
	},

	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage+" Select the next role to report.");
	        this.timerPanelClock.reset();
	        this.updateTime();
	        this.reset();
		} else {
			this.updateMessage(data.errorMessage);
		}
		this.stopTimer();
	},

	save: function(){
		if(this.validate()){
			var values = this.getValues();        
	        var obj = thisMeeting.roles[values['role']];
	        obj.userId =  values['userId'];
	        obj.timeSpent = this.timerPanelClock.getSecs();
	        obj.timeLimits = this.timeLimits;
	        MeetingService.save(thisMeeting, this.onSave, this);
		}
        this.scroller.scrollTo(0);
	},

	updateTime: function(){
		
//		var clock = this.formFields.items.getByKey('clock');
//		clock.setValue(this.timerPanelClock.getMins());		
		this.updateDivTime(this.timerPanelClock.getMins());
		var value = this.timerPanelClock.getSecs();
		if(value > this.timeLimits.red){
			this.updateColor("redIndi");
		}else if(value > this.timeLimits.yellow){
			this.updateColor("yellowIndi");
		}else if(value > this.timeLimits.green){
			this.updateColor("greenIndi");
		}else{
			this.updateColor("silverIndi");
		}
	},

	updateDivTime: function(time){
		document.getElementById("timerPanelTimeDiv").innerHTML =time; 
	},
	
	updateColor: function(colourClass){
		var colorDiv = document.getElementById('timeColorDiv');
		if(colorDiv.className != colourClass){
			colorDiv.className= colourClass;
			this.timeLimits.className = colourClass;
			cardPanel.updateColor(colourClass);
		}
	},

	timerEvent: function(){
		timerPanel.updateTime();
	},

	showCard: function(){
		//this.hide();
		cardPanel.showCard(this, this.timeLimits.className);
	},

	editTimeLimit:function(){
		if(this.validate()){		
			this.hide();
			timeLimitPanel.loadAndShow(this, this.timeLimits);
		}
	},

	editTime:function(){
		if(this.validate()){		
			this.hide();
			timeEditPanel.showTimeEdit(this, this.timerPanelClock.getSecs());
		}
	},

	updateTimeLimitSection:function(pTimings){
		if(pTimings){
			this.timeLimits = pTimings;
		}
		this.timeLimits.panel = "timerPanel";
		Ext.getCmp('timeIndicator').el.dom.innerHTML= this.timeIndicatorTmpl.apply(this.timeLimits);
		this.updateTime();
	},
	
	goBack: function() {
		release();
    	this.updateMessage('');
    	closePanel(this);
    },
    
    updateFromTimeEdit: function(time){
        this.timerPanelClock.setSecsFromStr(time);
        this.updateTime();
    },
    
    addNewMember: function(){
    	clubMemberAddPanel.resetFields(timerPanel);
		showPanel(clubMemberAddPanel);
    }
});

//Ext.getCmp('timeIndicator').el.dom.innerHTML='NEW'

Ext.reg('timerPanel', TimerPanel);
