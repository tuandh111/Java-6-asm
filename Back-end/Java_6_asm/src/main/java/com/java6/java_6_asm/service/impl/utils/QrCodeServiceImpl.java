package com.java6.java_6_asm.service.impl.utils;

import com.java6.java_6_asm.config.AppUtils;
import com.java6.java_6_asm.model.request.URLRequest;
import com.java6.java_6_asm.service.service.utils.QrCodeService;
import org.springframework.stereotype.Service;


@Service
public class QrCodeServiceImpl implements QrCodeService {

    private String qrCodeDirectory;
    private static final int ORDER_QR_CODE_SIZE_WIDTH = 300;
    private static final int ORDER_QR_CODE_SIZE_HEIGHT = 300;

    @Override
    public String generateQrCode(URLRequest sdi) {
        String prettyData = AppUtils.prettyObject(sdi);

        String qrCode = AppUtils.generateQrCode(prettyData, ORDER_QR_CODE_SIZE_WIDTH, ORDER_QR_CODE_SIZE_HEIGHT);
        return qrCode;
    }
}
