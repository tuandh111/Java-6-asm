package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailsColorRepository extends JpaRepository<DetailsColor,Integer> {
    DetailsColor findAllByDetailsColorId(Integer id);
}
