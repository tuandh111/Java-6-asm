package com.java6.java_6_asm.controller.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.BrandRequest;
import com.java6.java_6_asm.service.service.product.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class BrandController {
    @Autowired
    private BrandService brandService;
    @Autowired
    private ObjectMapper objectMapper;
    @GetMapping("/auth/twobee/brands-active")
    public ResponseEntity<?> getAllBrandActive(){
        return  ResponseEntity.ok(brandService.findAllBrandActive());
    }
    @GetMapping("/auth/twobee/brands")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(brandService.findAll());
    }

    @GetMapping("/management/twobee/brands-and-count-product")
    public ResponseEntity<?> getAllBrandAndCountProduct(){
        System.out.println("Khong duoc truy cap");
        return  ResponseEntity.ok(brandService.findAllBrandAndCountProduct());
    }
    @PostMapping("/management/twobee/brands")
    public ResponseEntity<?> post(@RequestBody BrandRequest brandRequest) throws JsonProcessingException {
        Brand response = brandService.save(brandRequest);
        if(response==null){
            String errorMessage = "Tên danh mục " + brandRequest.getNameBrand() +" đã tồn tại";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/management/twobee/brands/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id,@RequestBody BrandRequest brandRequest)throws JsonProcessingException{
        Brand response = brandService.update(id,brandRequest);
        if(response==null){
            String errorMessage="";
            if(id==-1){
                errorMessage="Không tồn tại danh mục";
            }else{
                errorMessage = "Tên danh mục " + brandRequest.getNameBrand() +" đã tồn tại";
            }
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/management/twobee/brands/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) throws JsonProcessingException {
        Brand response = brandService.delete(id);
        if(response==null){
            String errorMessage="Không tồn tại danh mục";
            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
        }
        return ResponseEntity.ok(response);
    }
}
