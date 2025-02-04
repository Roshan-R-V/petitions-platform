package com.slpp.server.security;

import com.slpp.server.security.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        
        // Check if the Authorization header is present and starts with "Bearer "
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7); // Extract the token after "Bearer "
            System.out.println(token);
            // Validate the token and extract the username
            try {
				String username = JwtUtil.validateToken(token);
				
				if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				    // Create an authentication object and set it in the SecurityContext
				    UsernamePasswordAuthenticationToken authentication =
				            new UsernamePasswordAuthenticationToken(username, null, null);
				    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				    
				    SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("Invalid JWT Token");
			}
        }

        // Continue the filter chain
        chain.doFilter(request, response);
    }
}
