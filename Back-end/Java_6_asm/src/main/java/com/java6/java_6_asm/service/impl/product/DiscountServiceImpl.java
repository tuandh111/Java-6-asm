package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Discount;
import com.java6.java_6_asm.model.request.DiscountRequest;
import com.java6.java_6_asm.repositories.product.DiscountRepository;
import com.java6.java_6_asm.service.service.product.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscountServiceImpl implements DiscountService {
    @Autowired
    DiscountRepository discountRepository;
    @Override
    public List<Discount> findAllDiscount() {
        System.out.println("discount: "+ discountRepository.findAll());
        return discountRepository.findAll();
    }

    @Override
    public Discount saveDiscount(DiscountRequest discountRequest) {
        return null;
    }

    @Override
    public Discount updateDisCount(DiscountRequest discountRequest) {
        return null;
    }

    @Override
    public Discount findAllByDiscountId(Integer id) {
        return null;
    }

    @Override
    public void deleteDiscount(Integer id) {

    }
}
