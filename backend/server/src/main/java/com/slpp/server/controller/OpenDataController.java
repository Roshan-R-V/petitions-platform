package com.slpp.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.slpp.server.Repository.PetitionRepository;

@RestController
@RequestMapping("/slpp")
public class OpenDataController {
	
	private final PetitionRepository petitionRepository;
	
	public OpenDataController(PetitionRepository petitionRepository){
		this.petitionRepository = petitionRepository;
	}
	

	@GetMapping("/petitions")
    public ResponseEntity<Map<String, Object>> getAllPetitions(@RequestParam(value = "status", required = false) String status) {
        try {
            // Use the instance method instead of static method
            List<Map<String, Object>> petitions = petitionRepository.findAll().stream()
            		.filter(petition -> status == null || status.equalsIgnoreCase(petition.getStatus()))
            		.map(petition -> {
                    Map<String, Object> petitionData = new HashMap<>();
                    petitionData.put("petition_id", petition.getPetitionId().toString());
                    petitionData.put("status", petition.getStatus());
                    petitionData.put("petition_title", petition.getTitle());
                    petitionData.put("petition_text", petition.getContent());
                    petitionData.put("petitioner", petition.getBioId().getEmail());
                    petitionData.put("signatures", petition.getSignatures()); // Changed to get actual count
                    petitionData.put("response", petition.getResponse() != null ? petition.getResponse() : "No response yet");
                    return petitionData;
                }).toList();

            Map<String, Object> response = new HashMap<>();
            response.put("petitions", petitions);
//            response.put("total_count", petitions.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch petitions");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}