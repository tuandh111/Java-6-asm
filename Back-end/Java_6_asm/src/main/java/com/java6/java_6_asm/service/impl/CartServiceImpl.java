package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.config.ConfigVNPay;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.exception.BadRequestException;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.CartColorRequest;
import com.java6.java_6_asm.model.request.CartRequest;
import com.java6.java_6_asm.model.request.CartSizeRequest;
import com.java6.java_6_asm.model.request.DeleteCartUserAnhProductRequest;
import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.CartService;
import com.java6.java_6_asm.service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;

    @Override
    public List<Cart> findAllByUser(HttpServletRequest httpServletRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userService.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found user with email: " + email));
        return cartRepository.findAllByUser(user);
    }

    @Override
    public void deleteByUserAndProduct(DeleteCartUserAnhProductRequest deleteCartUserAnhProductRequest) {
        cartRepository.deleteByUserAndProduct(deleteCartUserAnhProductRequest.getUserId(), deleteCartUserAnhProductRequest.getProductId());
    }

    @Override
    public Cart findByProductIDAndAndUserID(Integer userID, Integer productID) {
        return cartRepository.findByProductIDAndAndUserID(userID, productID).orElseThrow(() -> new NotFoundException("Not found product with user"));
    }

    @Override
    public Cart saveCart(CartRequest cartRequest) {
        Product product = productRepository.findById(cartRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartRequest.getProductId()));
        User user = userRepository.findById(cartRequest.getUserId()).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartRequest.getUserId()));
        Cart cart = new Cart();
        cart.setCartId(ConfigVNPay.getRandomString(12));
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cartRequest.getQuantity());
        cart.setCheckPay(false);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public Cart updateCart(String cartId, CartRequest cartRequest) {
        System.out.println("CartId: " + cartRepository.findById(cartId));
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Not Found cartId With Id:" + cartId));
        Product product = productRepository.findById(cartRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartRequest.getProductId()));
        User user = userRepository.findById(cartRequest.getUserId()).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartRequest.getUserId()));
        cart.setCartId(cartId);
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cartRequest.getQuantity());
        cart.setCheckPay(false);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public Cart updateCartColor(String cartId, CartColorRequest cartColorRequest) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Not Found cartId With Id:" + cartId));
        Product product = productRepository.findById(cartColorRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartColorRequest.getProductId()));
        User user = userRepository.findById(cartColorRequest.getUserId()).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartColorRequest.getUserId()));
        cart.setCartId(cartId);
        cart.setColorId(cartColorRequest.getColorId());
        cart.setUser(user);
        cart.setProduct(product);
        cart.setCheckPay(false);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public Cart updateCartSize(String cartId, CartSizeRequest cartSizeRequest) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Not Found cartId With Id:" + cartId));
        Product product = productRepository.findById(cartSizeRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartSizeRequest.getProductId()));
        User user = userRepository.findById(cartSizeRequest.getUserId()).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartSizeRequest.getUserId()));
        cart.setCartId(cartId);
        cart.setSizeId(cartSizeRequest.getSizeId());
        cart.setUser(user);
        cart.setProduct(product);
        cart.setCheckPay(false);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public void DeleteCart(String cartId) {
        cartRepository.deleteById(cartId);
    }
}
