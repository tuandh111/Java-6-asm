package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.ProductRequest;
import com.java6.java_6_asm.model.request.TopProductRequest;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    List<Product> findAll();

    List<TopProductRequest> findTopTen();
    List<ProductRequest> findAllProduct();
    Optional<Product> findById(Integer productId);

    Product save(Product product);

    Product update(Integer productId, Product product);

    Product delete(Integer productId);
}
