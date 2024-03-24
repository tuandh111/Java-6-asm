package com.java6.java_6_asm.controller.product;

import com.java6.java_6_asm.entities.Voucher;
import com.java6.java_6_asm.service.service.VoucherService;
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
public class VoucherController {
    @Autowired
    VoucherService voucherService;

    @GetMapping("/voucher")

    public ResponseEntity<List<Voucher>> findAllVoucher() {
        return ResponseEntity.ok(voucherService.findAllVoucher());
    }
}