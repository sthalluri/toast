NervousTestPanel = Ext.extend(Ext.Panel, 
{
	initComponent : function() {

		this.count =0;
		
		this.startButton = new Ext.Button({
			ui : 'confirm',
			scope: this,
		    text: 'Start Test',
            handler: this.startWatch
		});
		
		this.message = new Ext.Component({
			xtype : 'component',
			width: '100%',
			height: 300,
			html : '<br/><br/><div class="timeDiv">0</div>'
		});

		this.items = [ this.message, {
			layout : 'hbox',
			flex : 1,
			defaults : {
				xtype : 'button',
				flex : 1,
				style : 'margin: .5em;'
			},
			items : [ this.startButton ]

		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {
				text : 'Close',
				scope: this,
				ui:'back',
				handler : this.goBack
			}]
		} ];
	
		Ext.apply(this, {
			scroll : 'vertical',
		    modal: true,
		    centered: true,
		    hideOnMaskTap: false
		});
		
		
		this.timer = new Clock(this.timerEvent);
		
		NervousTestPanel.superclass.initComponent.call(this);	
	},
	
	startWatch: function() {
        // Update acceleration every 3 seconds
        var options = { frequency: 200 };
        if(navigator.accelerometer){
            this.watchID = navigator.accelerometer.watchAcceleration(nervousTestPanel.onSuccessFn, nervousTestPanel.onErrorFn, options);
            alert('Started accel');
        }
        this.timer.start();
        this.testSec = 0;
        //this.startButton.disable();
    },
	
    // Stop watching the acceleration
    stopWatch: function() {
        if (this.watchID) {
            navigator.accelerometer.clearWatch(this.watchID);
            watchID = null;
            this.timer.stop();
            //this.startButton.enable();
        }
        
    },
	
    onSuccessFn:function(a){
    	nervousTestPanel.onSuccess(a);
    },
    
    onErrorFn: function(a){
    	nervousTestPanel.onError(a);
    },
    
    onSuccess: function (a) {        
        if (this.lastX !== null) {  // not first time
            var deltaX = Math.abs(a.x - this.lastX);
            var deltaY = Math.abs(a.y - this.lastY);
            var deltaZ = Math.abs(a.z - this.lastZ);
            
            var changes = 0;
            if (deltaX > 1) changes++;
            if (deltaY > 1) changes++;
            if (deltaZ > 1) changes++;
            
            if (changes >= 1) {
                this.shakerEvent();
            }
        }
        this.lastX = a.x;
        this.lastY = a.y;
        this.lastZ = a.z;
    },
    
    updateMessage: function(msg){
    	if(this.message.el){
    		this.message.el.setHTML(msg);
		}    	
    },
    
    shakerEvent: function (){
    	this.count++;
    	this.updateMessage('<div class="msg"><p >'+this.count+':'+this.testSec+'</p></div>');
    },
    
	timerEvent: function(){
		nervousTestPanel.updateTime();
	},
	
	updateTime: function(){
		this.testSec++;
		if(this.testSec > 5){
			this.stopWatch();
			this.timer.stop();
			if(this.count> 2){
	        	this.updateMessage('<p class="nContent">You are Shaky</p><br/>');
	        }else{
	        	this.updateMessage('<p class="nContent">You are Confident</p>');
	        }
		}else{
			var timerMsg = '<div class="timeDiv">'+this.testSec+'</div>';
        	this.updateMessage('<p class="nContent">Hold the phone in your hand steady.<br/>Test in Progress..</p><br/><br/>'+timerMsg);			
		}
		
	},

    goBack:function() {
    	this.stopWatch();
		closePanel();
	},
	
	onError: function() {
        alert('Not able to start the test');
    }
});

		
