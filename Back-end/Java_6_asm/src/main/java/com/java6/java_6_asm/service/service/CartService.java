package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartService {
    List<Cart> findAllByUser(User user);

    void deleteByUserAndProduct(Integer userID, Integer productID);

    Cart findByProductIDAndAndUserID(Integer userID, Integer productID);
}
