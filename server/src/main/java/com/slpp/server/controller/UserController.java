package com.slpp.server.controller;

import com.slpp.server.entity.User;
import com.slpp.server.security.JwtUtil;
import com.slpp.server.security.SecurityConfig;
import com.slpp.server.service.AuthService;
import com.slpp.server.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthService authService;
    
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthService authService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
        
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
    	try {
            authService.registerUser(user);
            return ResponseEntity.ok("User registered successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
    	Optional<User> foundUser = userRepository.findByEmail(loginRequest.getEmail());
    	if (foundUser.isPresent()) {
    		System.out.println(foundUser);
    		User user = foundUser.get();
    		System.out.println(passwordEncoder.encode(loginRequest.getPassword()));
            boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(), foundUser.get().getPassword());
            if (passwordMatches) {
                String token = JwtUtil.generateToken(user.getEmail());
                LoginResponse response = new LoginResponse(
                        token,
                        user.getBioId(),
                        user.getFullName(),
                        user.getEmail()
                    );
                return ResponseEntity.ok(response);
            } else {
            	System.out.println();
                return ResponseEntity.status(401).body("Invalid password");
            }
        }
        return ResponseEntity.status(401).body("User not found");
    }
}

// Request and Response DTOs
class LoginRequest {
    private String email;
    
	private String password;

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}

class LoginResponse {
    private String token;
    private String bioId;
    private String name;
    private String email;
    
    public LoginResponse(String token, String bioId, String name, String email) {
        this.token = token;
        this.bioId = bioId;
        this.name = name;
        this.email = email;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getBioId() {
		return bioId;
	}

	public void setBioId(String bioId) {
		this.bioId = bioId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
    
}