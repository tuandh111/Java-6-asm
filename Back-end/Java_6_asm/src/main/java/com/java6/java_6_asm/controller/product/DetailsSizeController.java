package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.service.service.product.DetailsColorService;
import com.java6.java_6_asm.service.service.product.DetailsSizeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DetailsSizeController {
    @Autowired
    DetailsSizeService detailsSizeService;
    @GetMapping("/details-size")
    public ResponseEntity<List<DetailsSize>> findAllDetailsSize(HttpServletRequest httpServletRequest){
        return  ResponseEntity.ok(detailsSizeService.findAllDetailSize());
    }
}
