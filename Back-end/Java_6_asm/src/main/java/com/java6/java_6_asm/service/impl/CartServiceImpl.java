package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.service.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Override
    public List<Cart> findAllByUser(User user) {
        return cartRepository.findAllByUser(user);
    }

    @Override
    public void deleteByUserAndProduct(Integer userID, Integer productID) {
        cartRepository.deleteByUserAndProduct(userID, productID);
    }

    @Override
    public Cart findByProductIDAndAndUserID(Integer userID, Integer productID) {
        return cartRepository.findByProductIDAndAndUserID(userID,productID);
    }
}
