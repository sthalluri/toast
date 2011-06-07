MyLogPanel = Ext.extend(Ext.TabPanel, {
	cls: 'legislator-tabs',
	fullscreen : false,
	initComponent : function() {
		
		// Meeting Detail Template
		this.gramLogTmpl = Ext.XTemplate.from('gram-log');
		this.gramLogTmpl.compile();

		// Meeting List Template
		this.timerLogTmpl = Ext.XTemplate.from('timer-log');
		this.timerLogTmpl.compile();

		// Meeting Report Template
		this.meetingLogTmpl = Ext.XTemplate.from('meeting-log');
		this.meetingLogTmpl.compile();

		this.gramLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Gram Log',
			scroll : 'vertical'
		});
		
		this.timerLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Timer Log',
			scroll : 'vertical'
		});

		this.meetingLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Meeting Log',
			scroll : 'vertical'
		});

		this.items = [ this.gramLogPanel, this.timerLogPanel, this.meetingLogPanel];

		this.dockedItems = [ {
			xtype : 'toolbar',
			title : 'My Log',
			dock : 'top',
			defaults : {
				iconMask : true,
				ui : 'plain'
			},
			layout : {
				pack : 'center'
			},
			items : [ {
				text : 'Back',
				ui : 'back',
				scope : this,
				handler: this.onBack
			}, {
				xtype : 'spacer'
			} ]
		} ];
		MyLogPanel.superclass.initComponent.call(this);
	},
	
	reload: function(){
		var gramLogs = new Array();
		var timerLogs = new Array();
		var meetingList  = new Array();
		
		var roles = new Array();
		
		for(var j=0; j<roleStore.data.length; j++){
			var role = roleStore.data.getAt(j).data;
			roles[j] = role.id;
		}
		
		for(var i=0; i<meetingStore.data.length; i++){
			var meeting = meetingStore.getAt(i).data;
			meetingList[meetingList.length] = meeting;
			var meetingRoles = meeting.roles;
			for(var j=1; j<roles.length; j++){
				var role = meetingRoles[roles[j]];
				if(role && role.amCount && role.userId == thisUser.id){ 
					var gramLog = new Object();
					gramLog.amCount = objectToString(role.amCount);
					gramLog.role = roles[j];
					gramLogs[gramLogs.length] = gramLog;
				}
				if(role && role.timeSpent 
						&& role.userId == thisUser.id){ 
					var timerLog = new Object();
					timerLog.timeSpent = role.timeSpent;
					timerLog.role = roles[j];
					timerLogs[timerLogs.length] = timerLog;
				}
			}
		}
		
		var wrapper = new Object();
		wrapper.gramLogs = gramLogs;
		wrapper.name = 'Grammarian Log';
		
		var html = this.gramLogTmpl.apply(wrapper);
		this.gramLogPanel.html = html;

		wrapper.name = 'Timer Log';
		wrapper.timerLogs = timerLogs;
		html = this.timerLogTmpl.apply(wrapper);
		this.timerLogPanel.html = html;

		wrapper.name = 'Meeting List';
		wrapper.meetingList = meetingList;
		html = this.meetingLogTmpl.apply(wrapper);
		this.meetingLogPanel.html = html;

		console.log(html);
	},
	
	onBack: function(){
		this.hide();
		navPanel.show();
	}
});
