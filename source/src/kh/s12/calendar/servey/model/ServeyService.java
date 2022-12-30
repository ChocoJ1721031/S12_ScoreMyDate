package kh.s12.calendar.servey.model;

import static kh.s12.calendar.jdbcDriver.JDBCTemplate.close;
import static kh.s12.calendar.jdbcDriver.JDBCTemplate.getConnection;

import java.sql.Connection;
import java.util.ArrayList;

import kh.s12.calendar.jdbcDriver.JDBCTemplate;

public class ServeyService {
	public int checkServey(String dDate, int mid) { //설문여부 확인
		int result = 0;
		Connection conn = getConnection();
		
		result = ServeyDAO.checkServey(conn, dDate, mid);
		
		if(result > 0) {
			JDBCTemplate.commit(conn);
		} else {
			JDBCTemplate.rollback(conn);
		}
		
		JDBCTemplate.close(conn);
		
		return result;
	}
	
	public int insertServey(ServeyContentVO scvo, ServeyVO svo) { //설문 실시
		int result = 0;
		Connection conn = getConnection();
		
		result = ServeyDAO.insertServeyContent(conn, scvo);
		if(result > 0) {
			result = 0;
			result = ServeyDAO.insertServey(conn, svo);
			
			if(result > 0) {
				JDBCTemplate.commit(conn);
			} else {
				JDBCTemplate.rollback(conn);
			}
		}
		
		close(conn);
		
		return result;
	}
	
	public ArrayList<ServeyContentVO> callServey(int mid) {
		Connection conn = getConnection();
		ArrayList<ServeyContentVO> list = null;
		
		list = ServeyDAO.callServey(conn, mid);
		close(conn);
		
		return list;
	}
	
	
}
