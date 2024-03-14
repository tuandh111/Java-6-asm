package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CartController {
    @Autowired
    CartService cartService;

    @GetMapping
    public ResponseEntity<?> getAllCartByUser(@RequestBody User user) {
        List<Cart> cartList = cartService.findAllByUser(user);
        return ResponseEntity.ok(cartList);
    }

}
