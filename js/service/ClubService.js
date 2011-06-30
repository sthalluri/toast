ClubServiceImpl = Ext.extend(Object, {

	onAjaxResponse: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
		loadMask.hide();
    },
    

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
	    this.onClubMembers = Ext.createDelegate(ClubServiceImpl.prototype.onClubMembers, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/get/'+clubId,
			success: this.onClubMembers
		});
		loadMask.show();
	},

    saveClubSettings: function(clubId, settings, cb, scope){
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
	    var club = {
	    	id: clubId,
	    	clubSettings: settings
	    };
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/saveSettings',
			params : {
				json : Ext.encode(club)
			},
			success: this.onAjaxResponse
		});    	
		loadMask.show();
    }
});

ClubService = new ClubServiceImpl();