package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.model.request.BrandRequest;
import com.java6.java_6_asm.model.response.BrandAndCountProductRespone;
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
    public List<BrandAndCountProductRespone> findAllBrandAndCountProduct() {
        return BrandAndCountProductRespone.convert(brandRepository.findAllBrandAndCountProduct()) ;
    }

    @Override
    public Brand save(BrandRequest brandRequest) {
        if(this.existsByName(brandRequest.getNameBrand())){
            return null;
        }

        Brand brand = new Brand();
        brand.setIsActive(brandRequest.getIsActive());
        brand.setNameBrand(brandRequest.getNameBrand());
        return brandRepository.save(brand);
    }

    @Override
    public Brand update(Integer brandId, BrandRequest brandRequest) {

        if(!brandRepository.existsById(brandId)){
            return null;
        }else{
            String getOldName = this.findById(brandId).get().getNameBrand();
            if(!getOldName.equalsIgnoreCase(brandRequest.getNameBrand())) {
                if (this.existsByName(brandRequest.getNameBrand())) {
                    return null;
                }
            }
        }
        Brand brand = this.findById(brandId).get();
        brand.setIsActive(brandRequest.getIsActive());
        brand.setNameBrand(brandRequest.getNameBrand());
        brandRepository.save(brand);
        return brand;
    }

    @Override
    public Brand delete(Integer brandId) {
        if (!brandRepository.existsById(brandId)) {
            return null;
        }

        boolean hasProducts = brandRepository.existsProductsByBrandId(brandId);

        Brand brand = brandRepository.findById(brandId).get();

        if (!hasProducts) {
            brandRepository.delete(brand);
        } else {
            brand.setIsActive(false);
            brandRepository.save(brand);
        }

        return brand;
    }

    @Override
    public Optional<Brand> findById(Integer brandId) {
        return brandRepository.findById(brandId);
    }

    @Override
    public List<Brand> findBrandByNameLike(String brandName) {
        return brandRepository.findBrandByNameLike(brandName);
    }

    @Override
    public Boolean existsByName(String brandName) {
        List<Brand> listBrandToFind = this.findBrandByNameLike(brandName);
        for (Brand b : listBrandToFind){
            if(b.getNameBrand().equalsIgnoreCase(brandName)){
                return true;
            }
        }
        return false;
    }

}
