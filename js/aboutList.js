AboutList = Ext.extend(Ext.Panel, {
    layout: 'card',
    initComponent: function(){
        
        this.list = new Ext.List({
            itemTpl: '<table width="100%"><tr><td><div class="page"><img width="20px" height="20px" src="{image}"/>&nbsp;&nbsp;{title}</div></td><td align="right"></td></tr></table>',
            ui: 'round',
            store: new Ext.data.Store({
                fields: ['name', 'card','image'],
                data: this.pages
            }),
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
            title: 'About'
        });
        
        this.listpanel = new Ext.Panel({
            title: 'About',
            items: this.list,
            layout: 'fit',
            dockedItems: {
                xtype: 'toolbar',
                title: 'About',
    			items : [ {
    				text : 'Home',
    				scope : this,
    				ui : 'back',
    				handler: this.goBack
    			} ]
            }
        });
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        this.items = [this.listpanel];
     
        AboutList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            var newCard = Ext.apply({}, records[0].data.card, { 
                prevCard: this.listpanel,
                title: records[0].data.title
            });            
            this.setActiveItem(Ext.create(newCard), 'slide');
        }
    },
	
	goBack: function(){
		closePanel();
	}
});