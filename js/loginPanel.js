LoginPanel = Ext.extend(BaseFormPanel, {
	initComponent : function() {
		this.items = [ this.getMessageComp(),{
			xtype : 'fieldset',
			defaults : {
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ {
				xtype : 'textfield',
				name : 'userId',
				placeHolder : 'Email ID',
				useClearIcon : true,
				autoCapitalize : false,
				required:true
			}, {
				placeHolder : 'Password',
				xtype : 'passwordfield',
				name : 'password',
				useClearIcon : false,
				required:true
			}, {
				xtype : 'checkboxfield',
				name : 'rememberMe',
				label : 'Remember Me',
				value: 1
			},
			{
				layout:'hbox',
				flex:1,
           	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
				items:[
					{
						text : 'Login',
						ui : 'confirm',
						scope : this,
						width : 80,
						handler : this.login
					}, {
						text : 'Cancel',
						scope : this,
						width : 80,
						handler : this.cancel
					} 				       
				]

			}
			]
		} ];

		this.guestButton = new Ext.Button({
				text : 'Guest',
				ui : 'round',
				scope : this,
				handler : function() {
					this.user = Ext.ModelMgr.create(mockUser, 'User');
					loginPanel.loadModel(this.user);
				}
			});
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			title:'Login',
			dock : 'top',
			items : [ this.guestButton, {
				xtype : 'spacer'
			} ]
		} ];

		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			standardSubmit : false,
		});

		if(!showGuestButton){
			this.guestButton.hide();
		}
		LoginPanel.superclass.initComponent.call(this);
	},
	login : function() {
		if (this.validate()) {
			var formValues = this.getValues();
			if (formValues.rememberMe > 0) {
				db.setValue(db.USERID, formValues.userId);
				db.setValue(db.PASSWD, hex_md5(formValues.password));
				db.setValue(db.REMEMBER_ME, 1);
			} else {
				db.resetLoginData();
			}
			this.loadData(formValues.userId, hex_md5(formValues.password));
		}
	},
	
	loginWithUser: function(userId, passwd, rMe){
		this.setValues({userId: userId, password: passwd, rememberMe:rMe});
		this.login();
	},
	
	loadData : function(userId, password) {
		UserService.checkLogin(userId, password, this.onCheckLogin, this);
	},

	onMeetingDataLoad : function(data) {
		if (data.success) {
			meetingStore.loadAndFormat(data.returnVal.rows);
		} else {
			this.updateMessage('Unable to load the data');
		}
	},

	onClubMemberLoad : function(data) {
		if (data.success) {
			if (data.returnVal.clubSettings && data.returnVal.clubSettings.fillers) {
				fillers = data.returnVal.clubSettings.fillers;
			}
			// gramPanel.loadItems();
			memberStore.loadWithDefault(data.returnVal.rows);
		} else {
			this.updateMessage('Unable to load the data');
		}
	},

	onCheckLogin : function(data) {
		if (data.success) {
			this.loggedIn = true;
			thisUser = data.returnVal;
			this.hide();
			showNavPanel();
			
			if(data.successMessage){
			    Ext.Msg.alert('Notice', data.successMessage+'<br/><br/>', this.emptyFn);
				//alert(data.successMessage);
			}
			
			loadMask.show();
			// Loading all the datastores
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingDataLoad, this);

			loadMask.show();
			// Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);

			// memberStore.reload(thisUser.defaultClubId);
			roleStore.reload();
			
			homePanel.showButtons();
		} else {
			showPanel(this);
			this.updateMessage(data.errorMessage);
		}
	},

	emptyFn: function(){
		
	},
	
	validate : function() {
		var formValues = this.getValues();

		if (!formValues.userId || formValues.length < 5) {
			this.updateMessage('Enter a valid Email ID');
			return false;
		}

		if (!formValues.password || formValues.password < 5) {
			this.updateMessage('Enter a valid password');
			return false;
		}
		return true;
	},

	goBack: function(){
		this.cancel();
	},
	
	cancel : function() {
		this.updateMessage('');
		this.reset();
		this.hide();
		showPanel(homePanel);
	},

	logSuccess : function() {
		this.loggedIn = true;
		this.hide();
		navPanel.show();
	},

	initScreen : function() {
		loginPanel.show();
		loginPanel.updateMessage('');
		loginPanel.reset();
	}
});
