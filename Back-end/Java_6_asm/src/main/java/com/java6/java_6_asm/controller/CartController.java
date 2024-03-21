package com.java6.java_6_asm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.CartRequest;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.CartService;
import com.java6.java_6_asm.service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired
    CartService cartService;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;

    @GetMapping("/cart")
    public ResponseEntity<List<Cart>> getAllCartByUser(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok( cartService.findAllByUser(httpServletRequest));
    }

    @PostMapping("/update-cart/{id}")
    public ResponseEntity<Cart> updateCartByUser(@PathVariable("id") String cartId, @RequestBody CartRequest cartRequest) {
        return ResponseEntity.ok(cartService.updateCart(cartId, cartRequest));
    }
    @PostMapping("/create-cart")
    public  ResponseEntity<Cart> createCartByUser(@RequestBody CartRequest cartRequest){
        return  ResponseEntity.ok(cartService.saveCart(cartRequest));
    }
    @DeleteMapping("/delete-cart")
    public  ResponseEntity<String> deleteCartByUser(@RequestBody CartRequest cartRequest){
        cartService.deleteByUserAndProduct(cartRequest.getUserId(),cartRequest.getProductId());
        return ResponseEntity.ok("Delete cart successfully by productId: "+ cartRequest.getProductId()+" and userId: "+ cartRequest.getUserId());
    }
    @GetMapping("/cartUserIdAndProductId")
    public ResponseEntity<Cart> getCartUserIdAndProductId(@RequestBody CartRequest cartRequest){
        return ResponseEntity.ok(cartService.findByProductIDAndAndUserID(cartRequest.getUserId(), cartRequest.getProductId()));
    }

}
