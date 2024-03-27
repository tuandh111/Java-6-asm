package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.CartColorRequest;
import com.java6.java_6_asm.model.request.CartRequest;
import com.java6.java_6_asm.model.request.CartSizeRequest;
import com.java6.java_6_asm.model.request.DeleteCartUserAnhProductRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartService {
    List<Cart> findAllByUser(HttpServletRequest httpServletRequest);

    void deleteByUserAndProduct(DeleteCartUserAnhProductRequest deleteCartUserAnhProductRequest);

    Cart findByProductIDAndAndUserID(Integer userID, Integer productID);

    Cart saveCart(CartRequest cart);

    Cart updateCart(String cartId, CartRequest cartRequest);

    Cart updateCartColor(String cartId, CartColorRequest cartColorRequest);

    Cart updateCartSize(String cartId, CartSizeRequest cartSizeRequest);

    void DeleteCart(String cartId);
}
