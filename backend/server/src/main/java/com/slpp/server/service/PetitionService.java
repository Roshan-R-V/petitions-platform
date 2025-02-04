package com.slpp.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.slpp.server.Repository.PetitionRepository;
import com.slpp.server.Repository.SignatureRepository;
import com.slpp.server.entity.Petition;
import com.slpp.server.entity.Signature;
import com.slpp.server.entity.User;

@Service
public class PetitionService {

    private final SignatureRepository signatureRepository;
    private final PetitionRepository petitionRepository;

    public PetitionService(SignatureRepository signatureRepository, PetitionRepository petitionRepository) {
        this.signatureRepository = signatureRepository;
        this.petitionRepository = petitionRepository;
    }

    public void addSignature(Long petitionId, User user) {
        Petition petition = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new IllegalArgumentException("Petition not found"));

        // Check if the user already signed the petition
        boolean alreadySigned = signatureRepository.findByPetition_PetitionId(petitionId)
                .stream()
                .anyMatch(signature -> signature.getBioId().equals(user));

        if (alreadySigned) {
            throw new IllegalArgumentException("User has already signed this petition");
        }

        // Add a new signature
        Signature signature = new Signature();
        signature.setPetition(petition);
        signature.setBioId(user);
        signatureRepository.save(signature);

        // Update the signatures count in the petition table
        long updatedCount = signatureRepository.countSignaturesByPetitionId(petitionId);
        petition.setSignatures(updatedCount);
        petitionRepository.save(petition);
    }
}