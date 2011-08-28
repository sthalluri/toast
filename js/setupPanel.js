SetupPanel = Ext.extend(BaseFormPanel, 
{
	initComponent : function() {
		this.items = [ this.getMessageComp(),{
			xtype : 'fieldset',
			instructions : '<b>Please enter the information above.</b>',
			defaults : {
				required : true,
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ 
			{
				xtype : 'textfield',
				name : 'firstName',
				label : 'First Name',
				placeHolder: 'First Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:true,
				listeners : {
					change : this.capitalize
				}
			},{
				xtype : 'textfield',
				name : 'lastName',
				label : 'Last Name',
				placeHolder: 'Last Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:true,
				listeners : {
					change : this.capitalize
				}
			},{
				xtype : 'textfield',
				name : 'email',
				label : 'Email ID',
				placeHolder: 'Email ID',
				useClearIcon : true,
				autoCapitalize : false
			},
			{
				layout:'hbox',
				flex:1,
           	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
				items:[
						{
							text : 'Continue',
							ui : 'confirm',
							scope: this,
						    width:80,
							handler : this.register
						}, {
							text : 'Cancel',
						    width:80,
							scope: this,
							handler : this.cancel
						} 				       
			       ]
			}
			
			]
		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			title:'Basic Setup',
			dock : 'top',
			items : [ ]
		} ];
	
		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			standardSubmit : false,
			title : 'Setup'
		});
		
		RegisterPanel.superclass.initComponent.call(this);	
	},
	onRegister:function(data){
    	if(data.success){
    		thisUser = data.returnVal;
    		this.registerSuccess();
    	}else{
			this.updateMessage(data.errorMessage);
    	}
	},
	register : function() {
		if(this.validate()){
			var formValues = this.getValues();
			UserService.register(formValues, this.onRegister, this);
		}
	},
	validate: function(){
		var formValues = this.getValues();
		
		if(!formValues.firstName || formValues.firstName.length<2){
			this.updateMessage('Enter your First Name');
			return false;
		}

		if(!formValues.lastName){
			this.updateMessage('Enter your Last Name');
			return false;
		}

		if(!formValues.email || !validator.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}
		
		return true;
	},
	capitalize: function(field, value){
		this.setValue(Ext.util.Format.capitalize(value));
	},
	cancel:function() {
		this.updateMessage('');
		this.reset();
		this.hide();
		homePanel.show();
	},
	registerSuccess:function() {
		this.hide();
		this.updateMessage('Registered successfully');
		//showMeetingPanel();
		loginPanel.loadData(thisUser.userId, "noteuser");

	},
	
	initScreen: function(){
		this.reset();
		this.updateMessage('');
	},
	
	goBack: function(){
		this.cancel();
	}
});

		
