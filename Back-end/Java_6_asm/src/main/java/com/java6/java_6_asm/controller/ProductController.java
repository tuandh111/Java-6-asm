package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.ProductRequest;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class ProductController {
    @Autowired ProductService productService;
    @GetMapping("/twobee/products")
    public ResponseEntity<List<ProductRequest>> getAll(){
        return  ResponseEntity.ok(productService.findAllProduct());
    }

    @GetMapping("/twobee/top-products")
    public ResponseEntity<List<Product>> getTopTen(){
        return  ResponseEntity.ok(productService.findTopTen());
    }

    @GetMapping("/twobee/products/{id}")
    public ResponseEntity<Product> getOne(@PathVariable("id") Integer id){
        if(productService.findById(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok(productService.findById(id).get());
    }
    @PostMapping("/twobee/products")
    public ResponseEntity<Product> post(@RequestBody Product product){
        Product response = productService.save(product);
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/twobee/products/{id}")
    public ResponseEntity<Product> put(@PathVariable("id") Integer id,@RequestBody Product product){
        Product response = productService.update(id,product);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/twobee/products/{id}")
    public ResponseEntity<Product> delete(@PathVariable("id") Integer id){
        Product response = productService.delete(id);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
