RoleHelpPanel = Ext.extend(Ext.Panel, {

    iconCls: 'info',
    tabId: 'help',
    scroll: 'vertical',
    title:'Roles',

    initComponent: function () {

       
        this.items = [
            { html:     '<div class="helpbox">'+
            	'<h2>TOASTMASTER OF DAY (TMOD)</h2>'+
            	'<p>The primary duty of the Toastmaster is to act as the "Master of Ceremony" and host for the entire program. This includes introducing the speakers and providing a smooth transition between speeches. </p>'+
            	'<h2>TABLE TOPICSMASTER</h2>'+
            	'<p>The Table Topic Master prepares a series of questions for volunteers to respond extemporaneously. After a short introduction to the topic, the Table Topics Master calls on individuals for a brief 1-2 minute response. </p>'+
            	'<h2>GRAMMARIAN</h2>'+
            	'<p>The purpose of this position is to help our members identify the use of poor English usage during speeches </p>'+
            	'<h2>AH COUNTER</h2>'+
            	'<p>The purpose is to detect the use of "crutch" words such as AH, UM, ER, UH or any other filler that takes the place of a pause in a sentence.</p>'+
            	'<h2>TIMER</h2>'+
            	'<p>The timekeeper records the time used by Table Topics respondents, Speakers and Evaluators. Manual speeches have time objectives of 5-7 minutes, except Advanced Manual speeches, which may be 8-10 minutes. Table Topics speeches are from 1-2 minutes and Evaluations average 2-3 minutes. </p>'+
            	'<h2>SPEAKER</h2>'+
            	'<p>Speakers work out of manuals to deliver prepared assignments. Each manual assignment has different objectives, but the primary purpose of all of them is to help members become more confident and experienced public speakers. </p>'+
            	'<h2>EVALUATOR</h2>'+
            	'<p>The purpose of the Evaluator is to help speakers improve their skills. The Evaluator can help this happen by pointing out some of the speakers strengths and weaknesses, and offering suggestions for improvement. </p>'+
            	'<h2>GENERAL EVALUATOR</h2>'+
            	'<p>The General Evaluator conducts the evaluation segment of the meeting. In addition, the General Evaluator assesses the effectiveness of the overall meeting.</p>'+
            	'</div>'}
        ];

//		this.dockedItems = [ {
//			xtype : 'toolbar',
//			dock : 'top',
//			title : 'Roles Help',
//			items : [ {
//				text : 'Back',
//				scope : this,
//				ui : 'back',
//				handler : function() {
//					this.hide();
//					navPanel.show();
//				}
//			} ]
//		} ];

        RoleHelpPanel.superclass.initComponent.call(this);
    }
});
