ClubMemberAddPanel = Ext.extend(BaseFormPanel,
{
    title: 'Club Member',
	initComponent : function()
	{

		this.deleteButton = new Ext.Button({
			text:'Delete',
			ui:'drastic',
			scope:this,
			width:'90%',
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
			text:'Done',
            ui: 'confirm',
			scope:this,
			handler:this.saveClubMember
		});
		
		this.backButton = new Ext.Button({
			text:'Cancel',
			ui:'back',
			scope:this,
			handler:this.goBack
		});
		
		this.changePasswordButton = new Ext.Button({
			text:'Change Password',
			ui:'drastic',
			scope:this,
			width:'90%',
			handler:this.showChangePasswordPanel
		});

		this.formFields = new Ext.form.FieldSet({
		    xtype:'fieldset',
            defaults: {
                labelAlign: 'left',
                labelWidth: '35%'
            },
		    items:[
		    {
		    	xtype:'hiddenfield',
		    	name:'id'
		    },
		    {
		    	xtype:'textfield',
		    	name:'fname',
		    	label:'First Name',
		    	placeHolder:'First Name',
		    	useClearIcon:true,
		    	autoCapitalize:false,
				listeners : {
					change : this.capitalize
				}
		    },
		    {
		    	xtype:'textfield',
		    	name:'lname',
		    	label:'Last Name',
		    	placeHolder:'Last Name',
		    	useClearIcon:true,
		    	autoCapitalize:false,
				listeners : {
					change : this.capitalize
				}
		    },
		    {
		    	xtype:'textfield',
		    	name:'email',
		    	label:'Email',
		    	placeHolder:'abc@abc.com',
		    	useClearIcon:true,
		    	autoCapitalize:false
		    },
		    {
		    	xtype:'textfield',
		    	name:'phone',
		    	label:'Phone',
		    	placeHolder:'XXXXXXXXXX',
		    	userClearIcon:true
		    },
		    {
		    	xtype:'textareafield',
		    	name:'aboutme',
		    	label:'About',
		    }
		    ]
		});
		
		this.items = [this.getMessageComp(),this.formFields,
		              {
							layout:'vbox',
							flex:1,
				       	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
							items:[this.changePasswordButton,this.deleteButton]
						}
		];
		
		this.dockedItems = [
		{
			xtype:'toolbar',
			dock:'top',
			title:'Member',
			items:[
			       this.backButton,
			       {
			    	   xtype:'spacer'
			       },
			       this.saveButton
			]
		}];
		
		this.changePasswordButton.hide();
		
		ClubMemberAddPanel.superclass.initComponent.call(this);
	},

	capitalize: function(field, value){
			this.setValue(Ext.util.Format.capitalize(value));
	},
	
	resetForm : function()
	{
		this.reset();
	},

	goBack : function()
	{
    	closePanel();

    	if(this.incomingReq == "list")
		{
	    	//closePanel(this);
			//Loading the club members
			//ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
		}
		else 
			//if(this.incomingReq == "profile")
		{
		}
    	//closePanel();
	},

	saveClubMember : function()
	{
		if(this.validate())
		{
			var formValues = this.getValues();
			if(this.user){
				formValues.userId = this.user.userId;
			}
			if(formValues.id === thisUser.id+''){
				formValues.password = thisUser.password;
				//formValues.accessKey = this.user.accessKey;
			}
			UserService.createClubMember(formValues, this.onOperation, this);
		}
	},
	
	deleteConfirm : function()
	{
		Ext.Msg.confirm("Confirm delete user", "This user won't be accessible anymore.Do you want to continue?<br/><br/>", this.deleteMember, this);
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
			this.updateMessage("Changes saved successfully.");
			
			//Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
		}else{
			this.updateMessage(data.errorMessage);
		}
	},

	editMember : function()
	{
		this.updateMessage('');
		this.enable();
		this.editButton.hide();
		this.saveButton.show();
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
		this.user = user;
		this.setValues({
			id:user.id,
			userId: user.userId,
			fname: user.firstName,
			lname: user.lastName,
			email: user.email,
			phone: user.phone,
			aboutme: user.aboutMe
		});
		
		//this.disable();
		//this.saveButton.hide();
		//this.deleteButton.hide();
		this.editButton.hide();
		if(user.id && user.id != '' && user.id !== thisUser.id){
			this.deleteButton.show();
			this.changePasswordButton.hide();
		}else{
			this.deleteButton.hide();
			this.changePasswordButton.show();
		}
	},
	
	showChangePasswordPanel : function()
	{
		changePasswordPanel.clear();
		showPanel(changePasswordPanel);
//		this.hide();
//		changePasswordPanel.show();
	},
	
	resetFields : function()
	{
		this.reset();
		this.enable();
		this.updateMessage('');
		this.deleteButton.hide();
		this.editButton.hide();
		this.saveButton.show();
		this.changePasswordButton.hide();
	},
	
	onClubMemberLoad: function(data)
	{
		if (data.success) {
			memberStore.loadWithDefault(data.returnVal.rows);
	    	this.goBack();
		} else {
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
		if(formValues.email && !validator.validateEmail(formValues.email))
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
