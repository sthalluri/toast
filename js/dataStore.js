Ext.regModel('Members', {
    fields: [
        {name: 'id',    type: 'string'},
        {name: 'name',    type: 'string'}
    ]
 });


var memberStore = new Ext.data.JsonStore({
   data : [
        { id : 'master',  name : 'Member1'},
        { id : 'padawan', name : 'Member2'},
        { id : 'teacher', name : 'Member3'},
        { id : 'aid',     name : 'Member4'},
        { id : 'participant',     name : 'Member5'}
   ],
   model : 'Members',
   autoLoad : true,
   autoDestroy : true
});


Ext.regModel('Speeches', {
    fields: [
        {name: 'rank',     type: 'string'},
        {name: 'title',    type: 'string'}
    ]
 });


var speechStore = new Ext.data.JsonStore({
   data : [
        { speech : 'master',  title : 'Speaker1'},
        { speech : 'padawan', title : 'Speaker2'},
        { speech : 'teacher', title : 'Grammarian'},
        { speech : 'aid',     title : 'Timer'},
        { speech : 'participant',     title : 'Member1'}
   ],
   model : 'Speeches',
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

    data: [
        {qnNo: '1', text: 'This is a sample question with some text and this is a long one'},
        {qnNo: '2', text: 'This is a sample question with some text and this is a long one'},
        {qnNo: '3', text: 'This is a sample question with some text and this is a long one'}
    ]
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

    data: [
        {highlight: '1. Get this done', notes: 'This is a sample question with some text and this is a long one'},
        {highlight: '2. Dont get this', notes: 'This is a sample question with some text and this is a long one'},
        {highlight: '3. Lets get it', notes: 'This is a sample question with some text and this is a long one'}
    ]
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

    data: [
        {date: '8/24/2011', topic: 'Spring '},
        {date: '9/24/2011', topic: 'Valentines Day'},
        {date: '10/24/2011', topic: 'Admirable'}
    ]
});