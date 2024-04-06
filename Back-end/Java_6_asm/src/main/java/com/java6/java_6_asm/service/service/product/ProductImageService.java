package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.ProductImage;

import java.util.List;

public interface ProductImageService {
    List<ProductImage> findAllImage();
    List<ProductImage> findImageBtProduct(Integer productId);
}
