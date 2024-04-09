package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.ProductRequest;
import com.java6.java_6_asm.model.response.ProductRespone;
import com.java6.java_6_asm.model.request.TopProductRequest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ProductService {

    List<Product> findAll();

    List<TopProductRequest> findTopTen();
    List<ProductRespone> findAllProduct();
    Optional<Product> findById(Integer productId);

    Product save(ProductRequest productRequest);

    Product update(Integer productId, ProductRequest productRequest);

    Product delete(Integer productId);

    List<Product> findAllCategory(String id);
    List<Product> findAllAndSort();

    Map<String,Object> getDataForAdmin();


    void setupImage(Integer productId, ProductRequest productRequest, Product product);
    void setupDiscount(Integer productId, ProductRequest productRequest, Product product);
    DetailsSize setupDetailsSize(Integer productId, ProductRequest productRequest, Product product);
    DetailsColor setupDetailsColor(Integer productId, ProductRequest productRequest, Product product);
    void setupDetailsQuantity(Integer productId, ProductRequest productRequest, Product product,DetailsSize tempDetailsSize,DetailsColor tempDetailColor);
}
