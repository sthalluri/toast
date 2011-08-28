function objectToString(o){
    
    var parse = function(_o){
    
        var a = [], t;
        
        for(var p in _o){
        
            if(_o.hasOwnProperty(p)){
            
                t = _o[p];
                
                if(t && typeof t == "object"){
                
                    a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
                    
                }
                else {
                    
                    if(typeof t == "string"){
                    
                        a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
                    }
                    else{
                        a[a.length] = [ p+ ": " + t.toString()];
                    }
                    
                }
            }
        }
        
        return a;
        
    };
    
    return "{" + parse(o).join(", ") + "}";
    
}


//Removes leading whitespaces
function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	
	return LTrim(RTrim(value));
	
}


Ext.util.Format.capitalize = (function(){
    var re = /(^|[^\w])([a-z])/g,
    fn = function(m, a, b) {
        return a + b.toUpperCase();
    };
    return function(v){
        return v.replace(re, fn);
    };
})();

function isToday(date){
	var today = new Date();
	if(today.format('F j, Y') == date.format('F j, Y')){
		return '<p><img class="imageMeetingLeft" style="height:1em" src="images/star.png"/>Today</p>';
	}else{
		return '';
	}
}