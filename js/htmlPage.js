
HtmlPage = Ext.extend(Ext.Panel, {
    autoLoad: 'about.html',
    scroll: 'vertical',
    styleHtmlContent: true,
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.title
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = {
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            };
        }
        
        this.dockedItems = toolbarBase;
        
        Ext.Ajax.request({
            url: serverUrl+this.url,
            success: function(rs){
                this.update(rs.responseText);
            },
            scope: this
        });
        HtmlPage.superclass.initComponent.call(this);
    },
	
	goBack: function(){
        this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
	}
});

Ext.reg('htmlpage', HtmlPage);