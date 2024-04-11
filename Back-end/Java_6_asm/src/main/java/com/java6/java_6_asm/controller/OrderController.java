package com.java6.java_6_asm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.model.request.OrderRequest;
import com.java6.java_6_asm.model.response.MessageResponse;
import com.java6.java_6_asm.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/management/twobee/orders")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(orderService.getAllOrderDetail());
    }

    @PutMapping("/management/twobee/orders/{id}")
    public ResponseEntity<?> put(@PathVariable("id") String orderId, @RequestBody OrderRequest orderRequest) throws JsonProcessingException {
//        System.out.println("orderId "+orderId);
//        System.out.println("orderRequest"+orderRequest);
        Order response = orderService.update(orderId, orderRequest);
        if (response == null) {
            String errorMessage = "Không tồn tại đơn hàng";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> findByContactId(@PathVariable("id") String id) {
        return ResponseEntity.ok(orderService.findByContactId(id));
    }
    @DeleteMapping("/delete-orders/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("id") String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok(new MessageResponse("successfully"));
    }

    @PutMapping("/update-order/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable("id") String orderId, @RequestBody OrderRequest orderRequest) throws JsonProcessingException {
        Order response = orderService.update(orderId, orderRequest);
        if (response == null) {
            String errorMessage = "Không tồn tại đơn hàng";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }
}
