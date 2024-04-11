package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.Contact;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.ContactRequest;
import com.java6.java_6_asm.repositories.ContactRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactServiceImpl implements ContactService {
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;

    @Override
    public List<Contact> findAllContactByUserId(HttpServletRequest httpServletRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found user with email: " + email));
        return contactRepository.findAllByUserId(user.getId());
    }

    @Override
    public Contact findByContactId(Integer id) {
        Contact contact = contactRepository.findByContactId(id);
        return contact;
    }

    @Override
    public void deleteContactId(Integer id) {
        Contact contact = contactRepository.findByContactId(id);
        contactRepository.delete(contact);
    }

    @Override
    public Contact saveContact(HttpServletRequest httpServletRequest, ContactRequest contactRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found user with email: " + email));
        Contact contact = new Contact();
        contact.setUser(user);
        contact.setAddressName(contactRequest.getAddressName());
        contact.setIsActive(false);
        contact.setIsMessage(false);
        contact.setNumberPhone(contactRequest.getPhoneNumber());
        contactRepository.save(contact);
        return contact;
    }

    @Override
    public Contact updateContact(HttpServletRequest httpServletRequest, ContactRequest contactRequest,Integer id) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found user with email: " + email));
        Contact contactId = contactRepository.findByContactId(id);
        Contact contact = new Contact();
        contact.setContactId(contactId.getContactId());
        contact.setUser(user);
        contact.setAddressName(contactRequest.getAddressName());
        contact.setIsActive(false);
        contact.setIsMessage(false);
        contact.setNumberPhone(contactRequest.getPhoneNumber());
        contactRepository.save(contact);
        return contact;
    }


}
