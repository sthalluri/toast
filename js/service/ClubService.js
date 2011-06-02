ClubServiceImpl = Ext.extend(Object, {

	onClubMembers: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },
    
    clubMembers : function(clubId, cb, scope) {
	    this.onClubMembers = Ext.createDelegate(ClubServiceImpl.prototype.onClubMembers, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/getClubMembers/'+clubId,
			success: this.onClubMembers
		});
	}

});

ClubService = new ClubServiceImpl();