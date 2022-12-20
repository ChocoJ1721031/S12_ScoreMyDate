package kh.s12.calendar.main.model;

public class CalendarVO {
	private int snum;
	private int mid;
	private String scontent;
	private String sdate;
	private String sdate_start;
	private String sdate_end;
	
	public CalendarVO() {
		super();
	}

	public CalendarVO(int snum, int mid, String scontent, String sdate, String sdate_start, String sdate_end) {
		super();
		this.snum = snum;
		this.mid = mid;
		this.scontent = scontent;
		this.sdate = sdate;
		this.sdate_start = sdate_start;
		this.sdate_end = sdate_end;
	}

	public int getSnum() {
		return snum;
	}

	public void setSnum(int snum) {
		this.snum = snum;
	}

	public int getMid() {
		return mid;
	}

	public void setMid(int mid) {
		this.mid = mid;
	}

	public String getScontent() {
		return scontent;
	}

	public void setScontent(String scontent) {
		this.scontent = scontent;
	}

	public String getSdate() {
		return sdate;
	}

	public void setSdate(String sdate) {
		this.sdate = sdate;
	}

	public String getSdate_start() {
		return sdate_start;
	}

	public void setSdate_start(String sdate_start) {
		this.sdate_start = sdate_start;
	}

	public String getSdate_end() {
		return sdate_end;
	}

	public void setSdate_end(String sdate_end) {
		this.sdate_end = sdate_end;
	}
	
	
	
}
