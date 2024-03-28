package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

    @Query("SELECT p, b.nameBrand, " +
            "(SELECT STRING_AGG(i.imageName, ',') FROM ProductImage i WHERE i.product = p), " +
            "(SELECT STRING_AGG(s.sizeName, ',') FROM DetailsSize ds JOIN ds.product dp JOIN ds.size s WHERE dp = p), " +
            "(SELECT STRING_AGG(c.colorName, ',') FROM DetailsColor dc JOIN dc.product dp JOIN dc.color c WHERE dp = p) " +
            "FROM Product p " +
            "JOIN p.brand b where p.isActive=true and p.quantityInStock>0 order by p.createDate desc")
    List<Object[]> findAllProduct();
}
