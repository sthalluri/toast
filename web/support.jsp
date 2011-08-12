<html lang="en"><head>
	<jsp:include page="head.jsp"/>
	<body id="page1">
	<!--==============================header=================================-->
   	<jsp:include page="header.jsp" />
	<!--==============================content================================-->
    <section id="content">
    	<div class="main">
        	<div class="inner">
            	<div class="container_12">
                	<div class="wrapper">
                        <div class="grid_3" style="width: 100px">
	                        <div class="padding-right">
	                            <ul class="list-3" style="color: black">
	                                <li class="first" style="color: black"><a href="#support">Support</a></li>
	                            </ul>
	                        </div>
                        </div>
                        <div class="grid_3" style="width: 70%">
                        	<h4 style="color: olive;">Customer Service</h4>
                        	<h6 style="color: red;font-size: 1em"><%if(request.getAttribute("msg")!=null){out.println(request.getAttribute("msg"));}%></h6>
                        	<form class="subscribe-form"  action="/toast/web/submit.jsp" >
                        		<table width="100%">
                        			<tr><td>First Name:</td><td><input name="firstName" id="firstName" type="text"/></td></tr>
                        			<tr><td>Last  Name:</td><td><input name="lastName" id="lastName" type="text"/></td></tr>
                        			<tr><td>Email (*):</td><td><input name="email" id="email" type="text"/></td></tr>
                        			<tr><td>Short Message:</td><td><input name="shortMessage" size="50" id="shortMessage" type="text"/></td></tr>
                        			<tr><td>Problem(*):</td><td><textarea name="problem" rows="5" cols="50"></textarea></td></tr>
                        			<tr><td colspan="2" ><input class="button2" type="submit" value="Submit"/></td></tr>
                        		</table>
                        	</form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="main">
        <aside>
            <div class="container_12">
                <div class="wrapper">
                   
                </div>
            </div>
        </aside>
	<!--==============================footer=================================-->
	<jsp:include page="footer.jsp"/>
    </div>
</body></html>