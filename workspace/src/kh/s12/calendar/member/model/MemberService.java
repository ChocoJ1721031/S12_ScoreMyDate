package kh.s12.calendar.member.model;

import java.sql.Connection;

import kh.s12.calendar.jdbcDriver.JDBCTemplate;

import static kh.s12.calendar.jdbcDriver.JDBCTemplate.*;

public class MemberService {
	public MemberService() {}
	//로그인
	public MemberVO login(String mail, String passwd) {
		Connection conn = getConnection();
		MemberVO vo = new MemberDAO().login(conn, mail, passwd);
		close(conn);
		return vo;
	}
	
	public int insertMember(MemberVO vo) {
		int result = 0;
		Connection conn = getConnection();
		result = new MemberDAO().insertMember(conn, vo);
		
		if(result > 0) {
			JDBCTemplate.commit(conn);
		} else {
			JDBCTemplate.rollback(conn);
		}
		
		JDBCTemplate.close(conn);
		
		return result;
	}
	
	public int dupChk(String mail) {
		int result = 0;
		Connection conn = getConnection();
		result = new MemberDAO().dupChk(conn, mail);
		JDBCTemplate.close(conn);
		
		return result;
	}
	

	
	
	
}
