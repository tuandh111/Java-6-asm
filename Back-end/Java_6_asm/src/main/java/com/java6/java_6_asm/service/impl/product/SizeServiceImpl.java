package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.Size;
import com.java6.java_6_asm.repositories.product.SizeRepository;
import com.java6.java_6_asm.service.service.product.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeService {
    @Autowired
    SizeRepository sizeRepository;
    @Override
    public List<Size> findAllSizeActive() {
        return sizeRepository.findAllSizeActive();
    }

    @Override
    public Size save(Size size) {
        if(sizeRepository.existsById(size.getSizeId())){
            return null;
        }
        sizeRepository.save(size);
        return size;
    }

    @Override
    public Size update(Integer sizeId, Size size) {
        if(!sizeRepository.existsById(sizeId)){
            return null;
        }
        sizeRepository.save(size);
        return size;
    }

    @Override
    public Size delete(Integer sizeId) {
        if(!sizeRepository.existsById(sizeId)){
            return null;
        }
        Size size=this.findById(sizeId).get();
        size.setDeleteDate(new Date());
        size.setIsActive(false);
        return size;
    }

    @Override
    public Optional<Size> findById(Integer sizeId) {
        return sizeRepository.findById(sizeId);
    }
}
