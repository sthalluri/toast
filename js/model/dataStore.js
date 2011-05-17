var members = [
               { id : 'none',     name : 'Select...', firstName:'AirName0',lastName:'Last0'},
               { id : 'mem1',     name : 'Member1', firstName:'AirName1',lastName:'Last1'},
               { id : 'mem2',     name : 'Member2', firstName:'AirName2',lastName:'Last2'},
               { id : 'mem3', 	  name : 'Member3', firstName:'BirName3',lastName:'Last3'},
               { id : 'mem4',     name : 'Member4', firstName:'BirName4',lastName:'Last4'},
               { id : 'mem5',     name : 'Member5', firstName:'BirName5',lastName:'Last5'},
               { id : 'mem6',     name : 'Member6', firstName:'FirName6',lastName:'Last6'},
               { id : 'mem7',     name : 'Member7', firstName:'FirName7',lastName:'Last7'},
               { id : 'mem8',     name : 'Member8', firstName:'FirName8',lastName:'Last8'}
          ];

var roles = [
             	{ role : 'none',     title : 'Select...'},
                { role : 'speaker1',  title : 'First Speech'},
                { role: 'speaker2', title : 'Second Speech'},
                { role: 'tableTopics', title : 'Table Topics'},
                { role: 'toastMaster',     title : 'Toast Master'},
                { role: 'generalEvaluator',     title : 'General Evaluator'},
                { role: 'evaluator1',     title : 'Evaluator for First Speech'},
                { role: 'evaluator2',     title : 'Evaluator for Second Speech'},
                { role: 'grammarian',     title : 'Grammarian'},
                { role: 'timer',     title : 'Timer'},
                { role: 'ttResponse1',     title : 'Table Topic Response1'},
                { role: 'ttResponse2',     title : 'Table Topic Response2'},
                { role: 'ttResponse3',     title : 'Table Topic Response3'},
                { role: 'ttResponse4',     title : 'Table Topic Response4'},
                { role: 'ttResponse5',     title : 'Table Topic Response5'},
                { role: 'ttResponse6',     title : 'Table Topic Response6'},
                { role: 'ttResponse7',     title : 'Table Topic Response7'},
                { role: 'ttResponse',      title : 'Table Topic Response8'},
           ];

var questions = [
                 {qnNo: '1', text: 'This is a sample question with some text and this is a long one'},
                 {qnNo: '2', text: 'This is a sample question with some text and this is a long one'},
                 {qnNo: '3', text: 'This is a sample question with some text and this is a long one'}
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


// Meeting Related model
var meetings =[
   {id:1,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World1","themeOfTheDay":"Theme1","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
   {id:2,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World2","themeOfTheDay":"Theme2","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
   {id:3,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World3","themeOfTheDay":"Theme3","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
   {id:4,"inProgress":false,date:'04/01/2010',"wordOfTheDay":"World4","themeOfTheDay":"Theme4","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}}
];

var meetingsTwo =[
               {id:5,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'01/01/2011'},
               {id:6,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'02/01/2011'},
               {id:3,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'03/01/2012'},
               {id:4,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'04/01/2012'}
              ];

Ext.regModel('Meeting', {
	idProperty: 'userId',
	fields: [
        {name: 'id',     type: 'string'},
        {name: 'wordOfTheDay',    type: 'string'},
        {name: 'themeOfTheDay',    type: 'string'},
        {name: 'inProgress'},
        {name: 'date',    type: 'date'}
    ]
});

var meetingStore = new Ext.data.JsonStore({
	   data : meetings,
	   model : 'Meeting',
	   autoLoad : true,
	   autoDestroy : true
});

var thisMeeting;


var thisUser;

Ext.regModel('Members', {
    fields: [
        {name: 'id',    type: 'string'},
        {name: 'name',    type: 'string'},
        {name: 'firstName',    type: 'string'},
        {name: 'lastName',    type: 'string'}
    ]
});


var memberStore = new Ext.data.JsonStore({
   data : members,
   model : 'Members',
   autoLoad : true,
   autoDestroy : true,
   getGroupString : function(record) {
		return record.get('firstName')[0];
   }
});


Ext.regModel('Roles', {
    fields: [
        {name: 'rank',     type: 'string'},
        {name: 'title',    type: 'string'}
    ]
});


var roleStore = new Ext.data.JsonStore({
   data : roles,
   model : 'Roles',
   autoLoad : true,
   autoDestroy : true
});


Ext.regModel('Question', {
    fields: ['qnNo', 'text']
});

var questionDataStore = new Ext.data.Store({
    model: 'Question',
    sorters: 'qnNo',

    getGroupString : function(record) {
        return record.get('qnNo')[0];
    },

    data: questions
});

Ext.regModel('NotesModel', {
    fields: ['highlight', 'notes']
});

var speakerNotesDataStore = new Ext.data.Store({
    model: 'NotesModel',
    sorters: 'highlight',

    getGroupString : function(record) {
        return record.get('highlight')[0];
    },

    data: notes
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
	idProperty: 'userId',
    fields: [
        {name: 'userId',     type: 'string'},
        {name: 'name',     type: 'string'},
        {name: 'password', type: 'password'},
        {name: 'email',    type: 'string'},
        {name: 'url',      type: 'string'},
        {name: 'rank',     type: 'string'},
        {name: 'enable',   type: 'boolean'},
        {name: 'cool',     type: 'boolean'},
        {name: 'color',    type: 'string'},
        {name: 'team',     type: 'string'},
        {name: 'secret',   type: 'boolean'}
    ]
});



Ext.regModel('User', {
	idProperty: 'userId',
    fields: [
        {name: 'userId',     type: 'string'},
        {name: 'name',     type: 'string'},
        {name: 'password', type: 'password'},
        {name: 'email',    type: 'string'},
        {name: 'url',      type: 'string'},
        {name: 'rank',     type: 'string'},
        {name: 'enable',   type: 'boolean'},
        {name: 'cool',     type: 'boolean'},
        {name: 'color',    type: 'string'},
        {name: 'team',     type: 'string'},
        {name: 'secret',   type: 'boolean'}
    ]
});