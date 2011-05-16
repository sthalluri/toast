function initGramPanel(){
    var formBase = {
        scroll: 'vertical',
        url   : 'postUser.php',
        standardSubmit : false,
        title: 'Gram',
        items: [{
                xtype: 'fieldset',
                title: 'Login',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
				{
				    xtype: 'selectfield',
				    name : 'speech',
				    label: 'Speech',
				    valueField : 'speech',
				    displayField : 'title',
				    store : speechStore
				}, 
				{
					xtype: 'spinnerfield',
	                name : 'ahSpinner',
	                label: 'Ah'
				}, 
				{
					xtype: 'spinnerfield',
	                name : 'ammSpinner',
	                label: 'Amm'
				}, 
				{
					xtype: 'spinnerfield',
	                name : 'likeSpinner',
	                label: 'Like'
				}, 
				{
					xtype: 'spinnerfield',
	                name : 'soSpinner',
	                label: 'So'
				}, {
		            layout: 'hbox',
		            defaults: {xtype: 'button',  style: 'margin: .5em;'},
		            items: [{
		                text: 'Save',
		                scope: this,
		                ui  : 'confirm',
		                width:100,
		                handler: function(btn){
		                	console.log(this);
		                }
		            }, {
		                text: 'Reset',
		                scope: this,
		                width:100,
		                handler: function(){
		                }
		            }]
		        }
            	]
            }
        ],
        listeners : {
            submit : function(loginForm, result){
                console.log('success', Ext.toArray(arguments));
            },
            exception : function(loginForm, result){
                console.log('failure', Ext.toArray(arguments));
            }
        },
    
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Grammarian',
                items: [
                    {
					    text: 'Back',
					    handler: function() {
					    	gramPanel.hide();
					    	roleListPanel.show();
					    }
					},
					{xtype: 'spacer'},
	                {
	                    text: 'Change Role',
	                    handler: function() {
	                    	gramPanel.hide();
	                    	roleListPanel.show();
	                    }
	                }
                ]
            }
        ]
    };
    
    gramPanel = new Ext.form.FormPanel(formBase);
}