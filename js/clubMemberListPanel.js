ClubMemberListPanel = Ext.extend(Ext.Panel, 
{	
	fullscreen: true,
    layout : {
		align:'stretch'
	},
	defaults:{
		flex : 1
	},
	cls: 'demo-list',
	
	initComponent : function() {

        this.items = [
        {
            xtype: 'list',
            store: memberStore,
            itemTpl: '<div class="contact"><img width="30" height="30" class="imageLeft" src="images/phone_startup.png"/><strong>{firstName}</strong> {lastName}</div>',
            grouped: true,
            indexBar: true
        }];
	
        this.dockedItems =[
           {
               xtype: 'toolbar',
               dock: 'top',
               title:'Members',
               items: [
                   {
				    text: 'Back',
				    handler: function() {
	                	clubMemberListPanel.hide();
	                   	navPanel.show();
				    }
				}
               ]
           }
       ];

        ClubMemberListPanel.superclass.initComponent.call(this);	
	}
});
