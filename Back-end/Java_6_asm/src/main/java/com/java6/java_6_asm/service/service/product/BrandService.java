package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.model.request.BrandRequest;
import com.java6.java_6_asm.model.response.BrandAndCountProductRespone;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    List<Brand> findAllBrandActive();
    List<Brand> findAll();
    List<BrandAndCountProductRespone> findAllBrandAndCountProduct();
    Brand save(BrandRequest brandRequest);
    Brand update(Integer brandId,BrandRequest brandRequest);
    Brand delete(Integer brandId);
    Optional<Brand> findById(Integer brandId);
    List<Brand> findBrandByNameLike (String brandName);
    Boolean existsByName(String brandName);
}
