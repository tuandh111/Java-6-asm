package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.payLoad.ChangePasswordRequest;
import com.java6.java_6_asm.service.service.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository repository) {
        this.passwordEncoder = passwordEncoder;
        this.repository = repository;
    }

    @Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }
}
