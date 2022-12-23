package kh.s12.calendar.main.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import kh.s12.calendar.jdbcDriver.JDBCTemplate;

public class CalendarDAO {
	public static ArrayList<CalendarVO> callSchedule(Connection conn, int mid) {
		CalendarVO vo = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ArrayList<CalendarVO> list = new ArrayList<CalendarVO>();
		
		String sql = "SELECT SNUM, MID, SCONTENT, TO_CHAR(TO_DATE(SDATE_START, 'YY-MM-DD'), 'YYYY-MM-DD') AS SDATE_START , TO_CHAR(TO_DATE(SDATE_END, 'YY-MM-DD'), 'YYYY-MM-DD') AS SDATE_END FROM SCHEDULE WHERE MID=?";
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, mid);
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				vo = new CalendarVO();
				vo.setSnum(rs.getInt(1));
				vo.setMid(rs.getInt(2));
				vo.setScontent(rs.getString(3));
				vo.setSdate_start(rs.getString(4));
				vo.setSdate_end(rs.getString(5));
				list.add(vo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTemplate.close(rs);
			JDBCTemplate.close(pstmt);
		}
		
		return list;
	}
	
	
	
}
