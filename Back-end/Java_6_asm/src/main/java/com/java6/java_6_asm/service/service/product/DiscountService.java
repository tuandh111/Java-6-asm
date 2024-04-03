package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Discount;
import com.java6.java_6_asm.model.request.DiscountRequest;

import java.util.List;

public interface DiscountService {
    List<Discount> findAllDiscount();

    Discount saveDiscount (DiscountRequest discountRequest);

    Discount updateDisCount(DiscountRequest discountRequest);

    Discount findAllByDiscountId(Integer id);

    void deleteDiscount(Integer id);
}
