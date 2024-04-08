package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.DetailsQuantity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailsQuantityRepository extends JpaRepository<DetailsQuantity, Integer> {
    @Query("SELECT dq FROM details_quantity dq WHERE dq.productId.productId = :productId")
    List<DetailsQuantity> findDetailsQuantityProduct(@Param("productId") Integer productId);
}
