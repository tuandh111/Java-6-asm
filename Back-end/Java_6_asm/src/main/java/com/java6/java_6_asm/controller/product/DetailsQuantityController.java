package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.DetailsQuantity;
import com.java6.java_6_asm.model.request.DetailsQuantityRequest;
import com.java6.java_6_asm.service.service.product.DetailsQuantityService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DetailsQuantityController {
    @Autowired
    DetailsQuantityService detailsQuantityService;

    @GetMapping("/detailsQuantity")
    public ResponseEntity<List<DetailsQuantity>> findAllDetailsQuantity() {
        return ResponseEntity.ok(detailsQuantityService.findByAll());
    }

    @PostMapping("/save-detailsQuantity")
    public ResponseEntity<DetailsQuantity> saveDetailsQuantity(@RequestBody DetailsQuantityRequest detailsQuantityRequest) {
        return ResponseEntity.ok(detailsQuantityService.saveDetailsQuantity(detailsQuantityRequest));
    }
}
