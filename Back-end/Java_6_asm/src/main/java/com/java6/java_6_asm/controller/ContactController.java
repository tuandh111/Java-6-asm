package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.Contact;
import com.java6.java_6_asm.service.service.ContactService;
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

    @GetMapping("/contact-by-userId")
    public ResponseEntity<List<Contact>> findAllByUserId(HttpServletRequest httpServletRequest) {

        return ResponseEntity.ok(contactService.findAllContactByUserId(httpServletRequest));
    }

    @GetMapping("/contact-by-userId/{id}")
    public ResponseEntity<?> findAByContactId(@PathVariable("id") String id) {
        System.out.println(contactService.findByContactId(Integer.parseInt(id)));
        return ResponseEntity.ok(contactService.findByContactId(Integer.parseInt(id)));
    }
}
