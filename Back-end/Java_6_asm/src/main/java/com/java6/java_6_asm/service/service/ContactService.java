package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Contact;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ContactService {
    List<Contact> findAllContactByUserId(HttpServletRequest httpServletRequest);

    Contact findByContactId(Integer id);
}
