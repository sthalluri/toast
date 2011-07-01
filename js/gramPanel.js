GramPanel = Ext.extend(BaseFormPanel, 
{
    standardSubmit : false,
    title: 'Gram',
    scroll: 'vertical',

	initComponent : function() {
        
		this.userSelector =	new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'userId',
			    label: 'Member',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberDropDownStore,
			    value:undefined,
			    required : true,
			    listeners:{
			    	change: {fn: this.userUpdated, scope: this}
			    }
		});
	
		this.roleSelector = new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'role',
			    label: 'Role',
			    valueField : 'id',
			    displayField : 'description',
			    store : gramRoleStore,
			    parentForm: this,
			    scope: this,
			    listeners:{
		            change : function(selector, value){
						var values = this.parentForm.getValues();
						var obj = thisMeeting.roles[values['role']];
						if(obj.userbaId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							this.parentForm.updateSpinners(obj.userId);
						}else{
							this.parentForm.userSelector.reset();
							this.parentForm.updateSpinners();
						}
						this.parentForm.updateMessage('');
			        }
			    }
		});

		this.loadItems();

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
        
        GramPanel.superclass.initComponent.call(this);
	},

	loadItems: function(){
		this.spinners = new Array();
		
		this.spinnerFieldSet = new Ext.form.FieldSet({
				xtype : 'fieldset',
				title : '<table width="100%"><tr><td width="90%" >Counters</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="js/ext/resources/themes/images/default/pictos/add_black.png"  onclick="gramPanel.addCustom();" />'
						+ '</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="js/ext/resources/themes/images/default/pictos/delete_black2.png"  onclick="gramPanel.removeCustom();" />'
						+ '</td>'+
						'</tr></table>',
				defaults : {
					labelAlign : 'left',
					labelWidth : '40%'
				},
				items : [ this.spinners ]
			});
		
		this.items = [this.getMessageComp(),
		              {
			xtype : 'fieldset',
			defaults : {
				labelAlign : 'left',
				labelWidth : '30%'
			},
			items : [ this.roleSelector, 
			          this.userSelector]
		},this.spinnerFieldSet];
	},
	
	
	
	userUpdated:function(selector , value){
		this.updateSpinners(value);
	},
	
	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage);
	        this.reset();        
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	
	addCustom: function(){
            Ext.Msg.prompt(null, "Counter Name", this.onCustom);
	},

	removeCustom: function(){
        Ext.Msg.prompt(null, "Enter Counter to Delete", this.onRemoveCustom);
	},

	loadSpinners: function(){
		this.spinnerFieldSet.removeAll();
		this.spinners = new Array();
		for(var i=0; i<fillers.length; i++){
			var spinner = new Ext.form.Spinner({
				xtype: 'spinnerfield',
	            name : fillers[i]+'Count',
	            minValue: 0,
	            label: fillers[i],
	            required:false
			});
			this.spinnerFieldSet.add(spinner);
			this.spinners.push(spinner);
		}
		this.doLayout();
	},

	onCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			if(fillers.indexOf(custom)>=0){
				gramPanel.updateMessage('Filler already present');
				return;
			}
			fillers.push(custom);
			var spinner = 			new Ext.form.Spinner({
				xtype: 'spinnerfield',
                name : custom+'Count',
                minValue: 0,
                label: custom,
                required:false
			});
			gramPanel.spinnerFieldSet.add(spinner);
			gramPanel.spinners.push(spinner);
			gramPanel.doLayout();
			gramPanel.saveFillers();				
		}
	},

	
	onSaveFillerss: function(data){
		if (data.success) {
			this.updateMessage("Saved filler successfully.");
		} else {
			this.updateMessage("Unable to save the filler.");
		}
	},

	saveFillers: function(){
		var clubSettings = new Object();
		clubSettings.fillers = fillers;
		
		//Loading the club members
		ClubService.saveClubSettings(thisUser.defaultClubId, clubSettings, this.onSaveFillerss, this);

	},
	
	onRemoveCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			if(fillers.indexOf(custom)<0){
				gramPanel.updateMessage('Filler not present');
				return;
			}
			fillers.remove(custom);			
			for(var i=0; i<gramPanel.spinners.length; i++){
				var spinner = gramPanel.spinners[i];
				if(spinner.name == custom+'Count'){
					gramPanel.spinnerFieldSet.remove(spinner);					
				}
			}
			gramPanel.saveFillers();
		}
	},
	
	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.userId || values.userId =='none'){
			this.updateMessage('Please select the user');
			return false;
		}
		return noErrors;
	},

	save:function(){
		if(this.validate()){
	        var values = this.getValues();        
	        var selectedUser = values['userId'];
	        var selectedRole = values['role'];
	        
	        var roleObj = thisMeeting.roles[selectedRole];
	        roleObj.userId = selectedUser;
	        
	        if(!thisMeeting.gramLog){
	        	thisMeeting.gramLog = new Object();
	        }
	        
	        if(!thisMeeting.gramLog[selectedUser]){
	        	thisMeeting.gramLog[selectedUser] = new Object();
	        }
			
	        var countObj = thisMeeting.gramLog[selectedUser];
	        
	        for(var i=0; i<fillers.length;i++){
				var filler = fillers[i];
				countObj[filler] = values[filler+'Count'];
			}
	        MeetingService.save(thisMeeting, this.onSave, this);
		}
	},
	
	resetForm:function(){
		this.updateMessage('');
		this.reset();
	},
	

	updateSpinners : function(userId) {
		var amCount = new Object();
		if (thisMeeting.gramLog && thisMeeting.gramLog[userId]) {
			amCount = thisMeeting.gramLog[userId];
		}
		for ( var j = 0; j < fillers.length; j++) {
			var filler = fillers[j];
			var spinner = this.spinners[j];
			if (amCount && amCount[filler]) {
				spinner.setValue(amCount[filler]);
			} else {
				spinner.setValue(0);
			}
		}
	},	
	
	goBack: function() {
    	this.updateMessage('');
    	closePanel(this);
    }

});


Ext.reg('gramPanel', GramPanel);