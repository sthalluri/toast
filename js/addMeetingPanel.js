function initAddMeetingPanel(){
    
    var formBase = {
        scroll: 'vertical',
        url   : 'postUser.php',
        standardSubmit : false,
        title: 'Add Meeting',
        items: [{
                xtype: 'fieldset',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                {
                    xtype: 'datepickerfield',
                    name : 'date',
                    label: 'Date',
                    useClearIcon: true,
                    picker : { yearForm :  1900}
                },
                {
                    xtype: 'textfield',
                    name : 'word',
                    label: 'Word of the Day',
                    useClearIcon: true,
                    autoCapitalize : false
                }, 
                {
				    xtype: 'selectfield',
				    name : 'speechOne',
				    label: 'Speech One',
				    valueField : 'id',
				    displayField : 'name',
				    store : memberStore
				}, {
				    xtype: 'selectfield',
				    name : 'speechTwo',
				    label: 'Speech Two',
				    valueField : 'id',
				    displayField : 'name',
				    store : memberStore
				}, {
				    xtype: 'selectfield',
				    name : 'grammarian',
				    label: 'Grammarian',
				    valueField : 'id',
				    displayField : 'name',
				    store : memberStore
				}, {
				    xtype: 'selectfield',
				    name : 'timer',
				    label: 'Timer',
				    valueField : 'id',
				    displayField : 'name',
				    store : memberStore
				}, {
				    xtype: 'selectfield',
				    name : 'tableTopics',
				    label: 'Table Topics',
				    valueField : 'id',
				    displayField : 'name',
				    store : memberStore
				}]
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
                title:'Edit Meeting',
                items: [
                    {
                        text: 'Back',
                        ui: 'round',
                        handler: function() {
                        	addMeetingPanel.hide();
                        	meetingPanel.show();
                        }
                    },
                    {xtype: 'spacer'},
                    {
                        text: 'Save',
                        ui: 'confirm',
                        handler: function() {
                        	addMeetingPanel.hide();
                        	meetingPanel.show();
                        }
                    },
                    {
                        text: 'Reset',
                        handler: function() {
                        	addMeetingPanel.reset();
                        }
                    }
                ]
            }
        ]
    };
    
    
    addMeetingPanel = new Ext.form.FormPanel(formBase);
    //form.show();	
}