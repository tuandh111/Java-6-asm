package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.config.ConfigVNPay;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.OrderRequest;
import com.java6.java_6_asm.model.response.OrderAndDetailRespone;
import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
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
    @Autowired
    CartRepository cartRepository;
    @Autowired
    ProductRepository productRepository;

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
        Optional<Order> order = orderRepository.findByUserId(user.getId(), "Đang chờ xác nhận");
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
        List<Order> order = orderRepository.findByListOrder(user.getId());
        return order;
    }

    @Override
    public List<Order> findByContactId(String id) {
        return orderRepository.findByContactId(Integer.parseInt(id));
    }

    @Override
    public void deleteOrder(String id) {
        List<Cart> cart = cartRepository.findByAllOrderId(id);
        for (Cart cart1 : cart){
            Product product =productRepository.findById(cart1.getProduct().getProductId()).orElseThrow();
            product.setQuantityInStock(product.getQuantityInStock()+ cart1.getQuantity());
            productRepository.save(product);
            cartRepository.deleteById(cart1.getCartId());
        }
        orderRepository.deleteById(id);
    }

    @Override
    public Order updateVoucherId(String voucherId) {
        return null;
    }
}
