MeetingPanel = Ext.extend(Ext.form.FormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Agenda',

    
	initComponent : function() {

		this.formFields = [ {
			xtype : 'datepickerfield',
			name : 'meetingDate',
			label : 'Date',
			required: 'true',
			picker : {
				 yearFrom: 2010,
				 yearTo  : 2015
			}		
		},{
            xtype: 'selectfield',
            name: 'time',
            label: 'Time',
            options: timeOptions
        }, {
			xtype : 'textfield',
			name : 'wordOfTheDay',
			id : 'wordOfTheDay',
			label : 'Word of the Day',
			useClearIcon : true,
			autoCapitalize : false
		}, {
			xtype : 'textfield',
			name : 'themeOfTheDay',
			label : 'Theme',
			useClearIcon : true,
			autoCapitalize : false
		}, {
			xtype : 'textfield',
			name : 'location',
			label : 'Location',
			useClearIcon : true,
			autoCapitalize : false
		}
	];
		
		this.roleFields = [ {
			xtype : 'selectfield',
			name : 'toastMaster',
			label : 'ToastMaster',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'grammarian',
			label : 'Grammarian',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'timer',
			label : 'Timer',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'tableTopics',
			label : 'Table Topics',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'generalEvaluator',
			label : 'Gen Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'speaker1',
			label : 'Speech1',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator1',
			label : 'Speech1 Eval',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'speaker2',
			label : 'Speech2',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator2',
			label : 'Speech2 Eval',
			valueField : 'id',
			displayField : 'name',
			store : memberStore
		}];
	
        this.items= [{
                xtype: 'fieldset',
    			title : 'Meeting Info',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.formFields
            },
            {
                xtype: 'fieldset',
    			title : 'Roles',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.roleFields
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
                title:'Agenda',
                items: [
                    {
                        text: 'Back',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    }
                ]
            },            
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
					{
						xtype : 'spacer'
					},
                    {
                        text: 'Save',
                        ui: 'confirm',
                        scope:this,
                        width:80,
                        handler: this.save
                    },
                    {
                        text: 'Reset',
                        scope: this,
                        width:80,
                        handler: function() {
                        	this.reset();
                        }
                    }
                ]
            }
        ];
    
 	   MeetingListPanel.superclass.initComponent.call(this);	
	},
	updateMessage: function(msg){
		if(this.items.get(0).titleEl){
			this.items.get(0).titleEl.setHTML('Meeting Info<div class="msg"><p >'+msg+'</p></div>');
		}
	},
	loadMeeting: function(pMeeting){
		
		this.reset();
		this.updateMessage('');
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
			if(comp.name == 'location'){
				comp.setValue(pMeeting.location);
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

	onMeetingListDataLoad: function(data){
		if (data.success) {
			console.log('Loading meeting data');
			meetingStore.loadAndFormat(data.returnVal.rows);
	    	
			closePanel(this);
	    	
			meetingListPanel.showMeeting(thisMeeting);
			
			//this.hide();
	    	//meetingListPanel.show();
	    	//meetingListPanel.listMode();
		} else {
			console.log('Unable to load the meetings ');
		}
	},

	onSave: function(data){
		console.log('From the call back');
		if (data.success) {
			this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
		
	},

	
	goBack: function(){
		MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingListDataLoad, this);
	},
	
	save : function(){
		if(!this.meeting){
			this.meeting = getMeetingBareBones();
		}
		var values = this.getValues();
		this.meeting.clubId = thisUser.defaultClubId;
		this.meeting.location = values.location;
		if(values.time){
			var hours =  values.time.substring(0,2);
			var mins =  parseInt(values.time.substring(3,5));
			var am =  values.time.substring(6,8);
			var iHours = 0;
			
			if(hours.substring(0,1)=="0"){
				iHours = parseInt(hours.substring(1,2));
			}else{
				iHours = parseInt(hours.substring(1,2));
			}			
			if(am != "AM"){
				iHours += 12;
			}
			
			values.meetingDate.setHours(iHours);
			values.meetingDate.setMinutes(parseInt(mins));
		}
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
		
		//this.controller.save(this.meeting);
		console.log(this.meeting);
        MeetingService.save(this.meeting, this.onSave, this);
	}
});
