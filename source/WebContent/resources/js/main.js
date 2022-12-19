document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
  	var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  	});
  	calendar.render();
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