LocalClubServiceImpl = Ext.extend(Service, {

	onClubMembers: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		if (data.success) {
			var members = data.returnVal.members;
			data.returnVal.rows = new Array();
			for(id in members){
				var member = members[id];
				member.name = member.firstName+' '+member.lastName;
				data.returnVal.rows.push(member);
			}
		}cb.call(scope || window, data);
		loadMask.hide();
    },
    
    clubMembers : function(clubId, cb, scope) {	    
		var users = userDAO.getData();
		var clubData = clubDAO.getData();
		
		if(!clubData.clubSettings){
			clubData.clubSettings = new Object({
				"fillers" : [ "ah", "amm", "so", "like", "others" ]
			});
		}
		var returnVal = new Object({
			success:'true',
			returnVal: {
				clubId: 'PERSONAL',
				clubName: 'MyName',
				members: users,
				clubSettings: clubData.clubSettings
			}
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onClubMembers(response, null, cb, scope);
	},

    saveClubSettings: function(clubId, settings, cb, scope){
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
	    var club = new Object({
	    	id: clubId,
	    	clubSettings: settings
	    });
		clubDAO.save(club);
    }
});

