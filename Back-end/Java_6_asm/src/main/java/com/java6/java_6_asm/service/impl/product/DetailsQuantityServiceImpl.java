package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.DetailsQuantity;
import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.DetailsQuantityRequest;
import com.java6.java_6_asm.repositories.product.DetailsColorRepository;
import com.java6.java_6_asm.repositories.product.DetailsQuantityRepository;
import com.java6.java_6_asm.repositories.product.DetailsSizeRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.service.service.product.DetailsQuantityService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailsQuantityServiceImpl implements DetailsQuantityService {

    @Autowired
    DetailsQuantityRepository detailsQuantityRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    DetailsColorRepository detailsColorRepository;
    @Autowired
    DetailsSizeRepository detailsSizeRepository;

    @Override
    public List<DetailsQuantity> findByAll() {
        return detailsQuantityRepository.findAll();
    }

    @Override
    public DetailsQuantity saveDetailsQuantity(DetailsQuantityRequest detailsQuantityRequest) {
        Product product = productRepository.findById(detailsQuantityRequest.getProductId()).orElseThrow(null);
        System.out.println("productId: " + product);
        DetailsQuantity detailsQuantity = new DetailsQuantity();
        detailsQuantity.setDetailsColorId(detailsQuantityRequest.getDetailsColorId());
        detailsQuantity.setDetailsSizeId(detailsQuantityRequest.getDetailsSizeId());
        detailsQuantity.setProductId(product);
        detailsQuantity.setSpecialPrice(detailsQuantityRequest.getSpecialPrice());
        detailsQuantity.setQuantity(detailsQuantityRequest.getQuantity());
        detailsQuantityRepository.save(detailsQuantity);
        return detailsQuantity;
    }

    @Override
    public DetailsQuantity updateDetailsQuantity(Integer detailsQuantityId, DetailsQuantityRequest detailsQuantityRequest, HttpServletRequest httpServletRequest) {
        DetailsQuantity detailsQuantity = detailsQuantityRepository.findById(detailsQuantityId).orElseThrow(null);
        Product product = productRepository.findById(detailsQuantityRequest.getProductId()).orElseThrow(null);
        detailsQuantity.setQuantity(detailsQuantityRequest.getQuantity());
        detailsQuantity.setDetailsSizeId(detailsQuantityRequest.getDetailsSizeId());
        detailsQuantity.setProductId(product);
        detailsQuantity.setSpecialPrice(detailsQuantityRequest.getSpecialPrice());
        detailsQuantity.setDetailsColorId(detailsQuantityRequest.getDetailsColorId());
        detailsQuantityRepository.save(detailsQuantity);
        return detailsQuantity;
    }

    @Override
    public DetailsQuantity findByDetailsQuantityId(Integer id) {
        return detailsQuantityRepository.findById(id).orElseThrow(null);
    }

    @Override
    public void deleteById(Integer id) {
        DetailsQuantity detailsQuantity = findByDetailsQuantityId(id);
        detailsQuantityRepository.delete(detailsQuantity);
    }

}
