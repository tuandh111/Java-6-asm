package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.config.ConfigVNPay;
import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.model.request.OrderRequest;
import com.java6.java_6_asm.model.response.OrderAndDetailRespone;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;

    @Override
    public List<OrderAndDetailRespone> getAllOrderDetail() {
        return OrderAndDetailRespone.convert(orderRepository.getAllOrderDetail());
    }

    @Override
    public Order update(String orderId, OrderRequest orderRequest) {
        if (!orderRepository.existsById(orderId)) {
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

    @Override
    public Order saveOrder(HttpServletRequest httpServletRequest, OrderRequest orderRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(null);
        Order order = new Order();
        order.setOrderId(ConfigVNPay.getRandomString(12));
        order.setStatus("Đặt hàng");
        order.setUser(user);
        order.setCreateAt(new Date());
        orderRepository.save(order);
        return order;
    }

    @Override
    public Order findByUserId(HttpServletRequest httpServletRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(null);
        Optional<Order> order = orderRepository.findByUserId(user.getId(), "Đặt hàng");
        if (order.isPresent()) {
            return order.get();
        }
        return null;

    }

    @Override
    public List<Order> findByListOrder(HttpServletRequest httpServletRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(null);
        List<Order> order = orderRepository.findByListOrder(user.getId(), "Đặt hàng");
        return order;
    }
}
