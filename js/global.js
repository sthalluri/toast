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
		return '<p><img class="imageLeft" src="images/star.png"/>Today</p>';
	}else{
		return '';
	}
}

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
			secs = getSecsFromStr(timeStr);
		}
	};
};

function myalert(){

}

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
}

function getSecsFromStr(timeStr){
	var pSecs = 0;
	var pMin  = 0;
	if(timeStr.indexOf(':')>0){
		pSecs = parseInt(timeStr.substring(timeStr.indexOf(':')+1));
		pMin  = parseInt(timeStr.substring(0, timeStr.indexOf(':')));
		if(!pMin){
			pMin = 0;
		}
		if(!pSecs){
			pSecs = 0;
		}
	}
	return pMin*60+pSecs;
}

function getMins (secs){
	var formatmins = Math.floor(secs/60);
	var formatSecs = secs%60;
	if(formatSecs<10){
		formatSecs = '0'+formatSecs;
	}
	return formatmins+':'+formatSecs;
}

var mockUser={
		'userId':'guest@gmail.com',
		'name' : 'Alpha',
		'password' : 'guest',
		'email' : 'MockingBird@gamil.com',
		'clubId' : '1234',
		'clubPasscode' : 'Club Passcode',
		'rememberMe' : 1,
		'firstName':'Alpha',
		'lastName':'User',
		'confirmPassword':'secret'
};

var aboutPages = [ {
	title : 'About',
	card : {
		xtype : 'htmlpage',
		url : '/toast/help/overview.html'
	},
	image : 'images/pictos/arrow_right.png'
}, {
	title : 'About Roles',
	card : {
		xtype : 'htmlpage',
		url : '/toast/help/roles.html'
	},
	image : 'images/pictos/arrow_right.png'
} ,{
	title : 'Roles CheckList',
	card : {
		xtype : 'htmlpage',
		url : '/toast/help/checklist.html'
	},
	image : 'images/pictos/arrow_right.png'
} ,{
	title : 'Other',
	card : {
		xtype : 'htmlpage',
		url : '/toast/help/other.html'
	},
	image : 'images/pictos/arrow_right.png'
} ];


var thisMeeting;
var thisUser;

var members = [];
var meetings =[];
var roles = [];
var questions = [];
var speechNotes = [];
var notes = [];
var userLog =[];
var fillers= [];

var nerveSetting ={
		limit : 3,
		timeLimit: 6
};

var timeOptions = [
   {text: 'Select..',value: ''}, 
   {text: '06:00 AM',value: '06:00 AM'}, 
   {text: '06:30 AM',value: '06:30 AM'}, 
   {text: '07:00 AM',value: '07:00 AM'}, 
   {text: '07:30 AM',value: '07:30 AM'}, 
   {text: '08:00 AM',value: '08:00 AM'}, 
   {text: '08:30 AM',value: '08:30 AM'}, 
   {text: '09:00 AM',value: '09:00 AM'}, 
   {text: '09:30 AM',value: '09:30 AM'},
   {text: '10:00 AM',value: '10:00 AM'}, 
   {text: '10:30 AM',value: '10:30 AM'},
   {text: '11:00 AM',value: '11:00 AM'}, 
   {text: '11:30 AM',value: '11:30 AM'},
   {text: '12:00 AM',value: '12:00 AM'}, 
   {text: '12:30 AM',value: '12:30 AM'},   
   {text: '01:00 PM',value: '01:00 PM'}, 
   {text: '01:30 PM',value: '01:30 PM'}, 
   {text: '02:00 PM',value: '02:00 PM'}, 
   {text: '02:30 PM',value: '02:30 PM'}, 
   {text: '03:00 PM',value: '03:00 PM'}, 
   {text: '03:30 PM',value: '03:30 PM'}, 
   {text: '04:00 PM',value: '04:00 PM'}, 
   {text: '04:30 PM',value: '04:30 PM'}, 
   {text: '05:00 PM',value: '05:00 PM'}, 
   {text: '05:30 PM',value: '05:30 PM'}, 
   {text: '06:00 PM',value: '06:00 PM'}, 
   {text: '06:30 PM',value: '06:30 PM'}, 
   {text: '07:00 PM',value: '07:00 PM'}, 
   {text: '07:30 PM',value: '07:30 PM'}, 
   {text: '08:00 PM',value: '08:00 PM'}, 
   {text: '08:30 PM',value: '08:30 PM'}, 
   {text: '09:00 PM',value: '09:00 PM'}, 
   {text: '09:30 PM',value: '09:30 PM'},
   {text: '10:00 PM',value: '10:00 PM'}, 
   {text: '10:30 PM',value: '10:30 PM'}

];


var timingStore={
	speech : {green: 60*4, yellow:60*5,red: 60*6},	
	ttResponse : {green: 1*60, yellow:1.5*60, red: 2*60},
	evaluator : {green: 2*60, yellow: 2.5*60, red:3*60}	
};


//var urlStore = mockUrls;
var urlStore = {
		userUrl 		: serverUrl+'/toastService/user',
		meetingUrl		: serverUrl+'/toastService/meeting',
		registerUrl		: serverUrl+'/toastService/user/register',
		clubUrl			: serverUrl+'/toastService/club'
};


Ext.regModel('Meeting', {
	idProperty: 'id',
	fields: [
        {name: 'id',     		type: 'int'},
        {name: 'wordOfTheDay',  type: 'string'},
        {name: 'themeOfTheDay', type: 'string'},
        {name: 'inProgress'},
        {name: 'meetingDate',	type: 'date', dateFormat: 'Y-m-d\\TH:i:s.u\\Z'},
        {name: 'meetingTime'},
        {name: 'location'}
    ]
});

var meetingStore = new Ext.data.JsonStore({
	data : meetings,
	model : 'Meeting',
	autoLoad : false,
	autoDestroy : true,
	loadAndFormat : function(records){
		for(var i=0 ;i<records.length; i++){
			if(records[i].meetingDate){
				var fDate = Date.parseDate(records[i].meetingDate, "Y-m-d\\TH:i:s.u\\Z");
				if(records[i].meetingTime){
					records[i].fMeetingDate = fDate.format('F j, Y')+' '+records[i].meetingTime;
				}else{
					records[i].fMeetingDate = fDate.format('F j, Y');
				}
			}
		}
		this.loadData(records);
	},
	getMeeting: function(id){
	   var data = null;
	   this.each(function(rec){
			if(rec.data.id === id){
				data = rec.data;
				return data;
			}
	   }, this);
	   return data;
	}
});

Ext.regModel('Member', {
	idProperty: 'id',
    fields: [
        {name: 'id',    type: 'int'},
        {name: 'userId',    type: 'string'},
        {name: 'firstName',    type: 'string'},
        {name: 'lastName',    type: 'string'},
        {name: 'name',    type: 'string'},
        {name: 'phone',   type: 'string'},
        {name: 'aboutMe', type: 'string'}
    ]
});


var memberStore = new Ext.data.JsonStore({
   data : members,
   model : 'Member',
   autoLoad : false,
   autoDestroy : true,
   getGroupString : function(record) {
		return record.get('firstName')[0];
   },
   loadWithDefault: function(records){
		this.loadData(records);
		memberDropDownStore.loadWithDefault(records);
   },
   sorters: [
             {
                 property : 'firstName',
                 direction: 'ASC'
             },
             {
                 property : 'lastName',
                 direction: 'ASC'
             }
         ],
   getMember: function(id){
		var data = null;
		this.each(function(rec){
			if(rec.data.id === id){
				data = rec.data;
			}
        }, this); 
		if(data ==null){
			data = new Object({id:'',firstName:'Not', lastName:'Available', name:'Not Available'});
		}
		return data;
   }
});

var memberDropDownStore = new Ext.data.JsonStore({
	   data : members,
	   model : 'Member',
	   autoLoad : false,
	   autoDestroy : true,
	   loadWithDefault: function(records){
		   	this.loadData(records);
			var defaultSelect = { id : '0',     name : 'Select...', firstName:'Dummy',lastName:'User'};
			this.insert(0,Ext.ModelMgr.create( defaultSelect, 'Member'));
	   }
	});

Ext.regModel('Role', {
	idProperty: 'id',
    fields: [
        {name: 'id',     		type: 'string'},
        {name: 'description',   type: 'string'},
        {name: 'trackTime',     type: 'boolean'}
    ]
});


var timerRoleStore = new Ext.data.JsonStore({
	   data : roles,
	   model : 'Role',
	   autoLoad : false,
	   autoDestroy : true,
	   reload : function(roles) {
			var defaultSelect = { id : '0',     description : 'Select...'};
			this.add(Ext.ModelMgr.create( defaultSelect, 'Role'));
			for(var i=0; i< roles.length; i++){
				var role = roles[i];
				if(role.data.trackTime){
					this.add(Ext.ModelMgr.create( role.data, 'Role'));				
				}
			}
	   }
});

var gramRoleStore = new Ext.data.JsonStore({
	   data : roles,
	   model : 'Role',
	   autoLoad : false,
	   autoDestroy : true,
	   reload : function(roles) {
			var defaultSelect = { id : '0',     description : 'Select...'};
			this.add(Ext.ModelMgr.create( defaultSelect, 'Role'));
			for(var i=0; i< roles.length; i++){
				var role = roles[i];
				if(role.data.id != 'grammarian'){
					this.add(Ext.ModelMgr.create( role.data, 'Role'));				
				}
			}
	   }
});

var roleStore = new Ext.data.JsonStore({
   data : roles,
   model : 'Role',
   autoLoad : false,
   autoDestroy : true,
   reload : function() {
	   

	   var roles = [ {
				"id" : "evaluator1",
				"description" : "Evaluator for First Speech",
				"trackTime" : true
			}, {
				"id" : "evaluator2",
				"description" : "Evaluator for Second Speech",
				"trackTime" : true
			}, {
				"id" : "evaluator3",
				"description" : "Evaluator for Third Speech",
				"trackTime" : true
			}, {
				"id" : "generalEvaluator",
				"description" : "General Evaluator",
				"trackTime" : false
			}, {
				"id" : "grammarian",
				"description" : "Grammarian",
				"trackTime" : false
			}, {
				"id" : "speaker1",
				"description" : "First Speech",
				"trackTime" : true
			}, {
				"id" : "speaker2",
				"description" : "Second Speech",
				"trackTime" : true
			}, {
				"id" : "speaker3",
				"description" : "Third Speech",
				"trackTime" : true
			}, {
				"id" : "tableTopics",
				"description" : "Table Topics",
				"trackTime" : false
			}, {
				"id" : "timer",
				"description" : "Timer",
				"trackTime" : false
			}, {
				"id" : "toastMaster",
				"description" : "Toast Master",
				"trackTime" : false
			}, {
				"id" : "ttResponse1",
				"description" : "Table Topic Response1",
				"trackTime" : true
			}, {
				"id" : "ttResponse2",
				"description" : "Table Topic Response2",
				"trackTime" : true
			}, {
				"id" : "ttResponse3",
				"description" : "Table Topic Response3",
				"trackTime" : true
			}, {
				"id" : "ttResponse4",
				"description" : "Table Topic Response4",
				"trackTime" : true
			}, {
				"id" : "ttResponse5",
				"description" : "Table Topic Response5",
				"trackTime" : true
			}, {
				"id" : "ttResponse6",
				"description" : "Table Topic Response6",
				"trackTime" : true
			}, {
				"id" : "ttResponse7",
				"description" : "Table Topic Response7",
				"trackTime" : true
			}, {
				"id" : "ttResponse8",
				"description" : "Table Topic Response8",
				"trackTime" : true
			} ];

		roleStore.loadData(roles);
		var defaultSelect = { id : '0',     description : 'Select...'};
		roleStore.insert(0,Ext.ModelMgr.create( defaultSelect, 'Role'));
		
		//Load the toaststore
		timerRoleStore.reload(roles);

		//Load the toaststore
		gramRoleStore.reload(roles);

	   /*
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/clubRoleList',
			params : {
				accessKey: thisUser.accessKey
			},
			success : function(response, opts) {
				var data = eval("(" + response.responseText + ")");
				if (data.success) {
					var roles = data.returnVal.rows;
					roleStore.loadData(roles);
					var defaultSelect = { id : '0',     description : 'Select...'};
					roleStore.insert(0,Ext.ModelMgr.create( defaultSelect, 'Role'));
					
					//Load the toaststore
					timerRoleStore.reload(data.returnVal.rows);

					//Load the toaststore
					gramRoleStore.reload(data.returnVal.rows);
				} else {
					
				}
			}
		});
		*/
	   
   },
   
   getRole: function(id){
	   var data = null;
	   this.each(function(rec){
			if(rec.data.id === id){
				data = rec.data;
				return data;
			}
	   }, this);
	   return data;
   }
   
});



Ext.regModel('Question', {
	idProperty: 'id',
    fields: ['id', 'text', 'cardIndex']
});

var questionDataStore = new Ext.data.Store({
    model: 'Question',
    sorters: 'id',
    data: questions,
    autoLoad : false,
    autoDestroy : true
});

Ext.regModel('SpeechNote', {
	idProperty: 'id',
    fields: ['id', 'text', 'cardIndex']
});

var speechNoteDataStore = new Ext.data.Store({
    model: 'SpeechNote',
    sorters: 'id',
    data: speechNotes,
    autoLoad : false,
    autoDestroy : true
});


Ext.regModel('User', {
	idProperty: 'id',
    fields: [
        {name: 'id',     		type: 'int'},
        {name: 'userId',     	type: 'string'},
        {name: 'firstName',    	type: 'string'},
        {name: 'lastName',     	type: 'string'},
        {name: 'phone',     	type: 'string'},
        {name: 'email',    		type: 'string'},
        {name: 'aboutMe',		type: 'string'},
        {name: 'accessKey',		type: 'string'},
        {name: 'defaultClubId', type: 'string'}
    ]
});




function getMeetingBareBones(){

	var meeting = new Object({	
		inProgress : false,
		wordOfTheDay:'',
		themeOfTheDay:'',
		meetingDate: new Date(),
		date:'',
		roles : {
			speaker1:{
				userId:'',
				counts:{},
				time:0
			},
			speaker2:{
				userId:'',
				counts:{},
				time:0
			},
			speaker3:{
				userId:'',
				counts:{},
				time:0
			},
			tableTopics:{
				userId:'',
				counts:{},
				time:0
			},	
			toastMaster:{
				userId:'',
				counts:{},
				time:0
			},
			generalEvaluator:{
				userId:'',
				counts:{},
				time:0
			},
			evaluator1:{
				userId:'',
				counts:{},
				time:0
			},
			evaluator2:{
				userId:'',
				counts:{},
				time:0
			},
			evaluator3:{
				userId:'',
				counts:{},
				time:0
			},
			grammarian:{
				userId:'',
				counts:{},
				time:0
			},
			timer:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse1:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse2:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse3:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse4:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse5:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse6:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse7:{
				userId:'',
				counts:{},
				time:0
			}
	}
	});
	return meeting;
}


function truncateData() {
	meetingStore.removeAll();
	memberStore.removeAll();
	memberDropDownStore.removeAll();
	roleStore.removeAll();
	timerRoleStore.removeAll();
	gramRoleStore.removeAll();
	questionDataStore.removeAll();
	speechNoteDataStore.removeAll();
}var hexcase = 0;
var b64pad  = "";
var chrsz   = 8; 

function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len)
{
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}Validator = Ext.extend(Object, {
	validateEmail : function(email)
	{
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
		return emailPattern.test(email);
	},
	
	validatePhone : function(phone)
	{
		//phone.length == 10 && 
		if(!window.isNaN(phone))
		{
			return true;
		}
		return false;
	}

});Service = Ext.extend(Object, {

	onAjaxResponse: function(response, args, cb, scope) {
		loadMask.hide();
		var data = new Object(); 
		if(response && response.responseText){
			data = eval("(" + response.responseText + ")");
		}else{
			data.errorMessage = "Failed to Connect to the server.";
		}
        cb.call(scope || window, data);
    }
});AppDB = Ext.extend(Object, {
	
	THIS_USER: '0',
	USERID: '1', 
	PASSWD: '2',
	LOGGEDIN: '3',
	AUTH_TOKEN: '4',
	AUTH_EXP_TIME: '5',
	AUTH_INIT_TIME: '6',
	CURR_MEETING: '7',
	REMEMBER_ME: '8',

	USER: '9',
	USER_ID: '10',

	MEETING: '11',
	MEETING_ID: '12',

	CLUB: '13',

	MEETINGROLECONTENT: '14',
	MEETINGROLECONTENT_ID:'15',
		
	constructor : function(config) {
		Ext.apply(this, config);
	},

	init : function(c) {
		//this.db = window.openDatabase("toastDB", "1.0", this.dbName, 1000000);
		//this.db.transaction(db.populateDB, db.errorCB, db.successCB);
		//this.db.transaction(db.initDB, db.errorCB, db.successCB);
	},

	initDB : function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS user');
		tx.executeSql('CREATE TABLE IF NOT EXISTS user (id unique, aboubtMe, accessKey, defaultClubId, email, '
				+'firstName, isenabled, lastName, password, phone )');
	},

	populateDB : function(tx,values) {
		tx.executeSql('INSERT INTO user (id, aboutMe) VALUES (?, ?)',values);
	},

	errorCB : function(err) {
		alert("Error processing SQL: " + err);
	},

	successCB : function() {
		alert("success!");
	},

	queryDB: function(tx) {
	    tx.executeSql('SELECT * FROM DEMO', [], db.querySuccess, db.errorCB);
	},
	
	createUser: function(data, callBack){
		  db.readTransaction(function (t) {
		    t.executeSql('SELECT id FROM docs WHERE label IN (' + q + ')', labels, function (t, data) {
		    	callBack(data);
		    });
		  });
	},
	
	querySuccess: function (tx, results) {
	    // this will be empty since no rows were inserted.
	    console.log("Insert ID = " + results.insertId);
	    // this will be 0 since it is a select statement
	    console.log("Rows Affected = " + results.rowAffected);
	    // the number of rows returned by the select statement
	    console.log("Insert ID = " + results.rows.length);
	},
	
	runQuery : function(fn) {
		db.transaction(fn, this.errorCB, this.successCB);
	},
	
	getValue: function(key){
		return window.localStorage.getItem(key);
	},
	
	setValue: function(key, value){
		window.localStorage.setItem(key, value);
	},
	
	removeValue: function(key){
		window.localStorage.removeItem(key);
	},
	
	removeAll: function(key){
		window.localStorage.clear();
	},
	
	toString: function(){
		return objectToString(window.localStorage);
	},
	
	resetLoginData: function(){
		db.removeValue(db.USERID);
		db.removeValue(db.PASSWD);
		db.removeValue(db.REMEMBER_ME);
	}
});


function selectAll(){  
    db.db.transaction(  
        function (transaction) {  
            transaction.executeSql("SELECT * FROM DEMO;", [],  
                db.querySuccess, db.errorCB);  
        }  
    );  
}  BaseFormPanel = Ext.extend(Ext.form.FormPanel, 
{
	initComponent : function() {		
		BaseFormPanel.superclass.initComponent.call(this);
	},

	updateMessage: function(msg){
		if(this.message.el){
			this.message.el.setHTML('<div class="msg"><p >'+msg+'</p></div>');
		}
	},
	
	getMessageComp: function(){
		this.message = new Ext.Component({
			xtype : 'component',
			html : ''
		});
		return this.message;
	}

});

HomePanel = Ext.extend(Ext.Panel,{
	fullscreen : true,
    layout : {
		align:'stretch'
	},
	defaults:{
		flex : 1
	},
	initComponent : function() {

		this.registerButton = new Ext.Button({
			text : 'Register',
			width : 150,
			handler : function() {
				showPanel(registerPanel);
				registerPanel.initScreen();
			}
		}) ;
		
		this.loginButton = new Ext.Button({
			ui : 'confirm',
			text : 'Login',
			width : 150,	
			handler : function() {
				showPanel(loginPanel);
			}
		});
		
		this.setupButton = new Ext.Button({
			ui : 'confirm',
			text : 'Setup',
			width : 150,	
			handler : function() {
				showPanel(registerPanel);
			}
		});
		
		this.items = [
				{
					html : '<div class="home-panel"><br/><br/><img width="100" height="100" src="images/toastbuddy256.png"/><p class="heading">ToastBuddy</p><br/><br/><br/></div>'
				}, {
					layout : 'hbox',
					defaults : {
						flex : 1,
						style : 'margin: .5em;'
					},
					items : [ this.loginButton, this.registerButton]
				}, {
					layout : 'vbox',
					defaults : {
						style : 'margin: .5em;',
						width: 300
					},
					items : [this.setupButton]
				},
				{
					html : '<div class="link-panel"><br/><br/><br/>Visit us at <a href="http://www.toastbuddy.com">ToastBuddy.com</a></p><br/><br/><br/></div>'
				},];
		
		//this.loginButton.hide();
		//this.registerButton.hide();
		//this.setupButton.hide();
		HomePanel.superclass.initComponent.call(this);
	},
	

	showButtons:function(){
		this.loginButton.show();
		this.registerButton.show();
		this.setupButton.hide();
	},

	
	localMode:function(){
		this.loginButton.hide();
		this.registerButton.hide();
		this.setupButton.show();
	},
	
});

HtmlPage = Ext.extend(Ext.Panel, {
    autoLoad: 'about.html',
    scroll: 'vertical',
    styleHtmlContent: true,
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.title
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = {
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            };
        }
        
        this.dockedItems = toolbarBase;
        
        Ext.Ajax.request({
            url: serverUrl+this.url,
            success: function(rs){
                this.update(rs.responseText);
            },
            scope: this
        });
        HtmlPage.superclass.initComponent.call(this);
    },
	
	goBack: function(){
        this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
	}
});

Ext.reg('htmlpage', HtmlPage);AboutList = Ext.extend(Ext.Panel, {
    layout: 'card',
    initComponent: function(){
        
        this.list = new Ext.List({
            itemTpl: '<table width="100%"><tr><td><div class="page"><img width="20px" height="20px" src="{image}"/>&nbsp;&nbsp;{title}</div></td><td align="right"></td></tr></table>',
            ui: 'round',
            store: new Ext.data.Store({
                fields: ['name', 'card','image'],
                data: this.pages
            }),
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
            title: 'About'
        });
        
        this.listpanel = new Ext.Panel({
            title: 'About',
            items: this.list,
            layout: 'fit',
            dockedItems: {
                xtype: 'toolbar',
                title: 'About',
    			items : [ {
    				text : 'Back',
    				scope : this,
    				ui : 'back',
    				handler: this.goBack
    			} ]
            }
        });
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        this.items = [this.listpanel];
     
        AboutList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            var newCard = Ext.apply({}, records[0].data.card, { 
                prevCard: this.listpanel,
                title: records[0].data.title
            });            
            this.setActiveItem(Ext.create(newCard), 'slide');
        }
    },
	
	goBack: function(){
		this.hide();
		navPanel.show();
	}
});LoginPanel = Ext.extend(BaseFormPanel, {
	initComponent : function() {
		this.items = [ this.getMessageComp(),{
			xtype : 'fieldset',
			defaults : {
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ {
				xtype : 'textfield',
				name : 'userId',
				placeHolder : 'Email ID',
				useClearIcon : true,
				autoCapitalize : false,
				required:true
			}, {
				placeHolder : 'Password',
				xtype : 'passwordfield',
				name : 'password',
				useClearIcon : false,
				required:true
			}, {
				xtype : 'checkboxfield',
				name : 'rememberMe',
				label : 'Remember Me',
				value: 1
			},
			{
				layout:'hbox',
				flex:1,
           	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
				items:[
					{
						text : 'Login',
						ui : 'confirm',
						scope : this,
						width : 80,
						handler : this.login
					}, {
						text : 'Cancel',
						scope : this,
						width : 80,
						handler : this.cancel
					} 				       
				]

			}
			]
		} ];

		this.guestButton = new Ext.Button({
				text : 'Guest',
				ui : 'round',
				scope : this,
				handler : function() {
					this.user = Ext.ModelMgr.create(mockUser, 'User');
					loginPanel.loadModel(this.user);
				}
			});
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			title:'Login',
			dock : 'top',
			items : [ this.guestButton, {
				xtype : 'spacer'
			} ]
		} ];

		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			standardSubmit : false,
		});

		if(!showGuestButton){
			this.guestButton.hide();
		}
		LoginPanel.superclass.initComponent.call(this);
	},
	login : function() {
		if (this.validate()) {
			var formValues = this.getValues();
			if (formValues.rememberMe > 0) {
				db.setValue(db.USERID, formValues.userId);
				db.setValue(db.PASSWD, hex_md5(formValues.password));
				db.setValue(db.REMEMBER_ME, 1);
			} else {
				db.resetLoginData();
			}
			this.loadData(formValues.userId, hex_md5(formValues.password));
		}
	},
	
	loginWithUser: function(userId, passwd, rMe){
		this.setValues({userId: userId, password: passwd, rememberMe:rMe});
		this.login();
	},
	
	loadData : function(userId, password) {
		UserService.checkLogin(userId, password, this.onCheckLogin, this);
	},

	onMeetingDataLoad : function(data) {
		if (data.success) {
			meetingStore.loadAndFormat(data.returnVal.rows);
		} else {
			this.updateMessage('Unable to load the data');
		}
	},

	onClubMemberLoad : function(data) {
		if (data.success) {
			if (data.returnVal.clubSettings && data.returnVal.clubSettings.fillers) {
				fillers = data.returnVal.clubSettings.fillers;
			}
			// gramPanel.loadItems();
			memberStore.loadWithDefault(data.returnVal.rows);
		} else {
			this.updateMessage('Unable to load the data');
		}
	},

	onCheckLogin : function(data) {
		if (data.success) {
			this.loggedIn = true;
			thisUser = data.returnVal;
			this.hide();
			showMeetingPanel();
			
			if(data.successMessage){
			    Ext.Msg.alert('Notice', data.successMessage+'<br/><br/>', this.emptyFn);
				//alert(data.successMessage);
			}
			
			loadMask.show();
			// Loading all the datastores
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingDataLoad, this);

			loadMask.show();
			// Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);

			// memberStore.reload(thisUser.defaultClubId);
			roleStore.reload();
			
			homePanel.showButtons();
		} else {
			showPanel(this);
			this.updateMessage(data.errorMessage);
		}
	},

	emptyFn: function(){
		
	},
	
	validate : function() {
		var formValues = this.getValues();

		if (!formValues.userId || formValues.length < 5) {
			this.updateMessage('Enter a valid Email ID');
			return false;
		}

		if (!formValues.password || formValues.password < 5) {
			this.updateMessage('Enter a valid password');
			return false;
		}
		return true;
	},

	goBack: function(){
		this.cancel();
	},
	
	cancel : function() {
		this.updateMessage('');
		this.reset();
		this.hide();
		showPanel(homePanel);
	},

	logSuccess : function() {
		this.loggedIn = true;
		this.hide();
		navPanel.show();
	},

	initScreen : function() {
		loginPanel.show();
		loginPanel.updateMessage('');
		loginPanel.reset();
	}
});
RegisterPanel = Ext.extend(BaseFormPanel, 
{
	initComponent : function() {
		this.items = [ this.getMessageComp(),{
			xtype : 'fieldset',
			instructions : '<b>Please enter the information above.</b>',
			defaults : {
				required : true,
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ 
			{
				xtype : 'textfield',
				name : 'firstName',
				label : 'First Name',
				placeHolder: 'First Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:true,
				listeners : {
					change : this.capitalize
				}
			},{
				xtype : 'textfield',
				name : 'lastName',
				label : 'Last Name',
				placeHolder: 'Last Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:true,
				listeners : {
					change : this.capitalize
				}
			},{
				xtype : 'textfield',
				name : 'email',
				label : 'Email ID',
				placeHolder: 'Email ID',
				useClearIcon : true,
				autoCapitalize : false
			},{
				xtype : 'passwordfield',
				name : 'password',
				label : 'Password',
				placeHolder: 'Password',
				useClearIcon : false
			},{
				xtype : 'passwordfield',
				name : 'confirmPassword',
				placeHolder: 'Password',
				label : 'Confirm',
				useClearIcon : false
			},
			{
				layout:'hbox',
				flex:1,
           	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
				items:[
						{
							text : 'Register',
							ui : 'confirm',
							scope: this,
						    width:80,
							handler : this.register
						}, {
							text : 'Cancel',
						    width:80,
							scope: this,
							handler : this.cancel
						} 				       
			       ]
			}
			
			]
		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			title:'Register',
			dock : 'top',
			items : [ ]
		} ];
	
		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			standardSubmit : false,
			title : 'Register'
		});
		
		RegisterPanel.superclass.initComponent.call(this);	
	},
	onRegister:function(data){
    	if(data.success){
    		thisUser = data.returnVal;
    		this.registerSuccess();
    	}else{
			this.updateMessage(data.errorMessage);
    	}
	},
	register : function() {
		if(this.validate()){
			var formValues = this.getValues();
			UserService.register(formValues, this.onRegister, this);
		}
	},
	validate: function(){
		var formValues = this.getValues();
		
		if(!formValues.firstName || formValues.firstName.length<2){
			this.updateMessage('Enter your First Name');
			return false;
		}

		if(!formValues.lastName){
			this.updateMessage('Enter your Last Name');
			return false;
		}

		if(!formValues.email || !validator.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}

		if(!formValues.password || formValues.password.length<4){
			this.updateMessage('Enter valid password, atleast 4 Char long');
			return false;
		}

		if(!formValues.confirmPassword || 
				formValues.confirmPassword<5 || formValues.confirmPassword != formValues.password){
			this.updateMessage('Confirm your password');
			return false;
		}

		return true;
	},
	capitalize: function(field, value){
		this.setValue(Ext.util.Format.capitalize(value));
	},
	cancel:function() {
		this.updateMessage('');
		this.reset();
		this.hide();
		homePanel.show();
	},
	registerSuccess:function() {
		this.hide();
		this.updateMessage('Confirm your password');
		//showMeetingPanel();
		loginPanel.loginWithUser(thisUser.userId, this.getValues().password, 1);
	},
	
	initScreen: function(){
		this.reset();
		this.updateMessage('');
	},
	
	goBack: function(){
		this.cancel();
	}
});

		
SetupPanel = Ext.extend(BaseFormPanel, 
{
	initComponent : function() {
		this.items = [ this.getMessageComp(),{
			xtype : 'fieldset',
			instructions : '<b>Please enter the information above.</b>',
			defaults : {
				required : true,
				labelAlign : 'left',
				labelWidth : '40%'
			},
			items : [ 
			{
				xtype : 'textfield',
				name : 'firstName',
				label : 'First Name',
				placeHolder: 'First Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:true,
				listeners : {
					change : this.capitalize
				}
			},{
				xtype : 'textfield',
				name : 'lastName',
				label : 'Last Name',
				placeHolder: 'Last Name',
				useClearIcon : true,
				autoCapitalize : false,
				required:true,
				listeners : {
					change : this.capitalize
				}
			},{
				xtype : 'textfield',
				name : 'email',
				label : 'Email ID',
				placeHolder: 'Email ID',
				useClearIcon : true,
				autoCapitalize : false
			},
			{
				layout:'hbox',
				flex:1,
           	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
				items:[
						{
							text : 'Continue',
							ui : 'confirm',
							scope: this,
						    width:80,
							handler : this.register
						}, {
							text : 'Cancel',
						    width:80,
							scope: this,
							handler : this.cancel
						} 				       
			       ]
			}
			
			]
		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			title:'Setup',
			dock : 'top',
			items : [ ]
		} ];
	
		// Base config options
		Ext.apply(this, {
			scroll : 'vertical',
			standardSubmit : false,
			title : 'Setup'
		});
		
		RegisterPanel.superclass.initComponent.call(this);	
	},
	onRegister:function(data){
    	if(data.success){
    		thisUser = data.returnVal;
    		this.registerSuccess();
    	}else{
			this.updateMessage(data.errorMessage);
    	}
	},
	register : function() {
		if(this.validate()){
			var formValues = this.getValues();
			UserService.register(formValues, this.onRegister, this);
		}
	},
	validate: function(){
		var formValues = this.getValues();
		
		if(!formValues.firstName || formValues.firstName.length<2){
			this.updateMessage('Enter your First Name');
			return false;
		}

		if(!formValues.lastName){
			this.updateMessage('Enter your Last Name');
			return false;
		}

		if(!formValues.email || !validator.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}
		
		return true;
	},
	capitalize: function(field, value){
		this.setValue(Ext.util.Format.capitalize(value));
	},
	cancel:function() {
		this.updateMessage('');
		this.reset();
		this.hide();
		homePanel.show();
	},
	registerSuccess:function() {
		this.hide();
		this.updateMessage('Confirm your password');
		//showMeetingPanel();
		loginPanel.loadData(thisUser.userId, "noteuser");

	},
	
	initScreen: function(){
		this.reset();
		this.updateMessage('');
	},
	
	goBack: function(){
		this.cancel();
	}
});

		
NavPanel = Ext.extend(Ext.Panel, 
{
	title : 'More',
	layout : 'vbox',
	flex :1,
	iconCls:'more',
    tabId: 'userHome',
    scroll: 'vertical',
	initComponent : function() {

		this.listeners = {
			render : function() {
			},
			show : function() {
			}
		};

		this.items = [ {
			html : '<br/><table cellpadding="30" width="100%">'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="images/pictos/desktop.png" onclick="navPanel.viewMyClub()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/nervous.ico" onclick="navPanel.viewNervousTest()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">Club Board</td>'+
				'<td width="20px"></td>'+
				'<td class="label">Nervous Test</td>'+
				'</tr>'+
				'<tr align ="center"><td height="30px"></td></tr>'+
				'<tr align ="center">'+
				'<td><img width="40px" height="40px" src="images/pictos/files_text.png" onclick="navPanel.viewMyProfile()"/></td>'+
				'<td width="20px"></td>'+
				'<td><img width="40px" height="40px" src="images/pictos/unlock.png" onclick="navPanel.viewLogout()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td class="label">My Profile</td>'+
				'<td width="20px"></td>'+
				'<td class="label">Logout</td>'+
				'</tr>'+
				'<tr align ="center">'+
				'<td colspan="4"><br/><img width="40px" height="40px" src="images/pictos/help1.png" onclick="navPanel.viewHelp()"/></td>'+
				'</tr>'+
				'<tr >'+
				'<td colspan="4" class="label">Help</td>'+
				'</tr>'+
				'</table><br/>'
		} ];
		
		this.dockedItems = [ {
			title : 'ToastApp',
			xtype : 'toolbar',
			dock : 'top',
			items : []
		} ];

		NavPanel.superclass.initComponent.call(this);
	},

	viewHelp:function(){
		navPanel.hide();
		helpTabPanel.show();
	},
	
	viewMyClub:function(){
        Ext.Msg.alert('Under Construction', 'Coming Soon!'+'<br/><br/>', Ext.emptyFn);		
	},

	viewNervousTest:function(){
        //Ext.Msg.alert('Under Construction', 'Coming Soon!', Ext.emptyFn);		
		homeTabPanel.hide();
		showPanel(nervousTestPanel);
		nervousTestPanel.resetTimer();
	},

	viewMyProfile : function()
	{
		clubMemberAddPanel.resetFields(navPanel);
		clubMemberAddPanel.populateUserDetails(thisUser, "profile");
    	homeTabPanel.hide();
		showPanel(clubMemberAddPanel);
	},

	viewLogout: function(){
		db.resetLoginData();
		truncateData();
		thisUser = null;
		this.hide();
		closePanel();
		loginPanel.initScreen();
		showPanel(loginPanel);
		homePanel.showButtons();
	}

});
GramPanel = Ext.extend(BaseFormPanel, 
{
    standardSubmit : false,
    title: 'Gram',
    scroll: 'vertical',

	initComponent : function() {
        
		this.userSelector =	new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'userId',
			    label: 'Member',
			    valueField : 'id',
			    displayField : 'name',
			    store : memberDropDownStore,
			    value:undefined,
			    required : true,
			    listeners:{
			    	change: {fn: this.userUpdated, scope: this}
			    }
		});
	
		this.roleSelector = new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'role',
			    label: 'Role',
			    valueField : 'id',
			    displayField : 'description',
			    store : gramRoleStore,
			    parentForm: this,
			    scope: this,
			    listeners:{
		            change : function(selector, value){
						var values = this.parentForm.getValues();
						var obj = thisMeeting.roles[values['role']];
						if(obj.userId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							this.parentForm.updateSpinners(obj.userId);
						}else{
							this.parentForm.userSelector.reset();
							this.parentForm.updateSpinners();
						}
						this.parentForm.updateMessage('');
			        }
			    }
		});
		
		this.addMemeberButton = new Ext.Button({
			scope: this,
            text: 'Add New Member',
            width:100,
            handler: this.addNewMember
        });
		
		this.loadItems();

		

        this.dockedItems =[
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'ahCounter',
                items: [
                    {
					    text: 'Back',
		                ui: 'back',
		                scope:this,
					    handler: this.goBack
					},
					{xtype: 'spacer'}, {
						text : 'Done',
						scope : this,
						ui : 'confirm',
						handler : this.save
					}
                ]
            }
        ];
        
        GramPanel.superclass.initComponent.call(this);
	},

	loadItems: function(){
		this.spinners = new Array();
		
		this.spinnerFieldSet = new Ext.form.FieldSet({
				xtype : 'fieldset',
				title : '<table width="100%"><tr><td width="90%" >Counters</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="images/pictos/add_black.png"  onclick="gramPanel.addCustom();" />'
						+ '</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="images/pictos/delete_black2.png"  onclick="gramPanel.removeCustom();" />'
						+ '</td>'+
						'</tr></table>',
				defaults : {
					labelAlign : 'left',
					labelWidth : '40%'
				},
				items : [ this.spinners],
				instructions:'*Click <b>Done</b> before selecting next role.'
			});
		
		this.items = [this.getMessageComp(),
		              {
			xtype : 'fieldset',
			defaults : {
				labelAlign : 'left',
				labelWidth : '30%'
			},
			items : [ this.roleSelector, 
			          this.userSelector]
		},this.spinnerFieldSet,{
			layout:'hbox',
			flex:1,
       	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
			items:[
					this.addMemeberButton
			       ]

		} ];
	},
	
	
	
	userUpdated:function(selector , value){
		this.updateSpinners(value);
	},
	
	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage+" Select the next role to report.");
	        this.reset();        
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	
	addCustom: function(){
            this.msgPrompt = Ext.Msg.prompt("Enter new Counter Name", "", this.onCustom);
	},

	removeCustom: function(){
        Ext.Msg.prompt(null, "Enter Counter Name to Delete", this.onRemoveCustom);
	},

	loadSpinners: function(){
		this.spinnerFieldSet.removeAll();
		this.spinners = new Array();
		for(var i=0; i<fillers.length; i++){
			var spinner = new Ext.form.Spinner({
				xtype: 'spinnerfield',
	            name : fillers[i]+'Count',
	            minValue: 0,
	            label: fillers[i],
	            required:false
			});
			this.spinnerFieldSet.add(spinner);
			this.spinners.push(spinner);
		}
		this.doLayout();
	},

	onCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			if(fillers.indexOf(custom)>=0){
				gramPanel.updateMessage('Filler already present');
				return;
			}
			fillers.push(custom);
			var spinner = 			new Ext.form.Spinner({
				xtype: 'spinnerfield',
                name : custom+'Count',
                minValue: 0,
                label: custom,
                required:false
			});
			gramPanel.spinnerFieldSet.add(spinner);
			gramPanel.spinners.push(spinner);
			gramPanel.doLayout();
			gramPanel.saveFillers();				
		}
	},

	
	onSaveFillerss: function(data){
		if (data.success) {
			this.updateMessage("Saved filler successfully.");
		} else {
			this.updateMessage("Unable to save the filler.");
		}
	},

	saveFillers: function(){
		var clubSettings = new Object();
		clubSettings.fillers = fillers;
		
		//Loading the club members
		ClubService.saveClubSettings(thisUser.defaultClubId, clubSettings, this.onSaveFillerss, this);

	},
	
	onRemoveCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			var removed = false;
			for(var i=0; i<gramPanel.spinners.length; i++){
				var spinner = gramPanel.spinners[i];
				if(spinner.name.toLowerCase() === (custom+'Count').toLowerCase()){
					gramPanel.spinnerFieldSet.remove(spinner);					
					removed = true;
				}
			}

			for(var i=0; i<fillers.length; i++){
				var filler = fillers[i];
				if(filler.toLowerCase() === (custom).toLowerCase()){
					fillers.remove(filler);			
				}
			}

			if(!removed){
				gramPanel.updateMessage('Filler not present');
				return;
			}
			
			gramPanel.saveFillers();
		}
	},
	
	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.userId || values.userId =='none'){
			this.updateMessage('Please select the user');
			return false;
		}
		return noErrors;
	},

	save:function(){
		if(this.validate()){
	        var values = this.getValues();        
	        var selectedUser = values['userId'];
	        var selectedRole = values['role'];
	        
	        var roleObj = thisMeeting.roles[selectedRole];
	        if(roleObj){
		        roleObj.userId = selectedUser;
	        }
	        
	        if(!thisMeeting.gramLog){
	        	thisMeeting.gramLog = new Object();
	        }
	        
	        if(!thisMeeting.gramLog[selectedUser]){
	        	thisMeeting.gramLog[selectedUser] = new Object();
	        }
			
	        var countObj = thisMeeting.gramLog[selectedUser];
	        
	        for(var i=0; i<fillers.length;i++){
				var filler = fillers[i];
				countObj[filler] = values[filler+'Count'];
			}
	        MeetingService.save(thisMeeting, this.onSave, this);
		}
	},
	
	resetForm:function(){
		this.updateMessage('');
		this.reset();
	},
	

	updateSpinners : function(userId) {
		var amCount = new Object();
		if (thisMeeting.gramLog && thisMeeting.gramLog[userId]) {
			amCount = thisMeeting.gramLog[userId];
		}
		for ( var j = 0; j < fillers.length; j++) {
			var filler = fillers[j];
			var spinner = this.spinners[j];
			if (amCount && amCount[filler]) {
				spinner.setValue(amCount[filler]);
			} else {
				spinner.setValue(0);
			}
		}
	},	
	
	goBack: function() {
    	this.updateMessage('');
    	if(this.msgPrompt){
        	this.msgPrompt.hide();
    	}
    	closePanel(this);
    },
    
    addNewMember: function(){
    	clubMemberAddPanel.resetFields(gramPanel);
		showPanel(clubMemberAddPanel);
    }

});


Ext.reg('gramPanel', GramPanel);MyGramPanel = Ext.extend(BaseFormPanel, 
{
    standardSubmit : false,
    title: 'Gram',
	scroll: 'vertical',
	initComponent : function() {
		
		this.spinners = new Array();
		this.spinnerFiledSet = new Ext.form.FieldSet({
				xtype : 'fieldset',
				title : '<table width="100%"><tr><td width="90%" >Counters</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="images/pictos/add_black.png"  onclick="myGramPanel.addCustom();" />'
						+ '</td>'+
						'<td align="right" width="50px">'
						+ '<img class="imageRight" src="images/pictos/delete_black2.png"  onclick="myGramPanel.removeCustom();" />'
						+ '</td>'+
						'</tr></table>',
				defaults : {
					required : false,
					labelAlign : 'left',
					labelWidth : '40%'
				},
				items : [ this.spinners ],
				instructions : '<b>Log your counts for this meeting.</b>',
			});
		
		this.items = [ 
		               this.getMessageComp(),
		               this.spinnerFiledSet];
		
        this.dockedItems =[
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Gram Report',
                items: [
                    {
					    text: 'Cancel',
		                ui: 'back',
		                scope:this,
					    handler: this.goBack
					},
					{xtype: 'spacer'}, {
						text : 'Done',
						scope : this,
						ui : 'confirm',
						handler : this.save
					}
                ]
            }
        ];
        
        MyGramPanel.superclass.initComponent.call(this);
	},

	loadSpinners: function(){
		this.spinnerFiledSet.removeAll();
		this.spinners = new Array();
		for(var i=0; i<fillers.length; i++){
			var spinner = new Ext.form.Spinner({
				xtype: 'spinnerfield',
	            name : fillers[i]+'Count',
	            minValue: 0,
	            label: fillers[i],
	            required:false
			});
			this.spinnerFiledSet.add(spinner);
			this.spinners.push(spinner);
		}
		this.doLayout();
	},

	onSave: function(data){
		if (data.success) {
			this.goBack();
			//this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	save:function(){
        var values = this.getValues();        
        
		if(!thisMeeting.gramLog){
        	thisMeeting.gramLog = new Object();
        }        
        if(!thisMeeting.gramLog[thisUser.id]){
        	thisMeeting.gramLog[thisUser.id] = new Object();
        }
        var amCount = thisMeeting.gramLog[thisUser.id];
        for(var i=0; i<fillers.length;i++){
			var filler = fillers[i];
			amCount[filler] = values[filler+'Count'];
		}
        MeetingService.save(thisMeeting, this.onSave, this);
	},
	
	resetForm:function(){
		this.updateMessage('');
		this.reset();
	},

	load: function(){
		if(!thisMeeting.gramLog){
        	thisMeeting.gramLog = new Object();
        }        
        if(!thisMeeting.gramLog[thisUser.id]){
        	thisMeeting.gramLog[thisUser.id] = new Object();
        }        
        var amCount = thisMeeting.gramLog[thisUser.id];

		for(var j=0; j<fillers.length;j++){
			var filler = fillers[j];
			var spinner = this.spinners[j];
			if(spinner){
				if(amCount && amCount[filler]){
					spinner.setValue(amCount[filler]);
				}else{
					spinner.setValue(0);
				}
			}
		}
	},
	
	refresh: function(){
		for(var j=0; j<fillers.length;j++){
			var spinner = this.spinners[j];
			if(spinner){
				spinner.setValue(0);
			}
		}
    	this.loadSpinners();
		this.load();
	},
	
	addCustom: function(){
        this.msgPrompt = Ext.Msg.prompt(null, "Counter Name", this.onCustom);
	},
	
	removeCustom: function(){
	    Ext.Msg.prompt(null, "Enter Counter to Delete", this.onRemoveCustom);
	},
	
	onCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			if(fillers.indexOf(custom)>=0){
				myGramPanel.updateMessage('Filler already present');
				return;
			}else{
				myGramPanel.updateMessage('');
			}
			fillers.push(custom);
			var spinner = 			new Ext.form.Spinner({
				xtype: 'spinnerfield',
	            name : custom+'Count',
	            minValue: 0,
	            label: custom,
	            required:false
			});
			myGramPanel.spinnerFiledSet.add(spinner);
			myGramPanel.spinners.push(spinner);
			myGramPanel.doLayout();
			myGramPanel.saveFillers();
		}
	},
	
	onRemoveCustom: function(confirmation, custom){
		if(confirmation=='ok'){
			var removed = false;
			for(var i=0; i<myGramPanel.spinners.length; i++){
				var spinner = myGramPanel.spinners[i];
				if(spinner.name.toLowerCase() === (custom+'Count').toLowerCase()){
					myGramPanel.spinnerFiledSet.remove(spinner);					
					removed = true;
				}
			}
			
			for(var i=0; i<fillers.length; i++){
				var filler = fillers[i];
				if(filler.toLowerCase() === (custom).toLowerCase()){
					fillers.remove(filler);
				}
			}

			if(!removed){
				myGramPanel.updateMessage('Filler not present');
				return;
			}else{
				myGramPanel.updateMessage('');
			}

			myGramPanel.saveFillers();
		}
	},
	

	onSaveFillerss: function(data){
		if (data.success) {
			this.updateMessage('Saved fillers successfully.');
		} else {
			this.updateMessage('Unable to save the data.');
		}
	},

	saveFillers: function(){
		var clubSettings = new Object();
		clubSettings.fillers = fillers;
		
		//Loading the club members
		ClubService.saveClubSettings(thisUser.defaultClubId, clubSettings, this.onSaveFillerss, this);
	},

	goBack: function(){
    	this.updateMessage('');
    	if(this.msgPrompt){
    		this.msgPrompt.hide();
    	}
    	closePanel(this);
	}

});

MyTimerPanel = Ext.extend(BaseFormPanel, 
{
	scroll: 'vertical',
	url   : 'postUser.php',
	standardSubmit : false,
	type : 'myTimerPanel',
	fullscreen:true,
	initComponent : function() {
		this.roleSelector = new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'role',
			    label: 'Role',
			    valueField : 'id',
			    displayField : 'description',
			    store : timerRoleStore,
			    parentForm: this,
			    scope: this,
			    listeners:{
		            change : function(selector, value){
						var values = this.parentForm.getValues();
						var role = values['role'];
						var obj = thisMeeting.roles[role];
						if (obj && obj.timeLimits && obj.timeLimits.red > 0) {
							this.parentForm.timeLimits.red = obj.timeLimits.red;
							this.parentForm.timeLimits.green = obj.timeLimits.green;
							this.parentForm.timeLimits.yellow = obj.timeLimits.yellow;
						} else {
							if (role.substring(0, 5) == 'speak') {
								this.parentForm.timeLimits = timingStore.speech;
							}
							if (role.substring(0, 5) == 'ttRes') {
								this.parentForm.timeLimits = timingStore.ttResponse;
							}
							if (role.substring(0, 5) == 'evalu') {
								this.parentForm.timeLimits = timingStore.evaluator;
							}
						}

						if(obj && obj.userId && obj.userId!=''){
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							this.parentForm.minSpinner.setValue(Math.floor(obj.timeSpent/60));
							this.parentForm.secSpinner.setValue(obj.timeSpent%60);
							//this.parentForm.timer.setValue(getMins(obj.timeSpent));
						}else{
							this.parentForm.minSpinner.setValue(0);
							this.parentForm.secSpinner.setValue(0);
						}
						this.parentForm.updateTimeLimitSection();
						this.parentForm.updateMessage('');

		            }
			    }
		});

		this.timeIndicatorTmpl = Ext.XTemplate.from('time-indicator');
		this.timeIndicatorTmpl.compile();
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		this.timeLimits.panel = "myTimerPanel";
		var indicatorHtml = this.timeIndicatorTmpl.apply(this.timeLimits);

//		this.timer = new Ext.form.TextArea({
//			xtype : 'textareafield',
//			id : 'pClock',
//			name : 'timer',
//			value : '0:00',
//			maxLength : 6,
//			id : 'myTimer',
//			height : 50,
//			maxRows : 1,
//			parentForm : this,
//			style : 'font-weight:bold;font-size:40pt;color:#00008b;text-align:center;',
//			scope : this,
//			listeners : {
//				change : function(selector, value) {
//					this.parentForm.updateTime();
//				}
//			}
//		});

		this.minSpinner= new Ext.form.Spinner({
			label:'Minutes',
		    minValue: 0,
		    maxValue: 60,
		    parentForm: this,
		    scope: this,
			listeners : {
				change : function(selector, value) {
					this.parentForm.updateTime();
				},
				spin : function(selector, value) {
					this.parentForm.updateTime();
				}
			}
		});

		this.secSpinner = new Ext.form.Spinner({
			label:'Seconds',
		    minValue: 0,
		    maxValue: 60,
		    incrementValue: 1,
		    cycle: true,
		    parentForm: this,
		    scope: this,
			listeners : {
				change : function(selector, value) {
					this.parentForm.updateTime();
				},
				spin : function(selector, value) {
					this.parentForm.updateTime();
				}
			}
		});

		this.formFields = new Ext.form.FieldSet({
			 xtype: 'fieldset',
             defaults: {
                 required: true,
                 labelAlign: 'left',
                 labelWidth: '30%'
             },
             items: [
				this.roleSelector,
 				{
					id: 'pTimeIndicator',
					html:indicatorHtml
				}
			]
		});

		this.formSpinnerFields = new Ext.form.FieldSet({
			xtype: 'fieldset',
			title:'Time Spent',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '30%'
            },
            items: [
               {
              	 html:'	<table class="contentTable" style="width: 100%">'+
								'<tr>'+
									'<td width="100%"><div class="silverIndi" style="height: 20px"  id="ptimeColorDiv"></div></td>'+
								'</tr>'+
							'</table>'
               },
               this.minSpinner,
			   this.secSpinner
			],
			instructions : '<b>Log your time reports for this meeting.</b>',
		});

        this.items= [
                     this.getMessageComp(),
                     this.formFields,
                     this.formSpinnerFields
        ];
        
        this.dockedItems= [
            {
            	title: 'Timer Report',
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Cancel',
		                ui: 'back',
		                scope:this,
                        handler: this.goBack
                    },
                    {xtype: 'spacer'}, new Ext.Button({
	                    text: 'Done',
						scope: this,
                        ui: 'confirm',
		                handler: this.save
	                })
                ]
            }
        ];
        MyTimerPanel.superclass.initComponent.call(this);
	},

	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.role || values.role ==='0'){
			this.updateMessage('Please select the role');
			return false;
		}
		return noErrors;
	},

	onSave: function(data){
		if (data.success) {
			//this.updateMessage(data.successMessage);
	        this.reset();
	        this.goBack();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	save: function(){
		if(this.validate()){
			var values = this.getValues();        
	        var obj = thisMeeting.roles[values['role']];
	        obj.userId =  thisUser.id;
	        obj.timeSpent = parseInt(this.minSpinner.getValue())*60+parseInt(this.secSpinner.getValue());
	        	//getSecsFromStr(values.timer);
	        obj.timeLimits = this.timeLimits;
	        MeetingService.save(thisMeeting, this.onSave, this);
		}
	},


	updateTime: function(){
		//var values = this.getValues();        		
		//getSecsFromStr(values.timer);
		
		var value = parseInt(this.minSpinner.getValue())*60 +parseInt(this.secSpinner.getValue()); 
		if(value > this.timeLimits.red){
			this.updateColor("redIndi");
		}else if(value > this.timeLimits.yellow){
			this.updateColor("yellowIndi");
		}else if(value > this.timeLimits.green){
			this.updateColor("greenIndi");
		}else{
			this.updateColor("silverIndi");
		}
	},

	updateColor: function(colourClass){
		var colorDiv = document.getElementById('ptimeColorDiv');
		if(colorDiv.className != colourClass){
			colorDiv.className= colourClass;
			this.timeLimits.className = colourClass;
		}
	},

	editTimeLimit:function(){
		if(this.validate()){
			this.hide();
			timeLimitPanel.loadAndShow(this, this.timeLimits);
		}
	},

	updateTimeLimitSection:function(pTimings){
		if(pTimings){
			this.timeLimits = pTimings;
		}
		this.timeLimits.panel = "myTimerPanel";
		Ext.getCmp('pTimeIndicator').el.dom.innerHTML= this.timeIndicatorTmpl.apply(this.timeLimits);
		this.updateTime();
	},
	
	goBack: function() {
    	this.updateMessage('');
    	closePanel(this);
    },
    
	resetTimer: function(){
		this.reset();
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
        this.updateTimeLimitSection();
	}

});


Ext.reg('myTimerPanel', MyTimerPanel);TimeEditPanel = Ext.extend(BaseFormPanel, 
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

		
TimerPanel = Ext.extend(BaseFormPanel, 
{
	standardSubmit : false,
	title: 'Tim',
	scroll: 'vertical',
	initComponent : function() {

		this.userSelector =	new Ext.form.Select({
		    xtype: 'selectfield',
		    name : 'userId',
		    label: 'Member',
		    valueField : 'id',
		    displayField : 'name',
		    store : memberDropDownStore
		});

		this.roleSelector = new Ext.form.Select({
			    xtype: 'selectfield',
			    name : 'role',
			    label: 'Role',
			    valueField : 'id',
			    displayField : 'description',
			    store : timerRoleStore,
			    parentForm: this,
			    scope: this,
			    listeners:{
		            change : function(selector, value){
						var values = this.parentForm.getValues();
						var role = values['role'];
						var obj = thisMeeting.roles[role];
						if (obj && obj.timeLimits && obj.timeLimits.red > 0) {
							this.parentForm.timeLimits.red = obj.timeLimits.red;
							this.parentForm.timeLimits.green = obj.timeLimits.green;
							this.parentForm.timeLimits.yellow = obj.timeLimits.yellow;
						} else {
							if (role.substring(0, 5) == 'speak') {
								this.parentForm.timeLimits = timingStore.speech;
							}
							if (role.substring(0, 5) == 'ttRes') {
								this.parentForm.timeLimits = timingStore.ttResponse;
							}
							if (role.substring(0, 5) == 'evalu') {
								this.parentForm.timeLimits = timingStore.evaluator;
							}
						}
						if(obj && obj.userId && obj.userId!=''){
							this.parentForm.userSelector.setValue(obj.userId);
							if(!obj.timeSpent){
								obj.timeSpent = 0;
							}
							//this.parentForm.clockField.reset();
							this.parentForm.updateDivTime('0:00');
							this.parentForm.timerPanelClock.setSecs(obj.timeSpent);
						}else{
							this.parentForm.timerPanelClock.setSecs(0);
							this.parentForm.updateColor('silverIndi');
							this.parentForm.userSelector.reset();
							//this.parentForm.clockField.reset();
							this.parentForm.updateDivTime('0:00');
						}
						this.parentForm.updateTimeLimitSection();
						this.parentForm.updateMessage('');
			        }
			    }
		});

		this.timeIndicatorTmpl = Ext.XTemplate.from('time-indicator');
		this.timeIndicatorTmpl.compile();
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		this.timeLimits.panel = "timerPanel";
		var indicatorHtml = this.timeIndicatorTmpl.apply(this.timeLimits);

//		this.clockField = new Ext.form.Text({
//                xtype : 'textareafield',
//                id : 'clock',
//                name  : 'timer',
//                value : '0:00',
//                maxLength : 6,
//                height:10,
//                maxRows : 1,
//			    parentForm: this,
//			    //disabled:true,
//                style : 'font-weight:bold;font-size:40pt;color:#00008b;text-align:center;',
//			    scope: this,
//			    listeners:{
//			    		change : function(selector, value){
//			    			this.parentForm.timerPanelClock.setSecsFromStr(value);
//	    					this.parentForm.updateTime();
//			    		}
//			    	}
//				});

		this.formFields = new Ext.form.FieldSet({
			 xtype: 'fieldset',
             defaults: {
                 required: true,
                 labelAlign: 'left',
                 labelWidth: '30%'
             },
             items: [
				this.roleSelector,
				this.userSelector,
 				{
					id: 'timeIndicator',
					html:indicatorHtml
				},
                {
               	 html:'	<table class="contentTable" style="width: 100%">'+
								'<tr>'+
									'<td width="100%"><div class="silverIndi"  style="height: 20px;"  id="timeColorDiv" onclick="timerPanel.showCard();"></div></td>'+
									'<td style="text-align: right;"><img width="20px" height="20px" src="images/pictos/resize.png" onclick="timerPanel.showCard();"/></td>'+
								'</tr>'+
								'<tr><td style="text-align: center; font-size:50pt; font-weight:normal" ><div id="timerPanelTimeDiv">0:00</div></td></tr>'+
							'</table>'
                }
//				,
//				this.clockField
			]
		});

		this.startButton = new Ext.Button({
			ui : 'confirm',
			scope: this,
		    text: 'Start',
		    width:100,
            handler: this.startTimer
		});

		this.stopButton = new Ext.Button({
        	ui:'decline',
			scope: this,
            text: 'Stop',
            width:100,
            handler: this.stopTimer
        });

		this.editTimeButton = new Ext.Button({
			scope: this,
            text: 'Edit Time',
            width:100,
            handler: this.editTime
        });

		this.addMemeberButton = new Ext.Button({
			scope: this,
            text: 'Add New Member',
            width:100,
            handler: this.addNewMember
        });

        this.items= [this.getMessageComp(),
                     this.formFields,
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
							this.startButton,
							this.stopButton
					       ]

				},
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
							this.editTimeButton
					       ]

				},
				{
					layout:'hbox',
					flex:1,
               	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
					items:[
							this.addMemeberButton
					       ]

				}
        ];
    
		this.instructions= '*Click <b>Done</b> before selecting next role.';

    
        this.dockedItems= [
            {
            	title: 'Timer',
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Back',
		                ui: 'back',
		                scope:this,
                        handler: this.goBack
                    },
                    {xtype: 'spacer'},
                    new Ext.Button({
	                    text: 'Done',
						scope: this,
						ui : 'confirm',
		                handler: this.save
	                })
                ]
            }
        ];
        
		this.timerPanelClock = new Clock(this.timerEvent);

        TimerPanel.superclass.initComponent.call(this);
	},

	startTimer: function(){
		if(this.validate()){
			acquire();
			this.startButton.disabled = true;
			this.stopButton.disabled = false;
			this.updateMessage('');
			this.timerPanelClock.start();
		}
	},

	stopTimer: function(){
		release();
		this.startButton.disabled = false;
		this.stopButton.disabled = true;
		this.timerPanelClock.stop();
	},

	resetTimer: function(){
		this.timeLimits = {red:0, yellow:0, green:0, className:'silverIndi'};
		this.timerPanelClock.reset();
        this.updateTimeLimitSection();
		this.reset();
	},
	
	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.role || values.role ==='0'){
			this.updateMessage('Please select the Role');
			return false;
		}
		if(!values.userId || values.userId ==='none'){
			this.updateMessage('Please select the Member');
			return false;
		}
		return noErrors;
	},

	onSave: function(data){
		if (data.success) {
			this.updateMessage(data.successMessage+" Select the next role to report.");
	        this.timerPanelClock.reset();
	        this.updateTime();
	        this.reset();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	save: function(){
		if(this.validate()){
			var values = this.getValues();        
	        var obj = thisMeeting.roles[values['role']];
	        obj.userId =  values['userId'];
	        obj.timeSpent = this.timerPanelClock.getSecs();
	        obj.timeLimits = this.timeLimits;
	        MeetingService.save(thisMeeting, this.onSave, this);
		}
	},

	updateTime: function(){
		
//		var clock = this.formFields.items.getByKey('clock');
//		clock.setValue(this.timerPanelClock.getMins());		
		this.updateDivTime(this.timerPanelClock.getMins());
		var value = this.timerPanelClock.getSecs();
		if(value > this.timeLimits.red){
			this.updateColor("redIndi");
		}else if(value > this.timeLimits.yellow){
			this.updateColor("yellowIndi");
		}else if(value > this.timeLimits.green){
			this.updateColor("greenIndi");
		}else{
			this.updateColor("silverIndi");
		}
	},

	updateDivTime: function(time){
		document.getElementById("timerPanelTimeDiv").innerHTML =time; 
	},
	
	updateColor: function(colourClass){
		var colorDiv = document.getElementById('timeColorDiv');
		if(colorDiv.className != colourClass){
			colorDiv.className= colourClass;
			this.timeLimits.className = colourClass;
			cardPanel.updateColor(colourClass);
		}
	},

	timerEvent: function(){
		timerPanel.updateTime();
	},

	showCard: function(){
		//this.hide();
		cardPanel.showCard(this, this.timeLimits.className);
	},

	editTimeLimit:function(){
		if(this.validate()){		
			this.hide();
			timeLimitPanel.loadAndShow(this, this.timeLimits);
		}
	},

	editTime:function(){
		if(this.validate()){		
			this.hide();
			timeEditPanel.showTimeEdit(this, this.timerPanelClock.getSecs());
		}
	},

	updateTimeLimitSection:function(pTimings){
		if(pTimings){
			this.timeLimits = pTimings;
		}
		this.timeLimits.panel = "timerPanel";
		Ext.getCmp('timeIndicator').el.dom.innerHTML= this.timeIndicatorTmpl.apply(this.timeLimits);
		this.updateTime();
	},
	
	goBack: function() {
		release();
    	this.updateMessage('');
    	closePanel(this);
    },
    
    updateFromTimeEdit: function(time){
        this.timerPanelClock.setSecsFromStr(time);
        this.updateTime();
    },
    
    addNewMember: function(){
    	clubMemberAddPanel.resetFields(timerPanel);
		showPanel(clubMemberAddPanel);
    }
});

//Ext.getCmp('timeIndicator').el.dom.innerHTML='NEW'

Ext.reg('timerPanel', TimerPanel);
TableTopicPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
    layout: 'card',    
    height:'100%',
	initComponent : function() {

	this.questionTmpl = new Ext.Template([
	                                        '<div class="background"><div class="notesIndex"><p>{cardIndex}</p></div><div class="transbox"><p>{formatText}</p></div></div>',
	                                    ]);

	this.questionTmpl.compile();
	
	this.activeIndex =1;
	this.questionBase = {
	    itemTpl: 	'<div class="legislator-list-item">'+
					'<div class="legislator-tnail" style="background-image: url(./images/Stickysmall.png)"></div>'+
					'{heading}'+
					'<div class="legislator-arrow" style="background-image: url(./images/chevron_circle.png)">&nbsp;</div></div>',
	    selModel: {
	        mode: 'SINGLE',
	        allowDeselect: true
	    },
	    grouped: false,
	    indexBar: false,
	    parentPanel:this,	   
	    id:'tableTopicListPanel',
	    listeners: {
            selectionchange: {fn: this.updateDetailsPanel, scope: this}
        },
	    store: questionDataStore
	};

	this.deleteButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'delete',
    	scope:this,
        handler: this.deleteConfirm
    });
	
	this.editButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'compose',
    	scope:this,
        handler: this.editQuestion
    });

	this.addButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'add',
    	scope:this,
        handler: this.newQuestion
    });

    this.dockedItems = [
        {
            xtype: 'toolbar',
            dock: 'top',
            title:'TableTopics',
            items: [
				{
				    text: 'Back',
	                ui: 'back',
				    scope:this,
				    handler: this.goBack
				},
				{xtype: 'spacer'},
				this.deleteButton,
				this.editButton,
				this.addButton
            ]
        }
	   ];
    this.editButton.hide();
    this.deleteButton.hide();
	
	TableTopicPanel.superclass.initComponent.call(this);
	},

	goBack: function(){
		if(this.tblTopicCarouselPanel.getActiveIndex() > 0){
			this.activeIndex = 0;
			this.tblTopicCarouselPanel.setActiveItem(this.tblTopicCarouselPanel.items.get(0));
		}else{
	    	closePanel(this);
		}
	},

	loadAndShow: function(){
		if(thisMeeting.roles.tableTopics){
			var contentId = thisMeeting.id+1; //thisMeeting.roles.tableTopics.id;
			questionDataStore.contentId =  contentId;
			MeetingService.getContent(contentId, this.onTableTopicsLoad, this);
		}else{
			MeetingService.getContent(0, this.onTableTopicsLoad, this);
		}
	},
	
	onTableTopicsLoad: function(data){
		var rContent = null;
		if(data.success && data.returnVal.rows.length>0){
			rContent = eval("(" + data.returnVal.rows[0].content+ ")");
			questionDataStore.rowId = data.returnVal.rows[0].id;
			var questions = rContent.questions;				
			var rQuestions = new Array();
			if(questions){
				for(var i=0 ; i<questions.length; i++){
					if(questions[i].text && questions[i].text.length>20){
						questions[i].heading = questions[i].text.substring(0, 20)+'..';
					}else{
						questions[i].heading = questions[i].text;
					}
					rQuestions[i] = {id:questions[i].id,text:questions[i].text,cardIndex:i+1, heading:questions[i].heading};
				}
			}
			data.returnVal = rQuestions;
			if(data.returnVal.length>0){
				questionDataStore.loadData(data.returnVal);
			}else{
				questionDataStore.removeAll();
			}
		}else{
			questionDataStore.rowId = null;
			data.returnval = new Array();
			questionDataStore.removeAll();
		}
		
		if(!this.carouselInit){
			this.initCarousel();
			this.carouselInit = true;
		}else{
			this.updateCarousel();
		}
		this.show();
		this.tblTopicCarouselPanel.doLayout();
	},

	initCarousel: function(){
		var items = [];
		if(this.tblTopicCarouselPanel){
			this.remove(this.tblTopicCarouselPanel);
		}
		
		//items.push(new Ext.List(Ext.apply(this.questionBase, {})));

		this.listPanel = new Ext.List(Ext.apply(this.questionBase, {}));

		var pan =  new Ext.Panel({
		    fullscreen: true,
		    items: [this.listPanel,{html:'<div class="x-form-fieldset-instructions" ><b>Add a question using the \'+\' button </b></div>'}]
		});		
		items.push(pan);

		questionDataStore.each(function(rec){
			var data = rec.data;
            items.push({
                html: this.questionTmpl.apply(this.formatNotes(data))
            });
        }, this); 
		
		this.tblTopicCarouselPanel = new Ext.Carousel({
            items: items,
            scope:this,
            cardSwitchAnimation: 'cube',
            listeners: {
                cardswitch: {fn: this.cardChanged, scope: this}
            }
        });
        this.add(this.tblTopicCarouselPanel);
        this.cardChanged(null, null, null, this.activeIndex);
        this.doLayout();
		this.addButton.show();
		this.editButton.hide();
		this.deleteButton.hide();
	},

	updateCarousel: function(){
		var i = 1;

		if(this.tblTopicCarouselPanel.items.length > 1){
			for(var j =1 ; j<this.tblTopicCarouselPanel.items.length; j++){
				this.tblTopicCarouselPanel.remove(this.tblTopicCarouselPanel.items.get(j));
			}
	        this.addButton.show();
			this.editButton.hide();
			this.deleteButton.hide();
		}

		questionDataStore.each(function(rec){
			var data = rec.data;			
			data.cardIndex = i;
			var card = this.tblTopicCarouselPanel.items.get(i);
			if(card){
				card.el.dom.innerHTML = this.questionTmpl.apply(this.formatNotes(data));
			}else{
				this.tblTopicCarouselPanel.add({
					html: this.questionTmpl.apply(this.formatNotes(data))
				});
			}
			i++;
        }, this);		
	},
	
	listMode: function(){
		//this.updateCarousel();
		var activeCard = this.tblTopicCarouselPanel.items.get(this.activeIndex);
		if(activeCard.el && activeCard.el.dom){
			activeCard.el.dom.innerHTML = this.questionTmpl.apply(this.formatNotes(questionDataStore.getAt(this.activeIndex-1).data));
		}
		this.tblTopicCarouselPanel.setActiveItem(activeCard);
	},
	
	formatNotes: function(question){
		var obj = new Object();
		obj.id = question.id;
		obj.text = question.text;
		obj.formatText = obj.text.replace(
				// Replace out the new line character.
				new RegExp( "\\n", "g" ), "<br/>" );

		if(question && question.text && question.text.length>20){
			obj.heading = question.text.substring(0, 20)+'..';
		}else{
			obj.heading = question.text;
		}
		
		obj.cardIndex = question.cardIndex;
		return obj;
	},
	
	cardChanged:function(firstCard, newCard, oldCard, index, newIndex){
		if(index>0&&questionDataStore.getAt(index-1)){
			this.addButton.hide();
			this.editButton.show();
			this.deleteButton.show();
			this.activeIndex = index;
			this.activeQuestion = questionDataStore.getAt(index-1).data;
		}else{
			this.addButton.show();
			this.editButton.hide();
			this.deleteButton.hide();
		}
	},

	onDelete:function(data){
		if (data.success) {
			this.tblTopicCarouselPanel.remove(this.tblTopicCarouselPanel.items.get(this.activeIndex));
			this.activeIndex = 1;
			this.tblTopicCarouselPanel.setActiveItem(this.tblTopicCarouselPanel.items.get(0));
			this.loadAndShow();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	updateMessage: function(msg){
		if(this.items.get(0).titleEl){
			this.items.get(0).titleEl.setHTML('<div class="msg"><p >'+msg+'</p></div>');
		}
	},
	
	deleteConfirm : function()
	{
		Ext.Msg.confirm("Confirm delete card", "Do you want to continue?", this.deleteCard, this);
	},

	deleteCard: function(opt){
		if(opt == "yes")
		{
			questionDataStore.removeAt(this.activeIndex-1);
	        MeetingService.saveTableTopics(this.onDelete, this);
		}
	},
	

	newQuestion:function(){
		this.activeQuestion = null;
		this.editQuestion();
	},
	
	editQuestion: function(){
		tableTopicPanel.hide();
		if(!this.activeQuestion){
			var question = new Object();
			if(questionDataStore.data.length >=1){
				question.id = questionDataStore.last().data.id+1;
			}else{
				question.id = 0;
			}		
			questionDataStore.add(question);
			this.activeQuestion = question;
			this.activeIndex = 0;
		}
		questionPanel.loadQuestion(this.activeQuestion);
		//questionPanel.show();
		showPanel(questionPanel);
	},
	
	updateDetailsPanel : function(sel, records){
		if(records[0]!==undefined ){
			var carousel = this.tblTopicCarouselPanel;
			this.activeIndex = records[0].data.cardIndex;
			carousel.setActiveItem(carousel.items.get(this.activeIndex));
			this.listPanel.deselect(this.activeIndex-1);
		}
    },
    
    showActiveCard: function(){
		this.tblTopicCarouselPanel.setActiveItem(this.tblTopicCarouselPanel.items.get(this.activeIndex));
    }
});


Ext.reg('tableTopicPanel', TableTopicPanel);SpeechNoteListPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
    layout: 'card',    
    height:'100%',
	initComponent : function() {

	this.speechNoteTmpl = new Ext.Template([
                             '<div class="background"><div class="notesIndex"><p>{cardIndex}</p></div><div class="notesHeading"><p>{heading}</p></div><div class="transbox"><p>{formatText}</p></div></div>',
                         ]);
	this.speechNoteTmpl.compile();
	
	this.activeIndex =1;
	this.base = {
	    itemTpl: 	'<div class="legislator-list-item">'+
	    			'<div class="legislator-tnail" style="background-image: url(./images/Stickysmall.png)"></div>'+
	    			'{heading}'+
	    			'<div class="legislator-arrow" style="background-image: url(./images/chevron_circle.png)">&nbsp;</div></div>',
	    grouped: false,
	    indexBar: false,
	    parentPanel:this,
	    listeners: {
            selectionchange: {fn: this.updateDetailsPanel, scope: this}
        },
	    store: speechNoteDataStore
	};

	this.deleteButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'delete',
    	scope:this,
        handler: this.deleteConfirm
    });
	
	this.editButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'compose',
    	scope:this,
        handler: this.editSpeechNote
    });

	this.addButton = new Ext.Button({
        iconMask: true,
        ui: 'plain',
    	iconCls:'add',
    	scope:this,
        handler: this.newSpeechNote
    });

    this.dockedItems = [
    {
        xtype: 'toolbar',
        dock: 'top',
        title:'Cards',
        items: [
			{
			    text: 'Back',
                ui: 'back',
			    scope:this,
			    handler: this.goBack
			},
			{xtype: 'spacer'},
			this.deleteButton,
			this.editButton,
			this.addButton
        ]
    }
   ];
	
    this.editButton.hide();
    this.deleteButton.hide();
    
    SpeechNoteListPanel.superclass.initComponent.call(this);
	},
	
	loadAndShow: function(){
		if(thisMeeting.roles.speaker1){
			var contentId = thisMeeting.id; //thisMeeting.roles.speaker1.id;
			speechNoteDataStore.contentId =  contentId;
			MeetingService.getContent(contentId, this.onSpeechNotesLoad, this);
		}else{
			MeetingService.getContent(0, this.onSpeechNotesLoad, this);
		}
	},

	goBack: function(){
		if(this.speechNoteTopicCarousel.getActiveIndex() > 0){
			this.activeIndex = 0;
			this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(0));
		}else{
	    	closePanel(this);
		}
	},
	
	
	formatNotes: function(note){
		
		var obj = new Object();
		obj.id = note.id;
		obj.text = note.text;
		var firstBreak = obj.text.indexOf("\n");
		
		if(firstBreak>0){
			obj.heading = obj.text.substring(0, firstBreak);
		}else{
			obj.heading = obj.text;
		}
		if(obj.heading.length>20){
			obj.shortHeading = obj.heading.substring(0, 20)+"..";
		}else{
			obj.shortHeading = obj.heading;
		}
		if(firstBreak<0){
			obj.formatText = '';
		}else{
			obj.formatText = obj.text.substring(firstBreak+1);
		}
		obj.cardIndex = note.cardIndex;
		obj.formatText = obj.formatText.replace(
				// Replace out the new line character.
				new RegExp( "\\n", "g" ), "<br/>" );
		return obj;
	},
	
	onSpeechNotesLoad: function(data){
		
		if(data.success && data.returnVal.rows.length>0){
			rContent = eval("(" + data.returnVal.rows[0].content+ ")");
			speechNoteDataStore.rowId = data.returnVal.rows[0].id;
			var speechNotes = rContent.speechNotes;				
			var rSpeechNotes = new Array();
			if(speechNotes){
				for(var i=0 ; i<speechNotes.length; i++){
					var obj = new Object();
					obj.id = speechNotes[i].id;
					obj.text = trim(speechNotes[i].text);
					if(obj.text.indexOf("\n")>0){
						obj.heading = obj.text.substring(0, obj.text.indexOf("\n"));
					}else{
						obj.heading = obj.text;
					}
					if(obj.heading.length > 20){
						obj.heading = obj.text.substring(0, 20)+"..";
					}
					obj.cardIndex = i+1;
					rSpeechNotes[i] = obj;
				}
			}
			data.returnVal = rSpeechNotes;
			if(data.returnVal.length>0){
				speechNoteDataStore.loadData(data.returnVal);
			}else{
				speechNoteDataStore.removeAll();
			}
		}else{
			speechNoteDataStore.rowId = null;
			data.returnval = new Array();
			speechNoteDataStore.removeAll();
		}
		
		if(!this.carouselInit){
			this.initCarousel();
			this.carouselInit = true;
		}else{
			this.updateCarousel();
		}
		this.show();
		this.speechNoteTopicCarousel.doLayout();
	},
	
	initCarousel: function(){
		var items = [];
		if(this.speechNoteTopicCarousel){
			this.remove(this.speechNoteTopicCarousel);
		}
		
		this.listPanel = new Ext.List(Ext.apply(this.base, {
		}));
		
		var pan =  new Ext.Panel({
		    fullscreen: true,
		    items: [this.listPanel,{html:'<div class="x-form-fieldset-instructions" ><b>Add a card using the \'+\' button </b></div>'}]
		});		
		items.push(pan);

		speechNoteDataStore.each(function(rec){
			var data = rec.data;
            items.push({
                html: this.speechNoteTmpl.apply(this.formatNotes(data))
            });
        }, this); 
		
		
		this.speechNoteTopicCarousel = new Ext.Carousel({
            items: items,
            scope:this,
            cardSwitchAnimation: 'cube',
            listeners: {
                cardswitch: {fn: this.cardChanged, scope: this}
            }
        });
        this.add(this.speechNoteTopicCarousel);
        this.cardChanged(null, null, null, this.activeIndex);
        this.doLayout();
        this.addButton.show();
		this.editButton.hide();
		this.deleteButton.hide();
	},
	
	
	updateCarousel: function(){
		var i = 1;
		
		if(this.speechNoteTopicCarousel.items.length > 1){
			for(var j =1 ; j<this.speechNoteTopicCarousel.items.length; j++){
				this.speechNoteTopicCarousel.remove(this.speechNoteTopicCarousel.items.get(j));
			}
	        this.addButton.show();
			this.editButton.hide();
			this.deleteButton.hide();
		}
		
		speechNoteDataStore.each(function(rec){
			var data = rec.data;			
			var card = this.speechNoteTopicCarousel.items.get(i);
			if(card){
				card.el.dom.innerHTML = this.speechNoteTmpl.apply(this.formatNotes(data));
			}else{
				this.speechNoteTopicCarousel.add({
					html: this.speechNoteTmpl.apply(this.formatNotes(data))
				});
			}
			i++;
        }, this);
	},
	
	listMode: function(){
		//this.updateCarousel();
		var activeCard = this.speechNoteTopicCarousel.items.get(this.activeIndex);
		if(activeCard && activeCard.el && activeCard.el.dom){
			activeCard.el.dom.innerHTML = this.speechNoteTmpl.apply(this.formatNotes(speechNoteDataStore.getAt(this.activeIndex-1).data));
			this.speechNoteTopicCarousel.setActiveItem(activeCard);
		}else{
			activeCard = this.speechNoteTopicCarousel.items.get(0);
			this.speechNoteTopicCarousel.setActiveItem(activeCard);
		}
	},
	
	cardChanged:function(firstCard, newCard, oldCard, index, newIndex){
		if(index>0&&speechNoteDataStore.getAt(index-1)){
			this.addButton.hide();
			this.editButton.show();
			this.deleteButton.show();
			this.activeIndex = index;
			this.activeSpeechNote = speechNoteDataStore.getAt(index-1).data;
		}else{
			this.addButton.show();
			this.editButton.hide();
			this.deleteButton.hide();
		}
	},

	onDelete:function(data){
		if (data.success) {
			this.speechNoteTopicCarousel.remove(this.speechNoteTopicCarousel.items.get(this.activeIndex));
			this.activeIndex = 1;
			this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(0));
			this.loadAndShow();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	deleteConfirm : function()
	{
		Ext.Msg.confirm("Confirm delete card", "Do you want to continue?", this.deleteCard, this);
	},

	deleteCard: function(opt){
		if(opt == "yes")
		{
			speechNoteDataStore.removeAt(this.activeIndex-1);
	        MeetingService.saveSpeechNotes(this.onDelete, this);
		}
	},
	
	newSpeechNote:function(){
		this.activeSpeechNote = null;
		this.editSpeechNote();
	},
	
	editSpeechNote: function(){
		speechNoteListPanel.hide();
		if(!this.activeSpeechNote){
			var speechNote = new Object();
			if(speechNoteDataStore.data.length >=1){
				speechNote.id = speechNoteDataStore.last().data.id+1;
			}else{
				speechNote.id = 0;
			}		
			speechNoteDataStore.add(speechNote);
			this.activeSpeechNote = speechNote;
			this.activeIndex = 0;
		}
		speechNotePanel.loadSpeechNote(this.activeSpeechNote);
		showPanel(speechNotePanel);
	},
	
	updateDetailsPanel : function(sel, records){
		if(records[0]!==undefined ){
			var carousel = this.speechNoteTopicCarousel;
			this.activeIndex = records[0].data.cardIndex;
			carousel.setActiveItem(carousel.items.get(this.activeIndex));
			this.listPanel.deselect(this.activeIndex-1);
		}
    },
    
    showLastCard: function(){
		this.activeIndex = this.speechNoteTopicCarousel.items.length;
		this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(this.activeIndex));
    	this.cardChanged(null, null, null, this.activeIndex);
    },
    
    showActiveCard: function(){
		this.speechNoteTopicCarousel.setActiveItem(this.speechNoteTopicCarousel.items.get(this.activeIndex));
    	this.cardChanged(null, null, null, this.activeIndex);
    }

});


Ext.reg('speechNoteListPanel', SpeechNoteListPanel);SpeechNotePanel = Ext.extend(BaseFormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Add Card',

	initComponent : function() {

		this.formFields = [ 
		    {
				xtype : 'textareafield',
				name : 'speechNote',
				useClearIcon : true,
				height : 300,
				maxRows : 10,
				autoCapitalize : false
			}
		];

        this.items= [this.getMessageComp(),{
                xtype: 'fieldset',
    			title : 'Edit Notes:',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [this.formFields]
            }
        ];
    
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Card Note',
                items: [
                    {
                        text: 'Cancel',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    },{
						xtype : 'spacer'
					}, new Ext.Button({
						text : 'Done',
						scope : this,
						ui : 'confirm',
						handler : this.save
					})
                ]
            }
            ];
    
        SpeechNotePanel.superclass.initComponent.call(this);	
	},
	loadSpeechNote: function(pSpeechNote){
		this.updateMessage('');
		this.reset();
		for(var i=0; i< this.fields.items.length ; i++){
			var comp = this.fields.items[i];
			if(comp.name == 'speechNote'){
				comp.setValue(pSpeechNote.text);
			}
		}
		this.speechNote = pSpeechNote;
	},
	
	
	onSpeechNotesLoad: function(data){
		if (data.success) {
	    	this.hide();
	    	speechNoteListPanel.onSpeechNotesLoad(data, true);
	    	//speechNoteListPanel.updateCarousel();
	    	//speechNoteListPanel.listMode();
	    	//speechNoteListPanel.show();
			showPanel(speechNoteListPanel);
	    	speechNoteListPanel.showActiveCard();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	goBack: function(){
		MeetingService.getContent(speechNoteDataStore.contentId, this.onSpeechNotesLoad, this);
	},
	
	onSave:function(data){
		if (data.success) {
			this.goBack();
			//this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.speechNote || trim(values.speechNote) ==''){
			this.updateMessage('Please enter a valid notes');
			return false;
		}
		return noErrors;
	},

	save : function(){
		if(this.validate()){
			var values = this.getValues();
			this.speechNote.text = values.speechNotes;
			for(var i=0 ; i<speechNoteDataStore.data.length; i++){
				var qData = speechNoteDataStore.getAt(i).data;
				if(qData && qData.id == this.speechNote.id){
					qData.text = values.speechNote;
				}
			}
			//this.controller.saveTableTopics();
	        MeetingService.saveSpeechNotes(this.onSave, this);
		}
	}
});


Ext.reg('speechNotePanel', SpeechNotePanel );MyLogPanel = Ext.extend(Ext.TabPanel, {
	iconCls:'bookmarks',
    tabId: 'myLog',
    scroll: 'vertical',
    title:'My Reports',
	cls: 'legislator-tabs',
	ui:'light',
	initComponent : function() {
		
		// Meeting Detail Template
		this.gramLogTmpl = Ext.XTemplate.from('gram-log');
		this.gramLogTmpl.compile();

		// Meeting List Template
		this.timerLogTmpl = Ext.XTemplate.from('timer-log');
		this.timerLogTmpl.compile();

		// Meeting Report Template
		this.meetingLogTmpl = Ext.XTemplate.from('meeting-log');
		this.meetingLogTmpl.compile();

		// Meeting Report Template
		this.roleLogTmpl = Ext.XTemplate.from('role-log');
		this.roleLogTmpl.compile();

		this.gramLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Grammarian',
			scroll : 'vertical'
		});
		
		this.timerLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Timer',
			scroll : 'vertical'
		});

		this.meetingLogPanel = new Ext.Panel({
			html : 'Loading..',
			title : 'Roles',
			scroll : 'vertical'
		});

		this.items = [ this.gramLogPanel, this.timerLogPanel, this.meetingLogPanel];

		this.dockedItems = [ {
			xtype : 'toolbar',
			title : 'My Reports',
			dock : 'top',
			defaults : {
				iconMask : true,
				ui : 'plain'
			},
			layout : {
				pack : 'center'
			}
		} ];
		MyLogPanel.superclass.initComponent.call(this);
	},
	
	reload: function(){
		
		var gramLogs = new Array();
		var timerLogs = new Array();
		var meetingLogs = new Array();
		
		var roles = new Array();
		
		for(var j=0; j<roleStore.data.length; j++){
			var role = roleStore.data.getAt(j).data;
			roles[j] = role.id;
		}
		
		for(var i=0; i<meetingStore.data.length; i++){
			var meeting = meetingStore.getAt(i).data;
			var meetingRoles = meeting.roles;
			var meetingLog = new Object();
			meetingLog.roles = new Array();
			meetingLog.themeOfTheDay = meeting.themeOfTheDay;
			meetingLog.wordOfTheDay = meeting.wordOfTheDay;		
			meetingLog.rolesStr = 'None';
			meetingLog.fMeetingDate = meeting.fMeetingDate;
			var gramLog = new Object();
			var breakLength = 0;
			
			for ( var userId in meeting.gramLog) {
				if(userId == thisUser.id){
					var amCount = meeting.gramLog[userId];
					gramLog.amCountStr = 'None';
					gramLog.fMeetingDate = meeting.fMeetingDate;
					for ( var p in amCount) {
						if (amCount[p] > 0) {
							if (gramLog.amCountStr == 'None') {
								gramLog.amCountStr = p+':&nbsp;'+amCount[p];
							} else {
								gramLog.amCountStr += ',&nbsp;'+p+ ':' + amCount[p];
							}
							if(breakLength > 30){
								gramLog.amCountStr += '<br/>';
								breakLength = 0;
							}else{
								breakLength += ( ',&nbsp;' + p+ ':' + amCount[p]).length;
							}							
						}
					}
					gramLogs.push(gramLog);
				}
			}
			
			for(var j=1; j<roles.length; j++){
				var role = meetingRoles[roles[j]];
				if(role && role.timeSpent 
						&& role.userId == thisUser.id){ 
					var timerLog = new Object();
					timerLog.timeSpent = role.timeSpent;
					if(role.timeLimits){
						timerLog.timeLimits = role.timeLimits;
					}else{
						timerLog.timeLimits = new Object();
						timerLog.timeLimits.red = 0;
						timerLog.timeLimits.yellow = 0;
						timerLog.timeLimits.green = 0;
					}
					timerLog.role = roleStore.getRole(roles[j]).description;
					timerLogs.push(timerLog);
					timerLog.fMeetingDate = meeting.fMeetingDate;
					timerLog.colorCode = meetingListPanel.getColorCode(role.timeSpent, role.timeLimits);
				}
				if(role && role.userId == thisUser.id){ 
					if(meetingLog.rolesStr == 'None'){
						meetingLog.rolesStr = roleStore.getRole(roles[j]).description;
					}else{
						meetingLog.rolesStr += ',<br/>'+roleStore.getRole(roles[j]).description;
					}
				}
			}
			meetingLogs.push(meetingLog);
		}
		
		var wrapper = new Object();
		wrapper.gramLogs = gramLogs;
		wrapper.name = 'Grammarian Report';
		
		var html = this.gramLogTmpl.apply(wrapper);
		if(!this.gramLogPanel.el){
			this.gramLogPanel.html = html;
		}else{
			this.gramLogPanel.el.dom.innerHTML = html;
		}

		wrapper.name = 'Timer Report';
		wrapper.timerLogs = timerLogs;
		html = this.timerLogTmpl.apply(wrapper);
		if(!this.timerLogPanel.el){
			this.timerLogPanel.html = html;
		}else{
			this.timerLogPanel.el.dom.innerHTML = html;
		}

		wrapper.name = 'Meeting List';
		wrapper.meetingLogs = meetingLogs;
		html = this.meetingLogTmpl.apply(wrapper);
		if(!this.meetingLogPanel.el){
			this.meetingLogPanel.html = html;
		}else{
			this.meetingLogPanel.el.dom.innerHTML = html;
		}
	}
});
MeetingListPanel = Ext.extend(Ext.Panel, 
{	
	iconCls:'time',
    tabId: 'meetingList',
    title:'Meetings',
    fullScreen:false,
	defaults:{
		flex : 1
	},
    layout : {
		align:'stretch'
	},
	cls: 'demo-list',	
	initComponent : function() {
		// Meeting Detail Template
		this.meetingTmpl = Ext.XTemplate.from('meeting-detail');
		this.meetingTmpl.compile();

		// Meeting List Template
		this.meetingListTmpl = Ext.XTemplate.from('meeting-list');
		this.meetingListTmpl.compile();

		// Meeting Report Template
		this.meetingReportTmpl = Ext.XTemplate.from('meeting-report');
		this.meetingReportTmpl.compile();

		this.logBase = {
		    itemTpl: this.meetingListTmpl,
		    id:'meetingListPanel',
		    grouped: false,
		    parentPanel:this,
		    sorters: 'date',
		    singleSelect:true,
		    listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
		    store: this.meetingStore
		};
	
		this.meetingActionPanel = new MeetingActionPanel();
		this.meetingPanel = new Ext.Panel({xtype:'component', id:'agendaPanel', fullScreen:false,html:'Loading..', title:'Agenda',scroll: 'vertical'});
		this.meetingReportPanel = new Ext.Panel({xtype:'component', html:'Loading..', title:'Report',scroll: 'vertical'});

		this.meetingDetailTabPanel = new Ext.TabPanel({
			scroll: 'vertical',
			fullscreen : false,
			defaults:{
				flex : 1
			},
		    layout : {
		    	type: 'vbox',
		        align: 'left'
			},
			ui:'light',
			items : [ this.meetingActionPanel, this.meetingPanel, this.meetingReportPanel ],
			listeners : {
				beforecardswitch : {fn: this.meetingPanelChanged, scope: this}
			}
		});
		
        this.list = new Ext.List(Ext.apply(this.logBase, {
       		fullscreen: false
			}));
        
		this.pan =  new Ext.Panel({
		    fullscreen: true,
		    items: [this.list,{html:'<div class="x-form-fieldset-instructions" ><b>Add a meeting using the \'+\' button above</b></div>'}]
		});		

        this.pan.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);

		
	    this.meetingCarousel = new Ext.Panel({
	    	activeItem:0,
	    	height:'100%',	
        	layout: 'card',
	    	items:[this.pan
	    	    ,
	           	this.meetingDetailTabPanel
	    	]
	    });
	
	   this.items=[
	        	this.meetingCarousel
	   ];
	   
	   this.backButton = {
               text: 'Show All',
               ui: 'back',
               scope:this,
           	   id:'meetingListBackButton',
               handler: this.goBack
       };
	   
	   this.filterButtons = [ {
			xtype : 'segmentedbutton',
			allowDepress : true,
			items : [ {
				text : 'Upcoming',
				pressed : true
			}, {
				text : 'Show All',
			} ]
		} ];

	   this.filterToolBar =	  new Ext.Toolbar({
	            xtype: 'toolbar',
	            ui: 'light',
	            cls: 'grey-list-header',
	            items: [{xtype: 'spacer'},this.filterButtons,{xtype: 'spacer'}],
	            dock: 'bottom'
	   });

	   this.mainToolbar = new Ext.Toolbar({
	            title:'Meetings',
	            dock: 'top',
	            defaults: {
	                iconMask: true,
	                ui: 'plain'
	            },
	            layout: {
	                pack: 'center'
	            },
	            items: [
	                this.backButton,
	                {xtype: 'spacer'},
	                //this.deleteButton,
					{
	                    iconMask: true,
	                    ui: 'plain',
	                	iconCls:'compose',
	                	id:'meetingPanleEditIcon',
	                	scope:this,
	                    handler: function() {
	                    	homeTabPanel.hide();
	        				showPanel(meetingPanel);
	                    	//meetingListPanel.hide();
	                		//meetingPanel.show();
	                		meetingPanel.loadMeeting(this.activeMeeting);
	                    }
	                },
	                {
	                    iconMask: true,
	                    ui: 'plain',
	                	iconCls:'add',
	                	id:'meetingPanleAddIcon',
	                    handler: function() {
	                    	homeTabPanel.hide();
	        				showPanel(meetingPanel);
	        				meetingPanel.reset();
	        				meetingPanel.loadMeeting(getMeetingBareBones());
	        				//meetingListPanel.hide();
	                		//meetingPanel.reset();
	                		//meetingPanel.show();
	                    }
	                }
	            ]
	        }
	   );	
	   
	   this.dockedItems=[
	                     this.mainToolbar
	                     //,this.filterToolBar
	        ];
	   //Ext.getCmp('meetingPanleEditIcon').hide();

	   MeetingListPanel.superclass.initComponent.call(this);	
	},

	
	listMode: function(){
		this.meetingCarousel.setActiveItem(this.meetingCarousel.items.get(0));
		Ext.getCmp('meetingPanleAddIcon').show();
		Ext.getCmp('meetingPanleEditIcon').hide();
		Ext.getCmp('meetingListBackButton').hide();
		//this.deleteButton.hide();
		this.mainToolbar.setTitle("Meetings");
		this.viewMode = "LIST";
	},

	detailMode: function(){
		Ext.getCmp('meetingPanleAddIcon').hide();
		Ext.getCmp('meetingPanleEditIcon').show();
		Ext.getCmp('meetingListBackButton').show();
		//this.deleteButton.show();
		this.mainToolbar.setTitle("Meeting");
		this.viewMode = "DETAIL";
	},
	
	goHome: function(){
    	this.hide();
    	navPanel.show();
	},

	goBack: function(){
       	if(this.meetingCarousel.getActiveItem().id =='meetingListPanel'){
       		//this.hide();
           	//navPanel.show();
       	}else{
        		//this.meetingDetailPanel.setActiveItem(this.meetingDetailPanel.items.get(0), { type: 'slide', reverse: true });		            		
	    	this.listMode();
       	}
       	
	},
	
	getGramLog : function(meeting) {
		var gramLogs = new Array();
		for ( var userId in meeting.gramLog) {
			var user = memberStore.getMember(parseInt(userId));
			if(!user){
				continue;
			}
			var amCount = meeting.gramLog[userId];
			var gramLog = new Object();
			gramLog.amCountStr = 'None';
			var breakLength = 0;
			for ( var p in amCount) {
				if (amCount[p] > 0) {
					if (gramLog.amCountStr == 'None') {
						gramLog.amCountStr = p + ':&nbsp;'
								+ amCount[p];
					} else {
						gramLog.amCountStr += ',&nbsp;' + p
								+ ':' + amCount[p];
					}
					if(breakLength > 30){
						gramLog.amCountStr += '<br/>';
						breakLength = 0;
					}else{
						breakLength += ( ',&nbsp;' + p+ ':' + amCount[p]).length;
					}
				}
				gramLog.user = user.name;
			}
			gramLogs.push(gramLog);
		}
		return gramLogs;
	},

	getTimerLog : function(meeting) {
		var timerLogs = new Array();
		var roles = new Array();

		for ( var j = 0; j < timerRoleStore.data.length; j++) {
			var role = timerRoleStore.data.getAt(j).data;
			roles[j] = role.id;
		}

		var meetingRoles = meeting.roles;
		for ( var j = 1; j < roles.length; j++) {
			var role = meetingRoles[roles[j]];
			if (role && role.timeSpent && role.userId) {
				var user = memberStore.getMember(parseInt(role.userId));
				if(!user){
					continue;
				}
				var timerLog = new Object();
				timerLog.timeSpent = role.timeSpent;
				timerLog.role = roleStore.getRole(roles[j]).description;
				timerLog.user = user.name;
				timerLog.colorCode = this.getColorCode(role.timeSpent, role.timeLimits);
				timerLog.timeLimits = role.timeLimits;
				timerLogs.push(timerLog);
			}
		}
		return timerLogs;
	},
	
	getColorCode: function (timeSpent, timeLimits){
		if(timeSpent>timeLimits.red){
			return "red";
		}else if (timeSpent>timeLimits.yellow){
			return "yellow";
		}else if (timeSpent>timeLimits.green){
			return "green";
		}else{
			return "silver";
		}					
	},
	
	meetingPanelChanged: function(comp, newCard, oldCard, index) {
		var meeting = this.activeMeeting;
		if(index == 2){
    		//Set the content for the meeting report tab
    		var wrapper = new Object();
    		wrapper.name = 'Grammarian Log';
    		if(meeting.fMeetingDate){
        		wrapper.fMeetingDate = meeting.fMeetingDate;
    		}
    		wrapper.gramLogs = this.getGramLog(meeting);
    		wrapper.timerLogs = this.getTimerLog(meeting);	
    		html = this.meetingReportTmpl.apply(wrapper);		    		
    		var htmlEl = this.meetingReportPanel.el;
    		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    			this.meetingReportPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
    		}else{
	    		this.meetingReportPanel.html = html;
    		}
		}
	},
	
	
	showMeeting: function(meeting){
		var carousel = this.meetingCarousel;
		this.activeMeeting = meeting;		    		


		//Set the content for the agenda tab
		var html = this.meetingTmpl.apply(meeting);
		var htmlEl = this.meetingPanel.el;
		if(htmlEl && htmlEl.dom.childNodes[0]&& htmlEl.dom.childNodes[0].childNodes[0]){
    		this.meetingPanel.el.dom.childNodes[0].childNodes[0].innerHTML = html;
		}else{
    		this.meetingPanel.html = html;
		}
		
		var tabPanel = carousel.items.get(1);
		carousel.setActiveItem(tabPanel);
		tabPanel.setActiveItem(tabPanel.items.get(0));
		this.detailMode();
		
		//Set the header for the action panel
		this.meetingActionPanel.updateMettingHeader(meeting);
	},
	
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
        	var data = records[0].data;
    		thisMeeting = data;
    		this.showMeeting(data);
        }
    },
    
    hideFilterBar: function(){
    	//this.filterToolBar.el.hide();
    },
    
    showFilterBar: function(){
    	//this.filterToolBar.el.show();
    }

});
MeetingPanel = Ext.extend(BaseFormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Agenda',

    
	initComponent : function() {

		
		this.meetingDate = new  Ext.form.DatePicker({
			xtype : 'datepickerfield',
			name : 'meetingDate',
			label : 'Date',
			required: 'true',
			minHeight: 200,
			picker : {
				 yearFrom: 2010,
				 yearTo  : 2015
			}		
		}
		);

		this.deleteButton = new Ext.Button({
	    	scope:this,
			text:'Delete',
			ui:'decline',
	        handler: this.deleteConfirm
	    });
		
		this.formFields = [ this.meetingDate,{
            xtype: 'selectfield',
            name: 'time',
            label: 'Time',
            options: timeOptions
        }, {
			xtype : 'textfield',
			name : 'wordOfTheDay',
			id : 'wordOfTheDay',
			label : 'Word(WOTD)',
			useClearIcon : true,
			autoCapitalize : false,
			listeners : {
				change : this.capitalize
			}
		}, {
			xtype : 'textfield',
			name : 'themeOfTheDay',
			label : 'Theme',
			useClearIcon : true,
			autoCapitalize : false,
			listeners : {
				change : this.capitalize
			}
		}, {
			xtype : 'textfield',
			name : 'location',
			label : 'Location',
			useClearIcon : true,
			autoCapitalize : false
		}
		];
		
		this.roleFields = [ {
			xtype : 'selectfield',
			name : 'toastMaster',
			label : 'ToastMaster',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'grammarian',
			label : 'Grammarian',
			valueField : 'id',
			displayField : 'name',
			fullScreen: true,
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'timer',
			label : 'Timer',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'tableTopics',
			label : 'Table Topics',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'generalEvaluator',
			label : 'Gen Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];
		
		this.speech1Fields = [{
			xtype : 'selectfield',
			name : 'speaker1',
			label : 'Speaker',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator1',
			label : 'Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];
		
		this.speech2Fields = [{
			xtype : 'selectfield',
			name : 'speaker2',
			label : 'Speaker',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator2',
			label : 'Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];

		this.speech3Fields = [{
			xtype : 'selectfield',
			name : 'speaker3',
			label : 'Speaker',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}, {
			xtype : 'selectfield',
			name : 'evaluator3',
			label : 'Evaluator',
			valueField : 'id',
			displayField : 'name',
			store : memberDropDownStore
		}];

        this.items= [this.getMessageComp(),{
                xtype: 'fieldset',
    			title : 'Meeting Info',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.formFields
            },
            {
                xtype: 'fieldset',
    			title : 'Roles',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.roleFields
            },
            {
                xtype: 'fieldset',
    			title : 'Speech One',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.speech1Fields
            },
            {
                xtype: 'fieldset',
    			title : 'Speech Two',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.speech2Fields
            },
            {
                xtype: 'fieldset',
    			title : 'Speech Three',
                defaults: {
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.speech3Fields
            },
            this.deleteButton
        ];
        
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'Agenda',
                items: [
                    {
                        text: 'Cancel',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    },{
						xtype : 'spacer'
					},
                    {
                        text: 'Done',
                        ui: 'confirm',
                        scope:this,
                        handler: this.save
                    }
                ]
            }
        ];
    
 	   MeetingListPanel.superclass.initComponent.call(this);	
	},
	
	capitalize: function(field, value){
		this.setValue(Ext.util.Format.capitalize(value));
	},

	loadMeeting: function(pMeeting){
		
		this.reset();
		
		this.updateMessage('');
		for(var i=0; i< this.fields.items.length ; i++){
			var comp = this.fields.items[i];
			if(comp.name == 'wordOfTheDay'){
				comp.setValue(pMeeting.wordOfTheDay);
			}
			if(comp.name == 'meetingDate'){
				comp.setValue(pMeeting.meetingDate);
			}
			if(comp.name == 'themeOfTheDay'){
				comp.setValue(pMeeting.themeOfTheDay);
			}
			if(comp.name == 'wordOfTheDay'){
				comp.setValue(pMeeting.wordOfTheDay);
			}
			if(comp.name == 'location'){
				comp.setValue(pMeeting.location);
			}
			if(comp.name == 'speaker1'){
				if(pMeeting.roles.speaker1){
					comp.setValue(pMeeting.roles.speaker1.userId);
				}
			}
			if(comp.name == 'speaker2'){
				if(pMeeting.roles.speaker2){
					comp.setValue(pMeeting.roles.speaker2.userId);
				}
			}
			if(comp.name == 'speaker3'){
				if(pMeeting.roles.speaker3){
					comp.setValue(pMeeting.roles.speaker3.userId);
				}
			}
			if(comp.name == 'tableTopics'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.tableTopics.userId);
				}
			}
			if(comp.name == 'toastMaster'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.toastMaster.userId);
				}
			}
			if(comp.name == 'generalEvaluator'){
				if(pMeeting.roles.speaker2){
				comp.setValue(pMeeting.roles.generalEvaluator.userId);
				}
			}
			if(comp.name == 'evaluator1'){
				if(pMeeting.roles.evaluator1){
				comp.setValue(pMeeting.roles.evaluator1.userId);
				}
			}
			if(comp.name == 'evaluator2'){
				if(pMeeting.roles.evaluator2){
					comp.setValue(pMeeting.roles.evaluator2.userId);
				}
			}
			if(comp.name == 'evaluator3'){
				if(pMeeting.roles.evaluator3){
					comp.setValue(pMeeting.roles.evaluator3.userId);
				}
			}
			if(comp.name == 'grammarian'){
				if(pMeeting.roles.speaker2){
					comp.setValue(pMeeting.roles.grammarian.userId);
				}
			}
			if(comp.name == 'timer'){
				if(pMeeting.roles.speaker2){
					comp.setValue(pMeeting.roles.timer.userId);
				}
			}
			if(comp.name == 'time'){
				if(pMeeting.meetingTime && pMeeting.meetingTime !== ''){
					comp.setValue(pMeeting.meetingTime);
				}
			}
		}
		this.meeting = pMeeting;
	},

	onMeetingListDataLoad: function(data){
		if (data.success) {
			meetingStore.loadAndFormat(data.returnVal.rows);
			closePanel(this);
			if(this.meeting){
				var meeting = meetingStore.getMeeting(this.meeting.id);
				meetingListPanel.showMeeting(meeting);
			}else{
		    	meetingListPanel.listMode();
			}
			//this.hide();
	    	//meetingListPanel.show();
	    	//meetingListPanel.listMode();
		} else {
			this.updateMessage('Unable to load the data');
		}
	},

	onSave: function(data){
		if (data.success) {
			this.meeting.id = data.returnVal.id;
			this.goBack();
			//this.updateMessage(data.successMessage);
	        //this.scroller.scrollTo(0);
		} else {
			this.updateMessage(data.errorMessage);
		}
		
	},

	
	goBack: function(){
		if(this.meeting && this.meeting.id){
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingListDataLoad, this);
		}else{
			closePanel(this);
		}
	},
	
	validate: function(){
		var values = this.getValues();
		var meetingDate = values.meetingDate;
		var meetingTime = values.time;
		var noErrors = true;
		
		var fMeetingDate = "";
		if(meetingDate){
			fMeetingDate = meetingDate.format('F j, Y');
			if(meetingTime&& meetingTime !== ''){
				fMeetingDate = meetingDate.format('F j, Y')+' '+meetingTime;
			}
		}

		meetingStore.each(function(rec){
			var data = rec.data;
			if(data.id !== this.meeting.id && data.fMeetingDate === fMeetingDate){
				this.updateMessage('A meeting with this date and time already exists');
				noErrors = false;
				return false;
			}
        }, this); 
		return noErrors;
	},

	save : function(){
		if(!this.validate()){
			return false;
		}
		
		if(!this.meeting){
			this.meeting = getMeetingBareBones();
		}
		var values = this.getValues();
		this.meeting.clubId = thisUser.defaultClubId;
		this.meeting.location = values.location;
		this.meeting.meetingTime = values.time;
//		if(values.time){
//			var hours =  values.time.substring(0,2);
//			var mins =  parseInt(values.time.substring(3,5));
//			var am =  values.time.substring(6,8);
//			var iHours = 0;
//			
//			if(hours.substring(0,1)=="0"){
//				iHours = parseInt(hours.substring(1,2));
//			}else{
//				iHours = parseInt(hours.substring(1,2));
//			}			
//			if(am != "AM"){
//				iHours += 12;
//			}
//			
//			values.meetingDate.setHours(iHours);
//			values.meetingDate.setMinutes(parseInt(mins));
//		}
		this.meeting.meetingDate = values.meetingDate;
		this.meeting.wordOfTheDay = values.wordOfTheDay;
		this.meeting.themeOfTheDay = values.themeOfTheDay;
		this.meeting.roles.speaker1.userId = values.speaker1;
		this.meeting.roles.speaker2.userId = values.speaker2;
		this.meeting.roles.speaker3.userId = values.speaker3;
		this.meeting.roles.tableTopics.userId = values.tableTopics;
		this.meeting.roles.toastMaster.userId = values.toastMaster;
		this.meeting.roles.generalEvaluator.userId = values.generalEvaluator;
		this.meeting.roles.evaluator1.userId = values.evaluator1;
		this.meeting.roles.evaluator2.userId = values.evaluator2;
		this.meeting.roles.evaluator3.userId = values.evaluator2;
		this.meeting.roles.grammarian.userId = values.grammarian;
		this.meeting.roles.timer.userId = values.timer;
		
		//this.controller.save(this.meeting);
        MeetingService.save(this.meeting, this.onSave, this);
	},
	
	onDelete:function(data){
		if (data.success) {
			thisMeeting = null;
			this.meeting = null;
			MeetingService.getByClubId(thisUser.defaultClubId, this.onMeetingListDataLoad, this);
			//this.goBack();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	deleteConfirm : function()
	{
		Ext.Msg.confirm("This will delete the meeting", "Do you want to continue?", this.deleteMeeting, this);
	},

	deleteMeeting: function(opt){
		if(opt == "yes")
		{
	        MeetingService.deleteMeeting(this.meeting.id, this.onDelete, this);
		}
	}



});
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
            itemTpl: '<div id="{id}" class="contact"><img class="imageLeft" src="images/pictos/user.png"/>&nbsp;&nbsp;&nbsp;<strong>{firstName}</strong> {lastName}</div>',
            grouped: true,
            indexBar: false,
            ui:'light',
            onItemDisclosure: function(record, btn, index)
            {
            	clubMemberListPanel.onSelect(null, record.data);
            },
		    listeners: {
                selectionchange: {fn: this.onSelectionchange, scope: this}
            }
        };
        
        this.listPanel =	    	    new Ext.List(Ext.apply(this.logBase, {
            fullscreen: false
       	}));

	    this.memberPanel = new Ext.Panel({
	    	activeItem:0,
	    	height:'100%',	
        	layout: 'card',
	    	items:[this.listPanel]
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
	    		clubMemberAddPanel.resetFields(clubMemberListPanel);
	    		showPanel(clubMemberAddPanel);
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

	onSelectionchange: function(sel, record){
    	if(record[0]){
    		this.onSelect(sel, record[0].data );
    	}
    },
    
    onSelect: function(sel, record){
		homeTabPanel.hide();
		clubMemberAddPanel.resetFields(clubMemberListPanel);
		showPanel(clubMemberAddPanel);
    	clubMemberAddPanel.populateUserDetails(record, "list");
    	this.listPanel.getSelectionModel().deselectAll();
	}
});
ClubMemberAddPanel = Ext.extend(BaseFormPanel,
{
    title: 'Club Member',
	initComponent : function()
	{

		this.deleteButton = new Ext.Button({
			text:'Delete',
			ui:'drastic',
			scope:this,
			width:'90%',
			handler:this.deleteConfirm
		});

		this.editButton = new Ext.Button({
			iconMask: true,
			iconCls: 'compose',
            ui: 'plain',
			scope:this,
			handler:this.editMember
		});
		
		this.saveButton = new Ext.Button({
			text:'Done',
            ui: 'confirm',
			scope:this,
			handler:this.saveClubMember
		});
		
		this.backButton = new Ext.Button({
			text:'Cancel',
			ui:'back',
			scope:this,
			handler:this.goBack
		});
		
		this.changePasswordButton = new Ext.Button({
			text:'Change Password',
			ui:'drastic',
			scope:this,
			width:'90%',
			handler:this.showChangePasswordPanel
		});

		this.formFields = new Ext.form.FieldSet({
		    xtype:'fieldset',
            defaults: {
                labelAlign: 'left',
                labelWidth: '35%'
            },
		    items:[
		    {
		    	xtype:'hiddenfield',
		    	name:'id'
		    },
		    {
		    	xtype:'textfield',
		    	name:'fname',
		    	label:'First Name',
		    	placeHolder:'First Name',
		    	useClearIcon:true,
		    	autoCapitalize:false,
				listeners : {
					change : this.capitalize
				}
		    },
		    {
		    	xtype:'textfield',
		    	name:'lname',
		    	label:'Last Name',
		    	placeHolder:'Last Name',
		    	useClearIcon:true,
		    	autoCapitalize:false,
				listeners : {
					change : this.capitalize
				}
		    },
		    {
		    	xtype:'textfield',
		    	name:'email',
		    	label:'Email',
		    	placeHolder:'abc@abc.com',
		    	useClearIcon:true,
		    	autoCapitalize:false
		    },
		    {
		    	xtype:'textfield',
		    	name:'phone',
		    	label:'Phone',
		    	placeHolder:'XXXXXXXXXX',
		    	userClearIcon:true
		    },
		    {
		    	xtype:'textareafield',
		    	name:'aboutme',
		    	label:'About',
		    }
		    ]
		});
		
		this.items = [this.getMessageComp(),this.formFields,
		              {
							layout:'vbox',
							flex:1,
				       	 	defaults: {xtype: 'button', flex:1, style: 'margin: .5em;'},
							items:[this.changePasswordButton,this.deleteButton]
						}
		];
		
		this.dockedItems = [
		{
			xtype:'toolbar',
			dock:'top',
			title:'Member',
			items:[
			       this.backButton,
			       {
			    	   xtype:'spacer'
			       },
			       this.saveButton
			]
		}];
		
		this.changePasswordButton.hide();
		
		ClubMemberAddPanel.superclass.initComponent.call(this);
	},

	capitalize: function(field, value){
			this.setValue(Ext.util.Format.capitalize(value));
	},
	
	resetForm : function()
	{
		this.reset();
	},

	goBack : function()
	{
    	closePanel();

    	if(this.incomingReq == "list")
		{
	    	//closePanel(this);
			//Loading the club members
			//ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
		}
		else 
			//if(this.incomingReq == "profile")
		{
		}
    	//closePanel();
    	if(this.sourcePanel){
    		showPanel(this.sourcePanel);
    	}
	},

	saveClubMember : function()
	{
		if(this.validate())
		{
			var formValues = this.getValues();
			if(this.user){
				formValues.userId = this.user.userId;
			}
			if(formValues.id === thisUser.id+''){
				formValues.password = thisUser.password;
				formValues.accessKey = thisUser.accessKey;
			}
			UserService.createClubMember(formValues, this.onOperation, this);
		}
	},
	
	deleteConfirm : function()
	{
		Ext.Msg.confirm("Confirm delete user", "This user won't be accessible anymore.Do you want to continue?<br/><br/>", this.deleteMember, this);
	},
	
	deleteMember : function(opt)
	{
		var id = this.getValues().id;
		if(opt == "yes")
		{
			UserService.deleteClubMember(id, this.onOperation, this);
		}
	},
	
	onOperation : function(data)
	{
		if(data && data.success)
		{
			this.updateMessage("Changes saved successfully.");
			
			//Loading the club members
			ClubService.clubMembers(thisUser.defaultClubId, this.onClubMemberLoad, this);
		}else{
			this.updateMessage(data.errorMessage);
		}
	},

	editMember : function()
	{
		this.updateMessage('');
		this.enable();
		this.editButton.hide();
		this.saveButton.show();
		if( this.incomingReq == "list" )
		{
			this.deleteButton.show();
			this.changePasswordButton.hide();
		}
		else if( this.incomingReq == "profile" )
		{
			this.changePasswordButton.show();
		}
	},
	
	populateUserDetails : function(user, incomingReq)
	{
		this.updateMessage('');
		this.incomingReq = incomingReq;
		this.user = user;
		this.setValues({
			id:user.id,
			userId: user.userId,
			fname: user.firstName,
			lname: user.lastName,
			email: user.email,
			phone: user.phone,
			aboutme: user.aboutMe
		});
		
		//this.disable();
		//this.saveButton.hide();
		//this.deleteButton.hide();
		this.editButton.hide();
		if(user.id && user.id != '' && user.id !== thisUser.id){
			this.deleteButton.show();
			this.changePasswordButton.hide();
		}else{
			this.deleteButton.hide();
			this.changePasswordButton.show();
		}
	},
	
	showChangePasswordPanel : function()
	{
		changePasswordPanel.clear();
		showPanel(changePasswordPanel);
//		this.hide();
//		changePasswordPanel.show();
	},
	
	resetFields : function(srcPanel)
	{
		this.sourcePanel = srcPanel;
		this.reset();
		this.user = null;
		this.enable();
		this.updateMessage('');
		this.deleteButton.hide();
		this.editButton.hide();
		this.saveButton.show();
		this.changePasswordButton.hide();
	},
	
	onClubMemberLoad: function(data)
	{
		if (data.success) {
			memberStore.loadWithDefault(data.returnVal.rows);
	    	this.goBack();
		} else {
			this.updateMessage("Unable to load the members.");
		}
	},
	
	validate : function()
	{
		var formValues = this.getValues();
		if(!formValues.fname || !formValues.lname)
		{
			this.updateMessage("Enter valid First and Last name.");
			return false;
		}
		if(formValues.email && !validator.validateEmail(formValues.email))
		{
			this.updateMessage('Enter a valid email.');
			return false;
		}
		if(formValues.phone)
		{
			if(!validator.validatePhone(formValues.phone))
			{
				this.updateMessage('Enter a valid phone number');
				return false;
			}
		}
		return true;
	},
	
} );
ChangePasswordPanel = Ext.extend(BaseFormPanel,
{
	initComponent: function()
	{
		this.saveButton = new Ext.Button({
			text:'Done',
            ui: 'confirm',
			scope:this,
			handler:this.savePassword
		});
		
		this.backButton = new Ext.Button({
			text:'Cancel',
			ui:'back',
			scope:this,
			handler:this.goBack
		});
		
		this.items = [this.getMessageComp(),
		{
			xtype: 'fieldset',
			title: 'Change Your Password',
			defaults: {
				labelAlign: 'left',
                labelWidth: '35%'
			},
			items: [
			{
				id: 'id',
				xtype: 'hiddenfield',
				name: 'id'
			},
			{
				id: 'oldPassword',
				xtype: 'passwordfield',
				name: 'oldPassword',
				placeHolder: 'Password',
				label: 'Old',
				autoCapitalize: false,
				required:true
			},
			{
				id: 'newPassword',
				xtype: 'passwordfield',
				name: 'newPassword',
				placeHolder: 'Password',
				label: 'New',
				autoCapitalize: false,
				required:true
			},
			{
				id: 'reNewPassword',
				xtype: 'passwordfield',
				placeHolder: 'Password',
				name: 'reNewPassword',
				label: 'Confirm',
				autoCapitalize: false,
				required:true
			}
			]
		}
		];
		this.dockedItems = [
		{
			xtype: 'toolbar',
			dock: 'top',
			title: 'Password',
			items: [
			        this.backButton,
			        {
			        	xtype: 'spacer'
			        },
			        this.saveButton,
			]
		}];
		
		ChangePasswordPanel.superclass.initComponent.call(this);
	},	
	
	savePassword : function()
	{
		var formValues = this.getValues();
		if(this.validate())
		{
			UserService.savePassword(hex_md5(formValues.newPassword), this.onSavePassword, this);
		}
	},
	
	onSavePassword : function(data)
	{
		if (data.success) {
			this.reset();
			if(db.getValue(db.REMEMBER_ME) > 0){
				db.setValue(db.PASSWD, thisUser.password);
	        }
			this.goBack();
			this.updateMessage("Password changed successfully");
		} else {
			this.updateMessage("Unable to save the password");
		}
	},
	
	validate : function()
	{
		var formValues = this.getValues();
		if(!formValues.oldPassword || !formValues.newPassword || !formValues.reNewPassword)
		{
			this.updateMessage("Enter all the fields.");
			return false;
		}
		if(hex_md5(formValues.oldPassword) != thisUser.password)
		{
			this.updateMessage("Old password didn't match the stored password. Enter correct password.");
			return false;
		}
		if(formValues.newPassword != formValues.reNewPassword)
		{
			this.updateMessage("Values of New password and Re-enter new password don't match. Please enter again.");
			return false;
		}
		if(formValues.newPassword.length < 4){
			this.updateMessage("Please make sure new password is atleast 4 character long.");
			return false;
		}
		return true;
	},
	
	clear: function(){
		this.updateMessage('');
	},
	
	goBack : function()
	{
		showPanel(clubMemberAddPanel);
	}
});QuestionPanel = Ext.extend(BaseFormPanel, 
{	
    scroll: 'vertical',
    standardSubmit : false,
    title: 'Add Question',

	initComponent : function() {

		this.formFields = [ {
				xtype : 'textareafield',
				name : 'question',
				useClearIcon : true,
				height : 300,
				maxRows : 10,
				autoCapitalize : false
			}
		];

        this.items= [
                     this.getMessageComp(),{
                xtype: 'fieldset',
    			title : 'Edit Question:',
                defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: this.formFields
            }
        ];
    
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                title:'TableTopic',
                items: [
                    {
                        text: 'Cancel',
                        ui: 'back',
                        scope:this,
                        handler: this.goBack
                    },{
						xtype : 'spacer'
					}, new Ext.Button({
		                text: 'Done',
						scope: this,
		                ui : 'confirm',
		                handler: this.save
		            })
                ]
            }
        ];
    
        QuestionPanel.superclass.initComponent.call(this);	
	},
	loadQuestion: function(pQuestion){
		this.updateMessage('');
		this.reset();
		for(var i=0; i< this.fields.items.length ; i++){
			var comp = this.fields.items[i];
			if(comp.name == 'question'){
				comp.setValue(pQuestion.text);
			}
		}
		this.question = pQuestion;
	},
	
	goBack: function(){
		MeetingService.getContent(questionDataStore.contentId, this.onTableTopicsLoad, this);
	},
	
	onTableTopicsLoad: function(data){
		if (data.success) {
	    	this.hide();
	    	tableTopicPanel.onTableTopicsLoad(data, true);
	    	//tableTopicPanel.show();
			showPanel(tableTopicPanel);
			tableTopicPanel.showActiveCard();
		} else {
			this.updateMessage(data.errorMessage);
		}
	},

	onSave:function(data){
		if (data.success) {
			this.goBack();
			//this.updateMessage(data.successMessage);
		} else {
			this.updateMessage(data.errorMessage);
		}
	},
	
	validate: function(){
		var values = this.getValues();  
		var noErrors = true;
		if(!values.question || trim(values.question) ==''){
			this.updateMessage('Please enter a valid question');
			return false;
		}
		return noErrors;
	},

	save : function(){
		if(this.validate()){
			var values = this.getValues();
			this.question.text = values.question;
			for(var i=0 ; i<questionDataStore.data.length; i++){
				var qData = questionDataStore.getAt(i).data;
				if(qData && qData.id == this.question.id){
					qData.text = values.question;
				}
			}
			//this.controller.saveTableTopics();
	        MeetingService.saveTableTopics(this.onSave, this);
		}
	}
});


Ext.reg('questionPanel', QuestionPanel);NervousTestPanel = Ext.extend(Ext.Panel, 
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

		
CardPanel = Ext.extend(Ext.Panel, 
{
	width: 300,
	height: 500,
	loggedIn:false,	
	initComponent : function() {
		this.items = [ {
			id: 'colorCardDiv',
			html : 'RED PANEL<br>TEST PANEL<br/>'
		} ];
		
		this.dockedItems = [ {
			xtype : 'toolbar',
			dock : 'top',
			items : [ {xtype:'spacer'},{
				text : 'Close',
				width:100,
				scope: this,
				handler : this.goBack
			}]
		} ];
	
		Ext.apply(this, {
			scroll : 'vertical',
		    modal: true,
		    centered: true,
		    hideOnMaskTap: false
		});
		
		CardPanel.superclass.initComponent.call(this);	
	},
	
	showCard: function(parentPanel, colourClass){
		this.parentPanel = parentPanel;
		this.colourClass = colourClass;
		this.show();
		this.updateColor(colourClass);
	},
	
	updateColor: function(colourClass){
		if(!colourClass){
			colourClass = 'silverIndi';
		}
		if(Ext.getCmp('colorCardDiv').el){
			Ext.getCmp('colorCardDiv').el.dom.innerHTML='<div class='+colourClass+' style="width:900px;height:900px"></div>';
		}
	},
	
	goBack:function() {
		this.hide();
		this.parentPanel.show();
	}
});
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
MeetingActionPanel = Ext.extend(Ext.Panel, {
    layout: 'card',
    title : 'Actions',
	height:'100%',	
	scroll: 'vertical',
	initComponent: function(){
        this.list = new Ext.List({
            itemTpl: '<table width="100%"><tr><td><div class="page"><img width="20px" height="20px" src="images/pictos/{image}"/>&nbsp;&nbsp;{title}</div></td><td align="right"></td></tr></table>',
            ui: 'round',
            grouped: true,
            indexBar: false,
        	scroll: 'vertical',
        	height: '100%',
            store: new Ext.data.Store({
                fields: ['name', 'card'],
                getGroupString : function(record) {
            		return record.get('actionGroup');
                },
                data: [
                       {title:'Speech',name:'SpeechNotes',actionGroup:'Play A Role',image:'chat4.png'},
                       {title:'Tabletopic',name:'TableTopics',actionGroup:'Play A Role',image:'twitter2.png'},
                       {title:'Grammarian',name:'Gram',actionGroup:'Play A Role',image:'user_business.png'},
                       {title:'Timer',name:'Timer',actionGroup:'Play A Role',image:'time.png'},
                       {title:'Grammarian Report',name:'MyGram',actionGroup:'Add My Report',image:'doc_list.png'},
                       {title:'Timer Report',name:'MyTimer',actionGroup:'Add My Report',image:'doc_list.png'}]
            }),
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
            title: 'About'
        });

        this.message = new Ext.Component({
            cls: 'grey-list-header',
			xtype : 'component',
			html : 'Test'
		});
        
        this.listpanel = new Ext.Panel({
        	height: '100%',
        	items: [
                    this.message,
        	        this.list]
        });
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        //{html: '<div class="x-list-header" >'+thisMeeting.fMeetingDate+'</div>'},
        this.items = [
                      this.listpanel];
        
        MeetingActionPanel.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
        	var data = records[0].data;
        	homeTabPanel.hide();
        	if("Gram"==data.name){
				showPanel(gramPanel);
            	gramPanel.loadSpinners();
        	}else if("Timer"==data.name){
				showPanel(timerPanel);
				timerPanel.resetTimer();
			}else if("TableTopics"==data.name){
				showPanel(tableTopicPanel);
				tableTopicPanel.loadAndShow();
			}else if("SpeechNotes"==data.name){
				showPanel(speechNoteListPanel);
				speechNoteListPanel.loadAndShow();
			}else if("MyGram"==data.name){
				showPanel(myGramPanel);
				myGramPanel.refresh();
			}else if("MyTimer"==data.name){
				showPanel(myTimerPanel);
				myTimerPanel.resetTimer();
			}
        }
    },
    
    deselect: function(){
    	this.list.deselect(this.list.getSelectedRecords());
    },
    
	updateMettingHeader: function(meeting){
		if(this.message.el){
			this.message.el.setHTML('<table width="100%"><tr><td><div><p>'+meeting.fMeetingDate+'</p></div></td>'+
//					'<td align="right">'+
//					'<div class=" x-button x-button-normal" style="margin-bottom: 0.5em; margin-left: 0.5em; ">'+
//					'<span class="x-button-label" onclick="{panel}.editTimeLimit();">Change</span>'+
//					'</div></td>'+
					'</tr></table>');
		}
	}
});

Ext.reg('meetingActionPanel', MeetingActionPanel);

HtmlPage = Ext.extend(Ext.Panel, {
    autoLoad: 'about.html',
    scroll: 'vertical',
    styleHtmlContent: true,
    initComponent: function(){
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.title
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = {
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
                }
            };
        }
        
        this.dockedItems = toolbarBase;
        
        Ext.Ajax.request({
            url: serverUrl+this.url,
            success: function(rs){
                this.update(rs.responseText);
            },
            scope: this
        });
        HtmlPage.superclass.initComponent.call(this);
    },
	
	goBack: function(){
        this.ownerCt.setActiveItem(this.prevCard, { type: 'slide', reverse: true });
	}
});

Ext.reg('htmlpage', HtmlPage);UserServiceImpl = Ext.extend(Service, {

   checkLogin : function(userId, password, cb, scope) {
		var authToken = {
			userId : userId,
			password : password
		};

	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

		Ext.Ajax.request({
			url : urlStore.userUrl + '/checkLogin',
			timeout : 20,
			params : {
				json : Ext.encode(authToken)
			},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},
	
	register : function(formValues, cb, scope) { 
		var user = {
			userId : formValues.email,
			password : hex_md5(formValues.password),
			firstName : formValues.firstName,
			lastName : formValues.lastName
		};
	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.userUrl + '/register',
			params : {
				json:Ext.encode(user)
			},
            success: this.onAjaxResponse,
			failure: this.onAjaxResponse
       });
	   loadMask.show();
	},
	

	getName: function(userId){
		if(userId){
			if(memberStore.getMember(userId)){
				return memberStore.getMember(userId).name;
			}else{
				return 'Not Available';
			}
		}else{
			return 'Not Assigned';
		}
	},
	
	createClubMember : function(formValues, cb, scope)
	{
		var user = 
		{
			email : formValues.email,
			phone : formValues.phone,
			firstName : formValues.fname,
			lastName : formValues.lname,
			aboutMe: formValues.aboutme,
			userId: formValues.userId,
			password: formValues.password,
			defaultClubId: thisUser.defaultClubId,
			accessKey: formValues.accessKey,
			isEnabled: 'Y'
		};
		if(formValues.id)
		{
			user.id = formValues.id;
		}
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/create'+'?accessKey='+thisUser.accessKey,
			params: {
				json:Ext.encode(user)
			},
			success:this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url: urlStore.userUrl + '/delete'+'?accessKey='+thisUser.accessKey,
			params: {id: id},
			success:this.onAjaxResponse
		});
		loadMask.show();
	},
	
	savePassword : function(password, cb, scope)
	{
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		thisUser.password = password;
		Ext.Ajax.request({
			url: urlStore.userUrl + '/create'+'?accessKey='+thisUser.accessKey,
			params: {json:Ext.encode(thisUser)},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	}
});

UserService = new UserServiceImpl();MeetingServiceImpl = Ext.extend(Service, {
	
	
    //Get the list of meetings
	getList : function(cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/list',			
			params : {
				accessKey: thisUser.accessKey
			},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Get the meetings by club id
	getByClubId : function(clubId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/getByClubId/' + clubId,
			params : {
				accessKey: thisUser.accessKey
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the meeting
	save : function(meeting, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/save',
			params : {
				json : Ext.encode(meeting),
				accessKey: thisUser.accessKey
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Get the meetings by club id
	deleteMeeting : function(meetingId, cb, scope) {
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/delete/' + meetingId,
			params : {
				accessKey: thisUser.accessKey
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the Table Topic question
	saveTableTopics : function(cb, scope) {
		var tableTopics = new Object();
		tableTopics.meetingRoleId = questionDataStore.contentId;
		var content = new Object();
		content.questions = new Array();
		if(questionDataStore.rowId){
			tableTopics.id = questionDataStore.rowId;					
		}
		for(var i=0 ; i<questionDataStore.data.length; i++){
			var question = questionDataStore.getAt(i).data;
			content.questions[i]=question;
		}
		tableTopics.content = Ext.encode(content);
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(tableTopics),
				accessKey: thisUser.accessKey
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Save the Table Topic question
	saveSpeechNotes : function(cb, scope) {
		var speechNotes = new Object();
		speechNotes.meetingRoleId = speechNoteDataStore.contentId;
		var content = new Object();
		content.speechNotes = new Array();
		if(speechNoteDataStore.rowId){
			speechNotes.id = speechNoteDataStore.rowId;					
		}
		for(var i=0 ; i<speechNoteDataStore.data.length; i++){
			var speechNote = speechNoteDataStore.getAt(i).data;
			content.speechNotes[i]=speechNote;
		}
		speechNotes.content = Ext.encode(content);
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
			url : urlStore.meetingUrl+'/saveContent',
			params : {
				json : Ext.encode(speechNotes),
				accessKey: thisUser.accessKey
			},
			success : this.onAjaxResponse,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	},

	//Process the response to parse out the content
	onGetContent: function(response, args, cb, scope) {
		loadMask.hide();
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },

    
	//Get the content for a specific meetingrole
	getContent : function(contentId, cb, scope) {
	    this.onGetContent = Ext.createDelegate(MeetingServiceImpl.prototype.onGetContent, scope || window, [cb, scope], true);
		Ext.Ajax.request( {
 			url : urlStore.meetingUrl + '/getContent/'+contentId,
			params : {
				accessKey: thisUser.accessKey
			},
			success : this.onGetContent,
			failure: this.onAjaxResponse
		});
		loadMask.show();
	}
});
ClubServiceImpl = Ext.extend(Service, {

	onClubMembers: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		if (data.success) {
			var members = data.returnVal.members;
			data.returnVal.rows = new Array();
			for(id in members){
				var member = members[id];
				member.name = member.firstName+' '+member.lastName;
				data.returnVal.rows.push(member);
			}
		}cb.call(scope || window, data);
		loadMask.hide();
    },
    
    clubMembers : function(clubId, cb, scope) {
		loadMask.show();
	    this.onClubMembers = Ext.createDelegate(ClubServiceImpl.prototype.onClubMembers, scope || window, [cb, scope], true);
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/get/'+clubId,
			params : {
				accessKey: thisUser.accessKey
			},
			success: this.onClubMembers,
			failure: this.onAjaxResponse
		});
	},

    saveClubSettings: function(clubId, settings, cb, scope){
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
	    var club = {
	    	id: clubId,
	    	clubSettings: settings
	    };
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/saveSettings',
			params : {
				json : Ext.encode(club),
				accessKey: thisUser.accessKey
			},
			success: this.onAjaxResponse,
			failure: this.onAjaxResponse
		});    	
		loadMask.show();
    }
});

UserDAOImpl = Ext.extend(Object, {
	maxId : 0,
	
	save : function(pUser)
	{
		var users = this.getData();
		var dUser = null;
		if(pUser.id)
		{
			dUser = users[pUser.id];
		}else{
			dUser = new Object();
			dUser.id = this.getNextId();
			pUser.id = dUser.id;
			users[dUser.id] = dUser;
		}
		dUser.email = pUser.email;
		dUser.phone = pUser.phone;
		dUser.firstName = pUser.firstName;
		dUser.lastName = pUser.lastName;
		dUser.dirty = true;
		dUser.aboutMe = pUser.aboutMe;
		dUser.userId = pUser.userId;
		dUser.password = pUser.password;
		dUser.defaultClubId = pUser.defaultClubId;
		dUser.accessKey = pUser.accessKey;
		dUser.isEnabled = pUser.isEnabled;
		
		this.setData(users);
	},

	getUser: function(id){
		if(!id){
			return null;
		}
		var users = this.getData();
		return users[id];
	},

	getNextId: function(){
		var id = db.getValue(db.USER_ID);
		if(id){
			id = parseInt(id);
			id++;
		}else{
			id = 1;
		}
		db.setValue(db.USER_ID, id);
		return id;
	},
	
	getData: function(){
		var json = db.getValue(db.USER);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.USER, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.USER, '({})');
	},

	setData: function(obj){
		db.setValue(db.USER, Ext.encode(obj));
	}
});

var userDAO = new UserDAOImpl();ClubDAOImpl = Ext.extend(Object, {
	maxId : 0,
	save : function(club)
	{
		this.setData(club);
	},

	deleteObject: function(id){
		var meetings = this.getData();
		if(!id)
		{
			return null;
		}
		meetings[id] = null;
		this.setData(meetings);
	},

	getData: function(){
		var json = db.getValue(db.CLUB);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.CLUB, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.CLUB, '({})');
	},

	setData: function(obj){
		db.setValue(db.CLUB, Ext.encode(obj));
	}
});

var clubDAO = new ClubDAOImpl();LocalUserServiceImpl = Ext.extend(Service, {

	getName: function(userId){
		if(userId){
			if(memberStore.getMember(userId)){
				return memberStore.getMember(userId).name;
			}else{
				return 'Not Available';
			}
		}else{
			return 'Not Assigned';
		}
	},
	
	register : function(formValues, cb, scope) { 
		var user = {
			userId : formValues.email,
			firstName : formValues.firstName,
			lastName : formValues.lastName
		};
		userDAO.save(user);
		db.setValue(db.THIS_USER, Ext.encode(user));
		
	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

	    var returnVal = new Object({
			success:'true',
			returnVal: user
		});
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});

	    this.onAjaxResponse(response, null, cb, scope);
	},
	
	 checkLogin : function(userId, password, cb, scope) {
	    
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

	    var returnVal = new Object({
			success:'true',
			returnVal: db.getValue(db.THIS_USER)
		});
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		
		this.onAjaxResponse(response, null, cb, scope);
	},
		
	createClubMember : function(formValues, cb, scope)
	{
		var user = 
		{
			email : formValues.email,
			phone : formValues.phone,
			firstName : formValues.fname,
			lastName : formValues.lname,
			aboutMe: formValues.aboutme,
			userId: formValues.userId,
			password: formValues.password,
			defaultClubId: thisUser.defaultClubId,
			accessKey: formValues.accessKey,
			isEnabled: 'Y'
		};
		if(formValues.id)
		{
			user.id = formValues.id;
		}
		
		userDAO.save(user);
		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		var response = new Object({
			responseText: 'Done'
		});
		this.onAjaxResponse(Ext.encode(response), null, cb, scope);
	},
	
	savePassword : function(password, cb, scope)
	{
		var response = new Object({
			responseText: 'Done'
		});
		this.onAjaxResponse(Ext.encode(response), null, cb, scope);
	}
});


LocalClubServiceImpl = Ext.extend(Service, {

	onClubMembers: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		if (data.success) {
			var members = data.returnVal.members;
			data.returnVal.rows = new Array();
			for(id in members){
				var member = members[id];
				member.name = member.firstName+' '+member.lastName;
				data.returnVal.rows.push(member);
			}
		}cb.call(scope || window, data);
		loadMask.hide();
    },
    
    clubMembers : function(clubId, cb, scope) {	    
		var users = userDAO.getData();
		var clubData = clubDAO.getData();
		
		var returnVal = new Object({
			success:'true',
			returnVal: {
				clubId: 'PERSONAL',
				clubName: 'MyName',
				members: users,
				clubSettings: clubData.clubSettings
			}
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onClubMembers(response, null, cb, scope);
	},

    saveClubSettings: function(clubId, settings, cb, scope){
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
	    var club = new Object({
	    	id: clubId,
	    	clubSettings: settings
	    });
		clubDAO.save(club);
    }
});

MeetingDAOImpl = Ext.extend(Object, {
	maxId : 0,
	
	save : function(pMeeting)
	{
		var meetings = this.getData();
		if(!pMeeting.id)
		{
			pMeeting.id = this.getNextId();
		}
		meetings[pMeeting.id] = pMeeting;
		pMeeting.dirty = true;
		this.setData(meetings);
	},

	deleteObject: function(id){
		var meetings = this.getData();
		if(!id)
		{
			return null;
		}
		meetings[id] = null;
		this.setData(meetings);
	},

	getNextId: function(){
		var id = db.getValue(db.MEETING_ID);
		if(id){
			id = parseInt(id);
			id++;
		}else{
			id = 1;
		}
		db.setValue(db.MEETING_ID, id);
		return id;
	},
	
	getData: function(){
		var json = db.getValue(db.MEETING);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.MEETING, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.MEETING, '({})');
	},

	setData: function(obj){
		db.setValue(db.MEETING, Ext.encode(obj));
	}
});

var meetingDAO = new MeetingDAOImpl();LocalMeetingServiceImpl = Ext.extend(Service, {
	
	
    //Get the list of meetings
	getList : function(cb, scope) {
		
	    var meetings = meetingDAO.getData();

	    
		var meetingArray = new Array();
		for(var id in meetings){
			if(meetings[id]){
				meetingArray.push(meetings[id]);
			}
		}
	    
	    var returnVal = {
				"success" : true,
				"returnVal" : {
					"size" : meetingArray.length,
					"rows" :meetingArray
				}
		};
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);

	},

	//Get the meetings by club id
	getByClubId : function(clubId, cb, scope) {
	    this.getList(cb, scope);
	},

	//Save the meeting
	save : function(meeting, cb, scope) {
	    meetingDAO.save(meeting);		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true',
			successMessage : 'Saved successfully.',
			returnVal: meeting
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);		
	},

	//Get the meetings by club id
	deleteMeeting : function(meetingId, cb, scope) {
	    meetingDAO.deleteObject(meetingId);		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true',
			successMessage : 'Deleted successfully.'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Save the Table Topic question
	saveTableTopics : function(cb, scope) {
		var tableTopics = new Object();
		tableTopics.meetingRoleId = questionDataStore.contentId;
		var content = new Object();
		content.questions = new Array();
		if(questionDataStore.rowId){
			tableTopics.id = questionDataStore.rowId;
		}
		for(var i=0 ; i<questionDataStore.data.length; i++){
			var question = questionDataStore.getAt(i).data;
			content.questions[i]=question;
		}
		tableTopics.content = Ext.encode(content);
		console.log(tableTopics);		
		meetingRoleContentDAO.save(tableTopics);	
		var returnVal = new Object({
			success:'true',
			successMessage : 'Saved successfully.'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Save the Table Topic question
	saveSpeechNotes : function(cb, scope) {
		var speechNotes = new Object();
		speechNotes.meetingRoleId = speechNoteDataStore.contentId;
		var content = new Object();
		content.speechNotes = new Array();
		if(speechNoteDataStore.rowId){
			speechNotes.id = speechNoteDataStore.rowId;					
		}
		for(var i=0 ; i<speechNoteDataStore.data.length; i++){
			var speechNote = speechNoteDataStore.getAt(i).data;
			content.speechNotes[i]=speechNote;
		}
		speechNotes.content = Ext.encode(content);

		console.log(speechNotes);		
		meetingRoleContentDAO.save(speechNotes);		
		var returnVal = new Object({
			success:'true',
			successMessage : 'Saved successfully.'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},

	//Process the response to parse out the content
	onGetContent: function(response, args, cb, scope) {
		loadMask.hide();
		var data = eval("(" + response.responseText + ")");
        cb.call(scope || window, data);
    },

    
	//Get the content for a specific meetingrole
	getContent : function(contentId, cb, scope) {
		
		var contentList = meetingRoleContentDAO.getData();
		
		var contentArray = new Array();
		for(var id in contentList){
			if(contentList[id] && contentList[id].meetingRoleId == contentId){
				contentArray.push(contentList[id]);
			}
		}
		
		var returnVal = {
				"success" : true,
				"returnVal" :  {
					"rows" :contentArray
				}
		};
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onGetContent(response, null, cb, scope);
	}
});

MeetingRoleContentDAOImpl = Ext.extend(Object, {
	maxId : 0,
	
	save : function(roleContent)
	{
		var contents = this.getData();
		if(!roleContent.id)
		{
			roleContent.id = this.getNextId();
		}
		contents[roleContent.id] = roleContent;
		roleContent.dirty = true;
		this.setData(contents);
	},

	deleteObject: function(id){
		var contents = this.getData();
		if(!id)
		{
			return null;
		}
		contents[id] = null;
		this.setData(contents);
	},

	getNextId: function(){
		var id = db.getValue(db.MEETINGROLECONTENT_ID);
		if(id){
			id = parseInt(id);
			id++;
		}else{
			id = 1;
		}
		db.setValue(db.MEETINGROLECONTENT_ID, id);
		return id;
	},
	
	getData: function(){
		var json = db.getValue(db.MEETINGROLECONTENT);
		if(json){
			return eval('('+json+')');
		}else{
			db.setValue(db.MEETINGROLECONTENT, '({})');
			return eval('({})');
		}
	},

	deleteAll: function(){
		db.setValue(db.MEETINGROLECONTENT, '({})');
	},

	setData: function(obj){
		db.setValue(db.MEETINGROLECONTENT, Ext.encode(obj));
	}
});

var meetingRoleContentDAO = new MeetingRoleContentDAOImpl();LocalClubServiceImpl = Ext.extend(Service, {

	onClubMembers: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		if (data.success) {
			var members = data.returnVal.members;
			data.returnVal.rows = new Array();
			for(id in members){
				var member = members[id];
				member.name = member.firstName+' '+member.lastName;
				data.returnVal.rows.push(member);
			}
		}cb.call(scope || window, data);
		loadMask.hide();
    },
    
    clubMembers : function(clubId, cb, scope) {	    
		var users = userDAO.getData();
		var clubData = clubDAO.getData();
		
		var returnVal = new Object({
			success:'true',
			returnVal: {
				clubId: 'PERSONAL',
				clubName: 'MyName',
				members: users,
				clubSettings: clubData.clubSettings
			}
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onClubMembers(response, null, cb, scope);
	},

    saveClubSettings: function(clubId, settings, cb, scope){
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
	    var club = new Object({
	    	id: clubId,
	    	clubSettings: settings
	    });
		clubDAO.save(club);
    }
});

LocalUserServiceImpl = Ext.extend(Service, {

	getName: function(userId){
		if(userId){
			if(memberStore.getMember(userId)){
				return memberStore.getMember(userId).name;
			}else{
				return 'Not Available';
			}
		}else{
			return 'Not Assigned';
		}
	},
	
	register : function(formValues, cb, scope) { 
		var user = {
			userId : formValues.email,
			firstName : formValues.firstName,
			lastName : formValues.lastName
		};
		userDAO.save(user);
		db.setValue(db.THIS_USER, Ext.encode(user));
		
	    this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

	    var returnVal = new Object({
			success:'true',
			returnVal: user
		});
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});

	    this.onAjaxResponse(response, null, cb, scope);
	},
	
	 checkLogin : function(userId, password, cb, scope) {
	    
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);

	    var returnVal = new Object({
			success:'true',
			returnVal: db.getValue(db.THIS_USER)
		});
	    
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		
		this.onAjaxResponse(response, null, cb, scope);
	},
		
	createClubMember : function(formValues, cb, scope)
	{
		var user = 
		{
			email : formValues.email,
			phone : formValues.phone,
			firstName : formValues.fname,
			lastName : formValues.lname,
			aboutMe: formValues.aboutme,
			userId: formValues.userId,
			password: formValues.password,
			defaultClubId: thisUser.defaultClubId,
			accessKey: formValues.accessKey,
			isEnabled: 'Y'
		};
		if(formValues.id)
		{
			user.id = formValues.id;
		}
		
		userDAO.save(user);
		
		this.onAjaxResponse = Ext.createDelegate(UserServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
		var returnVal = new Object({
			success:'true'
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onAjaxResponse(response, null, cb, scope);
	},
	
	deleteClubMember : function(id, cb, scope)
	{
		var response = new Object({
			responseText: 'Done'
		});
		this.onAjaxResponse(Ext.encode(response), null, cb, scope);
	},
	
	savePassword : function(password, cb, scope)
	{
		var response = new Object({
			responseText: 'Done'
		});
		this.onAjaxResponse(Ext.encode(response), null, cb, scope);
	}
});


LocalClubServiceImpl = Ext.extend(Service, {

	onClubMembers: function(response, args, cb, scope) {
		var data = eval("(" + response.responseText + ")");
		if (data.success) {
			var members = data.returnVal.members;
			data.returnVal.rows = new Array();
			for(id in members){
				var member = members[id];
				member.name = member.firstName+' '+member.lastName;
				data.returnVal.rows.push(member);
			}
		}cb.call(scope || window, data);
		loadMask.hide();
    },
    
    clubMembers : function(clubId, cb, scope) {	    
		var users = userDAO.getData();
		var clubData = clubDAO.getData();
		
		var returnVal = new Object({
			success:'true',
			returnVal: {
				clubId: 'PERSONAL',
				clubName: 'MyName',
				members: users,
				clubSettings: clubData.clubSettings
			}
		});
		var response = new Object({
			responseText: Ext.encode(returnVal)
		});
		this.onClubMembers(response, null, cb, scope);
	},

    saveClubSettings: function(clubId, settings, cb, scope){
	    this.onAjaxResponse = Ext.createDelegate(MeetingServiceImpl.prototype.onAjaxResponse, scope || window, [cb, scope], true);
	    var club = new Object({
	    	id: clubId,
	    	clubSettings: settings
	    });
		clubDAO.save(club);
    }
});

/*
mainCardPanel

	|_ homePanel
	|_ loginPanel
	|_ navPanel
	|_ registerPanel
	|_ homeTabPanel
		|_ meetingListpanel 
			|_ meetingPanel
		|_ myLogPanel
		|_ clubMemberListPanel
		|_ navPanel
	|_ meetingPanel
	|_ myGramPanel
	|_ myTimerPanel
	|_ timerPanel
	|_ cardPanel	
	|_ timeLimitPanel
	|_ gramPanel
	|_ tableTopicPanel
	|_ questionPanel
	|_ speechNoteListPanel
	|_ speechNotePanel
	|_ helpTabPanel
	|_ nervousTestPanel
	|_ clubMemberAddPanel
 */

Ext.setup({
    tabletStartupScreen: 'icon.png',
    phoneStartupScreen: 'icon.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        db = new AppDB();
        db.init();
        validator = new Validator();
        
        homePanel = new HomePanel();
        loginPanel = new LoginPanel();
    	alert('Login required:'+loginRequired);
        if(loginRequired){
            registerPanel = new RegisterPanel();
        }else{
            registerPanel = new SetupPanel();
            homePanel.localMode();
        }
        navPanel = new NavPanel();
        gramPanel = new GramPanel();
        myGramPanel = new MyGramPanel();
        timerPanel = new TimerPanel();
        myTimerPanel = new MyTimerPanel();
        tableTopicPanel = new TableTopicPanel({
        	store : questionDataStore
        });
        
        speechNotePanel = new SpeechNotePanel();
        myLogPanel = new MyLogPanel({
        	store : meetingStore
        });        
        meetingListPanel = new MeetingListPanel({
        	meetingStore : meetingStore
        });
        clubMemberListPanel = new ClubMemberListPanel();
        clubMemberAddPanel = new ClubMemberAddPanel();
        changePasswordPanel = new ChangePasswordPanel();
        
        meetingPanel = new MeetingPanel({
        	meetingStore : meetingStore
        });

        questionPanel = new QuestionPanel();

        //helpPanel = new HelpPanel();
        //roleHelpPanel = new RoleHelpPanel();
        
        helpTabPanel =  new AboutList({
                title: 'About',
                xtype: 'aboutlist',
                iconCls: 'info',
                pages: aboutPages
            });
        
        nervousTestPanel = new NervousTestPanel();
        
        cardPanel = new CardPanel();
        timeLimitPanel = new TimeLimitPanel();
        timeEditPanel = new TimeEditPanel();
        
        speechNoteListPanel = new SpeechNoteListPanel();
        
        loadMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});

        homeTabPanel = new Ext.TabPanel({
        	tabBar:{
        		dock:'bottom',
        		height:50,
        		layout:{
        			pack:'center'
        		}
        	},
        	layout: 'card',
            fullscreen: true,
            cardSwitchAnimation:'fade',
            ui:'light',
            items: [meetingListPanel, clubMemberListPanel,myLogPanel, navPanel],
			listeners : {
				beforecardswitch : {fn: logSelected, scope: this}
			}
        });   
        
        
        mainCardItems = [
                         homePanel,				//0
                         loginPanel, 
                         registerPanel,
                         homeTabPanel,
                         meetingPanel,
                         myGramPanel, 			//5
                         myTimerPanel,
                         timerPanel, 
                         cardPanel,
                         timeLimitPanel,
                         gramPanel,				//10
                         tableTopicPanel,
                         questionPanel,
                         speechNoteListPanel,
                         speechNotePanel,
                         helpTabPanel,
                         nervousTestPanel ,
                         clubMemberAddPanel,
                         changePasswordPanel,
                         timeEditPanel
                         ];

        mainCardPanel = new Ext.Panel({
        	layout: 'card',
            iconCls:'home',
            fullscreen: true,
            items: mainCardItems,
			listeners : {
				beforecardswitch : {fn: logMainSelected, scope: this}
			}
        });  
        
        document.addEventListener("backbutton", backKeyDown, true);
        
        if(loginRequired){
        	UserService = new UserServiceImpl();
        	MeetingService = new MeetingServiceImpl();
        	ClubService = new ClubServiceImpl();
            
        	loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        }else{
        	UserService = new LocalUserServiceImpl();
        	MeetingService = new LocalMeetingServiceImpl();
        	ClubService = new LocalClubServiceImpl();

        	if(db.getValue(db.THIS_USER)){
        		thisUser = db.getValue(db.THIS_USER);
                loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        	}else{
        		
        	}
        	//thisUser = 
            //registerPanel = new SetupPanel();
            //homePanel.localMode();
        }
        
        
        /*
        if(db.getValue(db.REMEMBER_ME) > 0){
        	loginPanel.loadData(db.getValue(db.USERID), db.getValue(db.PASSWD));
        }else{
        	homePanel.showButtons();
        }*/
        
    }
});

var UserService;
var MeetingService;
var ClubService;

var validator;
var db;
var homeTabPanel;
var mainPanel;
var loginPanel;
var homePanel;
var navPanel;
var gramPanel;
var timerPanel;
var speakerPanel;
var tableTopicPanel;
var myLogPanel;
var meetingListPanel;
var mainCardPanel;
var rolePanel;
var helpPanel;
var meetingPanel;
var clubMemberListPanel;
var clubMemberAddPanel;
var roleHelpPanel;
var questionPanel;
var myGramPanel;
var myTimerPanel;
var speechNoteListPanel;
var speechNotePanel;
var cardPanel;
var timeLimitPanel;
var clubMemberListPanel;
var changePasswordPanel;
var nervousTestPanel ;

function logSelected(comp, newCard, oldCard, index) {
	if(index == 2){
		myLogPanel.reload();
	}
	if(index != 3){
		helpTabPanel.hide();
	}
	currentPanel = newCard;
}

function closePanel(){
	mainCardPanel.setActiveItem(3);
	meetingListPanel.meetingActionPanel.deselect();
}

function showPanel(showPanel){
	for(var i =0; i<mainCardItems.length; i++){
		if(showPanel.id == mainCardItems[i].id){
			mainCardPanel.setActiveItem(i);
		}
	}
}

var currentPanel;
function logMainSelected(comp, newCard, oldCard, index) {
	//console.log('Panel changed to :'+index);
	currentPanel = newCard;
}

function goBack(){
	//Get the current
	if(currentPanel&& currentPanel.goBack){
		currentPanel.goBack();
	// If the currentPanel is not defined then go to the meetingListPanel
	}else{
		if(meetingListPanel.viewMode && meetingListPanel.viewMode == "DETAIL"){
			closePanel();
			homeTabPanel.setActiveItem(0);
			meetingListPanel.goBack();
		}else{
			navigator.device.exitApp();
		}		
	}
}

function backKeyDown() { 
    //Ext.Msg.alert('Going back', 'Dong go!', Ext.emptyFn);
    goBack();
}

//<img width="30px" height="30px" src="images/pictos/compose.png" onclick="{panel}.editTimeLimit();"/>

function showMeetingPanel(){
	homePanel.hide();
	meetingListPanel.listMode();
	homeTabPanel.show();
	homeTabPanel.setActiveItem(0);
}


function acquire(){
	if(window.plugins && window.plugins.awake){
    	window.plugins.awake.acquire("acquire",
			    function(r){},
			    function(e){}
		);
	}
}

function release(){
	if(window.plugins && window.plugins.awake){
    	window.plugins.awake.release("release",
			    function(r){},
			    function(e){}
		);
	}
}
