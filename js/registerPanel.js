RegisterPanel = Ext.extend(Ext.form.FormPanel, 
{
	loggedIn:false,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'fieldset',
			title : 'Register',
			instructions : '<b>Please enter the information above.</b>',
			defaults : {
				required : true,
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ {
				xtype : 'textfield',
				name : 'email',
				label : 'Email ID',
				placeHolder: 'Email ID',
				useClearIcon : true,
				autoCapitalize : false
			},{
				xtype : 'passwordfield',
				name : 'password',
				label : 'Password',
				placeHolder: 'Password',
				useClearIcon : false
			},{
				xtype : 'passwordfield',
				name : 'confirmPassword',
				placeHolder: 'Password',
				label : 'Confirm',
				useClearIcon : false
			},
			/*
			{
				xtype : 'textfield',
				name : 'clubId',
				label : 'Club ID',
				placeHolder: 'Club ID',
				useClearIcon : true,
				autoCapitalize : false,
				required:false
			},{
				xtype : 'textfield',
				name : 'clubPasscode',
				label : 'Passcode',
				placeHolder: 'Club Passcode',
				useClearIcon : false,
				required:false
			},
			*/
			{
				xtype : 'textfield',
				name : 'firstName',
				label : 'First Name',
				placeHolder: 'First Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:false
			},{
				xtype : 'textfield',
				name : 'lastName',
				label : 'Last Name',
				placeHolder: 'Last Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:false
			}]
		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [ {
				text : 'Guest',
				ui : 'round',
				scope: this,
				handler : function() {
					this.user = Ext.ModelMgr.create( mockUser, 'User');
					registerPanel.loadModel(this.user);
				}
			}, {
				xtype : 'spacer'
			}, {
				text : 'Register',
				ui : 'confirm',
				scope: this,
                width:80,
				handler : this.register
			}, {
				text : 'Cancel',
                width:80,
				scope: this,
				handler : this.cancel
			} ]
		} ];
	
		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			url : 'mockResponse/loginSuccess.jsp',
			standardSubmit : false,
			title : 'Register',
			autoRender: true,
		    floating: true,
		    modal: true,
		    centered: true,
		    hideOnMaskTap: false,
		    height: 385
		});
		
		RegisterPanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		if(this.items.get(0).titleEl){
			this.items.get(0).titleEl.setHTML('Register'+'<div class="msg"><p >'+msg+'</p></div>');
		}
	},
	onRegister:function(data){
    	if(data.success){
    		this.registerSuccess();
    		thisUser = data.returnVal;
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
		
		if(!formValues.email || !validator.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}

		if(!formValues.password || formValues.password<5){
			this.updateMessage('Enter a valid password');
			return false;
		}

		if(!formValues.confirmPassword || 
				formValues.confirmPassword<5 || formValues.confirmPassword != formValues.password){
			this.updateMessage('Confirm your password');
			return false;
		}

		return true;
	},
	cancel:function() {
		this.updateMessage('');
		this.reset();
		this.hide();
		homePanel.show();
	},
	registerSuccess:function() {
		console.log('Came to the resgister success');
		this.hide();
		showMeetingPanel();
	},
	
	initScreen: function(){
		this.reset();
		this.updateMessage('');
		this.show();
	}
});

		
