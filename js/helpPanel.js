HelpPanel = Ext.extend(Ext.Panel, {

    iconCls: 'info',
    tabId: 'help',
    scroll: 'vertical',
    title:'ToastMasters',

    initComponent: function () {

        
        this.items = [
            { html: '<div class="helpbox"><h2>So what does ToastMasters exactly?</h2> <p>Looking to improve your speaking and leadership skills? Ignite your career? Win that job interview? '+
            	'You have come to the right place. Since 1924, more than 4 million people around the world have become more confident speakers and leaders because of their participation in Toastmasters.'+ 
            	'Toastmasters International is a world leader in communication and leadership development. Today, our membership is 260,000 strong. These members improve their speaking and leadership skills by attending one of the 12,500-plus clubs that make up our global network of meeting locations.'+ 
            	'Membership in Toastmasters is one of the greatest investments you can make in yourself. At $27 every six months, it is also one of the most cost-effective skill-building tools available anywhere.'+
            	'</p>' +
                    ' <h2>How does it work?</h2> ' +
                    '<p>How Does It Work?</p>' +
                    '<p>=>A Toastmasters meeting is a learn-by-doing workshop in which participants hone their speaking and leadership skills in a friendly atmosphere. A typical group has 20 to 40 members who meet weekly, biweekly or monthly. A typical meeting lasts 60 to 90 minutes.</p>' +
                    '<p>=>There is no instructor in a Toastmasters meeting. Instead, members evaluate one another presentations. This feedback process is a key part of the programs success. Meeting participants also give impromptu talks on assigned topics, conduct meetings and develop skills related to timekeeping, grammar and parliamentary procedure.</p>' +
                    '<p>=>Members learn communication skills by working in the Competent Communication manual, a series of 10 self-paced speaking assignments designed to instill a basic foundation in public speaking.' +                    
                    '&nbsp;</p><p>&nbsp;</p><div>'}
        ];

//		this.dockedItems = [ {
//			xtype : 'toolbar',
//			dock : 'top',
//			title : 'ToastMasters',
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

        HelpPanel.superclass.initComponent.call(this);
    }
});
