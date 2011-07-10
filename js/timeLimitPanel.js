TimeLimitPanel = Ext.extend(BaseFormPanel, 
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
		    incrementValue: 15,
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
		    incrementValue: 15,
		    size:1
		});
		
		this.addMinButton = new Ext.Button({
	    	scope:this,
			text:'+1 Min',
			width: 40,
	        handler: this.addMin
	    });

		this.subMinButton = new Ext.Button({
	    	scope:this,
			text:'-1 Min',
			width: 40,
	        handler: this.subMin
	    });
				
		this.items = [  
		                this.getMessageComp(),    
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
                        },
        				{
        					layout:'hbox',
        					flex:1,
                       	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
        					items:[
        							this.addMinButton,
        							this.subMinButton
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
					    handler: this.goBack
					},
					{xtype: 'spacer'},{
		                text: 'Done',
		                scope: this,
		                ui  : 'confirm',
		                handler: this.save
		            }
                ]
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
		
		//this.updateMessage('Saved successfully.');
		this.parentPanel.updateTimeLimitSection(timings);
		this.goBack();
	},
	
	addMin: function(){
		this.greenMin.setValue(parseInt(this.greenMin.getValue())+1);
		this.yellowMin.setValue(parseInt(this.yellowMin.getValue())+1);
		this.redMin.setValue(parseInt(this.redMin.getValue())+1);
	},

	subMin: function(){
		if(this.greenMin.getValue()>0){
			this.greenMin.setValue(parseInt(this.greenMin.getValue())-1);
		}
		if(this.yellowMin.getValue()>0){
			this.yellowMin.setValue(parseInt(this.yellowMin.getValue())-1);
		}
		if(this.redMin.getValue()>0){
			this.redMin.setValue(parseInt(this.redMin.getValue())-1);
		}
	},

	goBack: function() {
    	this.hide();
    	this.parentPanel.show();
    }
});
