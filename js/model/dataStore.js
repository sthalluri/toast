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

var fillers= ['ah','amm','so','like'];


var timingStore={
	speech : {red: 5, green: 2, yellow:1},	
	ttResponse : {red: 6, green: 2, yellow:4}	,
	evaluator : {red: 7, green: 2, yellow:5}	
};

//var urlStore = mockUrls;
var urlStore = {
		userUrl 		: '/toastService/user',
		meetingUrl		: '/toastService/meeting',
		registerUrl		: '/toastService/user/register',
		clubUrl			: '/toastService/club'
};


Ext.regModel('Meeting', {
	idProperty: 'id',
	fields: [
        {name: 'id',     type: 'int'},
        {name: 'wordOfTheDay',    type: 'string'},
        {name: 'themeOfTheDay',    type: 'string'},
        {name: 'inProgress'},
        {name: 'meetingDate',    type: 'date'},
        {name: 'location'}
    ]
});

var meetingStore = new Ext.data.JsonStore({
	data : meetings,
	model : 'Meeting',
	autoLoad : false,
	autoDestroy : true
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
        {name: 'description',   type: 'string'}
    ]
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
        {name: 'defaultClubId',      type: 'string'}
    ]
});
