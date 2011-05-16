<%
	boolean success = true;
	String userId = request.getParameter("userId");
	if(userId==null || userId=="" || !userId.equals("MockingBird@gamil.com") ){
		success= false;
	}
%>
{
	success:<%=success%>,
	returnVal:{
		'userId':'MockingBird',
		'name' : 'Akura',
		'password' : 'secret',
		'email' : 'MockingBird@gamil.com',
		'clubId' : '1234',
		'clubPasscode' : 'Club Passcode',
		'rememberMe' : 1,
		'firstName':'Simy',
		'lastName':'Sipp'
	},
	error:{
		msg:'Invalid User'	
	}
}