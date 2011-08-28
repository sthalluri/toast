BaseFormPanel = Ext.extend(Ext.form.FormPanel, 
{
	initComponent : function() {		
		BaseFormPanel.superclass.initComponent.call(this);
	},

	updateMessage: function(msg){
		if(this.message.el){
			this.message.el.setHTML('<div class="msg"><p >'+msg+'</p></div>');
		}
	},
	
	getMessageComp: function(msg){
        if(!msg){
            msg = '';
        }
		this.message = new Ext.Component({
			xtype : 'component',
			html : msg
		});
		return this.message;
	}

});
