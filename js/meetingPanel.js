MeetingPanel = Ext.extend(BaseFormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Agenda',

    
	initComponent : function() {

		
		this.meetingDate = new  Ext.form.DatePicker({
			xtype : 'datepickerfield',
			name : 'meetingDate',
			label : 'Date',
			required: 'true',
			minHeight: 200,
			picker : {
				 yearFrom: 2010,
				 yearTo  : 2015
			}		
		}
		);

		this.formFields = [ this.meetingDate,{
            xtype: 'selectfield',
            name: 'time',
            label: 'Time',
            options: timeOptions
        }, {
			xtype : 'textfield',
			name : 'wordOfTheDay',
			id : 'wordOfTheDay',
			label : 'Word(WOTD)',
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
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'grammarian',
			label : 'Grammarian',
			valueField : 'id',
			displayField : 'name',
			fullScreen: true,
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'timer',
			label : 'Timer',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'tableTopics',
			label : 'Table Topics',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'generalEvaluator',
			label : 'Gen Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'speaker1',
			label : 'Speech1',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator1',
			label : 'Speech1 Eval',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'speaker2',
			label : 'Speech2',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator2',
			label : 'Speech2 Eval',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];
	
        this.items= [this.getMessageComp(),{
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
			if(comp.name == 'time'){
				comp.setValue(pMeeting.meetingTime);
			}
		}
		this.meeting = pMeeting;
	},

	onMeetingListDataLoad: function(data){
		if (data.success) {
			meetingStore.loadAndFormat(data.returnVal.rows);
			closePanel(this);
			meetingListPanel.showMeeting(thisMeeting);
			//this.hide();
	    	//meetingListPanel.show();
	    	//meetingListPanel.listMode();
		} else {
			this.updateMessage('Unable to load the data');
		}
	},

	onSave: function(data){
		if (data.success) {
			this.meeting.id = data.returnVal.id;			
			this.updateMessage(data.successMessage);
	        this.scroller.scrollTo(0);
		} else {
			this.updateMessage(data.errorMessage);
		}
		
	},

	
	goBack: function(){
		if(this.meeting && this.meeting.id){
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingListDataLoad, this);
		}else{
			closePanel(this);
		}
	},
	
	save : function(){
		if(!this.meeting){
			this.meeting = getMeetingBareBones();
		}
		var values = this.getValues();
		this.meeting.clubId = thisUser.defaultClubId;
		this.meeting.location = values.location;
		this.meeting.meetingTime = values.time;		
//		if(values.time){
//			var hours =  values.time.substring(0,2);
//			var mins =  parseInt(values.time.substring(3,5));
//			var am =  values.time.substring(6,8);
//			var iHours = 0;
//			
//			if(hours.substring(0,1)=="0"){
//				iHours = parseInt(hours.substring(1,2));
//			}else{
//				iHours = parseInt(hours.substring(1,2));
//			}			
//			if(am != "AM"){
//				iHours += 12;
//			}
//			
//			values.meetingDate.setHours(iHours);
//			values.meetingDate.setMinutes(parseInt(mins));
//		}
		this.meeting.meetingDate = values.meetingDate;
		this.meeting.meetingTime = values.time;
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
        MeetingService.save(this.meeting, this.onSave, this);
	}
});
