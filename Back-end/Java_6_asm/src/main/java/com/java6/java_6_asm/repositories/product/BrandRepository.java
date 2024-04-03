package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Integer> {
    @Query("select b from Brand b where b.isActive=true")
    List<Brand> findAllBrandActive();

    @Query("SELECT b,(SELECT STRING_AGG(p.productId, ',') FROM Product p Where p.brand=b) FROM Brand b Order by b.brandId DESC")
    List<Object[]> findAllBrandAndCountProduct();
    @Query("SELECT b FROM Brand b WHERE b.nameBrand LIKE %:nameBrand%")
    List<Brand> findBrandByNameLike(@Param("nameBrand") String nameBrand);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN TRUE ELSE FALSE END FROM Product p WHERE p.brand.brandId = :brandId")
    boolean existsProductsByBrandId(@Param("brandId") Integer brandId);
}
