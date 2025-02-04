package com.slpp.server.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.slpp.server.Repository.UserRepository;
import com.slpp.server.entity.User;
import com.slpp.server.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Predefined list of valid bioIds
    private static final List<String> validBioIds = new ArrayList<>(Arrays.asList(
    		"K1YL8VA2HG", "7DMPYAZAP2", "D05HPPQNJ4", "2WYIM3QCK9", "DHKFIYHMAZ", 
            "LZK7P0X0LQ", "H5C98XCENC", "6X6I6TSUFG", "QTLCWUS8NB", "Y4FC3F9ZGS", 
            "V30EPKZQI2", "O3WJFGR5WE", "SEIQTS1H16", "X16V7LFHR2", "TLFDFY7RDG", 
            "PGPVG5RF42", "FPALKDEL5T", "2BIB99Z54V", "ABQYUQCQS2", "9JSXWO4LGH", 
            "QJXQOUPTH9", "GOYWJVDA8A", "6EBQ28A62V", "30MY51J1CJ", "FH6260T08H", 
            "JHDCXB62SA", "O0V55ENOT0", "F3ATSRR5DQ", "1K3JTWHA05", "FINNMWJY0G", 
            "CET8NUAE09", "VQKBGSE3EA", "E7D6YUPQ6J", "BPX8O0YB5L", "AT66BX2FXM", 
            "1PUQV970LA", "CCU1D7QXDT", "TTK74SYYAN", "4HTOAI9YKO", "PD6XPNB80J", 
            "BZW5WWDMUY", "340B1EOCMG", "CG1I9SABLL", "49YFTUA96K", "V2JX0IC633", 
            "C7IFP4VWIL", "RYU8VSS4N5", "S22A588D75", "88V3GKIVSF", "8OLYIE2FRC"
    ));

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(User user) {
        String bioId = user.getBioId();
        System.out.println(bioId);

        // Validate bioId
        if (!validBioIds.contains(bioId)) {
            throw new IllegalArgumentException("Invalid bioId. Please use a valid one.");
        }

        // Check if the bioId is already used
        if (userRepository.findByBioId(bioId).isPresent()) {
            throw new IllegalArgumentException("BioId is already in use.");
        }

        // Check if the email is already registered
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        // Save the user with encoded password
        try {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);

			// Remove the bioId from the valid list after use (optional)
			validBioIds.remove(bioId);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

//    public LoginResponse loginUser(LoginRequest loginRequest) {
//        // Fetch user by email
//        Optional<User> foundUser = userRepository.findByEmail(loginRequest.getEmail());
//        if (foundUser.isEmpty()) {
//            throw new IllegalArgumentException("User not found.");
//        }
//
//        User user = foundUser.get();
//        // Validate password
//        boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
//        if (!passwordMatches) {
//            throw new IllegalArgumentException("Invalid password.");
//        }
//
//        // Generate token and return response
//        String token = JwtUtil.generateToken(user.getEmail());
//        return new LoginResponse(token, user.getBioId(), user.getFullName(), user.getEmail());
//    }
}
