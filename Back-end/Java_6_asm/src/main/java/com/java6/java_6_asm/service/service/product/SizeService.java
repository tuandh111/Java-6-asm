package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Color;
import com.java6.java_6_asm.entities.product.Size;

import java.util.List;
import java.util.Optional;

public interface SizeService {
    List<Size> findAllSizeActive();
    Size save(Size size);
    Size update(Integer sizeId,Size size);
    Size delete(Integer sizeId);
    Optional<Size> findById(Integer sizeId);
}
