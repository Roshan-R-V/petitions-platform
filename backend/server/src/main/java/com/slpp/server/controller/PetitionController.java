package com.slpp.server.controller;

import com.slpp.server.entity.Petition;
import com.slpp.server.entity.Signature;
import com.slpp.server.entity.User;
import com.slpp.server.service.PetitionService;
import com.slpp.server.Repository.PetitionRepository;
import com.slpp.server.Repository.SignatureRepository;
import com.slpp.server.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/petitions")
public class PetitionController {

    @Autowired
    private PetitionRepository petitionRepository;
    private final SignatureRepository signatureRepository;
    private final UserRepository userRepository;
    private final PetitionService petitionService;
    
    public PetitionController(PetitionRepository petitionRepository, SignatureRepository signatureRepository, UserRepository userRepository, PetitionService petitionService) {
        this.petitionRepository = petitionRepository;
        this.signatureRepository = signatureRepository;
        this.userRepository = userRepository;
        this.petitionService = petitionService;
    }

    @GetMapping
    public ResponseEntity<List<Petition>> getAllPetitions() {
        return ResponseEntity.ok(petitionRepository.findAll());
    }
    
    @PostMapping("/create/{bioId}")
    public ResponseEntity<?> createPetition(@RequestBody Petition petition ,@PathVariable String bioId) {

    	Optional<User> optionalUser = userRepository.findByBioId(bioId);
    	User user = optionalUser.get();
    	petition.setBioId(user);
    	petition.setStatus("open");
//    	petition.setBioId(user);
        petitionRepository.save(petition);
        return ResponseEntity.ok("Petition created successfully");
    }


    @GetMapping("/open")
    public ResponseEntity<List<Petition>> getOpenPetitions() {
        return ResponseEntity.ok(petitionRepository.findByStatus("open"));
    }
    
    @PostMapping("/{petitionId}/sign")
    public ResponseEntity<?> signPetition(@PathVariable Long petitionId, @RequestBody String bioId) {
    	String bioID = bioId.substring(0,10);
    	System.out.println(bioID);
    	Optional<User> optionalUser = userRepository.findByBioId(bioID);
    	User user = optionalUser.get();
    	System.out.println(user);
    	System.out.println(bioID);
    	if(bioId == user.getBioId()) return ResponseEntity.badRequest().body("You cannot sign your own Petition");
    	try {
            petitionService.addSignature(petitionId, user);
            return ResponseEntity.ok("Signature added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
//    @GetMapping("/threshold/{threshold}")
//    public ResponseEntity<List<Map<String, Object>>> getPetitionsExceedingThreshold(@PathVariable int threshold) {
//        List<Petition> petitions = petitionRepository.findAll();
//        List<Map<String, Object>> result = petitions.stream().map(petition -> {
//            long signatureCount = signatureRepository.countSignaturesByPetitionId(petition.getPetitionId());
//            Map<String, Object> petitionData = new HashMap<>();
//            petitionData.put("petition", petition);
//            petitionData.put("signatureCount", signatureCount);
//            return signatureCount > threshold ? petitionData : null;
//        }).filter(data -> data != null).toList();
//        return ResponseEntity.ok(result);
//    }

    @PostMapping("/{petitionId}/respond")
    public ResponseEntity<?> respondToPetition(@PathVariable Long petitionId, @RequestBody Map<String, String> body) {
        String response = body.get("response");
        Optional<Petition> optionalPetition = petitionRepository.findById(petitionId);
        if (optionalPetition.isEmpty()) {
            return ResponseEntity.badRequest().body("Petition not found");
        }
        Petition petition = optionalPetition.get();
        petition.setResponse(response);
        petition.setStatus("closed");
        petitionRepository.save(petition);
        return ResponseEntity.ok("Response submitted and petition closed successfully");
    }
 

}
