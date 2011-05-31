
var mockUser={
		'userId':'guest',
		'name' : 'Alpha',
		'password' : 'guest',
		'email' : 'MockingBird@gamil.com',
		'clubId' : '1234',
		'clubPasscode' : 'Club Passcode',
		'rememberMe' : 1,
		'firstName':'Alpha',
		'lastName':'User',
		'confirmPassword':'secret'
};

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


var mockMeetings =[
  {id:1,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World1","themeOfTheDay":"Theme1","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
  {id:2,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World2","themeOfTheDay":"Theme2","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
  {id:3,"inProgress":false,date:'05/01/2010',"wordOfTheDay":"World3","themeOfTheDay":"Theme3","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}},
  {id:4,"inProgress":false,date:'04/01/2010',"wordOfTheDay":"World4","themeOfTheDay":"Theme4","roles":{"speaker1":{"userId":"mem1","counts":{},"time":0},"speaker2":{"userId":"mem5","counts":{},"time":0},"tableTopics":{"userId":"mem3","counts":{},"time":0},"toastMaster":{"counts":{},"time":0},"generalEvaluator":{"userId":"mem3","counts":{},"time":0},"evaluator1":{"userId":"mem2","counts":{},"time":0},"evaluator2":{"userId":"mem2","counts":{},"time":0},"grammarian":{"userId":"mem7","counts":{},"time":0},"timer":{"userId":"mem8","counts":{},"time":0},"ttResponse1":{"userId":"","counts":{},"time":0},"ttResponse2":{"userId":"","counts":{},"time":0},"ttResponse3":{"userId":"","counts":{},"time":0},"ttResponse4":{"userId":"","counts":{},"time":0},"ttResponse5":{"userId":"","counts":{},"time":0},"ttResponse6":{"userId":"","counts":{},"time":0},"ttResponse7":{"userId":"","counts":{},"time":0}}}
];

meetings = mockMeetings;

var mockMeeting=
{	
	id:1,
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
};

function getMeetingBareBones(){

	var meeting = new Object({	
		inProgress : false,
		wordOfTheDay:'',
		themeOfTheDay:'',
		date:'',
		roles : {
			speaker1:{
				userId:'',
				counts:{},
				time:0
			},
			speaker2:{
				userId:'',
				counts:{},
				time:0
			},
			tableTopics:{
				userId:'',
				counts:{},
				time:0
			},	
			toastMaster:{
				userId:'',
				counts:{},
				time:0
			},
			generalEvaluator:{
				userId:'',
				counts:{},
				time:0
			},
			evaluator1:{
				userId:'',
				counts:{},
				time:0
			},
			evaluator2:{
				userId:'',
				counts:{},
				time:0
			},
			grammarian:{
				userId:'',
				counts:{},
				time:0
			},
			timer:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse1:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse2:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse3:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse4:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse5:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse6:{
				userId:'',
				counts:{},
				time:0
			},
			ttResponse7:{
				userId:'',
				counts:{},
				time:0
			}
	}
	});
	return meeting;
}

thisMeeting = mockMeeting;

thisUser = mockUser;


var mockUrls ={
	checkLoginUrl 	: 'mockResponse/loginSuccess.jsp',
	meetingUrl		: 'mockResponse/meeting.jsp',
	registerUrl		: 'mockResponse/registerSuccess.jsp'
};