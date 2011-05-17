MyLogPanel = Ext.extend(Ext.Panel, 
{
	iconCls : 'compose',
	tabId : 'myLog',
	scroll : 'vertical',
	title : 'My Log	',

	initComponent : function() {

		var logBase = {
			itemTpl : '<div class="contact2"><b>{date}</b><br/>{topic}</div>',
			selModel : {
				mode : 'SINGLE',
				allowDeselect : true
			},
			grouped : false,
			indexBar : false,

			onItemDisclosure : {
				scope : 'test',
				handler : function(record, btn, index) {
					//alert('Disclose more info for ' + record.get('firstName'));
					logCarousel.setActiveItem(logCarousel.items.get(index + 1));
				}
			},
			store : myLogDataStore
		};

		var logCarousel = new Ext.Carousel(
		{
			padding : 10,
			xtype : 'card',
			activeItem : 0,
			height : 500,
			id : 'myLogCarousel',
			items : [
					new Ext.List(Ext.apply(logBase, {
						fullscreen : true
					})),
					{
						html : '<hr/>8/24/2010 <b><br/>Main Speaker</b><br/> Type : Ice Breaker <br/> Time : 5.25min <br/> Grammer Log : <br/> Ahs : 5 , Ams : 7, Sos : 3<br/> '
								+ '<hr/>9/24/2010 <br/><b>Grammarian</b> <br/> Time : 5.25min <br/> Grammer Log : <br/> Ahs : 5 , Ams : 7, Sos : 3'
								+ '<hr/>10/24/2010<br/><b>Toast Master</b><br/> Time : 5.25min <br/> Grammer Log : <br/> Ahs : 5 , Ams : 7, Sos : 3'
					} ]
		});

		this.defaults = {
			flex : 1
		};

		this.items = [ logCarousel ];

		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			title : 'My Log',
			items : [ {
				text : 'Back',
				ui : 'round',
				handler : function() {
					if (speakerNotesCarousel.getActiveIndex() == 0) {
						myLogPanel.hide();
						mainPanel.setActiveItem(mainPanel.items.get(0));
						//homeCardPanel.show();
					} else {
						logCarousel.setActiveItem(logCarousel.items.get(0));
					}
				}
			} ]
		} ];

		this.topToolbar = new Ext.Toolbar( {
			text : 'My Log',
			dock : 'top'
		});

		//this.dockedItems = [ this.topToolbar ];

		MyLogPanel.superclass.initComponent.call(this);
	}
});

