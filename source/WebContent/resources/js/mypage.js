window.onload = function() {
	console.log(avgScore());
	
}


function avgScore() {
	const daySample = new Date();
	const year = daySample.getFullYear();
	const month = daySample.getMonth() + 1;
	const date = daySample.getDate();
	let today = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
	
	let range = document.getElementsByName('range')[0];
	let scvo_date;
	let scvo_ser_1;
	let scvo_ser_2;
	let scvo_ser_3;
	let scvo_ser_4;
	let scvo_ser_5;
	let scvo_score_1;
	let scvo_ser_diary;
	let arr = [];
	$.ajax({
		url: getContextPath() + "/callAllServey.do", //해당 날짜 설문내용 호출
		type: "post",
		async: false,
		data: {
			mid: $('#mid').val()
		},
		dataType: "json",
		success: function(value) {
			if (value === "fail") {

			} else {
				for (let i = 0; i < value.list.length; i++) {
					scvo_date = value.list[i].dDate;
					scvo_ser_1 = value.list[i].ser_1;
					scvo_ser_2 = value.list[i].ser_2;
					scvo_ser_3 = value.list[i].ser_3;
					scvo_ser_4 = value.list[i].ser_4;
					scvo_ser_5 = value.list[i].ser_5;
					scvo_score_1 = value.list[i].score_1;
					scvo_ser_diary = value.list[i].ser_diary;

					if(range.value === 'week') {
						let lastweekOrg = new Date(today.setDate(today.getDate() - 7));
						const year = lastweekOrg.getFullYear();
						const month = lastweekOrg.getMonth() + 1;
						const date = lastweekOrg.getDate();
						let lastWeek = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
						
						if(scvo_date <= today && scvo_date > lastWeek) {
							let sum = scvo_ser_1+scvo_ser_2+scvo_ser_3+scvo_ser_4+scvo_ser_5;
							arr.push(sum/5);
						}
						
					} else if(range.value === 'month') {
						let lastMonthOrg = new Date(today.setMonth(today.getMonth() - 1)) ;
						const year = lastMonthOrg.getFullYear();
						const month = lastMonthOrg.getMonth() + 1;
						const date = lastMonthOrg.getDate();
						let lastMonth = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
						
						if(scvo_date <= today && scvo_date > lastMonth) {
							let sum = scvo_ser_1+scvo_ser_2+scvo_ser_3+scvo_ser_4+scvo_ser_5;
							arr.push(sum/5);
						}
					} else if(range.value === 'year') {
						let lastYearOrg = new Date(today.setYear(today.getYear() - 1)) ;
						const year = lastYearOrg.getFullYear();
						const month = lastYearOrg.getMonth() + 1;
						const date = lastYearOrg.getDate();
						let lastYear = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
						
						if(scvo_date <= today && scvo_date > lastYear) {
							let sum = scvo_ser_1+scvo_ser_2+scvo_ser_3+scvo_ser_4+scvo_ser_5;
							arr.push(sum/5);
						}
					}
				}
				
				console.log(arr[0]);
				let arrSum = 0;
				for(let j=0; j<arr.length; j++) {
					arrSum += arr[j];
				}
				console.log(arrSum/arr.length);
				console.log(arrSum);
				console.log(arr.length);
				var serveyScore = arrSum/arr.length;
				return serveyScore;
			}
		},
		error: function(request, status, error) {
			alert("code" + request.status + "\n" + "message : " + request.responseText + "\nerror" + error);
		}
	});


}





