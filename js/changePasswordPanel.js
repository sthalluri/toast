ChangePasswordPanel = Ext.extend(BaseFormPanel,
{
	initComponent: function()
	{
		this.saveButton = new Ext.Button({
			text:'Done',
            ui: 'confirm',
			scope:this,
			handler:this.savePassword
		});
		
		this.backButton = new Ext.Button({
			text:'Cancel',
			ui:'back',
			scope:this,
			handler:this.goBack
		});
		
		this.items = [this.getMessageComp(),
		{
			xtype: 'fieldset',
			title: 'Change Your Password',
			defaults: {
				labelAlign: 'left',
                labelWidth: '35%'
			},
			items: [
			{
				id: 'id',
				xtype: 'hiddenfield',
				name: 'id'
			},
			{
				id: 'oldPassword',
				xtype: 'passwordfield',
				name: 'oldPassword',
				placeHolder: 'Password',
				label: 'Old',
				autoCapitalize: false,
				required:true
			},
			{
				id: 'newPassword',
				xtype: 'passwordfield',
				name: 'newPassword',
				placeHolder: 'Password',
				label: 'New',
				autoCapitalize: false,
				required:true
			},
			{
				id: 'reNewPassword',
				xtype: 'passwordfield',
				placeHolder: 'Password',
				name: 'reNewPassword',
				label: 'Confirm',
				autoCapitalize: false,
				required:true
			}
			]
		}
		];
		this.dockedItems = [
		{
			xtype: 'toolbar',
			dock: 'top',
			title: 'Password',
			items: [
			        this.backButton,
			        {
			        	xtype: 'spacer'
			        },
			        this.saveButton,
			]
		}];
		
		ChangePasswordPanel.superclass.initComponent.call(this);
	},	
	
	savePassword : function()
	{
		var formValues = this.getValues();
		if(this.validate())
		{
			UserService.savePassword(hex_md5(formValues.newPassword), this.onSavePassword, this);
		}
	},
	
	onSavePassword : function(data)
	{
		if (data.success) {
			this.reset();
			if(db.getValue(db.REMEMBER_ME) > 0){
				db.setValue(db.PASSWD, thisUser.password);
	        }
			this.goBack();
			this.updateMessage("Password changed successfully");
		} else {
			this.updateMessage("Unable to save the password");
		}
	},
	
	validate : function()
	{
		var formValues = this.getValues();
		if(!formValues.oldPassword || !formValues.newPassword || !formValues.reNewPassword)
		{
			this.updateMessage("Enter all the fields.");
			return false;
		}
		if(hex_md5(formValues.oldPassword) != thisUser.password)
		{
			this.updateMessage("Old password didn't match the stored password. Enter correct password.");
			return false;
		}
		if(formValues.newPassword != formValues.reNewPassword)
		{
			this.updateMessage("Values of New password and Re-enter new password don't match. Please enter again.");
			return false;
		}
		if(formValues.newPassword.length < 4){
			this.updateMessage("Please make sure new password is atleast 4 character long.");
			return false;
		}
		return true;
	},
	
	clear: function(){
		this.updateMessage('');
	},
	
	goBack : function()
	{
		showPanel(clubMemberAddPanel);
	}
});