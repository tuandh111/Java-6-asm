package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.service.service.product.DetailsColorService;
import com.java6.java_6_asm.service.service.product.DetailsSizeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DetailsSizeController {
    @Autowired
    DetailsSizeService detailsSizeService;
    @GetMapping("/auth/details-size")
    public ResponseEntity<List<DetailsSize>> findAllDetailsSize(HttpServletRequest httpServletRequest){
        return  ResponseEntity.ok(detailsSizeService.findAllDetailSize());
    }

    @PostMapping("/auth/twobee/details-size")
    public ResponseEntity<?> post(@RequestBody DetailsSize detailsSize){
        DetailsSize response = detailsSizeService.save(detailsSize);
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/auth/twobee/details-size/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id,@RequestBody DetailsSize detailsSize){
        DetailsSize response = detailsSizeService.update(id,detailsSize);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/auth/twobee/details-size/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        DetailsSize response = detailsSizeService.delete(id);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
