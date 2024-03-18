package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Brand;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    @Query("SELECT c FROM Cart c WHERE c.user = :user and c.checkPay = false")
    List<Cart> findAllByUser(@Param("user") Integer user);

    @Transactional
    @Modifying
    @Query("DELETE FROM Cart w WHERE w.user.id = :user AND w.product.productId = :product")
    void deleteByUserAndProduct(@Param("user") Integer userID, @Param("product") Integer productID);

    @Query("select  p from  Cart p where  p.user.id = :userID and  p.product.productId = :productID and p.checkPay = false")
    Cart findByProductIDAndAndUserID(@Param("userID") Integer userID, @Param("productID") Integer productID);
}
