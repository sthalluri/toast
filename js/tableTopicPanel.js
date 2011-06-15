TableTopicPanel = Ext.extend( Ext.Panel, 
{
	title:'TbTopic',
	fullscreen: true,
    layout: 'card',    
	initComponent : function() {

	this.questionTmpl = new Ext.Template([
	                                        '<div class="background"><div class="transbox"><p>{text}</p></div></div>',
	                                    ]);

	this.questionTmpl.compile();
	
	this.activeIndex =1;
	this.questionBase = {
	    itemTpl: 	'<div class="legislator-list-item">'+
					'<div class="legislator-tnail" style="background-image: url(./images/Stickysmall.png)"></div>'+
					'{text}'+
					'</div>',
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
				    	closePanel(this);
				    }
				},
				{xtype: 'spacer'},
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'compose',
                	id:'tableTopicEditIcon',
                	scope:this,
                    handler: this.editQuestion
                },
                {
                    iconMask: true,
                    ui: 'plain',
                	iconCls:'add',
                	id:'tableTopicAddIcon',
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
		}else{
			questionDataStore.rowId = null;
			data.returnval = new Array();
		}
		this.show();
		if(!this.carouselInit){
			this.initCarousel();
			this.carouselInit = true;
		}else{
			this.updateCarousel();
		}
	},

	initCarousel: function(){
		var items = [];
		if(this.tblTopicCarouselPanel){
			this.remove(this.tblTopicCarouselPanel);
		}
		
		items.push(new Ext.List(Ext.apply(this.questionBase, {
		})));

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
		Ext.getCmp('tableTopicAddIcon').show();
        Ext.getCmp('tableTopicEditIcon').hide();
	},

	updateCarousel: function(){
		var i = 1;
		questionDataStore.each(function(rec){
			var data = rec.data;			
			var card = this.tblTopicCarouselPanel.items.get(i);
			if(card){
				card.el.dom.innerHTML = this.questionTmpl.apply(this.formatNotes(data));
			}else{
//				this.speechNoteTopicCarousel.add({
//					html: this.speechNoteTmpl.apply(data)
//				});
			}
			i++;
        }, this);		
	},
	
	listMode: function(){
		//this.updateCarousel();
		console.log(this.activeIndex );
		console.log(this.activeIndex);
		var activeCard = this.tblTopicCarouselPanel.items.get(this.activeIndex);
		if(activeCard.el && activeCard.el.dom){
			activeCard.el.dom.innerHTML = this.questionTmpl.apply(this.formatNotes(questionDataStore.getAt(this.activeIndex-1).data));
		}
		this.tblTopicCarouselPanel.setActiveItem(activeCard);
	},
	
	formatNotes: function(question){
		var obj = new Object();
		obj.id = question.id;
		obj.text = question.text;
		return obj;
	},
	
	cardChanged:function(firstCard, newCard, oldCard, index, newIndex){
		if(index>0&&questionDataStore.getAt(index-1)){
			Ext.getCmp('tableTopicEditIcon').show();
			Ext.getCmp('tableTopicAddIcon').hide();
			this.activeIndex = index;
			console.log(this.activeIndex);
			this.activeQuestion = questionDataStore.getAt(index-1).data;
		}else{
			Ext.getCmp('tableTopicAddIcon').show();
			Ext.getCmp('tableTopicEditIcon').hide();
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
	deleteCard: function(){
		questionDataStore.removeAt(this.activeIndex-1);
        MeetingService.saveTableTopics(this.onDelete, this);
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
		Ext.getCmp('tableTopicEditIcon').show();
		var carousel = this.parentPanel.tblTopicCarouselPanel;
		this.parentPanel.activeIndex = index+1;
		carousel.setActiveItem(carousel.items.get(index+1));
    }
});


Ext.reg('tableTopicPanel', TableTopicPanel);