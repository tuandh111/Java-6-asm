package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount,Integer> {
    @Query("SELECT d FROM Discount d WHERE d.product.productId = :productId")
    List<Discount> findDiscountByProduct(@Param("productId") Integer productId);
}
