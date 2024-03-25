package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.DetailsSize;

import java.util.List;
import java.util.Optional;

public interface DetailsSizeService {
    List<DetailsSize> findAllDetailSize();

    DetailsSize save(DetailsSize detailsSize);
    DetailsSize update(Integer detailsSizeId,DetailsSize detailsSize);

    DetailsSize delete(Integer detailsSizeId);
    Optional<DetailsSize> findById(Integer detailsSizeId);
}
