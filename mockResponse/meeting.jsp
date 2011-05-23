<%
	String method = request.getParameter("method");
	boolean success = true;
	String meetingId = request.getParameter("id");
		
	
	if("get".equals(method)){
		
%>
{
	success:<%=success%>,
	returnVal:{	
			id:3,
			inProgress : false,
			wordOfTheDay:'TakeThis',
			themeOfTheDay:'Themer',
			date:'10/10/2010',
			roles : {
				speaker1:{
					userId:'mem1',
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				speaker2:{
					userId:'mem2',
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				tableTopics:{
					userId:'mem3',	
					counts:{'ah':0,'amm':0,'so':0}
				},	
				toastMaster:{
					userId:'mem4',
					counts:{'ah':0,'amm':0,'so':0}
				},
				generalEvaluator:{
					userId:'',
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				evaluator1:{
					userId:'',
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				evaluator2:{
					userId:'',
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				grammarian:{
					userId:'mem6',
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				timer:{
					userId:'mem7',
					counts:{'ah':0,'amm':0,'so':0}
				},
				ttResponse1:{
						userId:'mem1',
						question:1,
						counts:{'ah':0,'amm':0,'so':0},
						time:0
				},
				ttResponse2:{
						userId:'mem4',
						question:1,
						counts:{'ah':0,'amm':0,'so':0},
						time:0
				},
				ttResponse3:{
						userId:'mem5',
						question:2,
						counts:{'ah':0,'amm':0,'so':0},
						time:0
				},
				ttResponse4:{
						userId:'mem5',
						question:2,
						counts:{'ah':0,'amm':0,'so':0},
						time:0
				},
				ttResponse5:{
						userId:'mem5',
						question:2,
						counts:{'ah':0,'amm':0,'so':0},
						time:0
				},
				ttResponse6:{
					userId:'mem5',
					question:2,
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				},
				ttResponse7:{
					userId:'mem5',
					question:2,
					counts:{'ah':0,'amm':0,'so':0},
					time:0
				}
			}
		},
	error:{
		msg:'Invalid User'	
	}
}

<%
	}else if("getList".equals(method)){
		
%>
{
	success:<%=success%>,
	returnVal:{	

		meetings:[
				   {id:5,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World1","themeOfTheDay":"Theme5","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
				   {id:6,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World2","themeOfTheDay":"Theme6","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
				   {id:7,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World3","themeOfTheDay":"Theme7","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
				   {id:8,"inProgress":false,date:'04/01/2010',"wordOfTheDay":"World4","themeOfTheDay":"Theme8","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}}
              ]
	},
	error:{
		msg:'Invalid User'	
	}		
}

<%
	}else if("save".equals(method)){
		System.out.println(request.getParameter("meeting"));
%>
{
	success:<%=success%>,
	returnVal:{	

		meetings:[
               {id:5,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'01/01/2011'},
               {id:6,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'02/01/2011'},
               {id:3,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'03/01/2012'},
               {id:4,wordOfTheDay:'TakeThis',themeOfTheDay:'Themer',inProgress:false,date:'04/01/2012'}
              ]
	},
	error:{
		msg:'Invalid User'	
	}		
}

<%
	}		
%>

