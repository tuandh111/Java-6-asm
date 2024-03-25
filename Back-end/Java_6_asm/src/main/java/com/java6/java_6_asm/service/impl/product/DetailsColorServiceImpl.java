package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Color;
import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.repositories.product.DetailsColorRepository;
import com.java6.java_6_asm.service.service.product.DetailsColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DetailsColorServiceImpl implements DetailsColorService {
    @Autowired
    DetailsColorRepository detailsColorRepository;
    @Override
    public List<DetailsColor> findAllDetailsColor() {
        return detailsColorRepository.findAll();
    }

    @Override
    public DetailsColor save(DetailsColor detailsColor) {
        if(detailsColorRepository.existsById(detailsColor.getDetailsColorId())){
            return null;
        }
        detailsColorRepository.save(detailsColor);
        return detailsColor;
    }

    @Override
    public DetailsColor update(Integer detailsColorId, DetailsColor detailsColor) {
        if(!detailsColorRepository.existsById(detailsColorId)){
            return null;
        }
        detailsColorRepository.save(detailsColor);
        return detailsColor;
    }

    @Override
    public DetailsColor delete(Integer detailsColorId) {
        if(!detailsColorRepository.existsById(detailsColorId)){
            return null;
        }
        DetailsColor detailsColor = this.findById(detailsColorId).get();
        detailsColorRepository.deleteById(detailsColorId);
        return detailsColor;
    }

    @Override
    public Optional<DetailsColor> findById(Integer detailsColorId) {
        return detailsColorRepository.findById(detailsColorId);
    }


}
