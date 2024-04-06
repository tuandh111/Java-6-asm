package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.response.ProductRespone;
import com.java6.java_6_asm.model.request.TopProductRequest;
import com.java6.java_6_asm.repositories.product.*;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired ProductRepository productRepository;
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    ProductImageRepository productImageRepository;
    @Autowired
    DetailsColorRepository detailsColorRepository;
    @Autowired
    DetailsSizeRepository detailsSizeRepository;
    @Autowired
    DetailsQuantityRepository detailsQuantityRepository;
    @Autowired DiscountRepository discountRepository;
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }



    @Override
    public List<TopProductRequest> findTopTen() {
        return TopProductRequest.convert(productRepository.findTopTenProduct());
    }

    @Override
    public List<ProductRespone> findAllProduct() {
        return ProductRespone.convert(productRepository.findAllProduct());
    }

    @Override
    public Optional<Product> findById(Integer productId) {
       return productRepository.findById(productId);
    }

    @Override
    public Product save(Product product) {
        if(productRepository.existsById(product.getProductId())){
            return null;
        }
        productRepository.save(product);
        return product;
    }

    @Override
    public Product update(Integer productId, Product product) {
        if(!productRepository.existsById(productId)){
            return null;
        }
        productRepository.save(product);
        return product;
    }

    @Override
    public Product delete(Integer productId) {
        if(!productRepository.existsById(productId)){
            return null;
        }
        Product product = this.findById(productId).get();
        product.setDeleteDate(new Date());
        product.setIsActive(false);
        productRepository.save(product);
        return product;
//        productRepository.deleteById(productId);
//        return 1;
    }

    @Override
    public List<Product> findAllCategory(String id) {
        return productRepository.findAllByBrand(id);
    }

    @Override
    public List<Product> findAllAndSort() {
        return productRepository.findAllAndSort();
    }

    @Override
    public Map<String, Object> getDataForAdmin() {
        Map<String,Object> data = new HashMap<>();
        data.put("products",productRepository.findAllAndSort());
        data.put("brands",brandRepository.findAllBrandActive());
        data.put("sizes", sizeRepository.findAllSizeActive());
        data.put("colors",colorRepository.findAllColorActive());
        data.put("productImage",productImageRepository.findAll());
        data.put("detailsQuantity",detailsQuantityRepository.findAll());
        data.put("detailsColor", detailsColorRepository.findAll());
        data.put("detailsSize",detailsSizeRepository.findAll());
        data.put("discount", discountRepository.findAll());
        return  data;
    }

}
