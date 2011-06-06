MyGramPanel = Ext.extend(Ext.form.FormPanel, 
{
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Gram',

	initComponent : function() {
		
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
		                scope:this,
					    handler: function() {
					    	this.hide();
					    	//roleListPanel.show();
					    	meetingListPanel.show();
					    }
					},
					{xtype: 'spacer'}
                ]
            }
        ];
        
        MyGramPanel.superclass.initComponent.call(this);
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
        var obj = thisMeeting.roles['participant'];
        if(!obj){
        	obj = new Object();
        	thisMeeting.roles.participant = obj;
        }
        obj.userId =  thisUser.id;
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

	load: function(){
		var obj = thisMeeting.roles['participant'];
		if(obj){
			for(var j=0; j<fillers.length;j++){
				var filler = fillers[j];
				var spinner = this.spinners[j];
				if(obj.amCount && obj.amCount[filler]){
					spinner.setValue(obj.amCount[filler]);
				}else{
					spinner.setValue(0);
				}
			}
		}
	},
	
	refresh: function(){
		for(var j=0; j<fillers.length;j++){
			var filler = fillers[j];
			var spinner = this.spinners[j];
			spinner.setValue(0);
		}
		this.load();
		this.show();		
	},
	
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('Counter'+'<div class="msg"><p >'+msg+'</p></div>');
	}

});


Ext.reg('gramPanel', GramPanel);