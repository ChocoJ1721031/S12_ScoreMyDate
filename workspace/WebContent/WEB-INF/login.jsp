<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<script>
	function main() {
		location.href = "<%=request.getContextPath()%>/main";
	}
	function join() {
		location.href = "<%=request.getContextPath()%>/join";
	}
	function submit() {
		location.href = "<%=request.getContextPath()%>/login.do";
	}
</script>
</head>
<body>
	<div id="header">
		<h1>Score My Date</h1>
		<div>
			<button type="button" onclick="join()">회원가입</button>
			<button type="button" onclick="main()">홈</button>
		</div>
	</div>
	
	<div id="section">
		<div>
			<form action="/login.do" method="post">
				<div><h2>로그인</h2></div>
				<div>
					<input class="" type="text" name="mail" placeholder="이메일">
					<input class="" type="password" name="pw" placeholder="비밀번호">
				</div>
				<div><a href="#">비밀번호 찾기</a></div>
				<div>
					<button type="button" onclick="submit()">로그인</button>
				</div>
			</form>
		</div>
	</div>
</body>
</html>