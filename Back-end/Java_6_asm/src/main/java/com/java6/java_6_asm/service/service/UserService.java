package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.payLoad.ChangePasswordRequest;

import java.security.Principal;

public interface UserService {
    void changePassword(ChangePasswordRequest request, Principal connectedUser);
}
