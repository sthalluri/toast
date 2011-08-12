MyGramPanel = Ext.extend(BaseFormPanel, 
{
    standardSubmit : false,
    title: 'Gram',
	scroll: 'vertical',
	initComponent : function() {
		
		this.spinners = new Array();
		this.spinnerFiledSet = new Ext.form.FieldSet({
				xtype : 'fieldset',
				title : '<table width="100%"><tr><td width="90%" >Counters</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="images/pictos/add_black.png"  onclick="myGramPanel.addCustom();" />'
						+ '</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="images/pictos/delete_black2.png"  onclick="myGramPanel.removeCustom();" />'
						+ '</td>'+
						'</tr></table>',
				defaults : {
					required : false,
					labelAlign : 'left',
					labelWidth : '40%'
				},
				items : [ this.spinners ],
				instructions : '<b>Log your counts for this meeting.</b>',
			});
		
		this.items = [ 
		               this.getMessageComp(),
		               this.spinnerFiledSet];
		
        this.dockedItems =[
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Gram Report',
                items: [
                    {
					    text: 'Cancel',
		                ui: 'back',
		                scope:this,
					    handler: this.goBack
					},
					{xtype: 'spacer'}, {
						text : 'Done',
						scope : this,
						ui : 'confirm',
						handler : this.save
					}
                ]
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
			this.goBack();
			//this.updateMessage(data.successMessage);
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
	
	addCustom: function(){
        this.msgPrompt = Ext.Msg.prompt(null, "Counter Name", this.onCustom);
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
			myGramPanel.saveFillers();
		}
	},
	
	onRemoveCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			var removed = false;
			for(var i=0; i<myGramPanel.spinners.length; i++){
				var spinner = myGramPanel.spinners[i];
				if(spinner.name.toLowerCase() === (custom+'Count').toLowerCase()){
					myGramPanel.spinnerFiledSet.remove(spinner);					
					removed = true;
				}
			}
			
			for(var i=0; i<fillers.length; i++){
				var filler = fillers[i];
				if(filler.toLowerCase() === (custom).toLowerCase()){
					fillers.remove(filler);
				}
			}

			if(!removed){
				myGramPanel.updateMessage('Filler not present');
				return;
			}else{
				myGramPanel.updateMessage('');
			}

			myGramPanel.saveFillers();
		}
	},
	

	onSaveFillerss: function(data){
		if (data.success) {
			this.updateMessage('Saved fillers successfully.');
		} else {
			this.updateMessage('Unable to save the data.');
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
    	if(this.msgPrompt){
    		this.msgPrompt.hide();
    	}
    	closePanel(this);
	}

});

