package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Brand;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    List<Brand> findAllBrandActive();
    Brand save(Brand brand);
    Brand update(Integer brandId,Brand brand);
    Brand delete(Integer brandId);
    Optional<Brand> findById(Integer brandId);
}
