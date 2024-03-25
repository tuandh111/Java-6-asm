package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.Color;
import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.service.service.product.DetailsColorService;
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
public class DetailsColorController {
    @Autowired
    DetailsColorService detailsColorService;

    @GetMapping("/auth/details-color")
    public ResponseEntity<List<DetailsColor>> findAllDetailsColor(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(detailsColorService.findAllDetailsColor());
    }

    @PostMapping("/auth/twobee/details-color")
    public ResponseEntity<?> post(@RequestBody DetailsColor detailsColor){
        DetailsColor response = detailsColorService.save(detailsColor);
        if(response==null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/auth/twobee/details-color/{id}")
    public ResponseEntity<?> put(@PathVariable("id") Integer id,@RequestBody DetailsColor detailsColor){
        DetailsColor response = detailsColorService.update(id,detailsColor);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/auth/twobee/details-color/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
        DetailsColor response = detailsColorService.delete(id);
        if(response==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
