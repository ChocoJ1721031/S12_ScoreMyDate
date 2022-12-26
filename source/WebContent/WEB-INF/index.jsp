<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="kh.s12.calendar.member.model.MemberVO"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<% MemberVO vo = (MemberVO) request.getSession().getAttribute("member"); %>
<link rel="shortcut icon" href="#"> <!-- 브라우저 아이콘 -->
<link rel='stylesheet' href='/resources/fullcalendar-5.11.3/lib/main.css'/>
<link rel="stylesheet" href="/resources/css/reset.css"/>
<link  rel='stylesheet' href='/resources/css/header.css'/>
<link  rel='stylesheet' href='/resources/css/index.css'/>

<script src='/resources/js/jquery-3.6.1.js'></script>
<script src='/resources/fullcalendar-5.11.3/lib/main.js'></script>
<script src='/resources/js/index.js'></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		initialDate: '2022-12-21',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		editable: true,
		droppable: true,
		drop: function(arg) {
			if (document.getElementById('drop-remove').checked) {
				arg.draggedEl.parentNode.removeChild(arg.draggedEl);
			}
		},
		events: <%=session.getAttribute("list")%>
	});
	calendar.render();
});

</script>

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
					<%if(vo != null) {int mid = vo.getMid();%>
					<input type="hidden" id="mid" name="mid" value="<%=mid%>">
					<%}%>
					<div>
						<input type="text" name="search" placeholder="검색할 일정을 입력해주세요.">
						<button type="button" id="searchBtn">검색</button>
					</div>
				</form>
			</div>
			<div>
				<div id='calendar'></div>
			</div>
		</div>
	</div>

	<div id="sModal_parent">
		<div id="sModal_parent_2">
			<div id="sModal">
				<div id="sModal_content">
					<div id="modalContent_1">
						<div></div>
						<span>대충 날짜</span>
						<button type="button" id="close_sModal" onclick="close_sModal()"></button>
					</div>
					<div id="modalContent_2">
						<div id="schedule_area">
							
						</div>
						<div id="graph_area">
							<div id="graph">Graph here</div>
							<button type="button" id="serveyBtn" >설문조사 버튼</button>
						</div>
					</div>
					<div id="modalContent_3">
						<div id="diary_area">
							<span id="diary">no text has written</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>