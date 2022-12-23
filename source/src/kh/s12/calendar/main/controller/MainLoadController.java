package kh.s12.calendar.main.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.PrintWriter;
import java.util.ArrayList;

import kh.s12.calendar.main.model.CalendarService;
import kh.s12.calendar.main.model.CalendarVO;
import kh.s12.calendar.member.model.MemberVO;

	@WebServlet("/main.lo")
	public class MainLoadController extends HttpServlet {
		private static final long serialVersionUID = 1L;
	       
	    public MainLoadController() {
	        super();
	    }

		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			HttpSession session = request.getSession();
			CalendarService cservice = new CalendarService();
			PrintWriter out = response.getWriter();
			MemberVO mvo = (MemberVO) session.getAttribute("member");
			
			if(mvo != null) {
				int mid = mvo.getMid();
				
				ArrayList<CalendarVO> vo = new ArrayList<CalendarVO>();
				vo = cservice.callSchedule(mid);
				
				System.out.println("/calendar.lo 컨트롤러");
				System.out.println(vo);
				
				if(vo != null) {
					System.out.println("/main 스케줄 호출 성공!");
					session.setAttribute("list", vo);
				} else {
					System.out.println("/main 스케줄 호출 실패!");
					out.append("fail");
				}
			}
			
		}
		
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			response.setContentType("application/json;charset=UTF-8");
			doGet(request, response);
		}

}