package com.java6.java_6_asm.repositories.product;

import com.java6.java_6_asm.entities.product.DetailsSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetailsSizeRepository extends JpaRepository<DetailsSize,Integer> {

}
