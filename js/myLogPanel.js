MyLogPanel = Ext.extend(Ext.Panel, 
{
	iconCls : 'compose',
	fullscreen: true,
	title:'My Log',
    layout : {
		align:'stretch'
	},
	defaults:{
		flex : 1
	},
	
	initComponent : function() {

		this.logTmpl = new Ext.Template([
            '<div name="{id}">',
            	'<span class="{cls}">{id}: {wordOfTheDay}:{meetingDate}</span>',
            '</div>',
        ]);

		this.logTmpl.compile();
		
		this.logBase = {
		    itemTpl: this.logTmpl,
		    selModel: {
		        mode: 'SINGLE',
		        allowDeselect: true
		    },
		    grouped: false,
		    indexBar: false,
		    parentPanel:this,
		    id : 'logListPanel',
		    onItemDisclosure: {
		        scope: this,
		        handler: function(record, btn, index) {
		            //alert('Disclose more info for ' + record.get('firstName'));
		    		var carousel = this.parentPanel.logCarousel;
		    		var log = this.parentPanel.store.getAt(index).data;
		    		this.parentPanel.activeLog = log;
		    		var html = this.parentPanel.logTmpl.apply(log);
		    		var detailsPanel = carousel.items.get(1);
		    		detailsPanel.el.setHTML(html);
		    		carousel.setActiveItem(carousel.items.get(1));
		    		this.parentPanel.detailMode();
		        }
		    },
		    store: this.store
		};
	
	    this.logCarousel = new Ext.Panel({
	        padding:10,
	    	activeItem:0,
	    	height:'95%',	
        	layout: 'card',
	    	items:[
	    	    new Ext.List(Ext.apply(this.logBase, {
	               fullscreen: true
	           	})),
	           	{
	    	    	html:'Sample content here'
	           	}
	    	]
	    });
	
	   this.items=[
	            {
		        	padding:10,
		        	html : '<b></b>'
	        	},
	        	this.logCarousel
			];
	   

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
				{
					text : 'Back',
					ui : 'round',
					scope : this,
					handler : function() {
						if(this.logCarousel.getActiveItem().id =='logListPanel'){
	                		this.hide();
	                    	navPanel.show();
	                	}else{
							this.logCarousel.setActiveItem(this.logCarousel.items.get(0));
							this.listMode();
	                	}
					}
				}, {
					xtype : 'spacer'
				} ]
		} ];
	   MeetingListPanel.superclass.initComponent.call(this);	
	},
	detailMode: function(){
	},
	listMode: function(){
	}

});

