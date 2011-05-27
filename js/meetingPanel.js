MeetingPanel = Ext.extend(Ext.form.FormPanel, 
{	
    scroll: 'vertical',
    url   : 'postUser.php',
    standardSubmit : false,
    title: 'Add Meeting',
	controller: null,
	meetingStore : null,
	meeting:null,

	initComponent : function() {

		this.formFields = [
	          {
	              xtype: 'datepickerfield',
	              name : 'meetingDate',
	              label: 'Date',
	              useClearIcon: true,
	              picker : { yearForm :  1900}
	          },
	          {
	              xtype: 'textfield',
	              name : 'wordOfTheDay',
	              id: 'wordOfTheDay',
	              label: 'Word of the Day',
	              useClearIcon: true,
	              autoCapitalize : false
	          }, 
	          {
	              xtype: 'textfield',
	              name : 'themeOfTheDay',
	              label: 'Theme of the Day',
	              useClearIcon: true,
	              autoCapitalize : false
	          }, 
	          {
			    xtype: 'selectfield',
			    name : 'speaker1',
			    label: 'Speech One',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberStore
			}, {
			    xtype: 'selectfield',
			    name : 'speaker2',
			    label: 'Speech Two',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberStore
			},  {
			    xtype: 'selectfield',
			    name : 'tableTopics',
			    label: 'Table Topics',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberStore
			},{
			    xtype: 'selectfield',
			    name : 'generalEvaluator',
			    label: 'Gen Evaluator',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberStore
			},{
			    xtype: 'selectfield',
			    name : 'evaluator1',
			    label: 'Speech1 Evaluator',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberStore
			},{
			    xtype: 'selectfield',
			    name : 'evaluator2',
			    label: 'Speech1 Evaluator',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberStore
			},{
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
			}];
	
        this.items= [{
                xtype: 'fieldset',
    			title : 'Meeting',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.formFields
            }
        ];
        
        this.listeners = {
			submit : function(loginForm, result) {
				console.log('success', Ext.toArray(arguments));
			},
			exception : function(loginForm, result) {
				console.log('failure', Ext.toArray(arguments));
			}
		};
    
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Edit Meeting',
                items: [
                    {
                        text: 'Back',
                        ui: 'round',
                        scope:this,
                        handler: function() {
                        	this.hide();
                        	meetingListPanel.show();
                        }
                    },
                    {xtype: 'spacer'},
                    {
                        text: 'Save',
                        ui: 'confirm',
                        scope:this,
                        handler: this.save
                    },
                    {
                        text: 'Reset',
                        handler: function() {
                        	addMeetingPanel.reset();
                        }
                    }
                ]
            }
        ];
    
 	   MeetingListPanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
	},
	loadMeeting: function(pMeeting){
		
		this.reset();
		for(var i=0; i< this.fields.items.length ; i++){
			var comp = this.fields.items[i];
			if(comp.name == 'wordOfTheDay'){
				comp.setValue(pMeeting.wordOfTheDay);
			}
			if(comp.name == 'meetingDate'){
				comp.setValue(pMeeting.meetingDate);
			}
			if(comp.name == 'themeOfTheDay'){
				comp.setValue(pMeeting.themeOfTheDay);
			}
			if(comp.name == 'wordOfTheDay'){
				comp.setValue(pMeeting.wordOfTheDay);
			}
			if(comp.name == 'speaker1'){
				if(pMeeting.roles.speaker1){
					comp.setValue(pMeeting.roles.speaker1.userId);
				}
			}
			if(comp.name == 'speaker2'){
				if(pMeeting.roles.speaker2){
					comp.setValue(pMeeting.roles.speaker2.userId);
				}
			}
			if(comp.name == 'tableTopics'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.tableTopics.userId);
				}
			}
			if(comp.name == 'toastMaster'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.toastMaster.userId);
				}
			}
			if(comp.name == 'generalEvaluator'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.generalEvaluator.userId);
				}
			}
			if(comp.name == 'evaluator1'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.evaluator1.userId);
				}
			}
			if(comp.name == 'evaluator2'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.evaluator2.userId);
				}
			}
			if(comp.name == 'grammarian'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.grammarian.userId);
				}
			}
			if(comp.name == 'timer'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.timer.userId);
				}
			}
		}
		this.meeting = pMeeting;
	},
	
	save : function(){
		if(!this.meeting){
			this.meeting = getMeetingBareBones();
		}
		var values = this.getValues();
		this.meeting.clubId = thisUser.defaultClubId;
		this.meeting.meetingDate = values.meetingDate;
		this.meeting.wordOfTheDay = values.wordOfTheDay;
		this.meeting.themeOfTheDay = values.themeOfTheDay;
		this.meeting.roles.speaker1.userId = values.speaker1;
		this.meeting.roles.speaker2.userId = values.speaker2;
		this.meeting.roles.tableTopics.userId = values.tableTopics;
		this.meeting.roles.toastMaster.userId = values.toastMaster;
		this.meeting.roles.generalEvaluator.userId = values.generalEvaluator;
		this.meeting.roles.evaluator1.userId = values.evaluator1;
		this.meeting.roles.evaluator2.userId = values.evaluator2;
		this.meeting.roles.grammarian.userId = values.grammarian;
		this.meeting.roles.timer.userId = values.timer;
		this.controller.save(this.meeting);
	}
});
