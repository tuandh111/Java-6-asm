package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Color;
import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.Product;

import java.util.List;
import java.util.Optional;

public interface DetailsColorService {
    List<DetailsColor> findAllDetailsColor();

    DetailsColor save(DetailsColor detailsColor);
    DetailsColor update(Integer detailsColorId,DetailsColor detailsColor);

    DetailsColor delete(Integer detailsColorId);
    Optional<DetailsColor> findById(Integer detailsColorId);
}
