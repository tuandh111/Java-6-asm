package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.entities.product.Discount;
import com.java6.java_6_asm.service.service.product.DetailsSizeService;
import com.java6.java_6_asm.service.service.product.DiscountService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DiscountController {
    @Autowired
    DiscountService discountService;
    @GetMapping("/discount")
    public ResponseEntity<List<Discount>> findAllDiscount(HttpServletRequest httpServletRequest){
        return  ResponseEntity.ok(discountService.findAllDiscount());
    }
}
