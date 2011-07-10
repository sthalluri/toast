ClubMemberListPanel = Ext.extend(Ext.Panel, 
{	
	iconCls:'team',
    tabId: 'myClub',
    title:'My Club',
	initComponent : function() {

        this.logBase = 
        {
            xtype: 'list',
            store: memberStore,
            itemTpl: '<div id="{id}" class="contact"><img class="imageLeft" src="js/ext/resources/themes/images/default/pictos/user.png"/>&nbsp;&nbsp;&nbsp;<strong>{firstName}</strong> {lastName}</div>',
            grouped: true,
            indexBar: false,
            onItemDisclosure: function(record, btn, index)
            {
	    		homeTabPanel.hide();
	    		showPanel(clubMemberAddPanel);
            	clubMemberAddPanel.populateUserDetails(record.data, "list");
            }
        };

	    this.memberPanel = new Ext.Panel({
	    	activeItem:0,
	    	height:'100%',	
        	layout: 'card',
	    	items:[
	    	    new Ext.List(Ext.apply(this.logBase, {
	               fullscreen: false
	           	}))
	    	]
	    });

	   this.items=[
	               this.memberPanel
  	   ];

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
