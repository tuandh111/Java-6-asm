package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.repositories.product.BrandRepository;
import com.java6.java_6_asm.service.service.product.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    BrandRepository brandRepository;
    @Override
    public List<Brand> findAllBrandActive() {
        return brandRepository.findAllBrandActive();
    }

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand save(Brand brand) {
        if(brandRepository.existsById(brand.getBrandId())){
            return null;
        }
        brandRepository.save(brand);
        return brand;
    }

    @Override
    public Brand update(Integer brandId, Brand brand) {
        if(!brandRepository.existsById(brandId)){
            return null;
        }
        brandRepository.save(brand);
        return brand;
    }

    @Override
    public Brand delete(Integer brandId) {
        if(!brandRepository.existsById(brandId)){
            return null;
        }
        Brand brand = this.findById(brandId).get();
        brand.setIsActive(false);
        return brand;
    }

    @Override
    public Optional<Brand> findById(Integer brandId) {
        return brandRepository.findById(brandId);
    }
}
