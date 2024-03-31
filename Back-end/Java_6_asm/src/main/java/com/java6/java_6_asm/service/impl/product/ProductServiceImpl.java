package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.ProductRequest;
import com.java6.java_6_asm.model.request.TopProductRequest;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }



    @Override
    public List<TopProductRequest> findTopTen() {
        return TopProductRequest.convert(productRepository.findTopTenProduct());
    }

    @Override
    public List<ProductRequest> findAllProduct() {
        return ProductRequest.convert(productRepository.findAllProduct());
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


}
