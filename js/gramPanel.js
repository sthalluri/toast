GramPanel = Ext.extend(Ext.form.FormPanel, 
{
    scroll: 'vertical',
    url   : 'postUser.php',
    standardSubmit : false,
    title: 'Gram',

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
						if(obj.userId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							for(var j=0; j<fillers.length;j++){
								var filler = fillers[j];
								var spinner = this.parentForm.spinners[j];
								if(obj.amCount && obj.amCount[filler]){
									spinner.setValue(obj.amCount[filler]);
								}else{
									spinner.setValue(0);
								}
							}
						}else{
							this.parentForm.userSelector.reset();
						}
						this.parentForm.updateMessage('');
						//console.log('valu changed' + value);
			        }
			    }
		});

		this.spinners = new Array();
		
		for(var i=0; i<fillers.length;i++){
			var filler = fillers[i];
			var spinner = new Ext.form.Spinner({
					xtype: 'spinnerfield',
	                name : filler+'Spinner',
	                minValue: 0,
	                name : filler+'Count',
	                label: filler,
	                required:false
				});
			this.spinners[this.spinners.length]=spinner;
		}

		
		
		this.items = [{
                xtype: 'fieldset',
                title: 'Counter',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
				this.roleSelector,
				this.userSelector,
				this.spinners, {
		            layout: 'hbox',
		            defaults: {xtype: 'button',  style: 'margin: .5em;'},
		            items: [{
		                text: 'Save',
		                scope: this,
		                ui  : 'confirm',
		                width:100,
		                handler: this.save
		            }, {
		                text: 'Reset',
		                scope: this,
		                width:100,
		                handler: this.resetForm
		            }]
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
    
        this.dockedItems =[
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Grammarian',
                items: [
                    {
					    text: 'Back',
		                ui: 'back',
					    handler: function() {
					    	gramPanel.hide();
					    	//roleListPanel.show();
					    	meetingListPanel.show();
					    }
					},
					{xtype: 'spacer'},
	                {
	                    text: 'Change Role',
	                    handler: function() {
	                    	gramPanel.hide();
	                    	roleListPanel.show();
	                    }
	                }
                ]
            }
        ];
        
        GramPanel.superclass.initComponent.call(this);
	},

	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage);
	        this.reset();        
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	save:function(){
        var values = this.getValues();        
        var obj = thisMeeting.roles[values['role']];
        obj.userId =  values['userId'];
		if(!obj.amCount){
			obj.amCount = new Object();
		}
        var countObj = obj.amCount;
        
        for(var i=0; i<fillers.length;i++){
			var filler = fillers[i];
			countObj[filler] = values[filler+'Count'];
		}
        MeetingService.save(thisMeeting, this.onSave, this);
	},
	
	resetForm:function(){
		this.updateMessage('');
		this.reset();
	},
	
	logReport:function(){
		for(var i=1; i<roles.length; i++){
			var role = roles[i];
	        var obj = thisMeeting.roles[role.role];
	        console.log(objectToString(obj));
		}
	},
	
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('Counter'+'<div class="msg"><p >'+msg+'</p></div>');
	}

});


Ext.reg('gramPanel', GramPanel);