package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.Brand;
import com.java6.java_6_asm.entities.product.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color,Integer> {
    @Query("select c from Color c where c.isActive=true")
    List<Color> findAllColorActive();
}
