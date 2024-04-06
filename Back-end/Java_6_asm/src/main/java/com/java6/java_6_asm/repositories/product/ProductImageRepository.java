package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage,Integer> {

    @Query("SELECT pm FROM ProductImage pm WHERE pm.product.productId = :productId")
    List<ProductImage> findImageByProduct(@Param("productId") Integer productId);

}
