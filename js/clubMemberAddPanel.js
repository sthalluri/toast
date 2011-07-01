ClubMemberAddPanel = Ext.extend(BaseFormPanel,
{
    title: 'Club Member',
	initComponent : function()
	{

		this.deleteButton = new Ext.Button({
			iconMask:true,
			iconCls:'delete',
			ui:'plain',
			scope:this,
			handler:this.deleteConfirm
		});

		this.editButton = new Ext.Button({
			iconMask: true,
			iconCls: 'compose',
            ui: 'plain',
			scope:this,
			handler:this.editMember
		});
		
		this.saveButton = new Ext.Button({
			text:'Save',
            ui: 'confirm',
			scope:this,
			handler:this.saveClubMember
		});
		
		this.cancelButton = new Ext.Button({
			text:'Cancel',
			ui:'drastic',
			scope:this,
			handler:this.goBack
		});
		
		this.backButton = new Ext.Button({
			text:'Back',
			ui:'back',
			scope:this,
			handler:this.goBack
		});
		
		this.changePasswordButton = new Ext.Button({
			text:'Change Password',
			ui:'drastic',
			scope:this,
			handler:this.showChangePasswordPanel
		});

		this.items = [this.getMessageComp(),{
		    xtype:'fieldset',
            defaults: {
                labelAlign: 'left',
                labelWidth: '35%'
            },
		    items:[
		    {
		    	id:'id',
		    	xtype:'hiddenfield',
		    	name:'id'
		    },
		    {
		    	id:'fname',
		    	xtype:'textfield',
		    	name:'fname',
		    	label:'First Name',
		    	placeHolder:'First Name',
		    	useClearIcon:true,
		    	autoCapitalize:false
		    },
		    {
		    	id:'lname',
		    	xtype:'textfield',
		    	name:'lname',
		    	label:'Last Name',
		    	placeHolder:'Last Name',
		    	useClearIcon:true,
		    	autoCapitalize:false
		    },
		    {
		    	id:'email',
		    	xtype:'textfield',
		    	name:'email',
		    	label:'Email',
		    	placeHolder:'abc@abc.com',
		    	useClearIcon:true,
		    	autoCapitalize:false
		    },
		    {
		    	id:'phone',
		    	xtype:'textfield',
		    	name:'phone',
		    	label:'Phone',
		    	placeHolder:'XXXXXXXXXX',
		    	userClearIcon:true
		    },
		    {
		    	id:'aboutme',
		    	xtype:'textareafield',
		    	name:'aboutme',
		    	label:'About',
		    },
		    this.changePasswordButton
		    ]
		}
		];
		
		this.dockedItems = [
		{
			xtype:'toolbar',
			dock:'top',
			title:'Member Info',
			items:[
			       this.backButton,
			       {
			    	   xtype:'spacer'
			       },
			       this.deleteButton,
			       this.editButton
			]
		},
		{
			xtype:'toolbar',
			dock:'bottom',
			items:[
			       {
			    	   xtype:'spacer'
			       },
			       this.saveButton,
			       this.cancelButton
			]
		}];
		
		
		ClubMemberAddPanel.superclass.initComponent.call(this);
	},
	
	goBack : function()
	{
		if(this.incomingReq == "list")
		{
			//Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
		}
		else if(this.incomingReq == "profile")
		{
			this.hide();
			navPanel.show();
		}
	},
	
	saveClubMember : function()
	{
		var formValues = this.getValues();
		if(this.validate())
		{
			UserService.createClubMember(formValues, this.onOperation, this);
		}
	},
	
	deleteConfirm : function()
	{
		Ext.Msg.confirm("Confirm delete user", "Deleting this user will delete all it's history too. Do you want to continue?", this.deleteMember, this);
	},
	
	deleteMember : function(opt)
	{
		var id = this.getValues().id;
		if(opt == "yes")
		{
			UserService.deleteClubMember(id, this.onOperation, this);
		}
	},
	
	onOperation : function(data)
	{
		if(data && data.success)
		{
			if(this.incomingReq == "list")
			{
				//Loading the club members
				ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
				this.hide();
				clubMemberListPanel.show();
			}
			else if(this.incomingReq == "profile")
			{
				this.disable();
				this.editButton.show();
				this.saveButton.hide();
				this.cancelButton.hide();
				this.updateMessage("Changes saved successfully.");
			}
		}
	},

	editMember : function()
	{
		this.updateMessage('');
		this.enable();
		this.editButton.hide();
		this.saveButton.show();
		this.cancelButton.show();
		if( this.incomingReq == "list" )
		{
			this.deleteButton.show();
			this.changePasswordButton.hide();
		}
		else if( this.incomingReq == "profile" )
		{
			this.changePasswordButton.show();
		}
	},
	
	populateUserDetails : function(user, incomingReq)
	{
		this.updateMessage('');
		this.incomingReq = incomingReq;
		this.setValues({
			id:user.id,
			fname: user.firstName,
			lname: user.lastName,
			email: user.email,
			phone: user.phone,
			aboutme: user.aboutMe
		});
		this.disable();
		this.saveButton.hide();
		this.cancelButton.hide();
		this.deleteButton.hide();
		this.editButton.show();
		if( incomingReq == "list" )
		{
			this.changePasswordButton.hide();
		}
		else if( incomingReq == "profile" )
		{
			this.changePasswordButton.show();
		}
	},
	
	showChangePasswordPanel : function()
	{
		this.hide();
		changePasswordPanel.show();
	},
	
	resetFields : function()
	{
		this.reset();
		this.enable();
		this.updateMessage('');
		this.deleteButton.hide();
		this.editButton.hide();
		this.saveButton.show();
		this.cancelButton.show();
	},
	
	onClubMemberLoad: function(data)
	{
		if (data.success) {
			memberStore.loadWithDefault(data.returnVal.rows);
	    	closePanel(this);
	    	this.updateMessage("Unable to load the members.");
		} else {
			//console.log('Unable to load the meetings ');
			this.updateMessage("Unable to load the members.");
		}
	},
	
	validate : function()
	{
		var formValues = this.getValues();
		if(!formValues.fname || !formValues.lname)
		{
			this.updateMessage("Enter valid First and Last name.");
			return false;
		}
		if(!formValues.email || !validator.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}
		if(formValues.phone)
		{
			if(!validator.validatePhone(formValues.phone))
			{
				this.updateMessage('Enter a valid phone number');
				return false;
			}
		}
		return true;
	},
	
} );
