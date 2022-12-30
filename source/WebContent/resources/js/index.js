var memberId = $('#mid').val();
window.onload = function() {
	var memberId = $('#mid').val();
	$.ajax({
		url: "/main",
		type: "post",
		async: false,
		data: {
			mid: memberId
		},
		dataType: "json",
		success: function(value) {
			let calendarEl = document.getElementById('calendar');
			let calendar = new FullCalendar.Calendar(calendarEl, {
				initialDate: '2022-12-21',
				headerToolbar: {
					left: 'prev next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				},
				dayMaxEvents: true,
				events: value.list
			});
			calendar.render();
		},
		error: function(event) {
			let calendarEl = document.getElementById('calendar');
			let calendar = new FullCalendar.Calendar(calendarEl, {
				initialDate: '2022-12-21',
				headerToolbar: {
					left: 'prev next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				},
				dayMaxEvents: true
			});
			calendar.render();
		}
	});
	
	var dataDate;
	var selector;
	$(document).on('click', '.fc-daygrid-day', function() { //날짜 상세보기
		if(memberId != null) {
			selector = this;
			dataDate = selector.dataset.date;
			const modal_child_1 = '<div id="sModal_parent_2">'+
					'<div id="sModal">'+
						'<div id="sModal_content">'+
							'<div id="modalContent_1">'+
								'<div></div>'+
								'<span>'+dataDate+'</span>'+
								'<button type="button" id="close_sModal" onclick="close_sModal()"></button>'+
							'</div>'+
							'<div id="modalContent_2">'+
								'<input type="hidden" id="selecDate" name="selecDate" value="'+dataDate+'">'+
								'<div id="schedule_area">'+
									'<div id="schedule_area_2"></div>'+
									'<button type="button" id="addSchedule" onclick="addSchedule(this)">+</button>'+
								'</div>'+
								'<div id="graph_area">'+
									'<div id="graph">Graph here</div>'+
									'<button type="button" id="serveyBtn" onclick="servey()">설문조사 버튼</button>'+
								'</div>'+
							'</div>'+
							'<div id="modalContent_3">'+
								'<div id="diary_area">'+
									'<span id="diary">no text has written</span>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
				
			var scheduleModal_parent = document.getElementsByTagName('body')[0];
			var scheduleModal_background = document.createElement('div'); //모달박스의 부모태그
			scheduleModal_background.setAttribute('id', 'sModal_parent');
			scheduleModal_parent.appendChild(scheduleModal_background);//생성
			
			scheduleModal_background.innerHTML = modal_child_1;
			
			var schedule;
			$.ajax({
				url: "/main",
				type: "post",
				async: false,
				data: {
					mid: memberId
				},
				dataType: "json",
				success: function(value) {
					console.log(value.list)
					schedule = value.list;
					var schedule_area_2 = document.getElementById('schedule_area_2');
					
					for(var j=0; j<schedule.length; j++) {
						if(schedule[j].end === undefined) {
							if(dataDate === schedule[j].start) {
								daySchedule = document.createElement('div');
								daySchedule.setAttribute('id', 'schedule_'+j);
								daySchedule.setAttribute('class', 'daySchedule');
								daySchedule.innerHTML = '<div class="daySchedule_title">'+schedule[j].title+'</div>'+
														'<button type="button" class="delBtn" onclick="delSchedule(this)">-</button>';
								daySchedule.dataset.start = schedule[j].start;
								daySchedule.dataset.snum = schedule[j].snum;
								
								schedule_area_2.appendChild(daySchedule);
							}
							
						} else {
							if(dataDate >= schedule[j].start && dataDate <= schedule[j].end) {
								daySchedule = document.createElement('div');
								daySchedule.setAttribute('id', 'schedule_'+j);
								daySchedule.setAttribute('class', 'daySchedule');
								daySchedule.innerHTML = '<div class="daySchedule_title">'+schedule[j].title+'</div>'+
														'<button type="button" class="delBtn" onclick="delSchedule(this)">-</button>';
								daySchedule.dataset.start = schedule[j].start;
								daySchedule.dataset.end = schedule[j].end;
								daySchedule.dataset.snum = schedule[j].snum;
								
								schedule_area_2.appendChild(daySchedule);
							}
							
						}
						
					}
				}
			});
		}
	});
	
	
	$(document).on('click', '.daySchedule_title', function() { //스케줄 수정
		console.log($(this).text());
		var dataTitle = $(this).text();
		var start = $(this).parent().data("start");
		var end = $(this).parent().data("end");
		var snum = parseInt($(this).parent().data("snum"));
		console.log(dataDate);
		const modal_child_3 = '<div id="sModal_parent_4">'+
				'<div id="sModal">'+
					'<div id="sModal_content">'+
						'<form>'+
							'<div id="modalContent_6">'+
								'<div></div>'+
								'<span>'+start+'</span>'+
								'<button type="button" id="close_add"></button>'+
							'</div>'+
							'<div id="modalContent_7">'+
								'<div>'+
									'<input type="date" id="start" class="input_date" name="start" value="'+start+'">'+
									'<span>~</span>'+
									'<input type="date" id="end" class="input_date" name="end" value="'+end+'">'+
								'</div>'+
								'<div>'+
									'<input type="text" id="title" class="input_title" name="title" value="'+dataTitle+'">'+
								'</div>'+
								'<div>'+
									'<button type="button" id="update" class="schedule_btn">수정</button>'+
									'<button type="button" id="cancel" class="schedule_btn">취소</button>'+
								'</div>'+
							'</div>'+
						'</form>'+
					'</div>'+
				'</div>'+
			'</div>';
			
		document.getElementById('sModal_parent').innerHTML += modal_child_3;
		
		if($('#sModal_parent_2').length) {
			$('#sModal_parent_2').css.display = "hidden";
		} else if($('#sModal_parent_5').length) {
			$('#sModal_parent_5').css.display = "hidden";
		}
		
		
		
		$(document).on('click', '#close_add', function() {
			$('#sModal_parent_4').remove();
			
			if($('#sModal_parent_2').length) {
				$('#sModal_parent_2').css.display = "flex";
			} else if($('#sModal_parent_5').length) {
				$('#sModal_parent_5').css.display = "flex";
			}
			
		});

		$('#update').click(function(event) {
			if($('#end').val() === null || $('#end').val() === "") {
				var data = {
					snum: snum,
					mid: $('#mid').val(),
					start: $('#start').val(),
					title: $('#title').val()
				}
			} else {
				var data = {
					snum: snum,
					mid: $('#mid').val(),
					start: $('#start').val(),
					end: $('#end').val(),
					title: $('#title').val()
				}
			}
			
			$.ajax({
				url: "/updateSchedule.do",
				type: "post",
				async: false,
				data: data,
				dataType: "text",
				success: function(value) {
					if(value === "fail") {
						console.log("schedule update ERROR");
						alert("ERROR : 스케줄 update 실패하였습니다.");
					} else {
						$(function() {
							$('#sModal_parent_4').remove();
							
							if($('#sModal_parent_2').length) {
								$('#sModal_parent_2').css.display = "flex";
								
							} else if($('#sModal_parent_5').length) {
								$('#sModal_parent_5').css.display = "flex";
							}
							
						});
						reload_schedule();
					}
					
				},
				error: function(event) {
					console.log("스케줄 update 실패");
				}
			});
			
			var memberId = $('#mid').val();
			$.ajax({
				url: "/main",
				type: "post",
				async: false,
				data: {
					mid: memberId
				},
				dataType: "json",
				success: function(value) {
					let calendarEl = document.getElementById('calendar');
					let calendar = new FullCalendar.Calendar(calendarEl, {
						initialDate: '2022-12-21',
						headerToolbar: {
							left: 'prev next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
						},
						dayMaxEvents: true,
						events: value.list
					});
					calendar.render();
				},
				error: function(event) {
					let calendarEl = document.getElementById('calendar');
					let calendar = new FullCalendar.Calendar(calendarEl, {
						initialDate: '2022-12-21',
						headerToolbar: {
							left: 'prev next today',
							center: 'title',
							right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
						},
						dayMaxEvents: true
					});
					calendar.render();
				}
			});
			
			
			
		
		});
		
		$(document).on('click', '#cancel', function() {
			console.log("cancel btn");
			$('#sModal_parent_4').remove();
			$('#sModal_parent_2').css.display = "flex";
		});
		
	});
	
	
} //window.onload



function addSchedule(dataDate) { // 스케줄 추가
	var dataDate = $('#selecDate').val();
	console.log(dataDate);
	const modal_child_2 = '<div id="sModal_parent_3">'+
		'<div id="sModal">'+
			'<div id="sModal_content">'+
				'<form>'+
					'<div id="modalContent_4">'+
						'<div></div>'+
						'<span>'+dataDate+'</span>'+
						'<button type="button" id="close_add"></button>'+
					'</div>'+
					'<div id="modalContent_5">'+
						'<div>'+
							'<input type="date" id="start" class="input_date" name="start" value="'+dataDate+'">'+
							'<span>~</span>'+
							'<input type="date" id="end" class="input_date" name="end">'+
						'</div>'+
						'<div>'+
							'<input type="text" id="title" class="input_title" name="title">'+
						'</div>'+
						'<div>'+
							'<button type="button" id="add" class="schedule_btn">추가</button>'+
							'<button type="button" id="cancel" class="schedule_btn">취소</button>'+
						'</div>'+
					'</div>'+
				'</form>'+
			'</div>'+
		'</div>'+
	'</div>';
	
	document.getElementById('sModal_parent').innerHTML += modal_child_2;
	$('#sModal_parent_2').css.display = "hidden";
	
	
	
	$('#close_add').click(function(event) {
		$('#sModal_parent_3').remove();
		$('#sModal_parent_2').css.display = "flex";
	});
	
	$('#add').click(function(event) {
		console.log("add btn");
		$.ajax({
			url: "/addSchedule.do",
			type: "post",
			async: false,
			data: {
				mid: $('#mid').val(),
				start: $('#start').val(),
				end: $('#end').val(),
				title: $('#title').val()
			},
			dataType: "text",
			success: function(value) {
				if(value === "fail") {
					console.log("schedule add ERROR");
					alert("ERROR : 스케줄 추가에 실패하였습니다.");
				} else {
					$(function() {
						$('#sModal_parent_3').remove();
						$('#sModal_parent_2').css.display = "flex";
						
						reload_schedule();
					});
				}
				
			},
			error: function(event) {
				console.log("스케줄 추가 실패");
			}
		});
		
		var memberId = $('#mid').val();
		$.ajax({
			url: "/main",
			type: "post",
			async: false,
			data: {
				mid: memberId
			},
			dataType: "json",
			success: function(value) {
				if (value.msg == 'fail') {
	
				} else {
					// TODO: value.list 들어있는 
	
				}
				let calendarEl = document.getElementById('calendar');
				let calendar = new FullCalendar.Calendar(calendarEl, {
					initialDate: '2022-12-21',
					headerToolbar: {
						left: 'prev next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
					},
					dayMaxEvents: true,
					events: value.list
				});
				calendar.render();
			},
			error: function(event) {
				let calendarEl = document.getElementById('calendar');
				let calendar = new FullCalendar.Calendar(calendarEl, {
					initialDate: '2022-12-21',
					headerToolbar: {
						left: 'prev next today',
						center: 'title',
						right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
					},
					dayMaxEvents: true
				});
				calendar.render();
			}
		});
	});
	
	$('#cancel').click(function(event) {
		console.log("cancel btn");
		$('#sModal_parent_3').remove();
		
	});
}
function close_sModal() {
	document.getElementById('sModal_parent').remove();
}

function reload_schedule() {
	var dataDate = $('#selecDate').val();
	if($('#sModal_parent_5').length) {
		$('#sModal_parent').remove();
		searchSchedule();
	} else {
		$.ajax({
			url: "/main",
			type: "post",
			async: false,
			data: {
				mid: memberId
			},
			dataType: "json",
			success: function(value) {
				console.log(value.list)
				//var schedule = value.list.filter(it => new RegExp(dataDate).test(it.start));
				schedule = value.list;
				var schedule_area_2 = document.getElementById('schedule_area_2');
				
				while(schedule_area_2.firstChild) {
					schedule_area_2.removeChild(schedule_area_2.firstChild);	
				}
				
				
				for(var j=0; j<schedule.length; j++) {
					if(schedule[j].end === undefined) {
						if(dataDate === schedule[j].start) {
							daySchedule = document.createElement('div');
							daySchedule.setAttribute('id', 'schedule_'+j);
							daySchedule.setAttribute('class', 'daySchedule');
							daySchedule.innerHTML = '<div class="daySchedule_title">'+schedule[j].title+'</div>'+
													'<button type="button" class="delBtn" onclick="delSchedule(this)">-</button>';
							daySchedule.dataset.start = schedule[j].start;
							daySchedule.dataset.snum = schedule[j].snum;
							
							schedule_area_2.appendChild(daySchedule);
						}
						
					} else {
						if(dataDate >= schedule[j].start && dataDate <= schedule[j].end) {
							daySchedule = document.createElement('div');
							daySchedule.setAttribute('id', 'schedule_'+j);
							daySchedule.setAttribute('class', 'daySchedule');
							daySchedule.innerHTML = '<div class="daySchedule_title">'+schedule[j].title+'</div>'+
													'<button type="button" class="delBtn" onclick="delSchedule(this)">-</button>';
							daySchedule.dataset.start = schedule[j].start;
							daySchedule.dataset.end = schedule[j].end;
							daySchedule.dataset.snum = schedule[j].snum;
							
							schedule_area_2.appendChild(daySchedule);
						}
						
					}
					
				}
				
			}
		});
	}
	
}

function delSchedule(e) {
	let dataDate = $('#selecDate').val();
	console.log($(e).parent().data('snum'));
	console.log($('#mid').val());
	$.ajax({
		url: "/delSchedule.do",
		type: "post",
		async: false,
		data: {
			snum: $(e).parent().data('snum'),
			mid: $('#mid').val()
		},
		dataType: "text",
		success: function(value) {
			console.log('value : '+value);
			if(value === "fail") {
				console.log("schedule add ERROR");
				alert("ERROR : 스케줄 삭제에 실패하였습니다.");
			} else {
				alert("스케줄 삭제에 성공하였습니다.");
			}
			
		},
		error: function(event) {
			console.log("스케줄 추가 실패");
		}
	});
	reload_schedule();
	
	var memberId = $('#mid').val();
	$.ajax({
		url: "/main",
		type: "post",
		async: false,
		data: {
			mid: memberId
		},
		dataType: "json",
		success: function(value) {
			let calendarEl = document.getElementById('calendar');
			let calendar = new FullCalendar.Calendar(calendarEl, {
				initialDate: '2022-12-21',
				headerToolbar: {
					left: 'prev next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				},
				dayMaxEvents: true,
				events: value.list
			});
			calendar.render();
		},
		error: function(event) {
			let calendarEl = document.getElementById('calendar');
			let calendar = new FullCalendar.Calendar(calendarEl, {
				initialDate: '2022-12-21',
				headerToolbar: {
					left: 'prev, next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
				},
				dayMaxEvents: true
			});
			calendar.render();
		}
	});
}

function searchSchedule() {
	let searchInput = document.getElementById('searchInput');
	if(searchInput.value !== "" && $('#mid').length) {
		$.ajax({
			url: "/searchSchedule.do",
			type: "post",
			async: false,
			data: {
				searchInput: searchInput.value
			},
			dataType: "json",
			success: function(value) {
				if(value === "fail") {
					alert("검색 결과가 없습니다.");
				} else {
					searchModal(value.searchList);
					
				}				
			},
			error: function(request, status, error) {
				alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
			}
		});
	}
	
}

function searchModal(e) { // 스케줄 검색
	console.log(e);
	
	const modal_child_4 = '<div id="sModal_parent_5">'+
			'<div id="sModal">'+
				'<div id="sModal_content">'+
					'<div id="modalContent_1">'+
						'<div></div>'+
						'<span></span>'+
						'<button type="button" id="close_sModal" onclick="close_sModal()"></button>'+
					'</div>'+
					'<div id="modalContent_8">'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		
	var scheduleModal_parent = document.getElementsByTagName('body')[0];
	var scheduleModal_background = document.createElement('div'); //모달박스의 부모태그
	scheduleModal_background.setAttribute('id', 'sModal_parent');
	scheduleModal_parent.appendChild(scheduleModal_background);//생성
	
	scheduleModal_background.innerHTML = modal_child_4;
	
	var modalContent_8 = document.getElementById('modalContent_8');
	
	
	
	for(var k=0; k<e.length; k++) {
		var scheduleList = document.createElement('div');
		scheduleList.setAttribute('class', 'scheduleList');
		scheduleList.setAttribute('id', 'scheduleList_'+k);
		scheduleList.dataset.start = e[k].start;
		scheduleList.dataset.title = e[k].title;
		scheduleList.dataset.snum = e[k].snum;
		
		modalContent_8.appendChild(scheduleList);
		
		var scheduleDate = document.createElement('div');
		scheduleDate.setAttribute('class', 'scheduleDate');
		scheduleDate.setAttribute('id', 'scheduleDate_'+k);
		
		scheduleList.appendChild(scheduleDate);
		
		var scheduleTitle = document.createElement('div');
		scheduleTitle.setAttribute('class', 'daySchedule_title');
		
		
		if(e[k].end !== "" && e[k].end !== undefined) {
			scheduleDate.innerHTML = e[k].start+" ~ "+e[k].end;
			scheduleList.dataset.end = e[k].end;
		} else {
			scheduleDate.innerHTML = e[k].start;
		}
		
		scheduleList.appendChild(scheduleTitle);
		scheduleTitle.innerHTML = e[k].title;
	}
	
}

function servey() {
	let date= $('#selecDate').val();
	let chk = 0;
	$.ajax({
		url: "/checkServey.do",
		type: "post",
		async: false,
		data: {
			date: date,
			mid: $('#mid').val()
		},
		dataType: "text",
		success: function(value) {
			if(value === "yes") {
				alert("이미 설문이 작성되었습니다.");
			} else {
				chk++;
			}				
		},
		error: function(request, status, error) {
			alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
		}		
	});
	
	if(chk == 1) {
		location.href= "/servey";
	}
}

function getServey() {
	$.ajax({
		url: "/checkServey.do",
		type: "post",
		async: false,
		data: {
			date: date,
			mid: $('#mid').val()
		},
		dataType: "json",
		success: function(value) {
			if(value === "yes") {
				alert("이미 설문이 작성되었습니다.");
			} else {
				chk++;
			}				
		},
		error: function(request, status, error) {
			alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
		}		
	});
}

