package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.payLoad.ChangePasswordRequest;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface UserService {
    void changePassword(ChangePasswordRequest request, Principal connectedUser);

    User updateUser(User request);

    List<User> findAll();

    Optional<User> findByEmail(String email);
}
