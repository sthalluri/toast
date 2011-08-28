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
	title : 'Learn about Roles',
	card : {
		xtype : 'htmlpage',
		url : '/toast/help/roles.html'
	},
	image : 'images/pictos/arrow_right.png'
} ,{
	title : 'Speech Types',
	card : {
		xtype : 'htmlpage',
		url : '/toast/help/speechTypes.html'
	},
	image : 'images/pictos/arrow_right.png'
}, {
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
		clubUrl			: serverUrl+'/toastService/club',
		analyticsUrl	: serverUrl+'/toastService/analytics'
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
					records[i].fMeetingDate = fDate.format('F j')+' '+records[i].meetingTime;
				}else{
					records[i].fMeetingDate = fDate.format('F j');
				}
			}
		}
		this.loadData(records);
	},
   sorters: [
             {
                 property : 'meetingDate',
                 direction: 'DESC'
             },
             {
                 property : 'meetingTime',
                 direction: 'DESC'
             }
	 ],
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
	 ]

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
				"trackTime" : true,
				"seq": 7
			}, {
				"id" : "evaluator2",
				"description" : "Evaluator for Second Speech",
				"trackTime" : true,
				"seq": 8
			}, {
				"id" : "evaluator3",
				"description" : "Evaluator for Third Speech",
				"trackTime" : true,
				"seq": 9
			}, {
				"id" : "generalEvaluator",
				"description" : "General Evaluator",
				"trackTime" : false,
				"seq": 6
			}, {
				"id" : "grammarian",
				"description" : "Grammarian",
				"trackTime" : false,
				"seq": 11
			}, {
				"id" : "speaker1",
				"description" : "First Speech",
				"trackTime" : true,
				"seq": 2
			}, {
				"id" : "speaker2",
				"description" : "Second Speech",
				"trackTime" : true,
				"seq": 3
			}, {
				"id" : "speaker3",
				"description" : "Third Speech",
				"trackTime" : true,
				"seq": 4
			}, {
				"id" : "tableTopics",
				"description" : "Table Topics",
				"trackTime" : false,
				"seq": 5
			}, {
				"id" : "timer",
				"description" : "Timer",
				"trackTime" : false,
				"seq": 10
			}, {
				"id" : "toastMaster",
				"description" : "Toast Master",
				"trackTime" : false,
				"seq": 1
			}, {
				"id" : "ttResponse1",
				"description" : "Table Topic Response1",
				"trackTime" : true,
				"seq": 12
			}, {
				"id" : "ttResponse2",
				"description" : "Table Topic Response2",
				"trackTime" : true,
				"seq": 13
			}, {
				"id" : "ttResponse3",
				"description" : "Table Topic Response3",
				"trackTime" : true,
				"seq": 14
			}, {
				"id" : "ttResponse4",
				"description" : "Table Topic Response4",
				"trackTime" : true,
				"seq": 15
			}, {
				"id" : "ttResponse5",
				"description" : "Table Topic Response5",
				"trackTime" : true,
				"seq": 16
			}, {
				"id" : "ttResponse6",
				"description" : "Table Topic Response6",
				"trackTime" : true,
				"seq": 17
			}, {
				"id" : "ttResponse7",
				"description" : "Table Topic Response7",
				"trackTime" : true,
				"seq": 18
			}, {
				"id" : "ttResponse8",
				"description" : "Table Topic Response8",
				"trackTime" : true,
				"seq": 19
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
		fMeetingDate: (new Date()).format('F j'),
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
}