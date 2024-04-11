package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.model.request.ChangePasswordRequest;
import com.java6.java_6_asm.model.request.UpdatePasswordRequest;
import com.java6.java_6_asm.model.response.ForgotPasswordResponse;
import com.java6.java_6_asm.model.response.UserWithIdResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

public interface UserService {
    void changePassword(ChangePasswordRequest request, Principal connectedUser);

    User updateUser(User request);

    List<User> findAll();

    Optional<User> findByEmail(String email);

    UserWithIdResponse findByUserId(HttpServletRequest httpServletRequest);

    ForgotPasswordResponse forgotPassword(String email);

    void updatePassword(UpdatePasswordRequest updatePasswordRequest);
}
