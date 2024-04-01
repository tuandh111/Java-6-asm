package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.DetailsQuantity;
import com.java6.java_6_asm.model.request.DetailsQuantityRequest;

import java.util.List;

public interface DetailsQuantityService {
    List<DetailsQuantity> findByAll();

    DetailsQuantity saveDetailsQuantity(DetailsQuantityRequest detailsQuantityRequest);

}
