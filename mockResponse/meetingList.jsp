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
		meetings :[
			{
			 	id:1,
			 	wordOfTheDay:'TakeThis',
			 	themeOfTheDay:'Themer',
			 	inProgress:false,
			 	date:'01/01/2010'
			 },
			{
			 	id:2,
			 	wordOfTheDay:'TakeThis',
			 	themeOfTheDay:'Themer',
			 	inProgress:false,
			 	date:'02/01/2010'
			 },
			{
			 	id:3,
			 	wordOfTheDay:'TakeThis',
			 	themeOfTheDay:'Themer',
			 	inProgress:false,
			 	date:'03/01/2010'
			 },
			{
			 	id:4,
			 	wordOfTheDay:'TakeThis',
			 	themeOfTheDay:'Themer',
			 	inProgress:false,
			 	date:'04/01/2010'
			 }
		]
	}
}