package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Size;
import com.java6.java_6_asm.service.service.product.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class SizeController {
    @Autowired
    SizeService sizeService;
    @GetMapping("/twobee/sizes")
    public ResponseEntity<?> getAll(){
        return  ResponseEntity.ok(sizeService.findAllSizeActive());
    }

    @PostMapping("/twobee/sizes")
    public ResponseEntity<?> post(@RequestBody Size size){
        Size response = sizeService.save(size);
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/twobee/sizes/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id,@RequestBody Size size){
        Size response = sizeService.update(id,size);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/twobee/sizes/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        Size response = sizeService.delete(id);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
