package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Color;
import com.java6.java_6_asm.repositories.product.ColorRepository;
import com.java6.java_6_asm.service.service.product.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorService {
    @Autowired
    ColorRepository colorRepository;
    @Override
    public List<Color> findAllColorActive() {
        return colorRepository.findAllColorActive();
    }

    @Override
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    public Color save(Color color) {
        if(colorRepository.existsById(color.getColorId())){
            return null;
        }
        colorRepository.save(color);
        return color;
    }

    @Override
    public Color update(Integer colorId, Color color) {
        if(!colorRepository.existsById(colorId)){
            return null;
        }
        colorRepository.save(color);
        return color;
    }

    @Override
    public Color delete(Integer colorId) {
        if(!colorRepository.existsById(colorId)){
            return null;
        }
        Color color = this.findById(colorId).get();
        color.setIsActive(false);
        color.setDeleteDate(new Date());
        return color;
    }

    @Override
    public Optional<Color> findById(Integer colorId) {
        return colorRepository.findById(colorId);
    }
}
