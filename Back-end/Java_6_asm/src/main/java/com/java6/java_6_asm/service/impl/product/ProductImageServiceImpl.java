package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.ProductImage;
import com.java6.java_6_asm.repositories.product.ProductImageRepository;
import com.java6.java_6_asm.service.service.product.ProductImageService;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    @Autowired
    ProductImageRepository productImageRepository;
    @Override
    public List<ProductImage> findAllImage() {
        return productImageRepository.findAll();
    }

    @Override
    public List<ProductImage> findImageBtProduct(Integer productId) {
        return productImageRepository.findImageByProduct(productId);
    }
}
