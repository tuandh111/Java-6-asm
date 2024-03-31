package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.service.service.product.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class BrandController {
    @Autowired
    BrandService brandService;
    @GetMapping("/twobee/brands-active")
    public ResponseEntity<?> getAllBrandActive(){
        return  ResponseEntity.ok(brandService.findAllBrandActive());
    }
    @GetMapping("/twobee/brands")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(brandService.findAll());
    }

    @GetMapping("/twobee/brands-and-count-product")
    public ResponseEntity<?> getAllBrandAndCountProduct(){
        return  ResponseEntity.ok(brandService.findAllBrandAndCountProduct());
    }
    @PostMapping("/twobee/brands")
    public ResponseEntity<?> post(@RequestBody Brand brand){
        Brand response = brandService.save(brand);
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/twobee/brands/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id,@RequestBody Brand brand){
        Brand response = brandService.update(id,brand);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/twobee/brands/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        Brand response = brandService.delete(id);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
