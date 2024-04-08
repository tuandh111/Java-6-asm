package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.DetailsSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailsSizeRepository extends JpaRepository<DetailsSize,Integer> {
    @Query("SELECT ds FROM DetailsSize ds WHERE ds.product.productId = :productId")
    List<DetailsSize> findDetailSizeByProduct(@Param("productId") Integer productId);
}
