package com.slpp.server.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "petition")
public class Petition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "petition_id")
    private Long petitionId;
    private String title;
    private String content;
    private String status = "open"; // 'open' or 'closed'
    @ManyToOne
    @JoinColumn(name = "petitioner_bio_id", referencedColumnName = "bio_id")  // Ensure consistency with the referenced column
    private User bioId;
    private Long signatures = 0l;
    private String response;
    
    
	public Long getPetitionId() {
		return petitionId;
	}
	public void setPetitionId(Long petitionId) {
		this.petitionId = petitionId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public User getBioId() {
		return bioId;
	}
	public void setBioId(User bioId) {
		this.bioId = bioId;
	}
	public long getSignatures() {
		return signatures;
	}
	public void setSignatures(Long signatures) {
		this.signatures = signatures;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}


    
	
    
}