$().ready(function(){
	$('#searchBtn').click(function() {
		$.ajax({
			url: "/scheduleSearch.lo",
			type: "post",
			async: false,
			data: {
				mid: '<%=(String)session.getAttribute("mid")%>'
			},
			dataType: "text",
			success: function(value) {
				if (value === "fail") {
					alert("이미 사용중인 이메일입니다.\n다른 이메일을 사용해 주세요.");
				} else {
					alert("사용 가능한 이메일입니다.");
					chk++;
				}
			},
			error: function(request, status, error) {
				alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
			}
		});
	});
	
	var memberId = $('#mid').val();
	if(memberId != null) {
		$.ajax({
			url : "/main.lo",
			type : "GET",
			async : false,
			data : {
				mid : memberId
			},
			dataType : "text"
		});
	}
});
	






function login() {
	location.href = "/login";
}
function logout() {
	location.href = "/logout.do";
}
function myPage() {
	location.href = "/myPage";
}