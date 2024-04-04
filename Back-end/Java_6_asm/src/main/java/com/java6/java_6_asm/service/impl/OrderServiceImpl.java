package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.model.request.OrderRequest;
import com.java6.java_6_asm.model.response.OrderAndDetailRespone;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Override
    public List<OrderAndDetailRespone> getAllOrderDetail() {
        return OrderAndDetailRespone.convert(orderRepository.getAllOrderDetail());
    }

    @Override
    public Order update(String orderId, OrderRequest orderRequest) {
        if(!orderRepository.existsById(orderId)){
            return null;
        }
        Order o = this.findById(orderId).get();
        o.setNote(orderRequest.getNote());
        o.setStatus(orderRequest.getStatus());
        orderRepository.save(o);
        return o;
    }

    @Override
    public Optional<Order> findById(String orderId) {
        return orderRepository.findById(orderId);
    }
}
