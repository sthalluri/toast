ClubMemberAddPanel = Ext.extend(Ext.form.FormPanel,
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

		this.items = [{
		    xtype:'fieldset',
		    title:'&nbsp;',
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
		    }
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
		//Loading the club members
		ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
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
			//Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
			this.hide();
			clubMemberListPanel.show();
		}
	},

	editMember : function()
	{
		this.updateMessage('');
		this.enable();
		this.editButton.hide();
		this.saveButton.show();
		this.cancelButton.show();
		this.deleteButton.show();
	},
	
	populateUserDetails : function(user)
	{
		this.updateMessage('');
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
			console.log('Loading meeting data');
			memberStore.loadWithDefault(data.returnVal.rows);
	    	closePanel(this);
		} else {
			console.log('Unable to load the meetings ');
		}
	},
	
	updateMessage: function(msg)
	{
		this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
	},
	
	validate : function()
	{
		var formValues = this.getValues();
		if(!formValues.fname || !formValues.lname)
		{
			this.updateMessage("Fields can't be left empty.");
			return false;
		}
		if(!formValues.email || !this.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}
		if(formValues.phone)
		{
			if(!this.validatePhone(formValues.phone))
			{
				this.updateMessage('Enter a valid phone number');
				return false;
			}
		}
		return true;
	},
	
	validateEmail : function(email)
	{
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
		return emailPattern.test(email);
	},
	
	validatePhone : function(phone)
	{
		//phone.length == 10 && 
		if(!window.isNaN(phone))
		{
			return true;
		}
		return false;
	}
} );