window.onload = function() {
	$('#mname').change(function(event) {
		//TODO
	});
	
	//메일 값 변경시 중복체크 활성화, 인증코드 영역 삭제
	$('#mail').keyup(function(event) {
		var dupChkBtn = document.getElementById('dupChkButton');
		dupChkBtn.disabled = "";

		if($('#codeArea').length != 0) {
			document.getElementById('codeArea').remove();
		}
		
		//TODO 메일 인증 여부 값 초기화
	});
	
	//메일 중복체크
	$('#dupChkButton').click(function(event) {
		var regex = /^[A-Za-z0-9]$/; //TODO 대충 메일 정규표현식 ㄱㄱ
		var chk = 0;
		if ($('#mail').val() == null || $('#mail').val() == "") {
			if($('#mailPopM').length == 0) {
				var mailParent = document.getElementById('mail_input_area').firstElementChild;
				var inputMessage = document.createElement('span');
				inputMessage.setAttribute("class", 'popMessage');
				inputMessage.setAttribute("id", 'mailPopM');
				inputMessage.innerText = "이메일을 입력해주세요.";
				
				mailParent.appendChild(inputMessage);
			}
		} else { //정규표현식 else if 추가 예정
			$.ajax({
				url: "/dupchk.lo",
				type: "post",
				async: false,
				data: {
					mail: $('#mail').val()
				},
				dataType: "text",
				success: function(value) {
					if (value === "fail") {
						alert("이미 사용중인 이메일입니다.\n다른 이메일을 사용해 주세요.");
					} else {
						alert("사용 가능한 이메일입니다.");
						chk++;
						
						//인증코드 영역 생성
						var form = document.getElementById('form');
						var pwArea = document.getElementById('pwArea');
						var codeArea = document.createElement('div');
						codeArea.setAttribute("id", 'codeArea');
						
						form.insertBefore(codeArea, pwArea);
						
						//인증코드 입력란 생성
						var codeParent = document.getElementById('codeArea');
						var inputCode = document.createElement('input');
						inputCode.setAttribute("id", 'mailCodeInput');
						inputCode.setAttribute("type", 'text');
						inputCode.setAttribute("name", 'code');
						inputCode.setAttribute("placeholder", '인증코드');
						inputCode.setAttribute("maxlength", '6');
						
						codeParent.appendChild(inputCode);
						
						//인증코드 전송 버튼 생성
						var codeBtn = document.createElement('button');
						codeBtn.setAttribute("id", 'mailCodeBtn');
						codeBtn.setAttribute("type", 'button');
						codeBtn.setAttribute("onclick", 'codeBtn()');
						codeBtn.innerText = "인증코드 전송";
						
						codeParent.appendChild(codeBtn);
						
						//중복체크 버튼 비활성화
						var dupChkBtn = document.getElementById('dupChkButton');
						dupChkBtn.disabled = "true";
					}
				},
				error: function(request, status, error) {
					alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
				}
			});
		}

		if (chk == 0) {
			event.preventDefault();
		}
	});
}
$(function() {
	
	
	
});

//인증코드 메일 전송
function codeBtn() {
	var btn = document.getElementById('mailCodeBtn');
	var chk = 0;
	if(btn.innerText == "인증코드 전송") {
		var url = "/codeSend.lo";
		
		function mailCode(value) {
			if (value === "fail") {
				alert("이메일 전송 실패!");
			} else {
				alert("인증번호가 전송됐습니다. 이메일을 확인해 주세요.");
				chk++;
				btn.innerText = "확인";
			}
		}
	} else {
		var url = "/codeChk.lo";
		function mailCode(value) {
			if (value === "fail") {
				alert("코드 인증 실패!");
			} else {
				alert("코드가 일치합니다.");
				chk++;
				$('#codeArea').remove();
			}
		}
	}
	$.ajax({
		url: url,
		type: "post",
		async: false,
		data: {
			mail: $('#mail').val()
		},
		dataType: "text",
		success: function(value) {
			mailCode(value);
		},
		error: function(request, status, error) {
			alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
		}
	});

	if (chk == 0) {
		event.preventDefault();
	}
}


function main() {
	location.href = "/main";
}
function login() {
	location.href = "/login";
}

function submit() {
	location.href = "/join.do";
}
