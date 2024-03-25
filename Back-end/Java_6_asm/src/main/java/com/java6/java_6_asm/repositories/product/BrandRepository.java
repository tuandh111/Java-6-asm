package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Integer> {
    @Query("select b from Brand b where b.isActive=true")
    List<Brand> findAllBrandActive();

}
