package com.java6.java_6_asm.service.service.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Color;

import java.util.List;
import java.util.Optional;

public interface ColorService {
    List<Color> findAllColorActive();
    List<Color> findAll();
    Color save(Color color);
    Color update(Integer colorId,Color color);
    Color delete(Integer colorId);
    Optional<Color> findById(Integer colorId);
}
