var thisMeeting;
var thisUser;

var members = [];
var meetings =[];
var roles = [];

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


Ext.regModel('Meeting', {
	idProperty: 'id',
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
        {name: 'id',    type: 'string'},
        {name: 'userId',    type: 'string'},
        {name: 'firstName',    type: 'string'},
        {name: 'lastName',    type: 'string'}
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
					for(var i=0 ; i<members.length; i++){
						memberStore.add(members[i]);
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
