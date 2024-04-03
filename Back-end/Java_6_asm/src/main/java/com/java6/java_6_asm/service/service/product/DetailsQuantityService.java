package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.DetailsQuantity;
import com.java6.java_6_asm.model.request.DetailsQuantityRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface DetailsQuantityService {
    List<DetailsQuantity> findByAll();

    DetailsQuantity saveDetailsQuantity(DetailsQuantityRequest detailsQuantityRequest);

    DetailsQuantity updateDetailsQuantity(Integer detailsQuantityId, DetailsQuantityRequest detailsQuantityRequest, HttpServletRequest httpServletRequest);

    DetailsQuantity findByDetailsQuantityId(Integer id);

    void deleteById(Integer id);
}
