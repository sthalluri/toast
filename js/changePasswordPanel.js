ChangePasswordPanel = Ext.extend(Ext.form.FormPanel,
{
	initComponent: function()
	{
		this.saveButton = new Ext.Button({
			text:'Save',
            ui: 'confirm',
			scope:this,
			handler:this.savePassword
		});
		
		this.cancelButton = new Ext.Button({
			text:'Cancel',
			ui:'drastic',
			scope:this,
			handler:this.hideChangePasswordPanel
		});
		
		this.backButton = new Ext.Button({
			text:'Back',
			ui:'back',
			scope:this,
			handler:this.hideChangePasswordPanel
		});
		
		this.items = [
		{
			xtype: 'fieldset',
			title: 'Change Password for user id:',
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
				label: 'Old Password',
				autoCapitalize: false
			},
			{
				id: 'newPassword',
				xtype: 'passwordfield',
				name: 'newPassword',
				label: 'New Password',
				autoCapitalize: false
			},
			{
				id: 'reNewPassword',
				xtype: 'passwordfield',
				name: 'reNewPassword',
				label: 'Re-enter New Password',
				autoCapitalize: false
			}
			]
		}
		];
		this.dockedItems = [
		{
			xtype: 'toolbar',
			dock: 'top',
			title: 'Change Password',
			items: [
			        this.backButton,
			        {
			        	xtype: 'spacer'
			        }
			]
		},
		{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [
			        {
			        	xtype: 'spacer'
			        },
			        this.saveButton,
			        this.cancelButton,
			]
		}];
		
		ChangePasswordPanel.superclass.initComponent.call(this);
	},	
	
	savePassword : function()
	{
		var formValues = this.getValues();
		if(this.validate())
		{
			UserService.savePassword(formValues.newPassword, this.onSavePassword, this);
		}
	},
	
	onSavePassword : function()
	{
		this.reset();
		this.updateMessage("Password changed successfully");
	},
	
	validate : function()
	{
		var formValues = this.getValues();
		if(!formValues.oldPassword || !formValues.newPassword || !formValues.reNewPassword)
		{
			this.updateMessage("Enter all the fields.");
			return false;
		}
		if(formValues.oldPassword != thisUser.password)
		{
			this.updateMessage("Old password didn't match the stored password. Enter correct password.");
			return false;
		}
		if(formValues.newPassword != formValues.reNewPassword)
		{
			this.updateMessage("Values of New password and Re-enter new password don't match. Please enter again.");
			return false;
		}
		
		return true;
	},
	
	updateMessage : function(msg)
	{
		this.items.get(0).titleEl.setHTML(this.title + '<div class="msg"><p>' + msg + '</p></div>');
	},
	
	hideChangePasswordPanel : function()
	{
		this.hide();
		clubMemberAddPanel.show();
	}
});