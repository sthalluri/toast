ClubController = Ext.extend(Object, {
	clubUsers : function(clubId) {
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/getClubMembers/'+clubId,
			success : function(response, opts) {
				data = eval("(" + response.responseText + ")");
				if (data.success) {
					console.log(data);
					memberStore.removeAll();
					var members = data.returnVal.rows;
					for(var i=0 ; i<members.length; i++){
						memberStore.add(members[i]);
					}
				} else {

				}
			}
		});
	}
});
