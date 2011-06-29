var mockUser={
		'userId':'guest',
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
   {text: 'Select..',value: '00:00 AM'}, 
   {text: '04:00 AM',value: '04:00 AM'}, 
   {text: '04:30 AM',value: '04:30 AM'}, 
   {text: '05:00 AM',value: '05:00 AM'}, 
   {text: '05:30 AM',value: '05:30 AM'}, 
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
	speech : {red: 5, green: 2, yellow:1},	
	ttResponse : {red: 6, green: 2, yellow:4}	,
	evaluator : {red: 7, green: 2, yellow:5}	
};

//var serverUrl = 'http://10.0.0.8:8080';
var serverUrl = 'http://localhost:8080';

//var serverUrl = 'http://ec2-50-19-142-85.compute-1.amazonaws.com';

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
        {name: 'meetingDate',	type: 'date'},
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
	}
});

Ext.regModel('Member', {
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
		memberStore.loadData(records);
		var defaultSelect = { id : '0',     name : 'Select...', firstName:'Dummy',lastName:'User'};
		this.insert(0,Ext.ModelMgr.create( defaultSelect, 'Member'));
   }
});

Ext.regModel('Role', {
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
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/clubRoleList',
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
   }
});



Ext.regModel('Question', {
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
    fields: ['id', 'text', 'cardIndex']
});

var speechNoteDataStore = new Ext.data.Store({
    model: 'SpeechNote',
    sorters: 'id',
    data: speechNotes,
    autoLoad : false,
    autoDestroy : true
});

Ext.regModel('MyLogModel', {
    fields: ['date', 'topic']
});

var myLogDataStore = new Ext.data.Store({
    model: 'MyLogModel',
    sorters: 'highlight',

    getGroupString : function(record) {
        return record.get('highlight')[0];
    },
    data: userLog
});

Ext.regModel('User', {
	idProperty: 'id',
    fields: [
        {name: 'id',     type: 'int'},
        {name: 'userId',     type: 'string'},
        {name: 'firstName',     type: 'string'},
        {name: 'lastName',     type: 'string'},
        {name: 'phone',     type: 'string'},
        {name: 'email',    type: 'string'},
        {name: 'aboutMe',	type: 'string'},
        {name: 'defaultClubId',      type: 'string'}
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
