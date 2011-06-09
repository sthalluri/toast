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
						if(obj && obj.userId && obj.userId!=''){
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							//this.parentForm.timerPanelClock.setSecs(obj.timeSpent);
							this.parentForm.timer.setValue(getMins(obj.timeSpent));
						}else{
							this.parentForm.timer.setValue(getMins(0));
						}
						this.parentForm.updateMessage('');

		            }
			    }
		});
		
		this.timeIndicatorTmpl = Ext.XTemplate.from('time-indicator');
		this.timeIndicatorTmpl.compile();
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		var indicatorHtml = this.timeIndicatorTmpl.apply(this.timeLimits);

		this.timer = new Ext.form.TextArea({
			xtype : 'textareafield',
			id : 'clock',
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
					// this.parentForm.timerPanelClock.setSecsFromStr(value);
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
					id: 'timeIndicator',
					html:indicatorHtml
				},
                {
               	 html:'	<table class="contentTable" style="width: 100%">'+
								'<tr>'+
									'<td width="100%"><div class="silverIndi" style="height: 20px"  id="timeColorDiv"></div></td>'+
									'<td style="text-align: right" ><img width="20px" height="20px" src="js/ext/resources/themes/images/default/pictos/card2.png" onclick="timerPanel.showCard();"/></td>'+
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

	updateColor: function(colourClass){
		var colorDiv = document.getElementById('timeColorDiv');
		if(colorDiv.className != colourClass){
			colorDiv.className= colourClass;
			this.timeLimits.className = colourClass;
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
		cardPanel.showCard(this.timeLimits.className);
	},

	editTimeLimit:function(){
		this.hide();
		timeLimitPanel.loadAndShow(this.timeLimits);
	},

	updateTimeLimitSection:function(pTimings){
		if(pTimings){
			this.timeLimits = pTimings;
		}
		Ext.getCmp('timeIndicator').el.dom.innerHTML= this.timeIndicatorTmpl.apply(this.timeLimits);
		this.updateTime();
	}
});


Ext.reg('myTimerPanel', MyTimerPanel);
