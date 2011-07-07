TableTopicPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
    layout: 'card',    
    height:'100%',
	initComponent : function() {

	this.questionTmpl = new Ext.Template([
	                                        '<div class="background"><div class="notesIndex"><p>{cardIndex}</p></div><div class="transbox"><p>{text}</p></div></div>',
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
			var contentId = thisMeeting.roles.tableTopics.id;
			questionDataStore.contentId = contentId;
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
		    items: [this.listPanel,{html:'<div class="x-form-fieldset-instructions" id="ext-gen1359"><b>Add a question using the \'+\' button </b></div>'}]
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
		if(question && question.text && question.text.length>20){
			question.heading = question.text.substring(0, 20)+'..';
		}else{
			question.heading = question.text;
		}
		return question;
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
			question.id = questionDataStore.data.length;
			questionDataStore.add(question);
			this.activeQuestion = question;
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


Ext.reg('tableTopicPanel', TableTopicPanel);