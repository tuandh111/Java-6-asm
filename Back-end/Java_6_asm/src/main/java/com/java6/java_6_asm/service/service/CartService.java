package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartService {
    List<Cart> findAllCartId(CartIdRequest cartIdRequest);

    List<Cart> updateCheckOut(HttpServletRequest httpServletRequest,CheckOutCartIdRequest checkOutCartIdRequest);

    List<Cart> findAllByUser(HttpServletRequest httpServletRequest);

    void deleteByUserAndProduct(DeleteCartUserAnhProductRequest deleteCartUserAnhProductRequest);

    Cart findByProductIDAndAndUserID(Integer userID, Integer productID);

    Cart saveCart(HttpServletRequest httpServletRequest, CartRequest cart);

    Cart updateCart(String cartId, CartRequest cartRequest, HttpServletRequest httpServletRequest);

    Cart updateCartColor(String cartId, CartColorRequest cartColorRequest, HttpServletRequest httpServletRequest);

    Cart updateCartSize(String cartId, CartSizeRequest cartSizeRequest, HttpServletRequest httpServletRequest);

    void DeleteCart(String cartId);

    List<Cart> findAllCartForAdmin();

    List<Cart> finAllOrderId(String orderId);
}
