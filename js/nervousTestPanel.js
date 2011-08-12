NervousTestPanel = Ext.extend(Ext.Panel, 
{
	initComponent : function() {

		this.count =0;
		
		this.startButton = new Ext.Button({
			ui : 'confirm',
			scope: this,
		    text: 'Start Test',
            handler: this.promptMessage
		});
		
		this.defaultMsg = '<div class="helpbox"><h2 >Test your Nervousness</h2></div><div class="timeDiv"><img class="nImg" width="200" height="250"  src="images/nervous_speaker.jpg"/></div>';
		
		this.message = new Ext.Component({
			xtype : 'component',
			width: '100%',
			height: 350,
			html : this.defaultMsg
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
	
	promptMessage: function(){
        Ext.Msg.alert('Start Test', 'Hold the phone steady for <br/> '+ nerveSetting.timeLimit+' Seconds'+'<br/>', this.pStartWatch);		
	},

	pStartWatch: function(){
		nervousTestPanel.startWatch();
	},
	
	startWatch: function() {
        // Update acceleration every 3 seconds
        var options = { frequency: 200 };
        
        if(navigator.accelerometer){
            this.watchID = navigator.accelerometer.watchAcceleration(nervousTestPanel.onSuccessFn, nervousTestPanel.onErrorFn, options);
        }
        this.timer.start();
        this.testSec = 0;
        this.count = 0;
        this.startButton.disable();
    },
	
    // Stop watching the acceleration
    stopWatch: function() {
        if (this.watchID) {
            navigator.accelerometer.clearWatch(this.watchID);
            watchID = null;
            this.timer.stop();
        }
        this.startButton.enable();        
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
    },
    
	timerEvent: function(){
		nervousTestPanel.updateTime();
	},
	
	updateTime: function(){
		this.testSec++;
		if(this.testSec > nerveSetting.timeLimit){
			this.stopWatch();
			this.timer.stop();
			if(this.count> nerveSetting.limit){
	        	this.updateMessage('<div class="helpbox"><h2 >You are Nervous</h2><h3>You shook the phone '+this.count+' times</h3></div><div class="timeDiv"><img width="200" height="250" src="images/nervousPodium.jpg"/><h2 ></div>');
	        }else{
	        	this.updateMessage('<div class="helpbox"><h2 >Your are Confident</h2><h3>You shook the phone '+this.count+' times</h3></div><div class="timeDiv"><img width="200" height="250" src="images/confident.jpg"/></div>');
	        }
		}else{
			var timerMsg = '<div class="timeDiv">'+this.testSec+'</div>';
        	this.updateMessage('<div class="helpbox"><h2 >Hold the phone steady</h2></div>'+timerMsg);			
		}
		
	},

	resetTimer: function(){
		this.stopWatch();
		this.updateMessage(this.defaultMsg);
	},
	
    goBack:function() {
    	this.stopWatch();
		closePanel();
	},
	
	onError: function() {
        alert('Not able to start the test');
    }
});

		
