package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.service.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ConfirmationController {
    @Autowired
    OrderService orderService;

    @GetMapping("/get-all-order")
    public ResponseEntity<?> findByUserOrder(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(orderService.findByListOrder(httpServletRequest));
    }

}
