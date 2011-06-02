LoginPanel = Ext.extend(Ext.form.FormPanel, 
{
	width: 300,
	loggedIn:false,	
	initComponent : function() {
		this.items = [ {
			xtype : 'fieldset',
			title : 'Login',
			defaults : {
				required : true,
				labelAlign : 'left',
				labelWidth : '60%'
			},
			items : [ {
				xtype : 'textfield',
				name : 'userId',
				placeHolder: 'User ID',
				useClearIcon : true,
				autoCapitalize : false
			}, {
				placeHolder: 'Password',
				xtype : 'passwordfield',
				name : 'password',
				useClearIcon : false
			}, {
				xtype : 'togglefield',
				name : 'rememberMe',
				label : 'Remember Me'
			} ]
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
					loginPanel.loadModel(this.user);
				}
			}, {
				xtype : 'spacer'
			}, {
				text : 'Login',
				ui : 'confirm',
				scope: this,
				handler : this.login
			}, {
				text : 'Cancel',
				ui : 'decline',
				scope: this,
				handler : this.cancel
			} ]
		} ];
	
		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			standardSubmit : false,
			title : 'Login',
			autoRender: true,
		    floating: true,
		    modal: true,
		    centered: true,
		    hideOnMaskTap: false
		});

		LoginPanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('Login'+'<div class="msg"><p >'+msg+'</p></div>');
	},
	login : function() {
		if(this.validate()){
			var formValues = this.getValues();
			console.log(formValues);
			UserService.checkLogin(formValues.userId, formValues.password, this.onCheckLogin, this);
		}
	},
	
	onMeetingDataLoad: function(data){
		if (data.success) {
			console.log('Loading meeting data');
			meetingStore.removeAll();
			meetingStore.loadData(data.returnVal.rows);
		} else {
			console.log('Unable to load the meetings ');
		}
	},

	onClubMemberLoad: function(data){
		if (data.success) {
			console.log('Loading meeting data');
			memberStore.loadWithDefault(data.returnVal.rows);
		} else {
			console.log('Unable to load the meetings ');
		}
	},

	onCheckLogin:function(data){
		console.log('Came to the callback and its :'+data);
		if (data.success) {
			this.loggedIn = true;
			thisUser = data.returnVal;
			this.hide();
			homePanel.hide();
			navPanel.show();
			
			//Loading all the datastores
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingDataLoad, this);
			
			//Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
			
			//memberStore.reload(thisUser.defaultClubId);
			roleStore.reload();
		} else {
			this.updateMessage(data.errorMessage);
		}    	
	},
	validate: function(){
		var formValues = this.getValues();
		
		if(!formValues.userId || formValues.length<5){
			this.updateMessage('Enter a valid user ID');
			return false;
		}
		
		if(!formValues.password || formValues.password<5){
			this.updateMessage('Enter a valid password');
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
	logSuccess:function() {
		this.loggedIn = true;
		this.hide();
		navPanel.show();
	}
});

		
