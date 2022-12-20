<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="kh.s12.calendar.member.model.MemberVO"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<% MemberVO vo = (MemberVO) request.getSession().getAttribute("member"); %>
<link rel='stylesheet' href='/resources/fullcalendar-5.11.3/lib/main.css'/>
<link rel="stylesheet" href="/resources/css/reset.css"/>
<link  rel='stylesheet' href='/resources/css/header.css'/>
<link  rel='stylesheet' href='/resources/css/index.css'/>

<script src='/resources/fullcalendar-5.11.3/lib/main.js'></script>
<script src='/resources/js/main.js'></script>


<title>Calendar</title>
</head>
<body>
	<div id="header">
		<div>
			<h1>Score My Day</h1>
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
	</div>

	<div id="section">
		<div>
			<div>
				<form class="form-inline">
					<div>
						<input type="text" name="search" placeholder="검색할 일정을 입력해주세요.">
						<button type="button" id="searchBtn">검색</button>
					</div>
				</form>
			</div>
			<div>
				<!-- 검색을 안했다면 그냥 캘린더 출력, 검색했다면 리스트로 출력 -->
				<div id='calendar'></div>
			</div>
		</div>
	</div>
</body>
</html>