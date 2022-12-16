package kh.s12.calendar.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

	@WebServlet("/main")
	public class MainController extends HttpServlet {
		private static final long serialVersionUID = 1L;
	       
	    public MainController() {
	        super();
	    }

		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			System.out.println("/calendar 컨트롤러");
			String viewPage = "/WEB-INF/index.jsp";
			request.getRequestDispatcher(viewPage).forward(request, response);
		}

}
