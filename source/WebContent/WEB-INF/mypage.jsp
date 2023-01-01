<%@page import="kh.s12.calendar.servey.model.ServeyVO"%>
<%@page import="kh.s12.calendar.member.model.MemberVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<% MemberVO mvo = (MemberVO) request.getSession().getAttribute("member"); %>
<% ServeyVO svo = (ServeyVO) request.getSession().getAttribute("servey"); %>
<link rel="shortcut icon" href="#"> <!-- 브라우저 아이콘 -->
<link rel='stylesheet' href='/resources/fullcalendar-5.11.3/lib/main.css'/>
<link rel="stylesheet" href="/resources/css/reset.css"/>
<link  rel='stylesheet' href='/resources/css/header.css'/>
<link  rel='stylesheet' href='/resources/css/servey.css'/>

<script src='/resources/js/jquery-3.6.1.js'></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
<script src='/resources/fullcalendar-5.11.3/lib/main.js'></script>
<script src='/resources/js/mypage.js'></script>
<script src='/resources/js/header.js'></script>

<title>Insert title here</title>
</head>
<body>
	<div id="header">
		<div>
			<h1 onclick="main()">Score My Day</h1>
			<% if(mvo == null){ %>
			<div>
				<button type="button" onclick="login()">로그인</button>
			</div>
			<%} else {%>
			<div>
				<button type="button" onclick="logout()">로그아웃</button>
				<button type="button" onclick="myPage()">마이페이지</button>
			</div>
			<%}%>
			<%if(mvo != null) {int mid = mvo.getMid();%>
			<input type="hidden" id="mid" name="mid" value="<%=mid%>">
			<%}%>
		</div>
	</div>
	
	<div id="section">
		<div id="profile_area">
			<span><%=mvo.getMname()%>님, 안녕하세요</span>
			<div>
				<button type="button">닉네임 변경</button>
			</div>
			<div>
				<button type="button">비밀번호 변경</button>
			</div>
		</div>
		
		<div id="serveyData_area">
			<div id="score_area">
				<select name="range">
					<option value="week" selected>주 단위</option>
					<option value="month">월 단위</option>
					<option value="year">년 단위</option>
				</select>
				<div>
					<div id="servey_avg"></div>
					<div id="score_avg"></div>
				</div>

			</div>
			
			<div id="graph_area">
			
			</div>
		</div>
	</div>
	
	
	
</body>
</html>