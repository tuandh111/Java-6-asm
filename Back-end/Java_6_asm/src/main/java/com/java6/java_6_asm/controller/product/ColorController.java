package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Color;
import com.java6.java_6_asm.service.service.product.BrandService;
import com.java6.java_6_asm.service.service.product.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class ColorController {
    @Autowired
    ColorService colorService;
    @GetMapping("/twobee/colors-active")
    public ResponseEntity<?> getAllColorActive(){
        return  ResponseEntity.ok(colorService.findAllColorActive());
    }
    @GetMapping("/twobee/colors")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(colorService.findAll());
    }
    @PostMapping("/twobee/colors")
    public ResponseEntity<?> post(@RequestBody Color color){
        Color response = colorService.save(color);
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/twobee/colors/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id,@RequestBody Color color){
        Color response = colorService.update(id,color);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/twobee/colors/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        Color response = colorService.delete(id);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
