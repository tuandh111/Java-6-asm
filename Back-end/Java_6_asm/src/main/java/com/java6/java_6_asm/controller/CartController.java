package com.java6.java_6_asm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.*;
import com.java6.java_6_asm.model.response.MessageResponse;
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
        return ResponseEntity.ok(cartService.findAllByUser(httpServletRequest));
    }

    @GetMapping("/management/twobee/carts")
    public ResponseEntity<?> getAllCartForAdmin() {
        return ResponseEntity.ok(cartService.findAllCartForAdmin());
    }

    @PostMapping("/update-cart/{id}")
    public ResponseEntity<Cart> updateCartByUser(@PathVariable("id") String cartId, @RequestBody CartRequest cartRequest, HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(cartService.updateCart(cartId, cartRequest, httpServletRequest));
    }

    @PostMapping("/update-cart-color/{id}")
    public ResponseEntity<?> updateCartColorByUser(@PathVariable("id") String cartId, @RequestBody CartColorRequest cartColorRequest, HttpServletRequest httpServletRequest) {
        Cart cart = cartService.updateCartColor(cartId, cartColorRequest, httpServletRequest);
        Map<String, Object> jsonError = new HashMap<>();
        if (cart == null) {
            jsonError.put("message", "ErrorCart");
            return ResponseEntity.ok(jsonError);
        }
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/update-cart-size/{id}")
    public ResponseEntity<?> updateCartSizeByUser(@PathVariable("id") String cartId, @RequestBody CartSizeRequest cartSizeRequest, HttpServletRequest httpServletRequest) {
        Cart cart = cartService.updateCartSize(cartId, cartSizeRequest, httpServletRequest);
        Map<String, Object> jsonError = new HashMap<>();
        if (cart == null) {
            jsonError.put("message", "ErrorCart");
            return ResponseEntity.ok(jsonError);
        }
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/create-cart")
    public ResponseEntity<Cart> createCartByUser(HttpServletRequest httpServletRequest, @RequestBody CartRequest cartRequest) {
        System.out.println("run create successfully");
        return ResponseEntity.ok(cartService.saveCart(httpServletRequest, cartRequest));
    }

    @DeleteMapping("/delete-cart/{id}")
    public ResponseEntity<?> deleteCartByUser(@PathVariable("id") String id) {
        cartService.DeleteCart(id);
        return ResponseEntity.ok(new MessageResponse("Xóa thành công"));
    }

    @GetMapping("/cartUserIdAndProductId")
    public ResponseEntity<Cart> getCartUserIdAndProductId(@RequestBody CartRequest cartRequest) {
        return ResponseEntity.ok(cartService.findByProductIDAndAndUserID(cartRequest.getUserId(), cartRequest.getProductId()));
    }

    @PostMapping("/get-cartId")
    public ResponseEntity<List<Cart>> findAllByCartId(@RequestBody CartIdRequest cartRequest) {
        return ResponseEntity.ok(cartService.findAllCartId(cartRequest));
    }

    @PostMapping("/check-out-cartId")
    public ResponseEntity<List<Cart>> checkoutUpdate(HttpServletRequest httpServletRequest, @RequestBody CheckOutCartIdRequest cartRequest) {
        return ResponseEntity.ok(cartService.updateCheckOut(httpServletRequest, cartRequest));
    }


    @GetMapping("/get-all-orderId/{id}")
    public ResponseEntity<?> getOrderId(@PathVariable("id") String id) {
        return ResponseEntity.ok(cartService.finAllOrderId(id));
    }
}
