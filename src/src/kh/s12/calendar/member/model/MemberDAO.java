package kh.s12.calendar.member.model;

import java.sql.*;
import kh.s12.calendar.jdbcDriver.JDBCTemplate;
//import static kh.s12.calendar.jdbcDriver.JDBCTemplate.*;

public class MemberDAO {
	public MemberDAO() {  }
	
	public MemberVO login(Connection conn, String mail, String pw) {
		MemberVO vo = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT MID, MEMAIL, MNAME, MIP FROM MEMBER WHERE MEMAIL = ? AND MPWD= ?";
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, mail);
			pstmt.setString(2, pw);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				vo = new MemberVO();
				vo.setMid(rs.getInt("MID"));
				vo.setMemail(rs.getString("MEMAIL"));
				//vo.setMpwd(rs.getString("MPWD"));
				//vo.setReg_date(rs.getString("REG_DATE"));
				vo.setMname(rs.getString("MNAME"));
				vo.setMip(rs.getString("MIP"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCTemplate.close(rs);
			JDBCTemplate.close(pstmt);
		}
		return vo;
	}
	
	//회원가입
	public int insert(Connection conn, MemberVO vo) {//TODO
		PreparedStatement pstmt = null;
		int result = 0;
		int mid = midCreate(conn);
		String sql = "INSERT INTO MEMBER VALUES(?, ?, ?, SYSDATE, ?, ?)";
		
		if(mid > 0) {
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1, mid);
				pstmt.setString(2, vo.getMemail());
				pstmt.setString(3, vo.getMpwd());
				pstmt.setString(5, vo.getReg_date());
				pstmt.setString(6, vo.getMip());
				
				result = pstmt.executeUpdate();
			}catch (Exception e) {
				e.printStackTrace();
			}finally {
				JDBCTemplate.close(pstmt);
			}
		} else {
			System.out.println("mid에러!");
		}
		return result;
	}
	
	//mid 생성
	public int midCreate(Connection conn) {
		int mid = -1;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT MID FROM MEMBER GROUP BY MID DESC";
		
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				mid = rs.getInt("MID") + 1;
			}			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JDBCTemplate.close(rs);
			JDBCTemplate.close(pstmt);
		}
		return mid;
	}
	
	//memail 중복체크
	public int dupChk(Connection conn, String memail) { // TODO 중복체크 후 이메일 입력란 밑에 코드 입력란과 코드 전송버튼 생성
		int result = 0;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = "SELECT COUNT(*) FROM MEMBER WHERE MEMAIL=?";
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, memail);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				result = rs.getInt(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JDBCTemplate.close(rs);
			JDBCTemplate.close(pstmt);
		}
		// result > 1 : 이메일 사용중
		// result == 0 : 이메일 사용 가능
		return result;
	}
	
	public int update(Connection conn, MemberVO vo) {
		//TODO
		return 0;
	}
	
	
	public int delete(Connection conn, String id) {
		//TODO
		return 0;
	}
}
