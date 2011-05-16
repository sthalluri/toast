LoginPanel = Ext.extend(Ext.form.FormPanel, 
{
	loggedIn:false,
	
	initComponent : function() {
		this.items = [ {
			xtype : 'fieldset',
			title : 'Login',
			instructions : '<b>Please enter the information above.</b>',
			defaults : {
				required : true,
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ {
				xtype : 'textfield',
				name : 'userId',
				label : 'Name',
				placeHolder: 'User ID',
				useClearIcon : true,
				autoCapitalize : false
			}, {
				xtype : 'passwordfield',
				name : 'password',
				label : 'Password',
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
			url : 'postUser.php',
			standardSubmit : false,
			title : 'Login',
			autoRender: true,
		    floating: true,
		    modal: true,
		    centered: true,
		    hideOnMaskTap: false,
		    height: 385,
		    width: 280
		});
		
		LoginPanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('Login'+'<div class="msg"><p >'+msg+'</p></div>');
	},
	login : function() {
		console.log(this.url);
		if(this.validate()){
			var formValues = this.getValues();
			console.log(formValues);
			loginController.checkLogin(formValues.userId, formValues.password);
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

		
