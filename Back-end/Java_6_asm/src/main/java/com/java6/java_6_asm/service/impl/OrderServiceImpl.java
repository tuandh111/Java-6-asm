package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.model.response.OrderAndDetailRespone;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Override
    public List<OrderAndDetailRespone> getAllOrderDetail() {
        return OrderAndDetailRespone.convert(orderRepository.getAllOrderDetail());
    }
}
