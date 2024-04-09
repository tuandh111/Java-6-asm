package com.java6.java_6_asm.controller;


import com.java6.java_6_asm.model.request.URLRequest;
import com.java6.java_6_asm.model.response.MessageResponse;
import com.java6.java_6_asm.service.service.utils.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class GenerateQrController {
    @Autowired
    QrCodeService qrCodeService;

    @PostMapping(value = "generateQRCode")
    public ResponseEntity<?> generateQRCode(@RequestBody URLRequest sdi) {
        return ResponseEntity.ok(new MessageResponse(qrCodeService.generateQrCode(sdi)));
    }
}
