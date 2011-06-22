var thisMeeting;
var thisUser;

var members = [];
var meetings =[];
var roles = [];
var questions = [];
var speechNotes = [        
   {id:1,     text: 'Notes1'},
   {id:2,     text: 'Notes2'},
   {id:3,     text: 'Notes3'},
];

var notes = [
            {highlight: '1. Get this done', notes: 'This is a sample question with some text and this is a long one'},
            {highlight: '2. Dont get this', notes: 'This is a sample question with some text and this is a long one'},
            {highlight: '3. Lets get it', notes: 'This is a sample question with some text and this is a long one'}
        ];

var userLog =[
              {date: '8/24/2011', topic: 'Spring '},
              {date: '9/24/2011', topic: 'Valentines Day'},
              {date: '10/24/2011', topic: 'Admirable'}
          ];

var fillers= [];


var timingStore={
	speech : {red: 5, green: 2, yellow:1},	
	ttResponse : {red: 6, green: 2, yellow:4}	,
	evaluator : {red: 7, green: 2, yellow:5}	
};

var serverUrl = 'http://localhost:8080';

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
				var fDate = Date.parseDate(records[i].meetingDate,"Y-m-d H:i:s.u");
				records[i].fMeetingDate = fDate.format('F j, Y, g:i a');
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
        {name: 'name',    type: 'string'}
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
    fields: ['id', 'text']
});

var questionDataStore = new Ext.data.Store({
    model: 'Question',
    sorters: 'id',
    data: questions,
    autoLoad : false,
    autoDestroy : true
});

Ext.regModel('SpeechNote', {
    fields: ['id', 'text']
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


