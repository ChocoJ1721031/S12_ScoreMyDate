package kh.s12.calendar.servey.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/servey")
public class ServeyController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public ServeyController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String viewPage = "/WEB-INF/servey.jsp";
		request.getRequestDispatcher(viewPage).forward(request, response);
	}

}
