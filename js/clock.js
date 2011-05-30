

function Clock (paramHandler, paramInterval) {
	var clockId = 0;
	var secs = 0;
	var handler = paramHandler;
	var interval = paramInterval;
	
	return {
		start: function( )
		{
			if(!interval){
				interval = 1000;
			}
		    clockId = setInterval ( this.increment, interval);
		},
		stop: function ( )
		{
		    clearInterval ( clockId);
		},
		reset: function ( )
		{
			secs = 0;
		    clearInterval ( clockId);
		},
		increment  : function ( )
		{
			secs+=1;
			//console.log('From inside'+secs);
			handler();
		},
		getSecs : function(){
			return secs;
		},
		getMins : function(){
			var formatmins = Math.floor(secs/60);
			var formatSecs = secs%60;
			if(formatSecs<10){
				formatSecs = '0'+formatSecs;
			}
			return formatmins+':'+formatSecs;
		},
		setSecs: function(paramSecs){
			secs = paramSecs;
		},
		setSecsFromStr: function(timeStr){
			var pSecs = parseInt(timeStr.substring(timeStr.indexOf(':')+1));
			var pMin  = parseInt(timeStr.substring(0, timeStr.indexOf(':')));
			secs = pMin*60+pSecs;
			console.log(secs);
		}
	};
};

function myalert(){

}


//var clock = new Clock(myalert);
//clock.start();

function startClock ( )
{
    clockId = setInterval ( "increment()", 1000 );
}

function stopClock ( )
{
    clearInterval ( clockId);
}

function increment ( )
{
	secs+=1;
	console.log(secs);
}