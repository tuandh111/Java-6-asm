package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.payLoad.ChangePasswordRequest;

import java.security.Principal;
import java.util.List;

public interface UserService {
    void changePassword(ChangePasswordRequest request, Principal connectedUser);

    User updateUser(User request);

    List<User> findAll();
}
