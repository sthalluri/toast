
var mockUser={
		'userId':'MockingBird',
		'name' : 'Akura',
		'password' : 'secret',
		'email' : 'MockingBird@gamil.com',
		'clubId' : '1234',
		'clubPasscode' : 'Club Passcode',
		'rememberMe' : 1,
		'firstName':'Simy',
		'lastName':'Sipp',
		'confirmPassword':'secret'
};



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