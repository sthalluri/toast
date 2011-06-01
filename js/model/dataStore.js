var thisMeeting;
var thisUser;

var members = [];
var meetings =[];
var roles = [];
var questions = [];

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
        {name: 'meetingDate',    type: 'date'}
    ]
});

var meetingStore = new Ext.data.JsonStore({
	data : meetings,
	model : 'Meeting',
	autoLoad : false,
	autoDestroy : true,
	reload : function(clubId) {
		Ext.Ajax.request({
			url : urlStore.meetingUrl + '/getByClubId/' + clubId,
			success : function(response, opts) {
				var data = eval("(" + response.responseText + ")");
				if (data.success) {
					console.log(data);
					meetingStore.removeAll();
					var meetings = data.returnVal.rows;
					for ( var i = 0; i < meetings.length; i++) {
						meetingStore.add(meetings[i]);
					}
				} else {

				}
			}
		});
	}
});

Ext.regModel('Members', {
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
   model : 'Members',
   autoLoad : false,
   autoDestroy : true,
   getGroupString : function(record) {
		return record.get('firstName')[0];
   },
   reload : function(clubId) {
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/getClubMembers/'+clubId,
			success : function(response, opts) {
				var data = eval("(" + response.responseText + ")");
				if (data.success) {
					console.log(data);
					memberStore.removeAll();
					var members = data.returnVal.rows;
					memberStore.add({ id : '0',     name : 'Select...', firstName:'Dummy',lastName:'User'});
					for(var i=0 ; i<members.length; i++){
						var member = members[i];
						member.name = member.firstName+' '+member.lastName;
						memberStore.add(member);
					}
				} else {
	
				}
			}
		});
   }
});

Ext.regModel('Roles', {
    fields: [
        {name: 'id',     		type: 'string'},
        {name: 'description',   type: 'string'}
    ]
});


var roleStore = new Ext.data.JsonStore({
   data : roles,
   model : 'Roles',
   autoLoad : false,
   autoDestroy : true,
   reload : function() {
		Ext.Ajax.request({
			url : urlStore.clubUrl + '/clubRoleList',
			success : function(response, opts) {
				var data = eval("(" + response.responseText + ")");
				if (data.success) {
					console.log(data);
					roleStore.removeAll();
					var roles = data.returnVal.rows;
					roleStore.add({ id : '0',     description : 'Select...'});
					for(var i=0 ; i<roles.length; i++){
						roleStore.add(roles[i]);
					}
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
    autoDestroy : true,
    reload : function(id) {
    	if(id){
        	this.contentId = id;
    	}
 		Ext.Ajax.request({
 			url : urlStore.meetingUrl + '/getContent/'+this.contentId,
 			success : function(response, opts) {
 				var data = eval("(" + response.responseText + ")");
				var rContent = null;
				if(data.returnVal.rows.length>0){
					rContent = eval("(" + data.returnVal.rows[0].content+ ")");
					questionDataStore.rowId = data.returnVal.rows[0].id;
					var questions = rContent.questions;
					questionDataStore.removeAll();
					if(!questions){
						questions = new Array();
					}
					for(var i=0 ; i<questions.length; i++){
						questionDataStore.add({id:questions[i].id,text:questions[i].text});
					}
				}
 				if (data.success) {
 					console.log(data);
 				} else {
 					
 				}
 			}
 		});
    }
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
	idProperty: 'id',
    fields: [
        {name: 'userId',     type: 'string'},
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
