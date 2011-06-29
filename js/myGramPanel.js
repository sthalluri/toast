MyGramPanel = Ext.extend(Ext.form.FormPanel, 
{
    standardSubmit : false,
    title: 'Gram',
	initComponent : function() {
		
		this.spinners = new Array();
		this.spinnerFiledSet = new Ext.form.FieldSet({
				xtype : 'fieldset',
				title : '<table width="100%"><tr><td width="90%" >Counters</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="js/ext/resources/themes/images/default/pictos/add_black.png"  onclick="myGramPanel.addCustom();" />'
						+ '</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="js/ext/resources/themes/images/default/pictos/delete_black2.png"  onclick="myGramPanel.removeCustom();" />'
						+ '</td>'+
						'</tr></table>',
				defaults : {
					required : true,
					labelAlign : 'left',
					labelWidth : '40%'
				},
				items : [ this.spinners ]
			});
		
		this.items = [ {
			xtype : 'fieldset',
			title:'&nbsp;'
		},this.spinnerFiledSet];
		
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
                title:'Gram Log',
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
					}, {
						text : 'Save',
						scope : this,
						ui : 'confirm',
						width : 80,
						handler : this.save
					}, {
						text : 'Reset',
						scope : this,
						width : 80,
						handler : this.resetForm
					}]
            }
        ];
        
        MyGramPanel.superclass.initComponent.call(this);
	},

	loadSpinners: function(){
		this.spinnerFiledSet.removeAll();
		this.spinners = new Array();
		for(var i=0; i<fillers.length; i++){
			var spinner = new Ext.form.Spinner({
				xtype: 'spinnerfield',
	            name : fillers[i]+'Count',
	            minValue: 0,
	            label: fillers[i],
	            required:false
			});
			this.spinnerFiledSet.add(spinner);
			this.spinners.push(spinner);
		}
		this.doLayout();
	},

	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	save:function(){
        var values = this.getValues();        
        
		if(!thisMeeting.gramLog){
        	thisMeeting.gramLog = new Object();
        }        
        if(!thisMeeting.gramLog[thisUser.id]){
        	thisMeeting.gramLog[thisUser.id] = new Object();
        }
        var amCount = thisMeeting.gramLog[thisUser.id];
        for(var i=0; i<fillers.length;i++){
			var filler = fillers[i];
			amCount[filler] = values[filler+'Count'];
		}
        MeetingService.save(thisMeeting, this.onSave, this);
	},
	
	resetForm:function(){
		this.updateMessage('');
		this.reset();
	},

	load: function(){
		if(!thisMeeting.gramLog){
        	thisMeeting.gramLog = new Object();
        }        
        if(!thisMeeting.gramLog[thisUser.id]){
        	thisMeeting.gramLog[thisUser.id] = new Object();
        }        
        var amCount = thisMeeting.gramLog[thisUser.id];

		for(var j=0; j<fillers.length;j++){
			var filler = fillers[j];
			var spinner = this.spinners[j];
			if(spinner){
				if(amCount && amCount[filler]){
					spinner.setValue(amCount[filler]);
				}else{
					spinner.setValue(0);
				}
			}
		}
	},
	
	refresh: function(){
		for(var j=0; j<fillers.length;j++){
			var spinner = this.spinners[j];
			if(spinner){
				spinner.setValue(0);
			}
		}
    	this.loadSpinners();
		this.load();
	},
	
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
	},
	
	addCustom: function(){
        Ext.Msg.prompt(null, "Counter Name", this.onCustom);
	},
	
	removeCustom: function(){
	    Ext.Msg.prompt(null, "Enter Counter to Delete", this.onRemoveCustom);
	},
	
	onCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			if(fillers.indexOf(custom)>=0){
				myGramPanel.updateMessage('Filler already present');
				return;
			}else{
				myGramPanel.updateMessage('');
			}
			fillers.push(custom);
			var spinner = 			new Ext.form.Spinner({
				xtype: 'spinnerfield',
	            name : custom+'Count',
	            minValue: 0,
	            label: custom,
	            required:false
			});
			myGramPanel.spinnerFiledSet.add(spinner);
			myGramPanel.spinners.push(spinner);
			myGramPanel.doLayout();
			gramPanel.saveFillers();
		}
	},
	
	onRemoveCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			if(fillers.indexOf(custom)<0){
				myGramPanel.updateMessage('Filler not present');
				return;
			}else{
				myGramPanel.updateMessage('');
			}
			fillers.remove(custom);			
			for(var i=0; i<myGramPanel.spinners.length; i++){
				var spinner = myGramPanel.spinners[i];
				if(spinner.name == custom+'Count'){
					console.log(spinner.name);
					myGramPanel.spinnerFiledSet.remove(spinner);					
				}
			}
			gramPanel.saveFillers();
		}
	},
	

	onSaveFillerss: function(data){
		if (data.success) {
			console.log('Saved fillers succesfully');
		} else {
			console.log('Unable to load the meetings ');
		}
	},

	saveFillers: function(){
		var clubSettings = new Object();
		clubSettings.fillers = fillers;
		
		//Loading the club members
		ClubService.saveClubSettings(thisUser.defaultClubId, clubSettings, this.onSaveFillerss, this);

	},

	goBack: function(){
    	this.updateMessage('');
    	closePanel(this);
	}

});

