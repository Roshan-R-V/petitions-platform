package com.slpp.server.Repository;

import com.slpp.server.entity.Petition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetitionRepository extends JpaRepository<Petition, Long> {
    List<Petition> findByStatus(String status);
}