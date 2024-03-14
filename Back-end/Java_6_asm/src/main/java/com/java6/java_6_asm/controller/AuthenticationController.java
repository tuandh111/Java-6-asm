package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.exception.BadRequestException;
import com.java6.java_6_asm.payLoad.AuthenticationRequest;
import com.java6.java_6_asm.payLoad.AuthenticationResponse;
import com.java6.java_6_asm.payLoad.RegisterRequest;
import com.java6.java_6_asm.security.service.AuthenticationService;
import com.java6.java_6_asm.service.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",maxAge = 3600)
public class AuthenticationController {
    @Autowired
    UserService userService;

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        System.out.println("email: " + request.getEmail());
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("refresh token successfully");
        service.refreshToken(request, response);
    }


    @PostMapping("/update-user")
    @Operation(summary = "Cập nhật user")
    public ResponseEntity<?> updateProfile(@RequestBody User request) {
        try {
            User user = userService.updateUser(request);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("This user cannot be updated");
        }
    }
    @GetMapping("")
    @Operation(summary = "Danh sách người dùng")
    public ResponseEntity<?> findAllUser() {
        List<User> user = userService.findAll();
        return ResponseEntity.ok(user);
    }
}
