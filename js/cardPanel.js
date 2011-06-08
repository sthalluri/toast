CardPanel = Ext.extend(Ext.Panel, 
{
	width: 300,
	height: 500,
	loggedIn:false,	
	initComponent : function() {
		this.items = [ {
			id: 'colorCardDiv',
			html : 'RED PANEL<br>TEST PANEL<br/>'
		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'bottom',
			items : [ {
				text : 'Close',
				ui : 'round',
				scope: this,
				handler : this.goBack
			}]
		} ];
	
		Ext.apply(this, {
			scroll : 'vertical',
		    modal: true,
		    centered: true,
		    hideOnMaskTap: false
		});
		
		CardPanel.superclass.initComponent.call(this);	
	},
	
	showCard: function(colourClass){
		this.colourClass = colourClass;
		this.show();
		this.updateColor(colourClass);
	},
	
	updateColor: function(colourClass){
		if(Ext.getCmp('colorCardDiv').el){
			Ext.getCmp('colorCardDiv').el.dom.innerHTML='<div class='+colourClass+' style="width:900px;height:900px"></div>';
		}
	},
	
	goBack:function() {
		this.hide();
		timerPanel.show();
	}
});

		
