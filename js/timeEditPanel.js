TimeEditPanel = Ext.extend(BaseFormPanel, 
{
	width: 300,
	height: 400,
	loggedIn:false,	
	initComponent : function() {
		
		this.minSpinner= new Ext.form.Spinner({
			label:'Minutes',
		    minValue: 0,
		    maxValue: 60
		});

		this.secSpinner = new Ext.form.Spinner({
			label:'Seconds',
		    minValue: 0,
		    maxValue: 60,
		    incrementValue: 1,
		    cycle: true
		});

		this.items = [  
		                this.getMessageComp(),    
		                {
      		            width:'100%',
      					flex:1,
      		            defaults: {style: 'margin: .2em;'},
      		            items: [
      		                {html:'<span>Time</span>'},
      		            	this.minSpinner,
      		            	this.secSpinner
      		            ]
                      }];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				text : 'Cancel',
				scope: this,
				ui : 'back',
				handler : this.goBack
			},{xtype:'spacer'},{
				text : 'Done',
				scope: this,
				ui : 'confirm',
				handler : this.save
			}]
		} ];
	
		TimeEditPanel.superclass.initComponent.call(this);	
	},
	
	showTimeEdit: function(parentPanel, time){
		this.parentPanel = parentPanel;
		this.time = time;
		this.show();
		this.updateTime(time);
	},
	
	updateTime: function(time){
		this.minSpinner.setValue(Math.floor(time/60));
		this.secSpinner.setValue(time%60);
	},
	
	goBack:function() {
		this.hide();
		this.parentPanel.show();
	},
	
	save:function() {
		this.hide();
		this.parentPanel.show();
		this.parentPanel.updateFromTimeEdit(this.minSpinner.getValue()+':'+this.secSpinner.getValue());
	}

});

		
