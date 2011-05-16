
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
	inProgress : false,
	wordOfTheDay:'TakeThis',
	themeOfTheDay:'Themer',
	speaker1:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0},
		time:0
	},
	speaker2:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0},
		time:0
	},
	tableTopics:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0},
		responses:[
			{
				userId:'member1',
				question:1,
				counts:{'ah':0,'am':0,'so':0},
				time:0
			},
			{
				userId:'member2',
				question:1,
				counts:{'ah':0,'am':0,'so':0},
				time:0
			},
			{
				userId:'speaker1',
				question:2,
				counts:{'ah':0,'am':0,'so':0},
				time:0
			}
		]
	},	
	toastMaster:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0}
	},
	generalEvaluator:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0}
	},
	evaluator1:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0}
	},
	evaluator2:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0}
	},
	grammarian:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0}
	},
	timer:{
		userId:'speaker1',
		counts:{'ah':0,'am':0,'so':0}
	}
};
