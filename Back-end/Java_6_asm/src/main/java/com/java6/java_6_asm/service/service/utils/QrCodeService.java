package com.java6.java_6_asm.service.service.utils;

import com.java6.java_6_asm.model.request.UserLoginSdi;

public interface QrCodeService {
    String generateQrCode(UserLoginSdi sdi);
}
