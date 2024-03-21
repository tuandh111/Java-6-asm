package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.repositories.product.DetailsColorRepository;
import com.java6.java_6_asm.service.service.product.DetailsColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailsColorServiceImpl implements DetailsColorService {
    @Autowired
    DetailsColorRepository detailsColorRepository;
    @Override
    public List<DetailsColor> findAllDetailsColor() {
        return detailsColorRepository.findAll();
    }
}
