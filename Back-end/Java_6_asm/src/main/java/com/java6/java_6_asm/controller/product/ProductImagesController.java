package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.ProductImage;
import com.java6.java_6_asm.service.service.product.BrandService;
import com.java6.java_6_asm.service.service.product.ProductImageService;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class ProductImagesController {
    @Autowired
    ProductImageService productImageService;
    @GetMapping("/images")
    public ResponseEntity<List<ProductImage>> findAllProductImage(){
        return ResponseEntity.ok(productImageService.findAllImage());
    }


}
