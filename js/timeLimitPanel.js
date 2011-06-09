TimeLimitPanel = Ext.extend(Ext.form.FormPanel, 
{
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Time Limits',
    modal: true,

	initComponent : function() {
		
		this.greenLimit= new Ext.form.Text({
                name : 'green',
                minValue: 0,
                label: '<span class="green">Green</span>',
                required:true
			});
		

		this.yellowLimit = new Ext.form.Text({
			name : 'yellow',
			minValue : 0,
            label: '<span class="yellow">Yellow</span>',
			required : true
		});
		
		this.redLimit= new Ext.form.Text({
            name : 'red',
            minValue: 0,
            label: '<span class="red">Red</span>',
            required:true
		});
		
		this.items = [{
                xtype: 'fieldset',
                title: 'Time Limits',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                        this.greenLimit,
                        this.yellowLimit,
                        this.redLimit,				
				{
		            layout: 'hbox',
		            defaults: {xtype: 'button',  style: 'margin: .5em;'},
		            items: [{
		                text: 'Save',
		                scope: this,
		                ui  : 'confirm',
		                width:100,
		                handler: this.save
		            }, {
		                text: 'Reset',
		                scope: this,
		                width:100,
		                handler: this.resetForm
		            }]
		        }
            	]
            }
        ];

        this.dockedItems =[
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'TimeLimits',
                items: [
                    {
					    text: 'Back',
		                ui: 'back',
		                scope:this,
					    handler: function() {
					    	this.hide();
					    	timerPanel.show();
					    }
					},
					{xtype: 'spacer'}
                ]
            }
        ];
        
        TimeLimitPanel.superclass.initComponent.call(this);
	},
	
	loadAndShow: function(pTimings){
		this.redLimit.setValue(getMins(pTimings.red));
		this.greenLimit.setValue(getMins(pTimings.green));
		this.yellowLimit.setValue(getMins(pTimings.yellow));
		this.show();
	},
	
	save: function(){
		var timings = new Object();
		timings.red = getSecsFromStr(this.redLimit.getValue());
		timings.yellow = getSecsFromStr(this.yellowLimit.getValue());
		timings.green = getSecsFromStr(this.greenLimit.getValue());
		this.parentPanel.updateTimeLimitSection(timings);
	}
});
