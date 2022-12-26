window.onload = function() {
	var memberId = $('#mid').val();
	if (memberId != null) {
		$.ajax({
			url: "/main",
			type: "post",
			async: false,
			data: {
				mid: memberId
			},
			dataType: "text",
			success: function(value) {

			}
		});
		document.addEventListener('DOMContentLoaded', function() {
			var calendarEl = document.getElementById('calendar');
			calendar.render();
		});
	}

	$('#searchBtn').click(function() {
		$.ajax({
			url: "/scheduleSearch.lo",
			type: "post",
			async: false,
			data: {

			},
			dataType: "text",
			success: function(value) {
				if (value === "fail") {
					alert("");
				} else {
					alert("");
					chk++;
				}
			},
			error: function(request, status, error) {
				alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
			}
		});
	});

	$('.fc-day').click(function(event) {
		var dataDate = this.dataset.date;
		console.log(dataDate);
		//여기서부턴 모달박스 생성 후 ajax를 이용해 insert, delete, update 구현
		var scheduleModal_parent = document.getElementsByTagName('body')[0];
		var scheduleModal_background = document.createElement('div'); //모달박스의 부모태그
		scheduleModal_background.setAttribute('id', 'sModal_parent');
		scheduleModal_parent.appendChild(scheduleModal_background);//생성

		var scheduleModal_background_2 = document.createElement('div');
		scheduleModal_background_2.setAttribute('id', 'sModal_parent_2');
		scheduleModal_background.appendChild(scheduleModal_background_2);//생성

		var scheduleModal_frame = document.createElement('div'); //모달박스 프레임
		scheduleModal_frame.setAttribute('id', 'sModal');
		scheduleModal_background_2.appendChild(scheduleModal_frame);//생성

		var scheduleModal_content = document.createElement('div'); //모달박스 컨텐츠영역
		scheduleModal_content.setAttribute('id', 'sModal_content');
		scheduleModal_frame.appendChild(scheduleModal_content);//생성

		//		-------------------------modalContent_1-----------------------
		var modalContent_1 = document.createElement('div'); //모달박스 컨텐츠영역 차이틀
		modalContent_1.setAttribute('id', 'modalContent_1');
		scheduleModal_content.appendChild(modalContent_1);//생성

		modalContent_1.appendChild(document.createElement('div'));

		var dateTitle = document.createElement('span');
		dateTitle.innerText = dataDate;
		modalContent_1.appendChild(dateTitle);

		var closeBtn = document.createElement('button');
		closeBtn.setAttribute('id', 'close_sModal');
		closeBtn.setAttribute('onclick', 'close_sModal()');
		modalContent_1.appendChild(closeBtn);


		//		-------------------------modalContent_2-----------------------
		var modalContent_2 = document.createElement('div'); //모달박스 컨텐츠영역 스케줄&설문
		modalContent_2.setAttribute('id', 'modalContent_2');
		scheduleModal_content.appendChild(modalContent_2);//생성

		var schedule_area = document.createElement('div');
		schedule_area.setAttribute('id', 'schedule_area');
		modalContent_2.appendChild(schedule_area);

		var graph_area = document.createElement('div');
		graph_area.setAttribute('id', 'graph_area');
		modalContent_2.appendChild(graph_area);
		var graph = document.createElement('div'); //그래프 들어가는곳
		graph.setAttribute('id', 'graph');
		graph_area.appendChild(graph);
		var serveyBtn = document.createElement('button');
		serveyBtn.setAttribute('id', 'serveyBtn');
		//그래프 표시
		serveyBtn.innerText = "설문조사";
		serveyBtn.setAttribute('onclick', 'servey()'); //설문조사 페이지로 이동
		graph_area.appendChild(serveyBtn);



		//		-------------------------modalContent_3-----------------------
		var modalContent_3 = document.createElement('div'); //모달박스 컨텐츠영역 다이어리
		modalContent_3.setAttribute('id', 'modalContent_3');
		scheduleModal_content.appendChild(modalContent_3);//생성

		var diary_area = document.createElement('div');
		diary_area.setAttribute('id', 'diary_area');
		modalContent_3.appendChild(diary_area);
		var diary = document.createElement('span');
		diary.setAttribute('id', 'diary');
		diary_area.appendChild(diary);
		diary.innerText = "작성된 다이어리가 없습니다.";




		//		<div id="sModal_parent">
		//			<div id="sModal_parent_2">
		//				<div id="sModal">
		//					<div id="sModal_content">
		//						<div id="modalContent_1">
		//							<div></div>
		//							<span>대충 날짜</span>
		//							<button type="button" id="close_sModal" onclick="close_sModal()"></button>
		//						</div>
		//						<div id="modalContent_2">
		//							<div id="schedule_area">
		//								스케줄 들어갈 자리
		//						</div>
		//							<div id="graph_area">
		//								그래프 들어갈 자리
		//							<button type="button" id="serveyBtn" >설문조사 버튼</button>
		//							</div>
		//						</div>
		//						<div id="modalContent_3">
		//							<div id="diary_area">
		//								<span id="diary">no text has written</span>
		//							</div>
		//						</div>
		//					</div>
		//				</div>
		//			</div>
		//		</div>
	});

};



function close_sModal() {
	$('#sModal_parent').remove();
}



function login() {
	location.href = "/login";
}
function logout() {
	location.href = "/logout.do";
}
function myPage() {
	location.href = "/myPage";
}