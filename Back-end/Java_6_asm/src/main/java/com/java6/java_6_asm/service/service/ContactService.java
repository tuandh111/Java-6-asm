package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Contact;
import com.java6.java_6_asm.model.request.ContactRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface ContactService {
    List<Contact> findAllContactByUserId(HttpServletRequest httpServletRequest);

    Contact findByContactId(Integer id);

    void deleteContactId(Integer id);

    Contact saveContact(HttpServletRequest httpServletRequest, ContactRequest contactRequest);

    Contact updateContact(HttpServletRequest httpServletRequest,ContactRequest contactRequest, Integer id);
}
