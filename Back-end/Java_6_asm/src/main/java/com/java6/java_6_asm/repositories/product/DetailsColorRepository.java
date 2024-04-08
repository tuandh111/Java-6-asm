package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.DetailsSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailsColorRepository extends JpaRepository<DetailsColor,Integer> {
    DetailsColor findAllByDetailsColorId(Integer id);

    @Query("SELECT dc FROM DetailsColor dc WHERE dc.product.productId = :productId")
    List<DetailsColor> findDetailsColorByProduct(@Param("productId") Integer productId);
}
