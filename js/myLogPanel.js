MyLogPanel = Ext.extend(Ext.Panel, 
{	
	iconCls:'time',
    title:'MyLog',
    fullScreen:false,
	ui:'light',
	initComponent : function() {
		
		this.init = false;
		
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
			html : '<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hr<br>hrxxx',
			title : 'Grammarian',
			scroll : 'vertical'
		});
		
		this.timerLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Timer',
			scroll : 'vertical'
		});

		this.meetingLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Roles',
			scroll : 'vertical'
		});

		this.meetingDetailTabPanel = new Ext.TabPanel({
			scroll: 'vertical',
			fullscreen : false,
			defaults:{
				flex : 1
			},
		    layout : {
		    	type: 'vbox',
		        align: 'left'
			},
			ui:'light',
			items : [this.gramLogPanel, this.timerLogPanel, this.meetingLogPanel]

		});
		
	    this.meetingCarousel = new Ext.Panel({
	    	activeItem:0,
	    	height:'100%',	
        	layout: 'card',
		    fullscreen: false,
	    	items:[
	           	this.meetingDetailTabPanel
	    	]
	    });
	
	   this.items=[
	        	this.meetingCarousel
	   ];
	   
		this.dockedItems = [ {
			xtype : 'toolbar',
			title : 'My Reports',
			dock : 'top',
            items: [
                    {
                        text: 'Home',
		                ui: 'back',
		                scope:this,
                        handler: this.goBack
                    }
                ]
		} ];
        this.on('activate', function(){
            this.reload();
        }, this);

		MyLogPanel.superclass.initComponent.call(this);
	},
	
	reload: function(){
		
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
			meetingLog.fMeetingDate = meeting.fMeetingDate;
			var gramLog = new Object();
			var breakLength = 0;
			
			for ( var userId in meeting.gramLog) {
				if(userId == thisUser.id){
					var amCount = meeting.gramLog[userId];
					gramLog.amCountStr = 'None';
					gramLog.fMeetingDate = meeting.fMeetingDate;
					for ( var p in amCount) {
						if (amCount[p] > 0) {
							if (gramLog.amCountStr == 'None') {
								gramLog.amCountStr = p+':&nbsp;'+amCount[p];
							} else {
								gramLog.amCountStr += ',&nbsp;'+p+ ':' + amCount[p];
							}
							if(breakLength > 30){
								gramLog.amCountStr += '<br/>';
								breakLength = 0;
							}else{
								breakLength += ( ',&nbsp;' + p+ ':' + amCount[p]).length;
							}							
						}
					}
					gramLogs.push(gramLog);
				}
			}
			
			for(var j=1; j<roles.length; j++){
				var role = meetingRoles[roles[j]];
				if(role && role.timeSpent 
						&& role.userId == thisUser.id){ 
					var timerLog = new Object();
					timerLog.timeSpent = role.timeSpent;
					if(role.timeLimits){
						timerLog.timeLimits = role.timeLimits;
					}else{
						timerLog.timeLimits = new Object();
						timerLog.timeLimits.red = 0;
						timerLog.timeLimits.yellow = 0;
						timerLog.timeLimits.green = 0;
					}
					timerLog.role = roleStore.getRole(roles[j]).description;
					timerLogs.push(timerLog);
					timerLog.fMeetingDate = meeting.fMeetingDate;
					timerLog.colorCode = meetingListPanel.getColorCode(role.timeSpent, role.timeLimits);
				}
				if(role && role.userId == thisUser.id){ 
					if(meetingLog.rolesStr == 'None'){
						meetingLog.rolesStr = roleStore.getRole(roles[j]).description;
					}else{
						meetingLog.rolesStr += ',<br/>'+roleStore.getRole(roles[j]).description;
					}
				}
			}
			meetingLogs.push(meetingLog);
		}
		
		var wrapper = new Object();
		wrapper.gramLogs = gramLogs;
		wrapper.name = 'Grammarian Report';
		
		var html = this.gramLogTmpl.apply(wrapper);
		var htmlEl = this.gramLogPanel.el;
		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    		this.gramLogPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
		}else{
    		this.gramLogPanel.html = html;
		}

		wrapper.name = 'Timer Report';
		wrapper.timerLogs = timerLogs;
		html = this.timerLogTmpl.apply(wrapper);
		
		htmlEl = this.timerLogPanel.el;
		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    		this.timerLogPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
		}else{
    		this.timerLogPanel.html = html;
		}

		wrapper.name = 'Meeting List';
		wrapper.meetingLogs = meetingLogs;
		html = this.meetingLogTmpl.apply(wrapper);

		htmlEl = this.meetingLogPanel.el;
		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    		this.meetingLogPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
		}else{
    		this.meetingLogPanel.html = html;
		}

//		if(!this.gramLogPanel.el){
//		this.gramLogPanel.html = html;
//	}else{
//		this.gramLogPanel.el.dom.innerHTML = html;
//	}
//

//		if(!this.timerLogPanel.el){
//		this.timerLogPanel.html = html;
//	}else{
//		this.timerLogPanel.el.dom.innerHTML = html;
//	}
//

//		if(!this.meetingLogPanel.el){
//			this.meetingLogPanel.html = html;
//		}else{
//			this.meetingLogPanel.el.dom.innerHTML = html;
//		}
	},
    goBack:function() {
		closePanel();
	}
});
