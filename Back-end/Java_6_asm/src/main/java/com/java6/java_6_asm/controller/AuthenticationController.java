package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities._enum.Role;
import com.java6.java_6_asm.model.request.AuthenticationRequest;
import com.java6.java_6_asm.model.request.UpdatePasswordRequest;
import com.java6.java_6_asm.model.response.AuthenticationResponse;
import com.java6.java_6_asm.model.request.RegisterRequest;
import com.java6.java_6_asm.model.response.MessageResponse;
import com.java6.java_6_asm.security.service.AuthenticationService;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {
    @Autowired
    UserService userService;
    private final JwtService jwtService;

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Map<String, Object> jsonError = new HashMap<>();
        if (checkEmail(request.getEmail())) {
            jsonError.put("message", "ErrorEmail");
            return ResponseEntity.ok(jsonError);
        }
        request.setRole(Role.USER);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletRequest httpServletRequest) {
//        GetTokenRefreshToken.getToken(httpServletRequest);
//        System.out.println("Email: " + jwtService.extractUsername("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dWFuZGhwYzA1MDc2QGZwdC5lZHUudm4iLCJpYXQiOjE3MTA4MDk5NTIsImV4cCI6MTcxMDg5NjM1Mn0.8Ata74reIX-DVJavfDNwaeHsSehS5A2SxX3KDjGNcAY"));
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }


    @PostMapping("/update-user")
    @Operation(summary = "Cập nhật user")
    public ResponseEntity<?> updateProfile(@RequestBody User request) {
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @GetMapping("")
    @Operation(summary = "Danh sách người dùng")
    public ResponseEntity<?> findAllUser() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/forgot-password/{id}")
    @Operation(summary = "Cập nhật user")
    public ResponseEntity<?> forgotPassword(@PathVariable("id") String email) {
        return ResponseEntity.ok(userService.forgotPassword(email));
    }
    @PostMapping("/update-password")
    @Operation(summary = "Cập nhật user")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        userService.updatePassword(updatePasswordRequest);
        return ResponseEntity.ok(new MessageResponse("success"));
    }
    public boolean checkEmail(String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent()) return true;
        return false;
    }


}
