package com.slpp.server.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "signatures")
public class Signature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "petition_id", nullable = false)
    private Petition petition;

    @ManyToOne
    @JoinColumn(name = "bio_id", nullable = false)
    private User bioId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Petition getPetition() {
		return petition;
	}

	public void setPetition(Petition petition) {
		this.petition = petition;
	}

	public User getBioId() {
		return bioId;
	}

	public void setBioId(User bioId) {
		this.bioId = bioId;
	}

    
    
}
