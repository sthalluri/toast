ClubMemberAddPanel = Ext.extend(Ext.form.FormPanel,
{
	fullscreen:'true',
	layout: 'vbox',
	
	initComponent : function()
	{
		this.items = [{
		    xtype:'fieldset',
		    title:'Member Details',
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
		    	label:'About Me',
		    }
		    ]
		}];
		
		this.dockedItems = [
		{
			xtype:'toolbar',
			dock:'top',
			items:[
			{
				id:'back',
				text:'Back',
				ui:'back',
				handler:this.hideAddPanel
			},
			{
				xtype:'spacer'
			},
			{
				id:'edit',
				text:'Edit',
				ui:'drastic',
				scope:this,
				handler:this.editMember
			}]
		},
		{
			xtype:'toolbar',
			dock:'bottom',
			align:'center',
			items:[
			{
				xtype:'spacer'
			},
			{
				id:'save',
				text:'Save',
				ui:'action',
				scope:this,
				handler:this.saveClubMember
			},
			{
				id:'cancel',
				text:'Cancel',
				ui:'drastic',
				scope:this,
				handler:this.hideAddPanel
			},
			{
				xtype:'spacer'
			},
			{
				id: 'delete',
				text:'Delete',
				ui:'decline',
				scope:this,
				handler:this.deleteMember
			}]
		}];
		
		ClubMemberAddPanel.superclass.initComponent.call(this);
	},
	
	hideAddPanel : function()
	{
		//Loading the club members
		ClubService.clubMembers(thisUser.defaultClubId, clubMemberAddPanel.onClubMemberLoad, this);
		clubMemberAddPanel.hide();
        clubMemberListPanel.show();
	},
	
	saveClubMember : function()
	{
		var formValues = this.getValues();
		if(this.validate())
		{
			UserService.createClubMember(formValues, this.onOperation, this);
		}
	},
	
	deleteMember : function()
	{
		var id = this.getValues().id;
		UserService.deleteClubMember(id, this.onOperation, this);
	},
	
	onOperation : function(data)
	{
		if(data && data.success)
		{
			//Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, clubMemberAddPanel.onClubMemberLoad, this);
			clubMemberAddPanel.hide();
			clubMemberListPanel.show();
		}
	},

	editMember : function()
	{
		clubMemberAddPanel.enable();
	},
	
	populateUserDetails : function(user)
	{
		clubMemberAddPanel.setValues({
			id:user.id,
			fname: user.firstName,
			lname: user.lastName,
			email: user.email,
			phone: user.phone,
			aboutme: user.aboutMe
		});
		clubMemberAddPanel.disable();
		clubMemberAddPanel.getDockedItems()[1].getComponent('delete').show();
		clubMemberAddPanel.getDockedItems()[0].getComponent('edit').show();
	},
	
	resetFields : function()
	{
		clubMemberAddPanel.reset();
		clubMemberAddPanel.enable();
		clubMemberAddPanel.updateMessage('');
		clubMemberAddPanel.getDockedItems()[1].getComponent('delete').hide();
		clubMemberAddPanel.getDockedItems()[0].getComponent('edit').hide();
	},
	
	onClubMemberLoad: function(data)
	{
		if (data.success) {
			console.log('Loading meeting data');
			memberStore.loadWithDefault(data.returnVal.rows);
		} else {
			console.log('Unable to load the meetings ');
		}
	},
	
	updateMessage: function(msg)
	{
		this.items.get(0).titleEl.setHTML('Member Details'+'<div class="msg"><p >'+msg+'</p></div>');
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
		if(phone.length == 10 && !window.isNaN(phone))
		{
			return true;
		}
		return false;
	}
} );