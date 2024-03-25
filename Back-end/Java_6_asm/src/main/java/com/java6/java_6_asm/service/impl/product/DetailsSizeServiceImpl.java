package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities.product.DetailsSize;
import com.java6.java_6_asm.repositories.product.DetailsSizeRepository;
import com.java6.java_6_asm.service.service.product.DetailsSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetailsSizeServiceImpl implements DetailsSizeService {
    @Autowired
    DetailsSizeRepository detailsSizeRepository;
    @Override
    public List<DetailsSize> findAllDetailSize() {
        return detailsSizeRepository.findAll();
    }

    @Override
    public DetailsSize save(DetailsSize detailsSize) {
        if(detailsSizeRepository.existsById(detailsSize.getDetailsSizeId())){
            return null;
        }
        detailsSizeRepository.save(detailsSize);
        return detailsSize;
    }

    @Override
    public DetailsSize update(Integer detailsSizeId, DetailsSize detailsSize) {
        if(!detailsSizeRepository.existsById(detailsSizeId)){
            return null;
        }
        detailsSizeRepository.save(detailsSize);
        return detailsSize;
    }

    @Override
    public DetailsSize delete(Integer detailsSizeId) {
        if(!detailsSizeRepository.existsById(detailsSizeId)){
            return null;
        }
        DetailsSize detailsSize = this.findById(detailsSizeId).get();
        detailsSizeRepository.deleteById(detailsSizeId);
        return detailsSize;
    }

    @Override
    public Optional<DetailsSize> findById(Integer detailsSizeId) {
        return detailsSizeRepository.findById(detailsSizeId);
    }
}
