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

		this.deleteButton = new Ext.Button({
	    	scope:this,
			text:'Delete',
			ui:'decline',
	        handler: this.deleteConfirm
	    });
		
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
			autoCapitalize : false,
			listeners : {
				change : this.capitalize
			}
		}, {
			xtype : 'textfield',
			name : 'themeOfTheDay',
			label : 'Theme',
			useClearIcon : true,
			autoCapitalize : false,
			listeners : {
				change : this.capitalize
			}
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
		}];
		
		this.speech1Fields = [{
			xtype : 'selectfield',
			name : 'speaker1',
			label : 'Speaker',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator1',
			label : 'Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];
		
		this.speech2Fields = [{
			xtype : 'selectfield',
			name : 'speaker2',
			label : 'Speaker',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator2',
			label : 'Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];

		this.speech3Fields = [{
			xtype : 'selectfield',
			name : 'speaker3',
			label : 'Speaker',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator3',
			label : 'Evaluator',
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
            },
            {
                xtype: 'fieldset',
    			title : 'Speech One',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.speech1Fields
            },
            {
                xtype: 'fieldset',
    			title : 'Speech Two',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.speech2Fields
            },
            {
                xtype: 'fieldset',
    			title : 'Speech Three',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.speech3Fields
            },
            this.deleteButton
        ];
        
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Agenda',
                items: [
                    {
                        text: 'Cancel',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    },{
						xtype : 'spacer'
					},
                    {
                        text: 'Done',
                        ui: 'confirm',
                        scope:this,
                        handler: this.save
                    }
                ]
            }
        ];
    
 	   MeetingListPanel.superclass.initComponent.call(this);	
	},
	
	capitalize: function(field, value){
		this.setValue(Ext.util.Format.capitalize(value));
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
			if(comp.name == 'speaker3'){
				if(pMeeting.roles.speaker3){
					comp.setValue(pMeeting.roles.speaker3.userId);
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
				if(pMeeting.roles.evaluator1){
				comp.setValue(pMeeting.roles.evaluator1.userId);
				}
			}
			if(comp.name == 'evaluator2'){
				if(pMeeting.roles.evaluator2){
					comp.setValue(pMeeting.roles.evaluator2.userId);
				}
			}
			if(comp.name == 'evaluator3'){
				if(pMeeting.roles.evaluator3){
					comp.setValue(pMeeting.roles.evaluator3.userId);
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
				if(pMeeting.meetingTime && pMeeting.meetingTime !== ''){
					comp.setValue(pMeeting.meetingTime);
				}
			}
		}
		this.meeting = pMeeting;
	},

	onMeetingListDataLoad: function(data){
		if (data.success) {
			meetingStore.loadAndFormat(data.returnVal.rows);
			closePanel(this);
			if(this.meeting){
				var meeting = meetingStore.getMeeting(this.meeting.id);
				meetingListPanel.showMeeting(meeting);
			}else{
		    	meetingListPanel.listMode();
			}
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
			this.goBack();
			//this.updateMessage(data.successMessage);
	        //this.scroller.scrollTo(0);
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
	
	validate: function(){
		var values = this.getValues();
		var meetingDate = values.meetingDate;
		var meetingTime = values.time;
		var noErrors = true;
		
		var fMeetingDate = "";
		if(meetingDate){
			fMeetingDate = meetingDate.format('F j, Y');
			if(meetingTime&& meetingTime !== ''){
				fMeetingDate = meetingDate.format('F j, Y')+' '+meetingTime;
			}
		}

		meetingStore.each(function(rec){
			var data = rec.data;
			if(data.id !== this.meeting.id && data.fMeetingDate === fMeetingDate){
				this.updateMessage('A meeting with this date and time already exists');
				noErrors = false;
				return false;
			}
        }, this); 
		return noErrors;
	},

	save : function(){
		if(!this.validate()){
			return false;
		}
		
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
		this.meeting.wordOfTheDay = values.wordOfTheDay;
		this.meeting.themeOfTheDay = values.themeOfTheDay;
		this.meeting.roles.speaker1.userId = values.speaker1;
		this.meeting.roles.speaker2.userId = values.speaker2;
		this.meeting.roles.speaker3.userId = values.speaker3;
		this.meeting.roles.tableTopics.userId = values.tableTopics;
		this.meeting.roles.toastMaster.userId = values.toastMaster;
		this.meeting.roles.generalEvaluator.userId = values.generalEvaluator;
		this.meeting.roles.evaluator1.userId = values.evaluator1;
		this.meeting.roles.evaluator2.userId = values.evaluator2;
		this.meeting.roles.evaluator3.userId = values.evaluator2;
		this.meeting.roles.grammarian.userId = values.grammarian;
		this.meeting.roles.timer.userId = values.timer;
		
		//this.controller.save(this.meeting);
        MeetingService.save(this.meeting, this.onSave, this);
	},
	
	onDelete:function(data){
		if (data.success) {
			thisMeeting = null;
			this.meeting = null;
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingListDataLoad, this);
			//this.goBack();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	deleteConfirm : function()
	{
		Ext.Msg.confirm("This will delete the meeting", "Do you want to continue?", this.deleteMeeting, this);
	},

	deleteMeeting: function(opt){
		if(opt == "yes")
		{
	        MeetingService.deleteMeeting(this.meeting.id, this.onDelete, this);
		}
	}



});
