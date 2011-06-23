ClubMemberListPanel = Ext.extend(Ext.Panel, 
{	
	iconCls:'team',
    tabId: 'myClub',
    scroll: 'vertical',
    title:'My Club',
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
            itemTpl: '<div id="{id}" class="contact"><img width="30" height="30" class="imageLeft" src="images/phone_startup.png"/><strong>{firstName}</strong> {lastName}</div>',
            grouped: true,
            indexBar: true,
            onItemDisclosure: function(record, btn, index)
            {
	    		homeTabPanel.hide();
	    		showPanel(clubMemberAddPanel);
            	clubMemberAddPanel.populateUserDetails(record.data);
            }
        }];
	
        var buttonGroup1 = [];
        var buttonGroup2 = [{
	    	iconMask: true,
	    	ui: 'plain',
	    	iconCls: 'add',
	    	id: 'clubMemberAddIcon',
	    	scope: this,
	    	handler: function(){
	    		homeTabPanel.hide();
	    		showPanel(clubMemberAddPanel);
	    		clubMemberAddPanel.resetFields();
	    	}
        }];
        
        buttonGroup1.push({xtype:'spacer'});
        this.dockedItems =[{
           xtype: 'toolbar',
           dock: 'top',
           title:'Members',
           items: buttonGroup1.concat(buttonGroup2)                   
        }];

        ClubMemberListPanel.superclass.initComponent.call(this);	
	},
});
