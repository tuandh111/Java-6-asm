package com.java6.java_6_asm.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.java6.java_6_asm.model.request.URLRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

public class AppUtils {

    public static String prettyObject(URLRequest object) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String url = object.getUrl().substring(object.getUrl().indexOf(":") + 3, object.getUrl().length() );

            System.out.println("url: " + url);
            return "https://" + url;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public static String generateQrCode(String data, int width, int height) {
        StringBuilder resultImage = new StringBuilder();

        if (!data.isEmpty()) {
            ByteArrayOutputStream os = new ByteArrayOutputStream();

            try {
                QRCodeWriter writer = new QRCodeWriter();
                BitMatrix bitMatrix = writer.encode(data, BarcodeFormat.QR_CODE, width, height);

                BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
                ImageIO.write(bufferedImage, "png", os);

                resultImage.append("data:image/png;base64,");
                resultImage.append(new String(Base64.getEncoder().encode(os.toByteArray())));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return resultImage.toString();
    }
}
