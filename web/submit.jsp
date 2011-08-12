<%

System.out.println("TICKET : email["+request.getParameter("email")+"]"
		+"firstName:["+request.getParameter("firstName")+"]"
		+"lastName:["+request.getParameter("lastName")+"]"
		+"shortMessage:["+request.getParameter("shortMessage")+"]"
		+"problem:["+request.getParameter("problem")+"]"
		);

request.setAttribute("msg","Thanks for reporting the problem. Will contact you shortly");

%>

<jsp:include page="support.jsp"></jsp:include>