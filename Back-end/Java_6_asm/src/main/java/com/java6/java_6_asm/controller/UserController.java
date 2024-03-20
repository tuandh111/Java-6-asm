package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.model.request.ChangePasswordRequest;
import com.java6.java_6_asm.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/api/v1/auth")

public class UserController {
    @Autowired
    UserService userService;

    @PatchMapping
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
    @GetMapping("login")
    public String login(){
        return "index";
    }
}