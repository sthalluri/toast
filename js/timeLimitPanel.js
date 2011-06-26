TimeLimitPanel = Ext.extend(Ext.form.FormPanel, 
{
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Time Limits',
    modal: true,

	initComponent : function() {
		
		this.greenMin= new Ext.form.Spinner({
			label:'Minutes',
		    minValue: 0,
		    maxValue: 60
		});

		this.greenSec = new Ext.form.Spinner({
			label:'Seconds',
		    minValue: 0,
		    maxValue: 60,
		    incrementValue: 15,
		    cycle: true
		});

		this.yellowMin = new Ext.form.Spinner({
			label:'Minutes',
		    minValue: 0,
		    maxValue: 60
		});

		this.yellowSec = new Ext.form.Spinner({
			label:'Seconds',
		    minValue: 0,
		    maxValue: 60,
		    size:1
		});

		this.redMin = new Ext.form.Spinner({
			label:'Minutes',
		    minValue: 0,
		    maxValue: 60
		});

		this.redSec = new Ext.form.Spinner({
			label:'Seconds',
		    minValue: 0,
		    maxValue: 60,
		    size:1
		});
				
		this.items = [  
		                {
							html:'&nbsp;'
						},    
		                {
        		            width:'100%',
        					flex:1,
        		            defaults: {style: 'margin: .2em;'},
        		            items: [
        		                {html:'<span class="green">Green</span>'},
        		            	this.greenMin,
        		            	this.greenSec
        		            ]
                        },
                        {
        		            width:'100%',
        					flex:1,
        		            defaults: {style: 'margin: .2em;'},
        		            items: [
        		                {html:'<span class="yellow">Yellow</span>'},
        		            	this.yellowMin,
        		            	this.yellowSec
        		            ]
                        },
                        {
        		            width:'100%',
        					flex:1,
        		            defaults: {style: 'margin: .2em;'},
        		            items: [
        		                {html:'<span class="red">Red</span>'},
        		            	this.redMin,
        		            	this.redSec
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
					    	this.parentPanel.show();
					    }
					},
					{xtype: 'spacer'}
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items : [ {
					xtype : 'spacer'
				},{
	                text: 'Save',
	                scope: this,
	                ui  : 'confirm',
                    width:80,
	                handler: this.save
	            }, {
	                text: 'Reset',
	                scope: this,
                    width:80,
	                handler: this.resetForm
	            }]
            }
        ];
        
        TimeLimitPanel.superclass.initComponent.call(this);
	},
	
	loadAndShow: function(parentPanel, pTimings){
		this.updateMessage('&nbsp;');
		this.parentPanel = parentPanel;
		
		var formatMins = Math.floor(pTimings.green/60);
		var formatSecs = pTimings.green%60;
		this.greenMin.setValue(formatMins);
		this.greenSec.setValue(formatSecs);

		formatMins = Math.floor(pTimings.yellow/60);
		formatSecs = pTimings.yellow%60;
		this.yellowMin.setValue(formatMins);
		this.yellowSec.setValue(formatSecs);

		formatMins = Math.floor(pTimings.red/60);
		formatSecs = pTimings.red%60;
		this.redMin.setValue(formatMins);
		this.redSec.setValue(formatSecs);

		this.show();
	},
	updateMessage: function(msg){
		if(this.items.get(0).el){
			this.items.get(0).el.dom.innerHTML= '<div class="msg"><p >'+msg+'</p></div>';
		}
	},

	save: function(){
		var timings = new Object();
		var green = parseInt(this.greenMin.getValue())*60+parseInt(this.greenSec.getValue());
		var yellow = parseInt(this.yellowMin.getValue())*60+parseInt(this.yellowSec.getValue());
		var red = parseInt(this.redMin.getValue())*60+parseInt(this.redSec.getValue());

		if(yellow < green){
			this.updateMessage('TImeLimit for Yellow cant be less than for Green');
			return;
		}else if(red < yellow){
			this.updateMessage('TImeLimit for Red cant be less than for Yellow');
			return;
		}

		timings.green = green;
		timings.yellow = yellow;
		timings.red = red;
		
		this.parentPanel.updateTimeLimitSection(timings);
	}
});
