package com.java6.java_6_asm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.model.request.OrderRequest;
import com.java6.java_6_asm.service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class OrderController {
    @Autowired
    OrderService orderService;
    @Autowired
    private ObjectMapper objectMapper;
    @GetMapping("/twobee/orders")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(orderService.getAllOrderDetail());
    }

    @PutMapping("/twobee/orders/{id}")
    public ResponseEntity<?> put(@PathVariable("id") String orderId, @RequestBody OrderRequest orderRequest) throws JsonProcessingException {
//        System.out.println("orderId "+orderId);
//        System.out.println("orderRequest"+orderRequest);
        Order response = orderService.update(orderId,orderRequest);
        if(response==null){
            String errorMessage="Không tồn tại đơn hàng";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }
}
