ClubServiceImpl = Ext.extend(Service, {

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
		loadMask.show();
	    this.onClubMembers = Ext.createDelegate(ClubServiceImpl.prototype.onClubMembers, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/get/'+clubId,
			params : {
				accessKey: thisUser.accessKey
			},
			success: this.onClubMembers,
			failure: this.onAjaxResponse
		});
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
				json : Ext.encode(club),
				accessKey: thisUser.accessKey
			},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});    	
		loadMask.show();
    }
});

