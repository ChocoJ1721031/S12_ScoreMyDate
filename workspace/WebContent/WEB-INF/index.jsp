<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="kh.s12.calendar.member.model.MemberVO"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<% MemberVO vo = (MemberVO) request.getSession().getAttribute("member"); %>
<link href='/resources/fullcalendar-5.11.3/lib/main.css' rel='stylesheet' />
<script src='/resources/fullcalendar-5.11.3/lib/main.js'></script>
<script>
	document.addEventListener('DOMContentLoaded', function() {
		var calendarEl = document.getElementById('calendar');
	  	var calendar = new FullCalendar.Calendar(calendarEl, {
	    initialView: 'dayGridMonth'
	  	});
	  	calendar.render();
	});
	
	
	function login() {
		location.href = "<%=request.getContextPath()%>/login";
	}
	function logout() {
		location.href = "<%=request.getContextPath()%>/logout.do";
	}
	function myPage() {
		location.href = "<%=request.getContextPath()%>/myPage";
	}
	 
  
</script>

<title>Calendar</title>
</head>
<body>
	<div id="header">
		<h1>Score My Date</h1>
		<div></div>
		<% if(vo == null){ %>
		<div>
			<button type="button" onclick="login()">로그인</button>
		</div>
		<%} else {%>
		<div>
			<button type="button" onclick="logout()">로그아웃</button>
			<button type="button" onclick="myPage()">마이페이지</button>
		</div>
		<%}%>
	</div>
	<div id="section">
		<div id='calendar'></div>
	</div>
</body>
</html>