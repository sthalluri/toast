function initTimerPanel(){
    
	var formBase = {
        scroll: 'vertical',
        url   : 'postUser.php',
        standardSubmit : false,
        title: 'Tim',
        items: [{
                xtype: 'fieldset',
                title: 'Log Time',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '30%'
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
                    xtype : 'textareafield',
                    name  : 'timer',
                    value : '    4:45',
                    maxLength : 6,
                    height: 200,
                    maxRows : 1,
                    style : 'font-weight:bold;font-size:74pt;color:#00008b;'
                }]
        },
        {
            xtype: 'fieldset',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '10%'
            },
            items: [        	
				{
					layout:'vbox',
					flex:1,
					items:[
			                new Ext.Button({
			                	ui:'decline',
			                    text: 'Stop',
			                    width:200
			                }),
							{
								html:'<br/>'
							},
			                new Ext.Button({
			                	ui : 'confirm',
			                    text: 'Start',
			                    width:200
			                }),
							{
								html:'<br/>'
							},
			                new Ext.Button({
			                    text: 'Rest',
			                    width:200
			                })
	       
					       ]
				
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
            	title: 'Timer',
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Back',
                        ui: 'round',
                        handler: function() {
                        	timerPanel.hide();
                        	roleListPanel.show();
                        }
                    },
                    {xtype: 'spacer'},
                    {
                        text: 'Change Role',
                        ui: 'confirm',
                        handler: function() {
                        	timerPanel.hide();
                        	roleListPanel.show();
                        }
                    }
                ]
            }
        ]
    };

    
    timerPanel = new Ext.form.FormPanel(formBase);
}