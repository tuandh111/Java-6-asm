package com.java6.java_6_asm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.ProductRequest;
import com.java6.java_6_asm.model.response.ProductRespone;
import com.java6.java_6_asm.model.request.TopProductRequest;
import com.java6.java_6_asm.repositories.product.*;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class ProductController {
    @Autowired ProductService productService;
    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/auth/twobee/products")
    public ResponseEntity<List<ProductRespone>> getAll(){
        return  ResponseEntity.ok(productService.findAllProduct());
    }

    @GetMapping("/auth/twobee/top-products")
    public ResponseEntity<List<TopProductRequest>> getTopTen(){
        return  ResponseEntity.ok(productService.findTopTen());
    }

    @GetMapping("/auth/twobee/products/{id}")
    public ResponseEntity<Product> getOne(@PathVariable("id") Integer id){
        if(productService.findById(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok(productService.findById(id).get());
    }
    @GetMapping("/management/twobee/products")
    public Map<String,Object> getDataForProductManager(){
        return  productService.getDataForAdmin();
    }
    @PostMapping("/management/twobee/products")
    public ResponseEntity<?> post(@RequestBody ProductRequest productRequest) throws JsonProcessingException {
        Product response = productService.save(productRequest);
        if(response==null){
            String errorMessage = "Sản phẩm đã tồn tại";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }
//    @PostMapping("/management/twobee/products")
//    public void testpost(@RequestBody ProductRequest productRequest){
//        System.out.println("productRequest post"+productRequest);
//    }
    @PutMapping("/management/twobee/products/{id}")
    public ResponseEntity<Product> put(@PathVariable("id") Integer id,@RequestBody ProductRequest productRequest){
        System.out.println("productRequest "+productRequest);
        Product response = productService.update(id,productRequest);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

//    @PutMapping("/management/twobee/products/{id}")
//    public void testput(@PathVariable("id") Integer id,@RequestBody ProductRequest productRequest){
//        System.out.println("productRequest"+productRequest);
//    }

    @DeleteMapping("/management/twobee/products/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) throws JsonProcessingException {
        Product response = productService.delete(id);
        if(response==null){
            String errorMessage="Không tồn tại sản phẩm";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/twobee/products/brand/{id}")
    public ResponseEntity<List<Product>> getAllBrand(@PathVariable("id") String id){
        if(productService.findAllCategory(id).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return  ResponseEntity.ok(productService.findAllCategory(id));
    }
}
