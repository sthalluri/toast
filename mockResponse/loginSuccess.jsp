<%
	boolean success = true;
	String userId = request.getParameter("userId");
	if(userId==null || userId=="" || !userId.equals("MockingBird") ){
		success= false;
	}
%>
{
	success:<%=success%>,
	return:{
		'name' : 'Akura',
		'password' : 'secret',
		'email' : 'saru@sencha.com',
		'url' : 'http://sencha.com'
	},
	error:{
		msg:'Invalid User'	
	}
}