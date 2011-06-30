MyTimerPanel = Ext.extend(Ext.form.FormPanel, 
{
	scroll: 'vertical',
	url   : 'postUser.php',
	standardSubmit : false,
	type : 'myTimerPanel',
	title: 'My Timer Log',	
	fullscreen:true,
	initComponent : function() {
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
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							this.parentForm.timer.setValue(getMins(obj.timeSpent));
						}else{
							this.parentForm.timer.setValue(getMins(0));
						}
						this.parentForm.updateTimeLimitSection();
						this.parentForm.updateMessage('');

		            }
			    }
		});

		this.timeIndicatorTmpl = Ext.XTemplate.from('time-indicator');
		this.timeIndicatorTmpl.compile();
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		this.timeLimits.panel = "myTimerPanel";
		var indicatorHtml = this.timeIndicatorTmpl.apply(this.timeLimits);

		this.timer = new Ext.form.TextArea({
			xtype : 'textareafield',
			id : 'pClock',
			name : 'timer',
			value : '0:00',
			maxLength : 6,
			id : 'myTimer',
			height : 50,
			maxRows : 1,
			parentForm : this,
			style : 'font-weight:bold;font-size:40pt;color:#00008b;text-align:center;',
			scope : this,
			listeners : {
				change : function(selector, value) {
					this.parentForm.updateTime();
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
					id: 'pTimeIndicator',
					html:indicatorHtml
				},
                {
               	 html:'	<table class="contentTable" style="width: 100%">'+
								'<tr>'+
									'<td width="100%"><div class="silverIndi" style="height: 20px"  id="ptimeColorDiv"></div></td>'+
								'</tr>'+
							'</table>'
               },
				this.timer
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
            items: []
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
		                scope:this,
                        handler: this.goBack
                    },
                    {xtype: 'spacer'}
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items : [ {
						xtype : 'spacer'
					}, new Ext.Button({
	                    text: 'Save',
						scope: this,
                        ui: 'confirm',
	                    width:80,
		                handler: this.save
	                }),
	                new Ext.Button({
	                    text: 'Reset',
						scope: this,
	                    width:80,
		                handler: this.resetTimer
	                })]
            }
        ];
        MyTimerPanel.superclass.initComponent.call(this);
	},

	resetTimer: function(){
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
	        this.reset();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	save: function(){
		var values = this.getValues();        
        var obj = thisMeeting.roles[values['role']];
        obj.userId =  thisUser.id;
        obj.timeSpent = getSecsFromStr(values.timer); 
        MeetingService.save(thisMeeting, this.onSave, this);
	},


	updateTime: function(){
		var values = this.getValues();        
		var value = getSecsFromStr(values.timer);
		if(value > this.timeLimits.red){
			this.updateColor("redIndi");
		}else if(value > this.timeLimits.yellow){
			this.updateColor("yellowIndi");
		}else if(value > this.timeLimits.green){
			this.updateColor("greenIndi");
		}else{
			this.updateColor("silverIndi");
		}
		this.timer.setValue(getMins(value));
	},

	updateColor: function(colourClass){
		var colorDiv = document.getElementById('ptimeColorDiv');
		if(colorDiv.className != colourClass){
			colorDiv.className= colourClass;
			this.timeLimits.className = colourClass;
		}
	},

	editTimeLimit:function(){
		this.hide();
		timeLimitPanel.loadAndShow(this, this.timeLimits);
	},

	updateTimeLimitSection:function(pTimings){
		if(pTimings){
			this.timeLimits = pTimings;
		}
		Ext.getCmp('pTimeIndicator').el.dom.innerHTML= this.timeIndicatorTmpl.apply(this.timeLimits);
		this.updateTime();
	},
	
	goBack: function() {
    	this.updateMessage('');
    	closePanel(this);
    }
});


Ext.reg('myTimerPanel', MyTimerPanel);