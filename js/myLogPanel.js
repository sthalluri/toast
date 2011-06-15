MyLogPanel = Ext.extend(Ext.TabPanel, {
	iconCls:'bookmarks',
    tabId: 'myLog',
    scroll: 'vertical',
    title:'My Log',
	cls: 'legislator-tabs',
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

		// Meeting Report Template
		this.roleLogTmpl = Ext.XTemplate.from('role-log');
		this.roleLogTmpl.compile();

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
			items : [ 
//			{
//				text : 'Back',
//				ui : 'back',
//				scope : this,
//				handler: this.onBack
//			}, {
//				xtype : 'spacer'
//			} 
			]
		} ];
		MyLogPanel.superclass.initComponent.call(this);
	},
	
	reload: function(){
		console.log('Came to refresh');
		
		var gramLogs = new Array();
		var timerLogs = new Array();
		var meetingLogs = new Array();
		
		var roles = new Array();
		
		for(var j=0; j<roleStore.data.length; j++){
			var role = roleStore.data.getAt(j).data;
			roles[j] = role.id;
		}
		
		for(var i=0; i<meetingStore.data.length; i++){
			var meeting = meetingStore.getAt(i).data;
			var meetingRoles = meeting.roles;
			var meetingLog = new Object();
			meetingLog.roles = new Array();
			meetingLog.themeOfTheDay = meeting.themeOfTheDay;
			meetingLog.wordOfTheDay = meeting.wordOfTheDay;		
			meetingLog.rolesStr = 'None';
			for(var j=1; j<roles.length; j++){
				var role = meetingRoles[roles[j]];
				if(role && role.amCount && role.userId == thisUser.id){ 
					var gramLog = new Object();
					var amCount = role.amCount;
					gramLog.amCount = objectToString(amCount);
					gramLog.amCountStr = 'None';
					for(var p in role.amCount){
						if(amCount[p]>0){
							if(gramLog.amCountStr =='None'){
								gramLog.amCountStr = p+':'+amCount[p];
							}else{
								gramLog.amCountStr += ',&nbsp;'+p+':'+amCount[p];
							}
						}
					}
					gramLog.role = roles[j];
					gramLogs.push(gramLog);
				}
				if(role && role.timeSpent 
						&& role.userId == thisUser.id){ 
					var timerLog = new Object();
					timerLog.timeSpent = role.timeSpent;
					timerLog.role = roles[j];
					timerLogs.push(timerLog);
				}
				if(role && role.userId == thisUser.id){ 
					if(meetingLog.rolesStr == 'None'){
						meetingLog.rolesStr = roleStore.getById(roles[j]).data.description;
					}else{
						meetingLog.rolesStr += ',<br/>'+roleStore.getById(roles[j]).data.description;
					}
				}
			}
			meetingLogs.push(meetingLog);
		}
		
		var wrapper = new Object();
		wrapper.gramLogs = gramLogs;
		wrapper.name = 'Grammarian Log';
		
		var html = this.gramLogTmpl.apply(wrapper);
		if(!this.gramLogPanel.el){
			this.gramLogPanel.html = html;
		}else{
			this.gramLogPanel.el.dom.innerHTML = html;
		}

		wrapper.name = 'Timer Log';
		wrapper.timerLogs = timerLogs;
		html = this.timerLogTmpl.apply(wrapper);
		if(!this.timerLogPanel.el){
			this.timerLogPanel.html = html;
		}else{
			this.timerLogPanel.el.dom.innerHTML = html;
		}

		wrapper.name = 'Meeting List';
		wrapper.meetingLogs = meetingLogs;
		html = this.meetingLogTmpl.apply(wrapper);
		if(!this.meetingLogPanel.el){
			this.meetingLogPanel.html = html;
		}else{
			this.meetingLogPanel.el.dom.innerHTML = html;
		}
		console.log(html);
	},
	
	onBack: function(){
		this.hide();
		navPanel.show();
	}
});
