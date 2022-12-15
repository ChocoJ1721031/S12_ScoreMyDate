<%@page import="kh.s12.calendar.member.model.MemberVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery-3.6.1.js"></script>
<script type="text/javascript" src="/resources/js/joinaction.js"></script>
</head>
<body>
	<div id="header">
		<div>
			<button type="button" onclick="login()">로그인</button>
			<button type="button" onclick="main()">홈</button>
		</div>
	</div>
	
	<div id="section">
		<div>
		
			<form id="form" action="/join.do" method="post">
				<div>
					<div><input type="text" id="mname" name="mname" placeholder="닉네임을 입력해주세요" value=""></div>
				</div>
				<div id="mail_input_area">
					<div><input type="text" id="mail" name="mail" placeholder="이메일을 입력해주세요" value=""></div>
					<button type="button" id="dupChkButton">이메일 인증</button>
				</div>
				<div id="pwArea">
					<div><input type="password" id="pw" name="pw" placeholder="비밀번호를 입력해주세요" value=""></div>
				</div>
				<div>
					<div><input type="password" id="pw2" name="pw2" placeholder="비밀번호를 한번 더 입력해주세요" value=""></div>
				</div>
				<button type="button" onclick="submit()">가입하기</button>
			</form>
			
		</div>
	</div>
</body>
</html>