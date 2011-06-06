TableTopicPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
	initComponent : function() {

	this.questionTmpl = new Ext.Template([
	                                     '<div class="notes"><strong>Question{id}:</strong><br/>{text}</div>',
	                                 ]);

	this.questionTmpl.compile();
	
	this.questionBase = {
	    itemTpl: '<div class="contact2"><strong>Question:{id}</strong><br/> {text}..</div>',
	    selModel: {
	        mode: 'SINGLE',
	        allowDeselect: true
	    },
	    grouped: false,
	    indexBar: false,
	    parentPanel:this,	   
	    id:'tableTopicListPanel',
	    onItemDisclosure: {
	        scope: this,
	        handler: this.updateDetailsPanel
	    },
	    store: questionDataStore
	};

    this.tblTopicCarouselPanel = new Ext.Panel({
        padding:10,
    	xtype:'carousel',
    	activeItem:0,
    	height:'80%',
        id:'tableTopicCarousel',
    	layout: 'card',
    	items:[
    	    new Ext.List(Ext.apply(this.questionBase, {
               fullscreen: true
           	})),
           	{
    	    	html:'Sample content here'
           	}
    	]
    });
    
	this.items= [
                {
                	padding:10,
                	html : '<b>Table Topic Qns</b>'
                },
                this.tblTopicCarouselPanel
	];
    this.dockedItems = [
        {
            xtype: 'toolbar',
            dock: 'top',
            title:'Table Topics',
            items: [
				{
				    text: 'Back',
	                ui: 'back',
				    scope:this,
				    handler: function() {
				    	if(this.tblTopicCarouselPanel.getActiveItem().id =='tableTopicListPanel'){
				    		tableTopicPanel.hide();
				    		//roleListPanel.show();
                        	meetingListPanel.show();
	                	}else{
	    		    		this.listMode();
	                	}
				    }
				},
				{xtype: 'spacer'},
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'action',
                	scope:this,
                    handler: this.editQuestion
                },
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'add',
                	scope:this,
                    handler: this.newQuestion
                }
            ]
        }
	   ];
	
	TableTopicPanel.superclass.initComponent.call(this);
	},

	loadAndShow: function(){
		if(thisMeeting.roles.tableTopics){
			var contentId = thisMeeting.roles.tableTopics.id;
			console.log('Setting the contentid '+contentId);
			questionDataStore.contentId = contentId;
			MeetingService.getContent(contentId, this.onTableTopicsLoad, this);
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
					rQuestions[i] = {id:questions[i].id,text:questions[i].text};
				}
			}
			data.returnVal = rQuestions;
			console.log(data.returnVal);
			if(data.returnVal.length>0){
				questionDataStore.loadData(data.returnVal);
			}else{
				questionDataStore.removeAll();
			}
			this.show();
		}else{
			questionDataStore.rowId = null;
			data.returnval = new Array();
			this.updateMessage(data.errorMessage);
		}
	},

	updateCarousel: function(){
		for(var i=0 ; i<questions.length; i++){
			questionDataStore.add({id:questions[i].id,text:questions[i].text});
		}		
	},
	
	listMode: function(){
		this.tblTopicCarouselPanel.setActiveItem(this.tblTopicCarouselPanel.items.get(0));
	},
	
	newQuestion:function(){
		this.activeQuestion = null;
		this.editQuestion();
	},
	
	editQuestion: function(){
		tableTopicPanel.hide();
		if(!this.activeQuestion){
			var question = new Object();
			question.id = questionDataStore.data.length;
			questionDataStore.add(question);
			this.activeQuestion = question;
		}
		questionPanel.loadQuestion(this.activeQuestion);
		questionPanel.show();
	},
	
	updateDetailsPanel : function(record, btn, index) {
    	this.parentPanel.questionIndex = index;
		var carousel = this.parentPanel.tblTopicCarouselPanel;
		var question = this.parentPanel.store.getAt(index).data;
		this.parentPanel.activeQuestion = question;
		var html = this.parentPanel.questionTmpl.apply(question);
		var detailsPanel = carousel.items.get(1);
		detailsPanel.el.setHTML(html);
		carousel.setActiveItem(carousel.items.get(1));
    }	
});


Ext.reg('tableTopicPanel', TableTopicPanel);