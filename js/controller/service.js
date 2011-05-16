DataStore = new Ext.data.JsonStore( {
	model : 'TrainStatus',

	proxy : {
		type : 'ajax',
		url : 'getTrains.php?trainId=' + this.trainId,
		reader : {
			type : 'json',
			root : 'children'
		}
	},
	autoLoad : false,
	listeners : {
		scope : this,
		beforeload : function() {
			controller.mask();
		},
		load : function() {
			controller.unmask();
		}

	}

});
