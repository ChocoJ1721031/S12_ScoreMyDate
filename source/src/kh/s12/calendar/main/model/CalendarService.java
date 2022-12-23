package kh.s12.calendar.main.model;

import java.sql.Connection;
import java.util.ArrayList;
import static kh.s12.calendar.jdbcDriver.JDBCTemplate.*;
public class CalendarService {
	public ArrayList<CalendarVO> callSchedule(int mid) {
		Connection conn = getConnection();
		ArrayList<CalendarVO> list = null;
		list = CalendarDAO.callSchedule(conn, mid);
		close(conn);
		
		return list;
	}
}
