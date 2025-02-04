package com.slpp.server.Repository;

import com.slpp.server.entity.Petition;
import com.slpp.server.entity.Signature;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SignatureRepository extends JpaRepository<Signature, Long> {
	@Query("SELECT COUNT(s) FROM Signature s WHERE s.petition.petitionId = :petitionId")
	long countSignaturesByPetitionId(@Param("petitionId") Long petitionId);

	Optional<Signature> findByPetition_PetitionId(Long petitionId);
}
