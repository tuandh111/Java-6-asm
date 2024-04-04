package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class OrderController {
    @Autowired
    OrderService orderService;
    @GetMapping("/twobee/orders")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(orderService.getAllOrderDetail());
    }
}
