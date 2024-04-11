package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.Contact;
import com.java6.java_6_asm.model.request.ContactRequest;
import com.java6.java_6_asm.model.response.MessageResponse;
import com.java6.java_6_asm.model.response.UserWithIdResponse;
import com.java6.java_6_asm.service.service.ContactService;
import com.java6.java_6_asm.service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ContactController {
    @Autowired
    ContactService contactService;
    @Autowired
    UserService userService;

    @GetMapping("/contact-by-userId")
    public ResponseEntity<List<Contact>> findAllByUserId(HttpServletRequest httpServletRequest) {

        return ResponseEntity.ok(contactService.findAllContactByUserId(httpServletRequest));
    }

    @GetMapping("/contact-by-userId/{id}")
    public ResponseEntity<Contact> findAByContactId(@PathVariable("id") String id) {
        System.out.println(contactService.findByContactId(Integer.parseInt(id)));
        return ResponseEntity.ok(contactService.findByContactId(Integer.parseInt(id)));
    }

    @DeleteMapping("/delete-contact-by-contactId/{id}")
    public ResponseEntity<?> deleteContactId(@PathVariable("id") String id) {
        contactService.deleteContactId(Integer.parseInt(id));

        return ResponseEntity.ok(new MessageResponse("delete successfully"));
    }

    @PostMapping("/save-contact-by-contactId")
    public ResponseEntity<?> saveContactId(HttpServletRequest httpServletRequest, @RequestBody ContactRequest contactRequest) {
        return ResponseEntity.ok(contactService.saveContact(httpServletRequest, contactRequest));
    }

    @PostMapping("/update-contact-by-contactId/{id}")
    public ResponseEntity<?> updateContactId(@PathVariable("id") String id, HttpServletRequest httpServletRequest, @RequestBody ContactRequest contactRequest) {
        return ResponseEntity.ok(contactService.updateContact(httpServletRequest, contactRequest, Integer.parseInt(id)));
    }

    @GetMapping("/by-userId")
    public ResponseEntity<UserWithIdResponse> findAllByUser(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(userService.findByUserId(httpServletRequest));
    }

}
