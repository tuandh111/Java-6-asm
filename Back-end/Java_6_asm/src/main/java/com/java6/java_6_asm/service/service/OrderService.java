package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.model.request.OrderRequest;
import com.java6.java_6_asm.model.response.OrderAndDetailRespone;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<OrderAndDetailRespone> getAllOrderDetail();

    Order update(String orderId, OrderRequest orderRequest);
    Optional<Order> findById(String orderId);

    Order saveOrder(HttpServletRequest httpServletRequest, OrderRequest orderRequest);

    Order findByUserId(HttpServletRequest httpServletRequest);
    List<Order> findByListOrder(HttpServletRequest httpServletRequest);

    List<Order> findByContactId(String id);

    void deleteOrder(String id);

    Order updateVoucherId(String voucherId);

}
