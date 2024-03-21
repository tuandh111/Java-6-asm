package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.repositories.product.DetailsSizeRepository;
import com.java6.java_6_asm.service.service.product.DetailsSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailsSizeServiceImpl implements DetailsSizeService {
    @Autowired
    DetailsSizeRepository detailsSizeRepository;
    @Override
    public List<DetailsSize> findAllDetailSize() {
        return detailsSizeRepository.findAll();
    }
}
